import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { simpleData } from 'src/app/core/models/simpleData';
import { SimpleDataService } from 'src/app/core/services/simpledata.service';

@Component({
  selector: 'itemForm-gemfilters',
  templateUrl: './gemfilters.component.html',
  styleUrls: ['./gemfilters.component.scss']
})
export class GemfiltersComponent implements OnInit {

  public gemQualityTypes: Array<simpleData> = [
    {id: '', text: 'All'},
    {id: '0', text: 'Default'},
    {id: 'alternate', text: 'Only Alternatives'},
    {id: '1', text: 'Anomalous'},
    {id: '2', text: 'Divergent'},
    {id: '3', text: 'Phantasmal'},
  ]

  @Input() gemForm: FormGroup;   //Gem form from misc filters

  constructor(public simpleDataService: SimpleDataService) { }

  ngOnInit(): void {
    this.gemForm.controls.gemForm_disabled.valueChanges.subscribe(disabled => {   //When disbaled changes to false, and the form is still disabled then enable it
      if (!disabled && this.gemForm.disabled) this.gemForm.enable({emitEvent: false});
    });
  }

  ngAfterContentChecked() {   //Disable the form when the disable value is true and the form is enabled
    if (this.gemForm.controls.gemForm_disabled.value && this.gemForm.enabled) {
      this.gemForm.disable({emitEvent: false, onlySelf: true});
    }

    for (const control in this.gemForm.controls) {
      this.gemForm.controls[control].valueChanges.subscribe(() => {
        this.checkIfDirty();
      });
    }
  }

  /**
   * Checks if the any of the controls are dirty and marks the formgroup as dirty if true
   */
  public checkIfDirty() {
    let dirty = false;

    for (const control in this.gemForm.controls) { 
      if (this.gemForm.controls[control].dirty) dirty = true;
    }
    
    if (dirty) this.gemForm.markAsDirty();
    else this.gemForm.markAsPristine();
  }
}
