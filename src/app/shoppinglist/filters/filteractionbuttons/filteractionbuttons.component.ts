import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filteractionbuttons',
  templateUrl: './filteractionbuttons.component.html',
  styleUrls: ['./filteractionbuttons.component.scss']
})
export class FilteractionbuttonsComponent implements OnInit {

  @Output() remove: EventEmitter<void> = new EventEmitter();          //Outputs removal event
  @Output() disableChange: EventEmitter<void> = new EventEmitter();   //Output for disabled change

  @Input() formGroup: FormGroup;        //Form group to perform actions on
  @Input() disableClear: boolean;       //The formgroup is not clearable
  @Input() disableDisable: boolean;     //The formgroup shouldn't be disabled
  @Input() includeDelete: boolean;      //The formgroup can be deleted

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Emits removal event
   */
  public emitRemove() {
    this.remove.emit();
  }

  /**
   * Resets form with null values
   */
  public reset() {
    this.formGroup.reset();
  }
}
