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
    disabled: new FormControl(true),
    filters: new FormGroup({
      lvl: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      str: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      dex: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      }),
      int: new FormGroup({
        min: new FormControl(''),
        max: new FormControl('')
      })
    }),
  })

  constructor() {
   }

  ngOnInit(): void {
    this.itemForm.addControl('req_filters', this.requirementFilters);  //Add requirement filters to main form
  }

}
