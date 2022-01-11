import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { SortProperties } from "src/app/core/models/sort-properties";
import { ItemSaveData } from "src/app/core/models/item-save-data.model";
import { PoeAPISearchProperties } from "src/app/core/models/poe-api-search-properties.model";
import { FilterGroup } from "src/app/item-form/classes/filter-group";
import { DefaultValueControl } from "./default-value-control";
import { StatFilterForm } from "./stat-filter-form";
import { StatForm } from "./stat-form";

export class ItemForm {

    // public results: Results;                           //Data pertaining to the results

    /** Item Form */
    public itemForm = new FormGroup({
        itemName: new FormControl('New Item'),
        query: new FormGroup({
            name: new FormControl(''),
            term: new FormControl(''),
            type: new FormControl(''),
            stats: new FormArray([]),
            status: new FormGroup({
                option: new DefaultValueControl('online', 'online'),
            })
        })
    });

    /** Sort configuration */
    private sort: SortProperties = {sortKey: null, sortValue: null};

    /** Item Filter Groups */
    public filterGroups: Array<{filterGroup: FilterGroup, formGroup: FormGroup}>;

    constructor(
        filterGroups: Array<{filterGroup: FilterGroup, formGroup: FormGroup}>,
        savedItemData?: ItemSaveData
    ) {
        this.filterGroups = filterGroups;

        if (savedItemData) this.load(savedItemData);
    }

    /**
     * Loads the saved item data
     */
    private load(savedItemData: ItemSaveData ) {

        if (!savedItemData) return;      //Return if no save data

        this.filterGroups.forEach(group => {
            group.formGroup.patchValue(savedItemData.filterGroups[group.filterGroup.name].values);
            if (savedItemData.filterGroups[group.filterGroup.name].disabled) group.formGroup.disable();
        });

        //Have to add a new stat filter for each one saved
        savedItemData.itemForm.query.stats?.forEach(statGroup => {
            let newStatGroup = new StatFilterForm();
            (this.itemForm.get('query.stats') as FormArray).push(newStatGroup);

            //Have to add a stat for each on saved
            statGroup.filters?.forEach(filter => {
                (newStatGroup.controls.filters as FormArray).push(new StatForm());
            });
        });

        //Patch the saved values
        this.itemForm.patchValue(savedItemData.itemForm);
    }

    /**
     * Exports the item as savable data
     * 
     * @returns 
     *          ItemSaveData
     */
    public exportSaveData(): ItemSaveData {

        const saveData = {
            itemForm: {},
            filterGroups: {}
        };

        this.filterGroups.forEach(group => {
            const exportGroup = {
                values: this.removeEmptyFields(group.formGroup.getRawValue()),
                disabled: group.formGroup.disabled
            }

            saveData.filterGroups[group.filterGroup.name] = exportGroup;
        });

        const itemForm = this.itemForm.getRawValue();
        itemForm.query.filters = null;
        saveData.itemForm = this.removeEmptyFields(itemForm);

        return saveData;
    }

    /**
     * Appends a new StatFilterForm to the stats FormArray
     */
    public addStatFilterForm() {
        let newStatFilterForm = new StatFilterForm();
        (this.itemForm.get('query.stats') as FormArray).push(newStatFilterForm);
    }

    /**
     * Removes the specified StatFilterForm from the stats FormArray
     * @param form 
     */
    public removeStatFilterForm(form: StatFilterForm) {
        let statsArryayIndex = (this.itemForm.get('query.stats') as FormArray).controls.indexOf(form);
        (this.itemForm.get('query.stats') as FormArray).removeAt(statsArryayIndex);
    }

    /**
     * Returns clean data for queries to the Poe API search function
     * 
     * @returns 
     *          PoeAPISearchProperties
     */
    public exportForQuery(): PoeAPISearchProperties {
        let filters = {};

        this.filterGroups.forEach(group => {
            if (group.formGroup.disabled) return;

            if (group.filterGroup.parent) {
                let parentValues = filters[group.filterGroup.parent]?.filters;

                if (parentValues) parentValues = {...parentValues, ...group.formGroup.value}
                else filters[group.filterGroup.parent] = { filters: group.formGroup.value }
        
            } else filters[group.filterGroup.name] = { filters: group.formGroup.value }
        });

        return this.removeEmptyFields({           
            query: { 
                ...(this.itemForm.get('query') as FormGroup).value,
                filters: filters
            },
            sort: {
                [this.sort.sortKey]: this.sort.sortValue
            }
        }); 
    }

    /**
     * Removes empty objects and empty object fields
     * 
     * @param obj 
     *        Object: object to remove empty fields from
     */
    private removeEmptyFields(obj: any): any {

        Object.keys(obj).forEach(key => {                                                           //cycle through fields
            if (obj[key] && typeof obj[key] === 'object') this.removeEmptyFields(obj[key]);     //If it has nested objects cycle through
            else if (obj[key] == null || obj[key] == "all" || obj[key] == "")  {                //delete field if empty, or has a value of all
                if (Array.isArray(obj)) obj.splice(parseInt(key), 1);
                else delete obj[key];
            }

            if (!obj[key] || typeof obj[key] !== "object") return;        //return if the current value is not a object
        
            if (Object.keys(obj[key]).length === 0) delete obj[key];      //delete empty objects
        });

        return obj;
    }

   /**
     * Sets the sort properties for the form
     * 
     * @param sort
     *        SortProperties
     */
    public setSortBy(sort: SortProperties): void {
        this.sort = sort;
    }

    /**
     * Resets the data for this item
     */
    public clear() {
        this.itemForm.reset('');
        this.itemForm.enable();
        this.filterGroups.forEach(group => group.formGroup.enable());
        this.itemForm.controls.itemName.patchValue('New Item');
        (this.itemForm.get('query.stats') as FormArray).clear();
    }
}
