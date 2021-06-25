import {ChromeWindowsService, WindowsService} from './windows'

export function InitWindowsService(): WindowsService {
  return new ChromeWindowsService()
}
