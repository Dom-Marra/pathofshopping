import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SimpleDataService } from 'src/app/services/simpledata.service';

@Component({
  selector: 'app-specialbases',
  templateUrl: './specialbases.component.html',
  styleUrls: ['./specialbases.component.scss']
})
export class SpecialbasesComponent implements OnInit {
  
  @Input() influenceForm: FormGroup;   //Influence Form from misc form

  constructor(public simpleDataService: SimpleDataService) {
  }  

  ngOnInit(): void {
    this.influenceForm.controls.influenceForm_disabled.valueChanges.subscribe(disabled => {       //When disbaled changes to false, and the form is still disabled then enable it
      if (!disabled && this.influenceForm.disabled) this.influenceForm.enable({emitEvent: false});
    });

    for (const control in this.influenceForm.controls) {
      this.influenceForm.controls[control].valueChanges.subscribe(() => {
        this.checkIfDirty();
      });
    }
  }

  ngAfterContentChecked() {    //Disable the form when the disable value is true and the form is enabled
    if (this.influenceForm.controls.influenceForm_disabled.value && this.influenceForm.enabled) {
      this.influenceForm.disable({emitEvent: false, onlySelf: true});
    }
  }

  /**
   * Checks if the any of the controls are dirty and marks the formgroup as dirty if true
   */
  public checkIfDirty() {
    let dirty = false;

    for (const control in this.influenceForm.controls) { 
      if (this.influenceForm.controls[control].dirty) dirty = true;
    }
    
    if (dirty) this.influenceForm.markAsDirty();
    else this.influenceForm.markAsPristine();
  }
}
