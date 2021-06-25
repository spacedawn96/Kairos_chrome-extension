import {Extension, ExtensionTypes} from './extension'

export function InitExtensionService(): ExtensionTypes {
  return new Extension()
}
