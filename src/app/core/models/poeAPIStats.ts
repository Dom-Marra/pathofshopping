export interface poeStatOption {
  id: number | string,
  text: string
}

export interface poeStatOptions {
  options: Array<poeStatOption>
}

export interface poeStat {
  id: string,
  text: string,
  option?: poeStatOptions
  type?: string
}

export interface poeCategorizedStats {
    label: string,
    entries: Array<poeStat>
  }