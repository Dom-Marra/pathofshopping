import { FormControl, FormGroup } from "@angular/forms";
import { Defaultvaluecontrol } from "../defaultvaluecontrol";

export class TypeForm extends FormGroup {
    constructor() {
        super({
            filters: new FormGroup({
                category: new FormGroup({
                  option: new Defaultvaluecontrol('', '')
                }),
                rarity: new FormGroup({
                  option: new Defaultvaluecontrol('', '')
                }),
            })
        });
    }
}
