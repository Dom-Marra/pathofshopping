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
      option: new FormControl('all')
    }),
    identified: new FormGroup({ 
      option: new FormControl('all')
    }),
    corrupted: new FormGroup({ 
      option: new FormControl('all')
    }),
    mirrored: new FormGroup({ 
      option: new FormControl('all')
    }),
    crafted: new FormGroup({ 
      option: new FormControl('all')
    }),
    veiled: new FormGroup({ 
      option: new FormControl('all')
    }),
    enchanted: new FormGroup({ 
      option: new FormControl('all')
    }),
  })

  constructor() { 
  }

  ngOnInit(): void {
    Object.keys(this.otherFilters.controls).forEach(key => {        //add controls to misc filters
      this.itemForm.addControl(key, this.otherFilters.get(key));
    });
  }

}
