import { FormControl, FormGroup } from "@angular/forms";

export class SocketForm extends FormGroup {

    constructor() {
        super({
            disabled: new FormControl({value: false, disabled: true}),
            filters: new FormGroup({
              sockets: new FormGroup({
                r: new FormControl(''),
                g: new FormControl(''),
                b: new FormControl(''),
                w: new FormControl(''),
                min: new FormControl(''),
                max: new FormControl('')
              }),
              links: new FormGroup({
                r: new FormControl(''),
                g: new FormControl(''),
                b: new FormControl(''),
                w: new FormControl(''),
                min: new FormControl(''),
                max: new FormControl('')
              })
            }),
        });
    }
}
