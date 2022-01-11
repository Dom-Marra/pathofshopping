import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'pos-editable-field',
  templateUrl: './editable-field.component.html',
  styleUrls: ['./editable-field.component.scss']
})
export class EditableFieldComponent implements OnInit {

  /** Field label */
  @Input() label: string;

  /** Field default value */
  @Input() defaultValue: string = '';

  /** Form control to assign to the input */
  @Input() control: FormControl = new FormControl(this.defaultValue);

  /** Whether the input is focused or not */
  public focused: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
