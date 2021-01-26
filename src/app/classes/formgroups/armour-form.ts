import { FormControl, FormGroup } from "@angular/forms";

export class ArmourForm extends FormGroup {

    constructor() {
        super({
            disabled: new FormControl({value: false, disabled: true}),
            filters: new FormGroup({
            ar: new FormGroup({
                min: new FormControl(''),
                max: new FormControl('')
            }),
            es: new FormGroup({
                min: new FormControl(''),
                max: new FormControl('')
            }),
            ev: new FormGroup({
                min: new FormControl(''),
                max: new FormControl('')
            }),
            block: new FormGroup({
                min: new FormControl(''),
                max: new FormControl('')
            })
            })
        });
    }
}
