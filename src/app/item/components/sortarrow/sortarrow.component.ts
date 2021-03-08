import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'item-sortarrow',
  templateUrl: './sortarrow.component.html',
  styleUrls: ['./sortarrow.component.scss']
})
export class SortarrowComponent implements OnInit {

  @Input() sortValue: 'asc' | 'desc';

  constructor() { }

  ngOnInit(): void {
  }

}
