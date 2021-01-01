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
    shaper_item: new FormGroup({
      option: new FormControl(this.TRUE_FALSE.all)
    }),
    elder_item: new FormGroup({
      option: new FormControl(this.TRUE_FALSE.all)
    }),
    crusader_item: new FormGroup({
      option: new FormControl(this.TRUE_FALSE.all)
    }),
    redeemer_item: new FormGroup({
      option: new FormControl(this.TRUE_FALSE.all)
    }),
    hunter_item: new FormGroup({
      option: new FormControl(this.TRUE_FALSE.all)
    }),
    warlord_item: new FormGroup({
      option: new FormControl(this.TRUE_FALSE.all)
    }),
    fractured_item: new FormGroup({
      option: new FormControl(this.TRUE_FALSE.all)
    }),
    synthesised_item: new FormGroup({
      option: new FormControl(this.TRUE_FALSE.all)
    })
  })

  constructor() {
  }  

  ngOnInit(): void {
    Object.keys(this.influenceFilters.controls).forEach(key => {      //add controls to misc filters
      this.itemForm.addControl(key, this.influenceFilters.get(key));
    });
  }

}
