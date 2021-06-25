import Events from '../types'

export interface Tab {
  active: boolean
  audible?: boolean
  autoDiscardable: boolean
  discarded: boolean
  favIconUrl?: string
  highlighted: boolean
  id?: number
  index: number
  windowId?: number
  openerTabId?: number
  pinned: boolean
  lastAccessed?: number
  url?: string
  title?: string
  status?: string
  successorTabId?: number
}

export interface OnActivated {
  tabId: number
  windowId: number
}

export interface OnRemovedInfo {
  windowId: number
  isWindowClosing: boolean
}

export interface OnUpdatedChangeInfo {
  status?: string
  discarded?: boolean
  favIconUrl?: string
  title?: string
  url?: string
}

export type UpdateProperties = {
  active?: boolean
  autoDiscardable?: boolean
  highlighted?: boolean
  muted?: boolean
  pinned?: boolean
  url?: string
}

export type TabsActivatedFn = (activeInfo: OnActivated) => void

export type TabsOnActivated = Events<TabsActivatedFn>

export type TabsOnRemovedFn = (tabId: number, removeInfo: OnRemovedInfo) => void

export type TabsOnRemoved = Events<TabsOnRemovedFn>

export type TabsOnUpdatedFn = (
  tabId: number,
  changeInfo: OnUpdatedChangeInfo,
  tab: Tab,
) => void

export type TabOnUpdated = Events<TabsOnUpdatedFn>

export interface TabsTypes {
  get(tabId: number): Promise<Tab>

  update(tabId: number, updateProperties: UpdateProperties): Promise<Tab>

  onActivated: TabsOnActivated

  onRemoved: TabsOnRemoved

  onUpdated: TabOnUpdated
}

export interface TabsAPI {
  get(tabId: number, callback: (tab: Tab) => void): void
  update(
    tabId: number,
    updateProperties: UpdateProperties,
    callback?: (tab?: Tab) => void,
  ): void

  onActivated: TabsOnActivated
  onRemoved: TabsOnRemoved
  onUpdated: TabOnUpdated
}

export interface ChromeTabsAPI {
  get(tabId: number, callback: (tab: chrome.tabs.Tab) => void): void
  update(
    tabId: number,
    updateProperties: chrome.tabs.UpdateProperties,
    callback?: (tab?: chrome.tabs.Tab) => void,
  ): void

  onActivated: chrome.tabs.TabActivatedEvent
  onRemoved: chrome.tabs.TabRemovedEvent
  onUpdated: chrome.tabs.TabUpdatedEvent
}

export class Tabs implements TabsTypes {
  private tabs: ChromeTabsAPI
  public onActivated: TabsOnActivated
  public onRemoved: TabsOnRemoved
  public onUpdated: TabOnUpdated

  constructor(tabs: ChromeTabsAPI = chrome.tabs) {
    this.tabs = tabs
    this.onActivated = {
      addListener(callback: TabsActivatedFn): void {
        tabs.onActivated.addListener(callback)
      },
      hasListener(callback: TabsActivatedFn): boolean {
        return tabs.onActivated.hasListener(callback)
      },
      removeListener(callback: TabsActivatedFn): void {
        tabs.onActivated.removeListener(callback)
      },
    }
    this.onRemoved = {
      addListener(callback: TabsOnRemovedFn): void {
        tabs.onRemoved.addListener(callback)
      },
      hasListener(callback: TabsOnRemovedFn): boolean {
        return tabs.onRemoved.hasListener(callback)
      },
      removeListener(callback: TabsOnRemovedFn): void {
        tabs.onRemoved.removeListener(callback)
      },
    }
    this.onUpdated = {
      addListener(callback: TabsOnUpdatedFn): void {
        tabs.onUpdated.addListener(callback)
      },
      hasListener(callback: TabsOnUpdatedFn): boolean {
        return tabs.onUpdated.hasListener(callback)
      },
      removeListener(callback: TabsOnUpdatedFn): void {
        tabs.onUpdated.removeListener(callback)
      },
    }
  }
  get(tabId: number): Promise<Tab> {
    return new Promise(resolve => {
      this.tabs.get(tabId, resolve)
    })
  }
  update(tabId: number, updateProps: UpdateProperties): Promise<Tab> {
    return new Promise((resolve: any) => {
      this.tabs.update(tabId, updateProps, resolve)
    })
  }
}
