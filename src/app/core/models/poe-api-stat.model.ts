export interface PoeStatOption {
  id: number | string,
  text: string
}

export interface PoeStatOptions {
  options: Array<PoeStatOption>
}

export interface PoeStat {
  id: string,
  text: string,
  option?: PoeStat
  type?: string
}

export interface PoeCategorizedStats {
    label: string,
    entries: Array<PoeStat>
  }