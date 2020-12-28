import { Component, Input, OnInit } from '@angular/core';
import { FormControlName, FormGroupName } from '@angular/forms';

export interface minmaxExtras{
  label: string,
  control: FormControlName,
  inputClass?: string
}

@Component({
  selector: 'app-minmaxinput',
  templateUrl: './minmaxinput.component.html',
  styleUrls: ['./minmaxinput.component.scss']
})
export class MinmaxinputComponent implements OnInit {

  @Input() formGroup: FormGroupName;
  @Input() inputName: string;
  @Input() minmaxExtras: Array<minmaxExtras>;

  constructor() { }

  ngOnInit(): void {
  }

}
