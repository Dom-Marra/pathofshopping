import { Component, Input, OnInit } from '@angular/core';
import { CurrentsortService } from 'src/app/services/currentsort.service';

@Component({
  selector: 'app-totalvalues',
  templateUrl: './totalvalues.component.html',
  styleUrls: ['./totalvalues.component.scss',  '../shared.scss']
})
export class TotalvaluesComponent implements OnInit {

  @Input() item: any;                   //Item Values

  constructor(public currentSort: CurrentsortService) { }

  ngOnInit(): void {
  }

}
