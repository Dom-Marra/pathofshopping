import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'itemForm-requirements',
  templateUrl: './requirements.component.html',
  styleUrls: ['./requirements.component.scss']
})
export class RequirementsComponent implements OnInit {

  @Input() requirementsForm: FormGroup;       //Req form

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
}
