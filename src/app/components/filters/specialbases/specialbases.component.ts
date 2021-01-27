import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { trueFlase } from '../../../enums/TrueFalseEnum';

@Component({
  selector: 'app-specialbases',
  templateUrl: './specialbases.component.html',
  styleUrls: ['./specialbases.component.scss']
})
export class SpecialbasesComponent implements OnInit {

  public readonly TRUE_FALSE: typeof trueFlase = trueFlase;               //used for true false selection
  
  @Input() influenceForm: FormGroup;   //Influence Form from misc form

  constructor() {
  }  

  ngOnInit(): void {
    this.influenceForm.controls.influenceForm_disabled.valueChanges.subscribe(disabled => {       //When disbaled changes to false, and the form is still disabled then enable it
      if (!disabled && this.influenceForm.disabled) this.influenceForm.enable({emitEvent: false});
    });
  }

  ngAfterContentChecked() {    //Disable the form when the disable value is true and the form is enabled
    if (this.influenceForm.controls.influenceForm_disabled.value && this.influenceForm.enabled) {
      this.influenceForm.disable({emitEvent: false, onlySelf: true});
    }
  }

  /**
   * Resets to default values for inputs
   */
  public reset() {
    this.influenceForm.reset();
  }
}
