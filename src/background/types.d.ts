export default interface Events<T extends Function> {
  addListener(callback: T): void

  hasListener(callback: T): boolean

  removeListener(callback: T): void
}
