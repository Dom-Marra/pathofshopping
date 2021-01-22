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
    ilvl: new FormGroup({
      min: new FormControl(''),
      max: new FormControl('')
    }),
    talisman_tier: new FormGroup({
      min: new FormControl(''),
      max: new FormControl('')
    }),
    stored_experience: new FormGroup({
      min: new FormControl(''),
      max: new FormControl('')
    }),
    stack_size: new FormGroup({
      min: new FormControl(''),
      max: new FormControl('')
    }),
    alternate_art: new FormGroup({ 
      option: new FormControl('')
    }),
    identified: new FormGroup({ 
      option: new FormControl('')
    }),
    corrupted: new FormGroup({ 
      option: new FormControl('')
    }),
    mirrored: new FormGroup({ 
      option: new FormControl('')
    }),
    crafted: new FormGroup({ 
      option: new FormControl('')
    }),
    veiled: new FormGroup({ 
      option: new FormControl('')
    }),
    enchanted: new FormGroup({ 
      option: new FormControl('')
    }),
  })

  constructor() { 
  }

  ngOnInit(): void {
    Object.keys(this.otherFilters.controls).forEach(key => {        //add controls to misc filters
      if (this.itemForm.controls[key]) {
        this.otherFilters.controls[key] = this.itemForm.controls[key];      //retain old item data
      } else {
        this.itemForm.addControl(key, this.otherFilters.get(key));          //Add field for data
      }

      this.otherFilters.controls[key].valueChanges.subscribe(() => {        //Mark dirty when the controls are dirty
        if (this.otherFilters.controls[key].dirty) this.otherFilters.markAsDirty();
      })
    });
  }

  /**
   * Resets to default values for inputs
   */
  public reset() {
    this.otherFilters.reset();
  }
}
