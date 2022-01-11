import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pos-item-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() item: any;                  //Item Values

  constructor() { }

  ngOnInit(): void {
  }

}
