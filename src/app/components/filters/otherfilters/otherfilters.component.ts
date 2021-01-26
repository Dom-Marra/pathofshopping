import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { trueFlase } from '../../../enums/TrueFalseEnum';

@Component({
  selector: 'app-otherfilters',
  templateUrl: './otherfilters.component.html',
  styleUrls: ['./otherfilters.component.scss']
})
export class OtherfiltersComponent implements OnInit {

  public readonly TRUE_FALSE: typeof trueFlase = trueFlase;               //used for true false selection

  @Input() otherForm: FormGroup;        //otherForm from misc form

  constructor(private cd: ChangeDetectorRef) { 
  }

  ngOnInit(): void {
    this.otherForm.controls.otherForm_disabled.valueChanges.subscribe(disabled => {    //When disbaled changes to false, and the form is still disabled then enable it
      if (!disabled && this.otherForm.disabled) this.otherForm.enable({emitEvent: false});
    });
  }

  ngAfterContentChecked() {   //Disable the form when the disable value is true and the form is enabled
    if (this.otherForm.controls.otherForm_disabled.value && this.otherForm.enabled) {
      this.otherForm.disable({emitEvent: false, onlySelf: true});
    }
  }

  /**
   * Resets to default values for inputs
   */
  public reset() {
    this.otherForm.reset();
  }
}
