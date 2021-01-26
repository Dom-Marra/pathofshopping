import { FormControl, FormGroup } from "@angular/forms";

export class RequirementsForm extends FormGroup {

    constructor() {
        super({
            disabled: new FormControl({value: false, disabled: true}),
            filters: new FormGroup({
              lvl: new FormGroup({
                min: new FormControl(''),
                max: new FormControl('')
              }),
              str: new FormGroup({
                min: new FormControl(''),
                max: new FormControl('')
              }),
              dex: new FormGroup({
                min: new FormControl(''),
                max: new FormControl('')
              }),
              int: new FormGroup({
                min: new FormControl(''),
                max: new FormControl('')
              })
            }),
        });
    }
}
