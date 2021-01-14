import { FormControl, FormGroup } from "@angular/forms";

export class Item {

    constructor(private name: string) { }
    
    public itemForm = new FormGroup({               //Data pertaining to this item
        itemName: new FormControl('New Item')
    });
}
