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
