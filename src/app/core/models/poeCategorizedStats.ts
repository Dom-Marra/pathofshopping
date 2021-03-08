export interface poeCategorizedStats {
    category: string,
    stats: Array<{
      id: string,
      text: string,
      option?: Array<{
        id: number | string,
        text: string
      }>
    }>
  }