import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

export interface defaultValues {
  min: any,
  max: any
}

@Component({
  selector: 'app-minmaxinput',
  templateUrl: './minmaxinput.component.html',
  styleUrls: ['./minmaxinput.component.scss']
})
export class MinmaxinputComponent implements OnInit {

  @Input() group: AbstractControl;                      //form group to use
  @Input() defaultValues: defaultValues = {min: null, max: null};   //Default min max values

  constructor() { }

  ngOnInit(): void {
  }

}
