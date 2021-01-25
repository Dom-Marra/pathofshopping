import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

enum gemQualityTypes {
  '' = 'All',
  '"0"' = 'Default',
  'alternate' = 'Only Alternatives',
  '"1"' = 'Anomalous',
  '"2"' = 'Divergent',
  '"3"' = 'Phantasmal',
}

@Component({
  selector: 'app-gemfilters',
  templateUrl: './gemfilters.component.html',
  styleUrls: ['./gemfilters.component.scss']
})
export class GemfiltersComponent implements OnInit {

  public readonly GEM_QUALITY_TYPES: typeof gemQualityTypes = gemQualityTypes;  //Used for gem quality type selection

  @Input() itemForm: FormGroup;                                                 //Main item form

  public gemFilters: FormGroup = new FormGroup({
    gemFilters_disabled: new FormControl({value: false, disabled: true}),
    gem_alternate_quality: new FormGroup({
      option: new FormControl('')
    }),
    gem_level: new FormGroup({
      min: new FormControl(''),
      max: new FormControl('')
    }),
    gem_level_progress: new FormGroup({
      min: new FormControl(''),
      max: new FormControl('')
    })
  })

  constructor() { }

  ngOnInit(): void {
    Object.keys(this.gemFilters.controls).forEach(key => {        //add controls to misc filters
      if (this.itemForm.controls[key]) {
        this.gemFilters.controls[key] = this.itemForm.controls[key];         //Retain data from item if it exists
      } else {
        this.itemForm.addControl(key, this.gemFilters.get(key));             //Add new field if not
      }
      if (this.gemFilters.controls[key].dirty) this.gemFilters.markAsDirty();       //Init dirty check

      this.gemFilters.controls[key].valueChanges.subscribe(() => {                  //Mark dirty when the controls are dirty
        if (this.gemFilters.controls[key].dirty) this.gemFilters.markAsDirty();
      })
    });

    this.gemFilters.controls.gemFilters_disabled.valueChanges.subscribe(disabled => {   //When disbaled changes to false, and the form is still disabled then enable it
      if (!disabled && this.gemFilters.disabled) this.gemFilters.enable({emitEvent: false});
    });
  }

  ngAfterContentChecked() {   //Disable the form when the disable value is true and the form is enabled
    if (this.gemFilters.controls.gemFilters_disabled.value && this.gemFilters.enabled) {
      this.gemFilters.disable({emitEvent: false, onlySelf: true});
    }
  }

  /**
   * Resets to default values for inputs
   */
  public reset() {
    this.gemFilters.reset();
  }
}
