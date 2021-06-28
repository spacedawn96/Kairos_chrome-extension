import Events from '../types'

export type IdleState = 'active' | 'idle' | 'locked'

export type IdleStateOnStateChangedFn = (newState: IdleState) => void

export type IdleStateOnStateChanged = Events<IdleStateOnStateChangedFn>

export interface IdleTypes {
  queryState(detectionIntervalInSeconds: number): Promise<IdleState>

  setDetectionInterval(intervalInSeconds: number): void

  onStateChanged: IdleStateOnStateChanged
}

export interface IdleAPI {
  queryState(
    detectionIntervalInSeconds: number,
    callback: (newState: string) => void,
  ): void
  setDetectionInterval(intervalInSeconds: number): void

  onStateChanged: IdleStateOnStateChanged
}

export interface ChromeIdleAPI {
  queryState(
    detectionIntervalInSeconds: number,
    callback: (newState: string) => void,
  ): void
  setDetectionInterval(intervalInSeconds: number): void

  onStateChanged: chrome.idle.IdleStateChangedEvent
}

export class Idle implements IdleTypes {
  private idle: ChromeIdleAPI
  // Fired when the system changes to an active, idle or locked state. The event fires with "locked" if the screen is locked or the screensaver activates, "idle" if the system is unlocked and the user has not generated any input for a specified number of seconds, and "active" when the user generates input on an idle system.
  public onStateChanged: IdleStateOnStateChanged

  constructor(idle: ChromeIdleAPI = chrome.idle) {
    this.idle = idle
    this.onStateChanged = {
      addListener(callback: IdleStateOnStateChangedFn): void {
        idle.onStateChanged.addListener((newState: string) => {
          callback(newState as IdleState)
        })
      },
      hasListener(callback: IdleStateOnStateChangedFn): boolean {
        return idle.onStateChanged.hasListener((newState: string) => {
          callback(newState as IdleState)
        })
      },
      removeListener(callback: IdleStateOnStateChangedFn): void {
        idle.onStateChanged.removeListener((newState: string) => {
          callback(newState as IdleState)
        })
      },
    }
  }

  // Returns "locked" if the system is locked, "idle" if the user has not generated any input for a specified number of seconds, or "active" otherwise.
  queryState(detectionIntervalInSeconds: number): Promise<IdleState> {
    return new Promise(resolve => {
      this.idle.queryState(detectionIntervalInSeconds, newState => {
        resolve(newState as IdleState)
      })
    })
  }

  // Sets the interval, in seconds, used to determine when the system is in an idle state for onStateChanged events. The default interval is 60 seconds.
  setDetectionInterval(intervalInSeconds: number): void {
    this.idle.setDetectionInterval(intervalInSeconds)
  }
}
