import { ItemSaveData } from "./item-save-data.model";

export interface ShoppingListSaveData {
    league: string,
    name: string,
    savedItems: Array<ItemSaveData>
}