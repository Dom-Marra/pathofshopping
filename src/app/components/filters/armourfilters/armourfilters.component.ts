import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-armourfilters',
  templateUrl: './armourfilters.component.html',
  styleUrls: ['./armourfilters.component.scss']
})
export class ArmourfiltersComponent implements OnInit {

  @Input() armourForm: FormGroup;    //Amour Form

  constructor() { 
  }

  ngOnInit(): void {
    this.armourForm.controls.disabled.valueChanges.subscribe(disabled => {     //When disbaled changes to false, and the form is still disabled then enable it
      if (!disabled && this.armourForm.disabled) this.armourForm.enable({emitEvent: false});
    });
  }

  ngAfterContentChecked() {   //Disable the form when the disable value is true and the form is enabled
    if (this.armourForm.controls.disabled.value && this.armourForm.enabled) {
      this.armourForm.disable();
    }
  }

  /**
   * Reset to inputs to default values
   */
  public reset() {
    this.armourForm.reset();
  }
}
