export interface staticItem {
  id: string,
  text: string,
  image: string
}

export interface poeCategorizedStatic {
  label: string,
  id: string,
  entries: Array<staticItem>
}