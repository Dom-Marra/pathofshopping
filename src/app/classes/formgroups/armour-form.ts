import { FormControl, FormGroup } from "@angular/forms";
import { Defaultvaluecontrol } from "../defaultvaluecontrol";

export class ArmourForm extends FormGroup {

    constructor() {
        super({
            disabled: new FormControl({value: false, disabled: true}),
            filters: new FormGroup({
            ar: new FormGroup({
                min: new Defaultvaluecontrol('', ''),
                max: new Defaultvaluecontrol('', '')
            }),
            es: new FormGroup({
                min: new Defaultvaluecontrol('', ''),
                max: new Defaultvaluecontrol('', '')
            }),
            ev: new FormGroup({
                min: new Defaultvaluecontrol('', ''),
                max: new Defaultvaluecontrol('', '')
            }),
            block: new FormGroup({
                min: new Defaultvaluecontrol('', ''),
                max: new Defaultvaluecontrol('', '')
            })
            })
        });
    }
}
