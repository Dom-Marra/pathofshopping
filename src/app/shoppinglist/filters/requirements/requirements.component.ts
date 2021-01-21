import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-requirements',
  templateUrl: './requirements.component.html',
  styleUrls: ['./requirements.component.scss']
})
export class RequirementsComponent implements OnInit {

  @Input() itemForm: FormGroup;                                           //Main item form

  public requirementFilters: FormGroup = new FormGroup({                  //Requirement filters
    filters: new FormGroup({
      lvl: new FormGroup({
        min: new FormControl(null),
        max: new FormControl(null)
      }),
      str: new FormGroup({
        min: new FormControl(null),
        max: new FormControl(null)
      }),
      dex: new FormGroup({
        min: new FormControl(null),
        max: new FormControl(null)
      }),
      int: new FormGroup({
        min: new FormControl(null),
        max: new FormControl(null)
      })
    }),
  })

  constructor() {
  }

  ngOnInit(): void {
    if (this.itemForm.controls['req_filters']) {                        //Retain item req data
      this.requirementFilters = this.itemForm.controls['req_filters'] as FormGroup;
    } else {
      this.itemForm.addControl('req_filters', this.requirementFilters);  //Add requirement filters to main form
    }
  }

  /**
   * Reset to inputs to default values
   */
  public reset() {
    this.requirementFilters.reset();
  }
}
