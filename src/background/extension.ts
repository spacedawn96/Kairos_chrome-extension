export interface ExtensionTypes {
  getURL(path: string): string
}

export class Extension implements ExtensionTypes {
  private runtime: ExtensionTypes

  constructor(runtime: ExtensionTypes) {
    this.runtime = runtime
  }

  getURL(path: string): string {
    return this.runtime.getURL(path)
  }
}
