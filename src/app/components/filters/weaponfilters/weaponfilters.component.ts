import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-weaponfilters',
  templateUrl: './weaponfilters.component.html',
  styleUrls: ['./weaponfilters.component.scss']
})
export class WeaponfiltersComponent implements OnInit {

  @Input() weaponForm: FormGroup;          //Weapon form

  constructor() { 
  }

  ngOnInit(): void {
    this.weaponForm.controls.disabled.valueChanges.subscribe(disabled => {       //When disbaled changes to false, and the form is still disabled then enable it
      if (!disabled && this.weaponForm.disabled) this.weaponForm.enable({emitEvent: false});
    });
  }

  ngAfterContentChecked() {   //Disable the form when the disable value is true and the form is enabled
    if (this.weaponForm.controls.disabled.value && this.weaponForm.enabled) {
      this.weaponForm.disable();
    }
  }

  /**
   * Reset to inputs to default values
   */
  public reset() {
    this.weaponForm.reset();
  }
}
