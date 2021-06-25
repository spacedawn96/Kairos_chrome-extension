import {Tab} from '../Tabs/tabs'
import Events from '../types'

export type BrowserActionFn = (tab: Tab) => void

export type BrowserActionOnClicked = Events<BrowserActionFn>

export interface BrowserActionTypes {
  onClicked: BrowserActionOnClicked
}

export interface ChromeBrowserActionAPI {
  onClicked: chrome.browserAction.BrowserClickedEvent
}

// Manifest V2 only
export class ChromeBrowserAction implements BrowserActionTypes {
  private browserAction: ChromeBrowserActionAPI
  public onClicked: BrowserActionOnClicked

  constructor(browserAction: ChromeBrowserActionAPI = chrome.browserAction) {
    this.browserAction = browserAction
    this.onClicked = {
      addListener(callback: BrowserActionFn): void {
        browserAction.onClicked.addListener(callback)
      },
      hasListener(callback: BrowserActionFn): boolean {
        return browserAction.onClicked.hasListener(callback)
      },
      removeListener(callback: BrowserActionFn): void {
        browserAction.onClicked.removeListener(callback)
      },
    }
  }
}
