export interface Results {
    complexity: number,
    id: string,
    inexact: boolean,
    result: Array<string>,
    total: number,
    error?: string
}