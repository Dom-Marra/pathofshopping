import { Directive, Input, Optional, Self } from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';

@Directive({
  selector: '[appControldefaults]'
})
export class ControldefaultsDirective {

  @Input() default: any = '';               //Default value of the control
  @Input() control: AbstractControl;        //The control

  constructor(@Self() @Optional() private _control: NgControl) { }

  ngOnInit() {
    if (!this.control) this.control = this._control.control;  //If no control from input is provided then get the injected one
    if (!this.default) this.default = '';

    this.checkIfDefault();                                    //Check if default
    
    this.control.valueChanges.subscribe(() => {               //Check if default on value change
      this.checkIfDefault();
    })
  }

  /**
   * Marks the control dirty or pristine based on if the inputs value
   * is equal to the default value
   */
  private checkIfDefault() {
    if (!this.control.value) this.control.patchValue(this.default, {emitEvent: false, onlySelf: true});

    if (this.control.value == this.default) {
      this.control.markAsPristine();
    } else {
      this.control.markAsDirty();
    }
  }
}
