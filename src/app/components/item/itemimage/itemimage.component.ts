import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-itemimage',
  templateUrl: './itemimage.component.html',
  styleUrls: ['./itemimage.component.scss']
})
export class ItemimageComponent implements OnInit {

  @Input() item: any;                 //Item Values
  
  constructor() { }

  ngOnInit(): void {
  }

}
