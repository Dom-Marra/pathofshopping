import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-requirements',
  templateUrl: './requirements.component.html',
  styleUrls: ['./requirements.component.scss']
})
export class RequirementsComponent implements OnInit {

  @Input() itemForm: FormGroup;                                           //Main item form

  public requirementFilters: FormGroup = new FormGroup({                  //Requirement filters
    disabled: new FormControl({value: false, disabled: true}),
    filters: new FormGroup({
      lvl: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      str: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      dex: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      int: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      })
    }),
  })

  constructor() {
  }

  ngOnInit(): void {
    if (this.itemForm.controls['req_filters']) {                        //Retain item req data
      this.requirementFilters = this.itemForm.controls['req_filters'] as FormGroup;
    } else {
      this.itemForm.addControl('req_filters', this.requirementFilters);  //Add requirement filters to main form
    }

    this.requirementFilters.controls.disabled.valueChanges.subscribe(disabled => {      //When disbaled changes to false, and the form is still disabled then enable it
      if (!disabled && this.requirementFilters.disabled) this.requirementFilters.enable({emitEvent: false});
    });
  }

  ngAfterContentChecked() {   //Disable the form when the disable value is true and the form is enabled
    if (this.requirementFilters.controls.disabled.value && this.requirementFilters.enabled) {
      this.requirementFilters.disable();
    }
  }

  /**
   * Reset to inputs to default values
   */
  public reset() {
    this.requirementFilters.reset();
  }
}
