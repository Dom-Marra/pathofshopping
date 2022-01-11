export interface ParsedModData {
    text: string,
    names: Array<string>,
    tiers: Array<{
      tier: string,
      ranges: Array<{
        min: number,
        max: number
      }>
    }>,
    hash: string
}