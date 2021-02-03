import { FormControl, FormGroup } from "@angular/forms";
import { Defaultvaluecontrol } from "../defaultvaluecontrol";

export class SocketForm extends FormGroup {

    constructor() {
        super({
            disabled: new FormControl({value: false, disabled: true}),
            filters: new FormGroup({
              sockets: new FormGroup({
                r: new Defaultvaluecontrol('', ''),
                g: new Defaultvaluecontrol('', ''),
                b: new Defaultvaluecontrol('', ''),
                w: new Defaultvaluecontrol('', ''),
                min: new Defaultvaluecontrol('', ''),
                max: new Defaultvaluecontrol('', ''),
              }),
              links: new FormGroup({
                r: new Defaultvaluecontrol('', ''),
                g: new Defaultvaluecontrol('', ''),
                b: new Defaultvaluecontrol('', ''),
                w: new Defaultvaluecontrol('', ''),
                min: new Defaultvaluecontrol('', ''),
                max: new Defaultvaluecontrol('', ''),
              })
            }),
        });
    }
}
