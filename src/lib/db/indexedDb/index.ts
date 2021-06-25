import Dexie from 'dexie'
import {Activity, Domain, RawActivity} from '../models/activity'
import {DefiniteTimeRange, TimeRange} from '../models/time'

import {
  ActivityTableRecord,
  DomainTableRecord,
  TitleTableRecord,
} from '../types'

const DATABASE_NAME = 'db'
export const ACTIVITY_TABLE = 'activity'
export const DOMAIN_TABLE = 'domain'
export const TITLE_TABLE = 'title'

export class DatabaseConnection extends Dexie {
  private [ACTIVITY_TABLE]: Dexie.Table<ActivityTableRecord, number>
  private [DOMAIN_TABLE]: Dexie.Table<DomainTableRecord, number>
  private [TITLE_TABLE]: Dexie.Table<TitleTableRecord, number>

  public constructor() {
    super(DATABASE_NAME)
    this.version(1).stores({
      [ACTIVITY_TABLE]: '++id, domain, startTime, endTime',
      [DOMAIN_TABLE]: 'id',
      [TITLE_TABLE]: 'id',
    })

    this[ACTIVITY_TABLE] = this.table(ACTIVITY_TABLE)
    this[DOMAIN_TABLE] = this.table(DOMAIN_TABLE)
    this[TITLE_TABLE] = this.table(TITLE_TABLE)
  }
}
