import { Component, Input, OnInit } from '@angular/core';
import { RequirementsForm } from 'src/app/classes/formgroups/requirements-form';

@Component({
  selector: 'app-requirements',
  templateUrl: './requirements.component.html',
  styleUrls: ['./requirements.component.scss']
})
export class RequirementsComponent implements OnInit {

  @Input() requirementsForm: RequirementsForm;       //Req form

  constructor() {
  }

  ngOnInit(): void {
    this.requirementsForm.controls.disabled.valueChanges.subscribe(disabled => {      //When disbaled changes to false, and the form is still disabled then enable it
      if (!disabled && this.requirementsForm.disabled) this.requirementsForm.enable({emitEvent: false});
    });
  }

  ngAfterContentChecked() {   //Disable the form when the disable value is true and the form is enabled
    if (this.requirementsForm.controls.disabled.value && this.requirementsForm.enabled) {
      this.requirementsForm.disable();
    }
  }

  /**
   * Reset to inputs to default values
   */
  public reset() {
    this.requirementsForm.reset();
  }
}
