import { Component, Input, OnInit } from '@angular/core';
import { FormGroupName } from '@angular/forms';

@Component({
  selector: 'app-minmaxinput',
  templateUrl: './minmaxinput.component.html',
  styleUrls: ['./minmaxinput.component.scss']
})
export class MinmaxinputComponent implements OnInit {

  @Input() formGroup: FormGroupName;
  @Input() inputName: string;

  constructor() { }

  ngOnInit(): void {
  }

}
