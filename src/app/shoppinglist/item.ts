import { FormControl, FormGroup } from "@angular/forms";
import { Statfilter } from "./filters/statfilters/statfilter/statfilter";

export class Item {

    public statFilters: Array<Statfilter> = [];

    constructor(private name: string) { }
    
    public itemForm = new FormGroup({               //Data pertaining to this item
        itemName: new FormControl('New Item')
    });
}
