import {DatabaseConnection} from './indexedDb'

export function InitDatabaseService(): any {
  return new DatabaseConnection()
}
