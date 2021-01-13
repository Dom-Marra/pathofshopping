import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl } from '@angular/forms';

enum styles {
  normal = 'normal',
  basicMaterial = 'basicMaterial'
}

export interface minmaxExtras{
  label: string,
  control: AbstractControl,
  inputClass?: string
}

@Component({
  selector: 'app-minmaxinput',
  templateUrl: './minmaxinput.component.html',
  styleUrls: ['./minmaxinput.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MinmaxinputComponent implements OnInit {

  @Input() group: AbstractControl;                      //form group to use
  @Input() inputName: string;                           //name of the input
  @Input() minmaxExtras: Array<minmaxExtras> = [];      //extra inputs
  @Input() styleType: styles = styles.normal;           //Style of the select

  constructor() { }

  ngOnInit(): void {
  }

}
