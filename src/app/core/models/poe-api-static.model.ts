export interface StaticItem {
  id: string,
  text: string,
  image: string
}

export interface PoeCategorizedStatic {
  label: string,
  id: string,
  entries: Array<StaticItem>
}