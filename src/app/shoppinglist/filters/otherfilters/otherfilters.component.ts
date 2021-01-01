import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { trueFlase } from './../trueFalseEnum';

@Component({
  selector: 'app-otherfilters',
  templateUrl: './otherfilters.component.html',
  styleUrls: ['./otherfilters.component.scss']
})
export class OtherfiltersComponent implements OnInit {

  public readonly TRUE_FALSE: typeof trueFlase = trueFlase;               //used for true false selection

  @Input() itemForm: FormGroup;                                           //Main item form
  
  public otherFilters: FormGroup = new FormGroup({                        //Other filters group
    quality: new FormGroup({
      min: new FormControl(''),
      max: new FormControl('')
    }),
    itemLevel: new FormGroup({
      min: new FormControl(''),
      max: new FormControl('')
    }),
    talismanTier: new FormGroup({
      min: new FormControl(''),
      max: new FormControl('')
    }),
    storedExperience: new FormGroup({
      min: new FormControl(''),
      max: new FormControl('')
    }),
    stackSize: new FormGroup({
      min: new FormControl(''),
      max: new FormControl('')
    }),
    alternateArt: new FormControl(this.TRUE_FALSE.all),
    identified: new FormControl(this.TRUE_FALSE.all),
    corrupted: new FormControl(this.TRUE_FALSE.all),
    mirrored: new FormControl(this.TRUE_FALSE.all),
    crafted: new FormControl(this.TRUE_FALSE.all),
    veiled: new FormControl(this.TRUE_FALSE.all),
    enchanted: new FormControl(this.TRUE_FALSE.all),
  })

  constructor() { 
  }

  ngOnInit(): void {
    this.itemForm.addControl('otherFilters', this.otherFilters);
  }

}
