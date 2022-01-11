import { AbstractControlOptions, AsyncValidatorFn, FormControl, ValidatorFn } from "@angular/forms";

export class DefaultValueControl extends FormControl {
    
  constructor(private defaultValue: any, formState?: any, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[]) {
    super(formState, validatorOrOpts, asyncValidator);

    this.valueChanges.subscribe(() => {
      this.checkIfDefault();
    })
  }

  /**
   * Marks the control dirty or pristine based on if the inputs value
   * is equal to the default value
   */
  private checkIfDefault() {
    if (this.value == null || this.value.length < 1) this.patchValue(this.defaultValue, {emitEvent: false, onlySelf: true});

    if (this.value === this.defaultValue) {
      this.markAsPristine();
    } else {
      this.markAsDirty();
    }
  }
}
