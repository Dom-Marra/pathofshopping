import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pos-item-divmods',
  templateUrl: './divmods.component.html',
  styleUrls: ['./divmods.component.scss']
})
export class DivmodsComponent implements OnInit {

  @Input() explicitMods: any;               //Item explicit mod values

  constructor() { }

  ngOnInit(): void {
  }

}
