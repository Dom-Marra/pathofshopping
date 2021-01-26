import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Resultdata } from "../resultdata/resultdata";

export class Item {

    public resultData: Resultdata = new Resultdata();   //Data pertaining to the results

    public itemForm = new FormGroup({               //Data pertaining to this item
        itemName: new FormControl('New Item')
    });

    constructor(private name: string, public savedItemData?: any) { 
        if (this.savedItemData != null) {
            console.log(savedItemData);
            this.loadSaveData();
            this.savedItemData = null;
        }
    }

    public loadSaveData() {
        this.itemForm = new FormGroup({});
        this.generateControls(this.savedItemData, this.itemForm);
    }

    public generateControls(object, group?: FormGroup, array?: FormArray) {
        for (const key in object) {
            if (typeof object[key] === 'object' && object[key]) {
                let control = Array.isArray(object[key]) ? new FormArray([]) : new FormGroup({});

                group?.addControl(key, control);
                array?.push(control);
                this.generateControls(object[key], Array.isArray(object[key]) ? null : (control as FormGroup),  Array.isArray(object[key]) ? (control as FormArray) : null);
            } else {
                group?.addControl(key, new FormControl(object[key]));
            }
        }
    }

    /**
     * Resets the data for this item
     */
    public clear() {
        this.resultData = new Resultdata();
        this.itemForm.reset('');
        this.itemForm.controls.itemName.patchValue('New Item');
        (this.itemForm.get('queryForm.query.stats') as FormArray).clear();
    }
}
