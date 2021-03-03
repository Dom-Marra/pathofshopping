import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-incubator',
  templateUrl: './incubator.component.html',
  styleUrls: ['./incubator.component.scss', '../parsedlist.scss']
})
export class IncubatorComponent implements OnInit {

  @Input() item: any;                 //Item Values

  constructor() { }

  ngOnInit(): void {
  }

}
