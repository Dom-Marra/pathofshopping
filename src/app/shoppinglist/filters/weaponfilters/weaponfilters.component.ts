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
    damage: new FormGroup({
      min: new FormControl(''),
      max: new FormControl('')
    }),
    APS: new FormGroup({
      min: new FormControl(''),
      max: new FormControl('')
    }),
    criticalStrikeChance: new FormGroup({
      min: new FormControl(''),
      max: new FormControl('')
    }),
    totalDPS: new FormGroup({
      min: new FormControl(''),
      max: new FormControl('')
    }),
    pDPS: new FormGroup({
      min: new FormControl(''),
      max: new FormControl('')
    }),
    eDPS: new FormGroup({
      min: new FormControl(''),
      max: new FormControl('')
    }),
  });

  constructor() { 
  }

  ngOnInit(): void {
    this.itemForm.addControl('weaponFilters', this.weaponFilters);    //Add filters to main form
  }

}
