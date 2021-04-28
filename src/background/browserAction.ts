import {Tab} from './tabs'
import Events from './types'

export type BrowserActionFn = (tab: Tab) => void

export type BrowserActionOnClicked = Events<BrowserActionFn>

export interface BrowserActionTypes {
  onClicked: BrowserActionOnClicked
}

// Manifest V2 only
export class BrowserAction implements BrowserActionTypes {
  private browserAction: BrowserActionTypes
  public onClicked: BrowserActionOnClicked

  constructor(browserAction: BrowserActionTypes) {
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
