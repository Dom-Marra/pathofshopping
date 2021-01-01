import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-armourfilters',
  templateUrl: './armourfilters.component.html',
  styleUrls: ['./armourfilters.component.scss']
})
export class ArmourfiltersComponent implements OnInit {

  @Input() itemForm: FormGroup;                             //Item Form

  public armourFilters: FormGroup = new FormGroup({         //Armor Filters
    armour: new FormGroup({
      min: new FormControl(''),
      max: new FormControl('')
    }),
    energyShield: new FormGroup({
      min: new FormControl(''),
      max: new FormControl('')
    }),
    evasion: new FormGroup({
      min: new FormControl(''),
      max: new FormControl('')
    }),
    blockChance: new FormGroup({
      min: new FormControl(''),
      max: new FormControl('')
    })
  })

  constructor() { 
  }

  ngOnInit(): void {
    this.itemForm.addControl('armourFilters', this.armourFilters);    //Add Armour filters to main item form
  }

}
