import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pos-item-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  @Input() item: any;                 //Item Values
  
  constructor() { }

  ngOnInit(): void {
  }

}
