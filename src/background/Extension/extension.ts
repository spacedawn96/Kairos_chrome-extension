export interface ExtensionTypes {
  getURL(path: string): string
}

export interface ChromeExtensionAPI {
  getURL(path: string): string
}

export class Extension implements ExtensionTypes {
  private runtime: ChromeExtensionAPI

  constructor(runtime: ChromeExtensionAPI = chrome.extension) {
    this.runtime = runtime
  }

  getURL(path: string): string {
    return this.runtime.getURL(path)
  }
}
