import {InitDatabaseService} from '../lib/db'
import {ActivityService} from '../lib/db/types'
import {RawActivity} from '../lib/db/models/activity'
import {InitIdleService} from './Idle'

import {InitTabsService} from './Tabs'
import {
  OnActivated,
  OnUpdatedChangeInfo,
  Tab,
  TabsActivatedFn,
  TabsOnUpdatedFn,
  TabsTypes,
} from './Tabs/tabs'
import {InitWindowsService} from './Windows'
import {
  BrowserWindowFocusChangedEventCallback,
  WindowsService,
} from './Windows/windows'
import {IdleTypes, IdleState, IdleStateOnStateChangedFn} from './Idle/idle'

export enum EventType {
  IDLE_ON_STATE_CHANGED = 'IDLE_ON_STATE_CHANGED',
  TABS_ON_ACTIVATED = 'TABS_ON_ACTIVATED',
  TABS_ON_UPDATED = 'TABS_ON_UPDATED',
  WINDOWS_ON_FOCUS_CHANGE = 'WINDOWS_ON_FOCUS_CHANGE',
}

export type EventCallback =
  | {
      type: EventType.IDLE_ON_STATE_CHANGED
      args: Parameters<IdleStateOnStateChangedFn>
    }
  | {
      type: EventType.TABS_ON_ACTIVATED
      args: Parameters<TabsActivatedFn>
    }
  | {
      type: EventType.TABS_ON_UPDATED
      args: Parameters<TabsOnUpdatedFn>
    }
  | {
      type: EventType.WINDOWS_ON_FOCUS_CHANGE
      args: Parameters<BrowserWindowFocusChangedEventCallback>
    }

export interface ActivityLoggerDependencies {
  activityService: ActivityService
  idleService: IdleTypes
  tabsService: TabsTypes
  windowsService: WindowsService
}

export interface TabWithRequiredFields extends Tab {
  favIconUrl: string
  title: string
  url: string
}

const EMPTY_ACTIVITY: RawActivity = {
  url: '',
  favIconUrl: '',
  title: '',
  startTime: 0,
  endTime: 0,
}
const IDLE_DETECTION_INTERVAL = 600 // 10 minutes

export class ActivityLogger {
  private activityService: ActivityService
  private idleService: IdleTypes
  private tabsService: TabsTypes
  private windowsService: WindowsService

  public currentActivity: RawActivity

  constructor(dependencies: ActivityLoggerDependencies) {
    this.activityService = dependencies.activityService
    this.idleService = dependencies.idleService
    this.tabsService = dependencies.tabsService
    this.windowsService = dependencies.windowsService

    this.currentActivity = {...EMPTY_ACTIVITY}
  }

  private hasActiveActivity(activity: RawActivity): boolean {
    return activity.url !== EMPTY_ACTIVITY.url
  }

  private hasSwitchedToValidTab(tab: Tab): tab is TabWithRequiredFields {
    return (
      tab &&
      tab.active &&
      tab.favIconUrl !== undefined &&
      tab.title !== undefined &&
      tab.url !== undefined &&
      tab.url !== this.currentActivity.url
    )
  }

  private handleIdleOnStateChanged = async (
    newState: IdleState,
  ): Promise<void> => {
    switch (newState) {
      case 'active': {
        this.currentActivity.startTime = Date.now()
        break
      }
      case 'idle':
      case 'locked': {
        const activity = {...this.currentActivity, endTime: Date.now()}
        this.currentActivity.startTime = EMPTY_ACTIVITY.startTime

        await this.log(activity)
        break
      }
    }
  }

  private handleTabsOnActivated = async (
    activeInfo: OnActivated,
  ): Promise<void> => {
    const tab = await this.tabsService.get(activeInfo.tabId)
    if (this.hasSwitchedToValidTab(tab)) {
      const activity = {...this.currentActivity, endTime: Date.now()}
      this.currentActivity = {
        url: tab.url,
        favIconUrl: tab.favIconUrl,
        title: tab.title,
        startTime: activity.endTime + 1,
        endTime: 0,
      }

      await this.log(activity)
    }
  }

