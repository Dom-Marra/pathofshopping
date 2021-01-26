import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { itemSaveData } from "src/app/models/itemSaveData";
import { ItemForm } from "../formgroups/item-form";
import { StatFilterForm } from "../formgroups/stat-filter-form";
import { StatForm } from "../formgroups/stat-form";
import { Resultdata } from "../resultdata/resultdata";

export class Item {

    public resultData: Resultdata = new Resultdata();   //Data pertaining to the results

    public itemForm = new ItemForm();                   //The main item data

    constructor(public savedItemData?: itemSaveData) { 
        if (this.savedItemData) {
            this.loadSaveData();
        }
    }

    /**
     * Loads the saved item data
     */
    public loadSaveData() {

        //Have to add a new stat filter for each one saved
        this.savedItemData.queryForm.query.stats.forEach(statGroup => {
            let newStatGroup = new StatFilterForm();
            (this.itemForm.get('queryForm.query.stats') as FormArray).push(newStatGroup);

            //Have to add a stat for each on saved
            statGroup.filters.forEach(filter => {
                (newStatGroup.controls.filters as FormArray).push(new StatForm);
            });
        });

        //Patch the saved values
        this.itemForm.patchValue(this.savedItemData);
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
