import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sortarrow',
  templateUrl: './sortarrow.component.html',
  styleUrls: ['./sortarrow.component.scss']
})
export class SortarrowComponent implements OnInit {

  @Input() sortValue: 'asc' | 'desc';

  constructor() { }

  ngOnInit(): void {
  }

}
