import { FormControl, FormGroup } from "@angular/forms";

export class StatForm extends FormGroup {
    constructor() {
        super({
            id: new FormControl(),
            disabled: new FormControl({value: false, disabled: true}),
            selectedStatOption: new FormControl({value: '', disabled: true}),
            selectedStat: new FormControl({value: '', disabled: true}),
            value: new FormGroup({
            min: new FormControl(),
            max: new FormControl(),
            option: new FormControl()
            })
        });
    }
}
