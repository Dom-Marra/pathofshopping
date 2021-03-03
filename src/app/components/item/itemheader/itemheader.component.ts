import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-itemheader',
  templateUrl: './itemheader.component.html',
  styleUrls: ['./itemheader.component.scss']
})
export class ItemheaderComponent implements OnInit {

  @Input() item: any;                  //Item Values

  constructor() { }

  ngOnInit(): void {
  }

}
