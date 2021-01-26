import { FormControl, FormGroup } from "@angular/forms";

export class TradeForm extends FormGroup {

    constructor() {
        super({
            disabled: new FormControl({value: false, disabled: true}),
            filters: new FormGroup({ 
              price: new FormGroup({
                min: new FormControl(),
                max: new FormControl(),
                option: new FormControl('')
              }),
              account: new FormGroup({
                input: new FormControl()
              }),
              sale_type: new FormGroup({
                option: new FormControl('')
              }),
              indexed: new FormGroup({
                option: new FormControl('')
              })
            }),
        });
    }
}