export type TimeRange = {
  start: number | null
  end: number | null
}

export type DefiniteTimeRange = TimeRange & {
  start: number
  end: number
}
