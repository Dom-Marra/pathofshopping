import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Stat } from "../statselect/stat/stat";

export class Statfilter {

    public stats: Array<Stat> = [];

    public statFilters = new FormGroup({
        type: new FormControl('and'),
        filters: new FormArray([]),
        value: new FormGroup({
          min: new FormControl(),
          max: new FormControl()
        })
      })

    constructor(public statsFormArray: FormArray) {
        this.statsFormArray.push(this.statFilters);
    }
}
