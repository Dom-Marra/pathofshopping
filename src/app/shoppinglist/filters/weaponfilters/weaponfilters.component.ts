import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-weaponfilters',
  templateUrl: './weaponfilters.component.html',
  styleUrls: ['./weaponfilters.component.scss']
})
export class WeaponfiltersComponent implements OnInit {

  @Input() itemForm: FormGroup;                                           //Main item form

  public weaponFilters: FormGroup = new FormGroup({
    disabled: new FormControl(false),
    filters: new FormGroup({
      damage: new FormGroup({
        min: new FormControl(null),
        max: new FormControl(null)
      }),
      aps: new FormGroup({
        min: new FormControl(null),
        max: new FormControl(null)
      }),
      crit: new FormGroup({
        min: new FormControl(null),
        max: new FormControl(null)
      }),
      dps: new FormGroup({
        min: new FormControl(null),
        max: new FormControl(null)
      }),
      pdps: new FormGroup({
        min: new FormControl(null),
        max: new FormControl(null)
      }),
      edps: new FormGroup({
        min: new FormControl(null),
        max: new FormControl(null)
      })
    })
  });

  constructor() { 
  }

  ngOnInit(): void {
    if (this.itemForm.controls['weapon_filters']) {
      this.weaponFilters = this.itemForm.controls['weapon_filters'] as FormGroup;   //Retain weapon data on item
    } else {
      this.itemForm.addControl('weapon_filters', this.weaponFilters);               //Add filters to main form
    }
  }

  /**
   * Reset to inputs to default values
   */
  public reset() {
    this.weaponFilters.reset();
  }
}
