import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { trueFlase } from '../trueFalseEnum';

@Component({
  selector: 'app-specialbases',
  templateUrl: './specialbases.component.html',
  styleUrls: ['./specialbases.component.scss']
})
export class SpecialbasesComponent implements OnInit {

  public readonly TRUE_FALSE: typeof trueFlase = trueFlase;               //used for true false selection
  
  @Input() itemForm: FormGroup;                                           //Main item form
  
  public influenceFilters: FormGroup = new FormGroup({                    //influence filters             
    shaper: new FormControl(this.TRUE_FALSE.all),
    elder: new FormControl(this.TRUE_FALSE.all),
    crusader: new FormControl(this.TRUE_FALSE.all),
    redeemer: new FormControl(this.TRUE_FALSE.all),
    hunter: new FormControl(this.TRUE_FALSE.all),
    warlord: new FormControl(this.TRUE_FALSE.all),
    fractured: new FormControl(this.TRUE_FALSE.all),
    synthesised: new FormControl(this.TRUE_FALSE.all)
  })

  constructor() {
  }  

  ngOnInit(): void {
    this.itemForm.addControl('influenceFilters', this.influenceFilters);    //Add filters to main form
  }

}
