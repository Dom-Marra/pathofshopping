import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SimpleDataService } from 'src/app/services/simpledata.service';

@Component({
  selector: 'app-otherfilters',
  templateUrl: './otherfilters.component.html',
  styleUrls: ['./otherfilters.component.scss']
})
export class OtherfiltersComponent implements OnInit {

  @Input() otherForm: FormGroup;        //otherForm from misc form

  constructor(public simpleDataService: SimpleDataService) { 
  }

  ngOnInit(): void {
    this.otherForm.controls.otherForm_disabled.valueChanges.subscribe(disabled => {    //When disbaled changes to false, and the form is still disabled then enable it
      if (!disabled && this.otherForm.disabled) this.otherForm.enable({emitEvent: false});
    });

    for (const control in this.otherForm.controls) {
      this.otherForm.controls[control].valueChanges.subscribe(() => {
        this.checkIfDirty();
      });
    }
  }

  ngAfterContentChecked() {   //Disable the form when the disable value is true and the form is enabled
    if (this.otherForm.controls.otherForm_disabled.value && this.otherForm.enabled) {
      this.otherForm.disable({emitEvent: false, onlySelf: true});
    }
  }

  /**
   * Checks if the any of the controls are dirty and marks the formgroup as dirty if true
   */
  public checkIfDirty() {
    let dirty = false;

    for (const control in this.otherForm.controls) { 
      if (this.otherForm.controls[control].dirty) dirty = true;
    }
    
    if (dirty) this.otherForm.markAsDirty();
    else this.otherForm.markAsPristine();
  }

  /**
   * Resets to default values for inputs
   */
  public reset() {
    this.otherForm.reset();
  }
}
