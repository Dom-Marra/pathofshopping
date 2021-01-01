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
    level: new FormGroup({
      min: new FormControl(''),
      max: new FormControl('')
    }),
    strength: new FormGroup({
      min: new FormControl(''),
      max: new FormControl('')
    }),
    dexterity: new FormGroup({
      min: new FormControl(''),
      max: new FormControl('')
    }),
    intelligence: new FormGroup({
      min: new FormControl(''),
      max: new FormControl('')
    })
  })

  constructor() {
   }

  ngOnInit(): void {
    this.itemForm.addControl('requirementFilters', this.requirementFilters);  //Add requirement filters to main form
  }

}
