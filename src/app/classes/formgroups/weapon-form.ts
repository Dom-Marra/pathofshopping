import { FormControl, FormGroup } from "@angular/forms";

export class WeaponForm extends FormGroup {

    constructor() {
        super({
            disabled: new FormControl({value: false, disabled: true}),
            filters: new FormGroup({
              damage: new FormGroup({
                min: new FormControl(''),
                max: new FormControl('')
              }),
              aps: new FormGroup({
                min: new FormControl(''),
                max: new FormControl('')
              }),
              crit: new FormGroup({
                min: new FormControl(''),
                max: new FormControl('')
              }),
              dps: new FormGroup({
                min: new FormControl(''),
                max: new FormControl('')
              }),
              pdps: new FormGroup({
                min: new FormControl(''),
                max: new FormControl('')
              }),
              edps: new FormGroup({
                min: new FormControl(''),
                max: new FormControl('')
              })
            })
        });
    }
}
