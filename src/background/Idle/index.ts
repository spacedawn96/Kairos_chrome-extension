import {Idle, IdleTypes} from './idle'

export function InitIdleService(): IdleTypes | undefined {
  return new Idle()
}
