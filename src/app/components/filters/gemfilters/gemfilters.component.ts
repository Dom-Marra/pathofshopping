import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

enum gemQualityTypes {
  '' = 'All',
  '"0"' = 'Default',
  'alternate' = 'Only Alternatives',
  '"1"' = 'Anomalous',
  '"2"' = 'Divergent',
  '"3"' = 'Phantasmal',
}

@Component({
  selector: 'app-gemfilters',
  templateUrl: './gemfilters.component.html',
  styleUrls: ['./gemfilters.component.scss']
})
export class GemfiltersComponent implements OnInit {

  public readonly GEM_QUALITY_TYPES: typeof gemQualityTypes = gemQualityTypes;  //Used for gem quality type selection

  @Input() gemForm: FormGroup;   //Gem form from misc filters

  constructor() { }

  ngOnInit(): void {
    this.gemForm.controls.gemForm_disabled.valueChanges.subscribe(disabled => {   //When disbaled changes to false, and the form is still disabled then enable it
      if (!disabled && this.gemForm.disabled) this.gemForm.enable({emitEvent: false});
    });
  }

  ngAfterContentChecked() {   //Disable the form when the disable value is true and the form is enabled
    if (this.gemForm.controls.gemForm_disabled.value && this.gemForm.enabled) {
      this.gemForm.disable({emitEvent: false, onlySelf: true});
    }
  }

  /**
   * Resets to default values for inputs
   */
  public reset() {
    this.gemForm.reset();
  }
}
