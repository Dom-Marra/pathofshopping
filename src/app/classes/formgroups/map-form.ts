import { FormControl, FormGroup } from "@angular/forms";
import { Defaultvaluecontrol } from "../defaultvaluecontrol";

export class MapForm extends FormGroup {

    constructor() {
        super({
            disabled: new FormControl({value: false, disabled: true}),
            filters: new FormGroup({
              map_region: new FormGroup(
                {option: new Defaultvaluecontrol('', '')}
              ),
              map_series: new FormGroup(
                {option: new Defaultvaluecontrol('', '')}
              ),
              map_shaped: new FormGroup(
                {option: new Defaultvaluecontrol('', '')}
              ),
              map_elder: new FormGroup(
                {option: new Defaultvaluecontrol('', '')}
              ),
              map_blighted: new FormGroup(
                {option: new Defaultvaluecontrol('', '')}
              ),
              map_tier: new FormGroup({
                min: new Defaultvaluecontrol('', ''),
                max: new Defaultvaluecontrol('', '')
              }),
              map_packsize: new FormGroup({
                min: new Defaultvaluecontrol('', ''),
                max: new Defaultvaluecontrol('', '')
              }),
              map_iiq: new FormGroup({
                min: new Defaultvaluecontrol('', ''),
                max: new Defaultvaluecontrol('', '')
              }),
              map_iir: new FormGroup({
                min: new Defaultvaluecontrol('', ''),
                max: new Defaultvaluecontrol('', '')
              })
            })
        });
    }
}
