export interface ItemSaveData {
   itemForm: {
      itemName?: string,
      query?: {
         name: string,
         term: string,
         type: string,
         stats: Array<{
            filters?: []
         }>,
         status: {
            option: string
         }
      }
   },
   filterGroups: {
      [key: string]: {
         values: {
            [key: string]: {
               option?: string,
               min?: number,
               max?: number
            }
         },
         disabled: boolean
      }
   }
}