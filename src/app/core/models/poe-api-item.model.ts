export interface ItemFlag {
  [key: string]: boolean
}

export interface item {
  type: string,
  text: string,
  name?: string,
  disc?: string,
  flags?: ItemFlag
}

export interface PoeCategorizedItems {
  label: string,
  entries: Array<item>
}