import { Component, Input, OnInit } from '@angular/core';
import { CurrentsortService } from 'src/app/services/currentsort.service';

@Component({
  selector: 'item-totalvalues',
  templateUrl: './totalvalues.component.html',
  styleUrls: ['./totalvalues.component.scss',  '../../styles/shared.scss']
})
export class TotalvaluesComponent implements OnInit {

  @Input() extended: any;                   //Extended Values

  constructor(public currentSort: CurrentsortService) { }

  ngOnInit(): void {
  }

}
