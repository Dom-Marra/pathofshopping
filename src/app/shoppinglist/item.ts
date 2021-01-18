import { FormControl, FormGroup } from "@angular/forms";
import { Statfilter } from "./filters/statfilters/statfilter/statfilter";

export interface queryProps {
    psuedos: string,
    res: Array<string>,
    total: number,
    inexact: boolean,
    id: string,
}

export class Item {

    public queryData: queryProps;                   //Data pertaining to the current query

    public statFilters: Array<Statfilter> = [];

    constructor(private name: string) { }
    
    public itemForm = new FormGroup({               //Data pertaining to this item
        itemName: new FormControl('New Item')
    });

    /**
     * Clears the queryData
     */
    public clearQueryData() {
        this.queryData = null;
    }
}
