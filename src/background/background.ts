import {InitBrowserActionService} from './BrowserAction'
import {InitExtensionService} from './Extension'
import {InitTabsService} from './Tabs'
import {Tab} from './Tabs/tabs'

export function Background(): void {
  const browserActionService = InitBrowserActionService()
  const extensionService = InitExtensionService()
  const tabsService = InitTabsService()

  if (browserActionService && extensionService && tabsService) {
    browserActionService.onClicked.addListener((tab: Tab) => {
      const extensionUrl = new URL(extensionService.getURL('index.html'))
      const tabUrl = new URL(tab.url || '')

      if (tab.id && tabUrl.origin !== extensionUrl.origin) {
        tabsService.update(tab.id, {active: true, url: extensionUrl.href})
      }
    })
  }
}
