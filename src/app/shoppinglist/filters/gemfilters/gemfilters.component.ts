import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    Object.keys(this.gemFilters.controls).forEach(key => {        //add controls to misc filters
      if (this.itemForm.controls[key]) {
        this.gemFilters.controls[key] = this.itemForm.controls[key];         //Retain data from item if it exists
      } else {
        this.itemForm.addControl(key, this.gemFilters.get(key));    //Add new field if not
      }

      this.gemFilters.controls[key].setParent(this.gemFilters);
    });
    
    this.cd.detectChanges();
  }

  /**
   * Resets to default values for inputs
   */
  public reset() {
    this.gemFilters.reset();
  }
}