  private handleTabsOnUpdated = async (
    tabId: number,
    changeInfo: OnUpdatedChangeInfo,
    tab: Tab,
  ): Promise<void> => {
    if (this.hasSwitchedToValidTab(tab)) {
      const activity = {...this.currentActivity, endTime: Date.now()}
      this.currentActivity = {
        url: tab.url,
        favIconUrl: tab.favIconUrl,
        title: tab.title,
        startTime: activity.endTime + 1,
        endTime: 0,
      }

      await this.log(activity)
    }
  }

  private handleWindowsOnFocusChange = async (
    windowId: number,
  ): Promise<void> => {
    if (windowId === this.windowsService.WINDOW_ID_NONE) {
      const activity = {...this.currentActivity, endTime: Date.now()}
      this.currentActivity = {...EMPTY_ACTIVITY}
      await this.log(activity)
      return
    }

    const {tabs = []} = await this.windowsService.get(windowId)
    const activeTab: Tab | undefined = tabs.find(tab => tab.active)
    if (this.hasSwitchedToValidTab(activeTab!)) {
      const activity = {...this.currentActivity, endTime: Date.now()}
      this.currentActivity = {
        url: activeTab.url,
        favIconUrl: activeTab.favIconUrl,
        title: activeTab.title,
        startTime: activity.endTime + 1,
        endTime: 0,
      }

      await this.log(activity)
    }
  }

  private handleEvent(event: EventCallback): void {
    if (this.currentActivity.startTime === 0) {
      this.currentActivity.startTime = Date.now()
    }

    switch (event.type) {
      case EventType.IDLE_ON_STATE_CHANGED:
        this.handleIdleOnStateChanged(...event.args)
        break
      case EventType.TABS_ON_ACTIVATED:
        this.handleTabsOnActivated(...event.args)
        break
      case EventType.TABS_ON_UPDATED:
        this.handleTabsOnUpdated(...event.args)
        break
      case EventType.WINDOWS_ON_FOCUS_CHANGE:
        this.handleWindowsOnFocusChange(...event.args)
        break
    }
  }

  private async log(activity: RawActivity): Promise<void> {
    if (!this.hasActiveActivity(activity)) {
      return
    }

    try {
      await this.activityService.createActivityRecord(activity)
    } catch (e) {
      console.error(
        '[activity-logger] log: Unable to create activity record',
        e.stack || e,
      )
    }
  }

  public run(): void {
    this.idleService.setDetectionInterval(IDLE_DETECTION_INTERVAL)

    this.idleService.onStateChanged.addListener((...args) => {
      this.handleEvent({type: EventType.IDLE_ON_STATE_CHANGED, args})
    })
    this.tabsService.onActivated.addListener((...args) => {
      this.handleEvent({type: EventType.TABS_ON_ACTIVATED, args})
    })
    this.tabsService.onUpdated.addListener((...args) => {
      this.handleEvent({type: EventType.TABS_ON_UPDATED, args})
    })
    this.windowsService.onFocusChanged.addListener((...args) => {
      this.handleEvent({type: EventType.WINDOWS_ON_FOCUS_CHANGE, args})
    })
  }
}

export function InitActivityLogger(): void {
  const activityService = InitDatabaseService()
  const idleService = InitIdleService()
  const tabsService = InitTabsService()
  const windowsService = InitWindowsService()

  if (activityService && idleService && tabsService && windowsService) {
    const logger = new ActivityLogger({
      activityService,
      idleService,
      tabsService,
      windowsService,
    })
    logger.run()
  } else {
    console.error('error', {
      activityServiceOnline: Boolean(activityService),
      idleServiceOnline: Boolean(idleService),
      tabsServiceOnline: Boolean(tabsService),
      windowsServiceOnline: Boolean(windowsService),
    })
  }
}
