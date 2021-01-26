import { itemSaveData } from "./itemSaveData";

export interface shoppingListSaveData {
    league: string,
    name: string,
    savedItems: Array<itemSaveData>
}