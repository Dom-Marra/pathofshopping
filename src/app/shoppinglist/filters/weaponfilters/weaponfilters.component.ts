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
    disabled: new FormControl(true),
    filters: new FormGroup({
      damage: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      aps: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      crit: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      dps: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      pdps: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      edps: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      })
    })
  });

  constructor() { 
  }

  ngOnInit(): void {
    this.itemForm.addControl('weapon_filters', this.weaponFilters);    //Add filters to main form
  }

}
