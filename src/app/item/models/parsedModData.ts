export interface parsedModData {
    text: string,
    name: string,
    tiers: Array<{
      tier: string,
      ranges: Array<{
        min: number,
        max: number
      }>
    }>,
    hash: string
}