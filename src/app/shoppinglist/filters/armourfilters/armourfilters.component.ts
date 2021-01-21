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
    filters: new FormGroup({
      ar: new FormGroup({
        min: new FormControl(null),
        max: new FormControl(null)
      }),
      es: new FormGroup({
        min: new FormControl(null),
        max: new FormControl(null)
      }),
      ev: new FormGroup({
        min: new FormControl(null),
        max: new FormControl(null)
      }),
      block: new FormGroup({
        min: new FormControl(null),
        max: new FormControl(null)
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
  }

  /**
   * Reset to inputs to default values
   */
  public reset() {
    this.armourFilters.reset();
  }
}
