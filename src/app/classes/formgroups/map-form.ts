import { FormControl, FormGroup } from "@angular/forms";

export class MapForm extends FormGroup {

    constructor() {
        super({
            disabled: new FormControl({value: false, disabled: true}),
            filters: new FormGroup({
              map_region: new FormGroup(
                {option: new FormControl('')}
              ),
              map_series: new FormGroup(
                {option: new FormControl('')}
              ),
              map_shaped: new FormGroup(
                {option: new FormControl('')}
              ),
              map_elder: new FormGroup(
                {option: new FormControl('')}
              ),
              map_blighted: new FormGroup(
                {option: new FormControl('')}
              ),
              map_tier: new FormGroup({
                min: new FormControl(''),
                max: new FormControl('')
              }),
              map_packsize: new FormGroup({
                min: new FormControl(''),
                max: new FormControl('')
              }),
              map_iiq: new FormGroup({
                min: new FormControl(''),
                max: new FormControl('')
              }),
              map_iir: new FormGroup({
                min: new FormControl(''),
                max: new FormControl('')
              })
            })
        });
    }
}
