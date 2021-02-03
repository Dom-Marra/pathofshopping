import { FormControl, FormGroup } from "@angular/forms";
import { Defaultvaluecontrol } from "../defaultvaluecontrol";

export class TradeForm extends FormGroup {

    constructor() {
        super({
            disabled: new FormControl({value: false, disabled: true}),
            filters: new FormGroup({ 
              price: new FormGroup({
                min: new Defaultvaluecontrol(''),
                max: new Defaultvaluecontrol(''),
                option:new Defaultvaluecontrol('', ''),
              }),
              account: new FormGroup({
                input: new Defaultvaluecontrol('', ''),
              }),
              sale_type: new FormGroup({
                option: new Defaultvaluecontrol('', ''),
              }),
              indexed: new FormGroup({
                option: new Defaultvaluecontrol('', ''),
              })
            }),
        });
    }
}