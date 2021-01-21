import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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
      min: new FormControl(null),
      max: new FormControl(null)
    }),
    ilvl: new FormGroup({
      min: new FormControl(null),
      max: new FormControl(null)
    }),
    talisman_tier: new FormGroup({
      min: new FormControl(null),
      max: new FormControl(null)
    }),
    stored_experience: new FormGroup({
      min: new FormControl(null),
      max: new FormControl(null)
    }),
    stack_size: new FormGroup({
      min: new FormControl(null),
      max: new FormControl(null)
    }),
    alternate_art: new FormGroup({ 
      option: new FormControl(null)
    }),
    identified: new FormGroup({ 
      option: new FormControl(null)
    }),
    corrupted: new FormGroup({ 
      option: new FormControl(null)
    }),
    mirrored: new FormGroup({ 
      option: new FormControl(null)
    }),
    crafted: new FormGroup({ 
      option: new FormControl(null)
    }),
    veiled: new FormGroup({ 
      option: new FormControl(null)
    }),
    enchanted: new FormGroup({ 
      option: new FormControl(null)
    }),
  })

  constructor(private cd: ChangeDetectorRef) { 
  }

  ngOnInit(): void {
    Object.keys(this.otherFilters.controls).forEach(key => {        //add controls to misc filters
      if (this.itemForm.controls[key]) {
        this.otherFilters.controls[key] = this.itemForm.controls[key];      //retain old item data
      } else {
        this.itemForm.addControl(key, this.otherFilters.get(key));          //Add field for data
      }

      this.otherFilters.controls[key].setParent(this.otherFilters);
      this.cd.detectChanges();
    });
  }

  /**
   * Resets to default values for inputs
   */
  public reset() {
    this.otherFilters.reset();
  }
}
