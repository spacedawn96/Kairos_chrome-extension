import {ChromeBrowserAction, BrowserActionTypes} from './browserAction'

export function InitBrowserActionService(): BrowserActionTypes {
  return new ChromeBrowserAction()
}
