import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'item-incubator',
  templateUrl: './incubator.component.html',
  styleUrls: ['./incubator.component.scss', '../../styles/parsedlist.scss']
})
export class IncubatorComponent implements OnInit {

  @Input() incubatedItem: any;                 //Incubated item values

  constructor() { }

  ngOnInit(): void {
  }

}
