import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-armourfilters',
  templateUrl: './armourfilters.component.html',
  styleUrls: ['./armourfilters.component.scss']
})
export class ArmourfiltersComponent implements OnInit {

  @Input() itemForm: FormGroup;                                                   //Item Form

  public armourFilters: FormGroup = new FormGroup({         //Armor Filters
    disabled: new FormControl({value: false, disabled: true}),
    filters: new FormGroup({
      ar: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      es: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      ev: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      block: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      })
    })
  })

  constructor() { 
  }

  ngOnInit(): void {
    if (this.itemForm.controls['armour_filters']) {                      //Check if item has armor data already
      this.armourFilters = this.itemForm.controls['armour_filters'] as FormGroup;
    } else {
      this.itemForm.addControl('armour_filters', this.armourFilters);    //Add Armour filters to main item form
    }

    this.armourFilters.controls.disabled.valueChanges.subscribe(disabled => {     //When disbaled changes to false, and the form is still disabled then enable it
      if (!disabled && this.armourFilters.disabled) this.armourFilters.enable({emitEvent: false});
    });
  }

  ngAfterContentChecked() {   //Disable the form when the disable value is true and the form is enabled
    if (this.armourFilters.controls.disabled.value && this.armourFilters.enabled) {
      this.armourFilters.disable();
    }
  }

  /**
   * Reset to inputs to default values
   */
  public reset() {
    this.armourFilters.reset();
  }
}
