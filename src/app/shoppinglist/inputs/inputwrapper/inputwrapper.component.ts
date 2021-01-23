import { Component, Input, OnInit } from '@angular/core';
import { stylesTypes } from '../shared/styleTypes';

@Component({
  selector: 'app-inputwrapper',
  templateUrl: './inputwrapper.component.html',
  styleUrls: ['./inputwrapper.component.scss']
})
export class InputwrapperComponent implements OnInit {

  @Input() inputName: string;                             //Name of the input
  @Input() styleType: stylesTypes = stylesTypes.normal;   //Style of the select
  
  constructor() { }

  ngOnInit(): void {
  }

}
