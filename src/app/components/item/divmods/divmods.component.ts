import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-divmods',
  templateUrl: './divmods.component.html',
  styleUrls: ['./divmods.component.scss']
})
export class DivmodsComponent implements OnInit {

  @Input() item: any;               //Item Values

  constructor() { }

  ngOnInit(): void {
  }

}
