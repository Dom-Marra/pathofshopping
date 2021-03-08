import { FormArray, FormControl, FormGroup } from "@angular/forms";

export class StatFilterForm extends FormGroup{
    constructor() {
      super({
        type: new FormControl('and'),
        disabled: new FormControl({value: false, disabled: true}),
        filters: new FormArray([]),
        value: new FormGroup({
          min: new FormControl(),
          max: new FormControl()
        })
      });
    }
  }
  
