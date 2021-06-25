export interface RawActivity {
  url: string
  startTime: number
  endTime: number
  title: string
  favIconUrl: string
}

export interface Activity {
  id: number
  url: string
  domain: string
  path: string
  startTime: number
  endTime: number
  title: string
  favIconUrl: string
}

export interface Domain {
  id: string
  favIconUrl: string
}
