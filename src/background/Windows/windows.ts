import {Tab} from '../Tabs/tabs'
import Events from '../types'

export type BrowserWindowState =
  | 'normal'
  | 'minimized'
  | 'maximized'
  | 'fullscreen'
  | 'docked'

export type BrowserWindowType =
  | 'normal'
  | 'popup'
  | 'panel'
  | 'app'
  | 'devtools'

export interface BrowserWindow {
  id?: number
  focused: boolean
  tabs?: Tab[]
  incognito: boolean
  type?: BrowserWindowType
  state?: BrowserWindowState
  title?: string
}

export type BrowserWindowFocusChangedEventCallback = (windowId: number) => void

export type BrowserWindowFocusChangedEvent =
  Events<BrowserWindowFocusChangedEventCallback>

export interface WindowsService {
  WINDOW_ID_NONE: number

  get(windowId: number): Promise<BrowserWindow>

  onFocusChanged: BrowserWindowFocusChangedEvent
}

export interface ChromeWindowsAPI {
  WINDOW_ID_NONE: number

  get(windowId: number, getInfo: any, callback: (window: any) => void): void

  onFocusChanged: chrome.windows.WindowIdEvent
}

export class ChromeWindowsService implements WindowsService {
  private windows: ChromeWindowsAPI

  public WINDOW_ID_NONE: number
  public onFocusChanged: BrowserWindowFocusChangedEvent

  constructor(windows: ChromeWindowsAPI = chrome.windows) {
    this.windows = windows
    this.WINDOW_ID_NONE = windows.WINDOW_ID_NONE
    this.onFocusChanged = {
      addListener(callback: BrowserWindowFocusChangedEventCallback): void {
        windows.onFocusChanged.addListener(callback)
      },
      hasListener(callback: BrowserWindowFocusChangedEventCallback): boolean {
        return windows.onFocusChanged.hasListener(callback)
      },
      removeListener(callback: BrowserWindowFocusChangedEventCallback): void {
        windows.onFocusChanged.removeListener(callback)
      },
    }
  }

  get(windowId: number): Promise<BrowserWindow> {
    return new Promise(resolve => {
      this.windows.get(windowId, {populate: true}, window => {
        resolve(window)
      })
    })
  }
}
