import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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

  constructor(private cd: ChangeDetectorRef) {
  }  

  ngOnInit(): void {
    Object.keys(this.influenceFilters.controls).forEach(key => {      //add controls to misc filters
      if (this.itemForm.controls[key]) {
        this.influenceFilters.controls[key] = this.itemForm.controls[key];      //retain item data
        console.log(key);
      } else {
        this.itemForm.addControl(key, this.influenceFilters.get(key));          //add field for item data
      }

      this.influenceFilters.controls[key].setParent(this.influenceFilters);
    });
    
    this.cd.detectChanges();
  }

  /**
   * Resets to default values for inputs
   */
  public reset() {
    this.influenceFilters.reset();
  }
}
