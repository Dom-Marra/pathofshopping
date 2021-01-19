import { FormControl, FormGroup } from "@angular/forms";
import { Statfilter } from "./filters/statfilters/statfilter/statfilter";
import { Resultdata } from "./item/results/resultdata/resultdata";

export class Item {

    public resultData: Resultdata = new Resultdata();   //Data pertaining to the results
    public statFilters: Array<Statfilter> = [];

    constructor(private name: string) { }
    
    public itemForm = new FormGroup({               //Data pertaining to this item
        itemName: new FormControl('New Item')
    });
}
