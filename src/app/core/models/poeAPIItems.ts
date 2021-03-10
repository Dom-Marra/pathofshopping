export interface itemFlag {
  [key: string]: boolean
}

export interface item {
  type: string,
  text: string,
  name?: string,
  disc?: string,
  flags?: Array<itemFlag>
}

export interface poeCategorizedItems {
  label: string,
  entries: Array<item>
}