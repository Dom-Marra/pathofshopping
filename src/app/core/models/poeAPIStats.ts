export interface poeStatOption {
  id: number | string,
  text: string
}

export interface poeStat {
  id: string,
  text: string,
  option?: Array<poeStatOption>
  type?: string
}

export interface poeCategorizedStats {
    label: string,
    entries: Array<poeStat>
  }