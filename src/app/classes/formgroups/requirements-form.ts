import { FormControl, FormGroup } from "@angular/forms";
import { Defaultvaluecontrol } from "../defaultvaluecontrol";

export class RequirementsForm extends FormGroup {

    constructor() {
        super({
            disabled: new FormControl({value: false, disabled: true}),
            filters: new FormGroup({
              lvl: new FormGroup({
                min: new Defaultvaluecontrol('', ''),
                max: new Defaultvaluecontrol('', ''),
              }),
              str: new FormGroup({
                min: new Defaultvaluecontrol('', ''),
                max: new Defaultvaluecontrol('', '')
              }),
              dex: new FormGroup({
                min: new Defaultvaluecontrol('', ''),
                max: new Defaultvaluecontrol('', '')
              }),
              int: new FormGroup({
                min: new Defaultvaluecontrol('', ''),
                max: new Defaultvaluecontrol('', '')
              })
            }),
        });
    }
}
