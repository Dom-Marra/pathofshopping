import { FormControl, FormGroup } from "@angular/forms";

export class TypeForm extends FormGroup {
    constructor() {
        super({
            filters: new FormGroup({
                category: new FormGroup({
                  option: new FormControl('')
                }),
                rarity: new FormGroup({
                  option: new FormControl('')
                }),
            })
        });
    }
}
