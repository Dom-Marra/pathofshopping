import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { trueFlase } from '../../../enums/TrueFalseEnum';

@Component({
  selector: 'app-specialbases',
  templateUrl: './specialbases.component.html',
  styleUrls: ['./specialbases.component.scss']
})
export class SpecialbasesComponent implements OnInit {

  public readonly TRUE_FALSE: typeof trueFlase = trueFlase;               //used for true false selection
  
  @Input() itemForm: FormGroup;                                           //Main item form
  
  public influenceFilters: FormGroup = new FormGroup({                    //influence filters   
    influenceFilters_disabled: new FormControl({value: false, disabled: true}),          
    shaper_item: new FormGroup({
      option: new FormControl('')
    }),
    elder_item: new FormGroup({
      option: new FormControl('')
    }),
    crusader_item: new FormGroup({
      option: new FormControl('')
    }),
    redeemer_item: new FormGroup({
      option: new FormControl('')
    }),
    hunter_item: new FormGroup({
      option: new FormControl('')
    }),
    warlord_item: new FormGroup({
      option: new FormControl('')
    }),
    fractured_item: new FormGroup({
      option: new FormControl('')
    }),
    synthesised_item: new FormGroup({
      option: new FormControl('')
    })
  })

  constructor() {
  }  

  ngOnInit(): void {
    Object.keys(this.influenceFilters.controls).forEach(key => {      //add controls to misc filters
      if (this.itemForm.controls[key]) {
        this.influenceFilters.controls[key] = this.itemForm.controls[key];      //retain item data
      } else {
        this.itemForm.addControl(key, this.influenceFilters.get(key));          //add field for item data
      }

      if (this.influenceFilters.controls[key].dirty) this.influenceFilters.markAsDirty();   //Init dirty check

      this.influenceFilters.controls[key].valueChanges.subscribe(() => {                    //Mark dirty when child is dirty
        if (this.influenceFilters.controls[key].dirty) this.influenceFilters.markAsDirty();
      })
    });

    this.influenceFilters.controls.influenceFilters_disabled.valueChanges.subscribe(disabled => {       //When disbaled changes to false, and the form is still disabled then enable it
      if (!disabled && this.influenceFilters.disabled) this.influenceFilters.enable({emitEvent: false});
    });
  }

  ngAfterContentChecked() {    //Disable the form when the disable value is true and the form is enabled
    if (this.influenceFilters.controls.influenceFilters_disabled.value && this.influenceFilters.enabled) {
      this.influenceFilters.disable({emitEvent: false, onlySelf: true});
    }
  }

  /**
   * Resets to default values for inputs
   */
  public reset() {
    this.influenceFilters.reset();
  }
}
