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
    disabled: new FormControl(false),
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
  }

}
