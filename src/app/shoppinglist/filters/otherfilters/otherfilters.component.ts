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
    otherFilters_disabled: new FormControl({value: false, disabled: true}),
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

  constructor(private cd: ChangeDetectorRef) { 
  }

  ngOnInit(): void {
    Object.keys(this.otherFilters.controls).forEach(key => {        //add controls to misc filters
      if (this.itemForm.controls[key]) {
        this.otherFilters.controls[key] = this.itemForm.controls[key];      //retain old item data
      } else {
        this.itemForm.addControl(key, this.otherFilters.get(key));          //Add field for data
      }

      if (this.otherFilters.controls[key].dirty) this.otherFilters.markAsDirty();   //Init dirty check

      this.otherFilters.controls[key].valueChanges.subscribe(() => {                //Mark dirty when the controls are dirty
        if (this.otherFilters.controls[key].dirty) this.otherFilters.markAsDirty();
      });
    });

    this.otherFilters.controls.otherFilters_disabled.valueChanges.subscribe(disabled => {    //When disbaled changes to false, and the form is still disabled then enable it
      if (!disabled && this.otherFilters.disabled) this.otherFilters.enable({emitEvent: false});
    });
  }

  ngAfterContentChecked() {   //Disable the form when the disable value is true and the form is enabled
    if (this.otherFilters.controls.otherFilters_disabled.value && this.otherFilters.enabled) {
      this.otherFilters.disable({emitEvent: false, onlySelf: true});
    }
  }

  /**
   * Resets to default values for inputs
   */
  public reset() {
    this.otherFilters.reset();
  }
}
