import { FormControl, FormGroup } from "@angular/forms";
import { Defaultvaluecontrol } from "../defaultvaluecontrol";

export class WeaponForm extends FormGroup {

    constructor() {
        super({
            disabled: new FormControl({value: false, disabled: true}),
            filters: new FormGroup({
              damage: new FormGroup({
                min: new Defaultvaluecontrol('', ''),
                max: new Defaultvaluecontrol('', '')
              }),
              aps: new FormGroup({
                min: new Defaultvaluecontrol('', ''),
                max: new Defaultvaluecontrol('', '')
              }),
              crit: new FormGroup({
                min: new Defaultvaluecontrol('', ''),
                max: new Defaultvaluecontrol('', '')
              }),
              dps: new FormGroup({
                min: new Defaultvaluecontrol('', ''),
                max: new Defaultvaluecontrol('', '')
              }),
              pdps: new FormGroup({
                min: new Defaultvaluecontrol('', ''),
                max: new Defaultvaluecontrol('', '')
              }),
              edps: new FormGroup({
                min: new Defaultvaluecontrol('', ''),
                max: new Defaultvaluecontrol('', '')
              })
            })
        });
    }
}
