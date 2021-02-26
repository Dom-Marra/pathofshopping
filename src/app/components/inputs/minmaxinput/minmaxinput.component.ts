import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-minmaxinput',
  templateUrl: './minmaxinput.component.html',
  styleUrls: ['./minmaxinput.component.scss']
})
export class MinmaxinputComponent implements OnInit {

  @Input() group: FormGroup;                                        //form group to use

  constructor() { }

  ngOnInit(): void {
  }

}
