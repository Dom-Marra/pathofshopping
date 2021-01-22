import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { statCategory } from "src/app/shoppinglist/filters/statfilters/services/statsearch.service";

export class Stat {

    public statGroup: FormGroup = new FormGroup({    //holds stat data
        id: new FormControl(),
        value: new FormGroup({
          min: new FormControl(),
          max: new FormControl(),
          option: new FormControl()
        })
    });

    public selectedStat: statCategory['stats'][0] = null;                 //the selected stat
    public selectedStatOption: statCategory['stats'][0]['option'][0];     //the selected option

    constructor(public parentArray: FormArray) { 
        this.parentArray.push(this.statGroup);           //Push the new stat to the parent form array
    }

    /**
     * Clears this stats data
     */
    public clearStat() {
      this.statGroup.reset();
      this.selectedStat = null;
      this.selectedStatOption = null;
    }

    /**
     * Will add a weight form control if the isWeighted value is true,
     * or remove it if false.
     * 
     * @param isWeighted 
     */
    public makeWeighted(isWeighted: boolean) {
        if (isWeighted) {
            (this.statGroup.get('value') as FormGroup).addControl('weight', new FormControl());
        } else if (!isWeighted && this.statGroup.get('value.weight')) {
            (this.statGroup.get('value') as FormGroup).removeControl('weight');
        }
    }

    /**
     * Patches the stats id, and sets the selected stat.
     * 
     * Will reset option control in value form group if the stat is min max based,
     * or reset the min max controls in said form group if said stat is option based
     */
    public setStat(stat: statCategory['stats'][0]) {
        this.statGroup.controls.id.patchValue(stat.id);
        this.selectedStat = stat;

        if (this.selectedStat.option == null) {
            this.statGroup.get('value.option').patchValue('');     //Reset value option field and selected stat option when a minmax option is selected
            this.selectedStatOption = null;
        } else {                                                   //reset all value fields when a stat is selected that has options
            this.statGroup.get('value.option').patchValue('');
            this.statGroup.get('value.min').patchValue('');
            this.statGroup.get('value.max').patchValue('');
        }
    }

    /**
     * Sets the option for the selected stat
     * 
     * @param option 
     *          option to set
     */
    public setStatOption(option: statCategory['stats'][0]['option'][0]) {
        this.selectedStatOption = option;
        this.statGroup['controls'].value['controls'].option.patchValue(option.id);
      }
}
