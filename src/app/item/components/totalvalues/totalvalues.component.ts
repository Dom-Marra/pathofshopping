import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SortProperties } from 'src/app/core/models/sort-properties';
import { SortService } from 'src/app/core/services/currentsort.service';

@Component({
  selector: 'pos-item-totalvalues',
  templateUrl: './totalvalues.component.html',
  styleUrls: ['./totalvalues.component.scss',  '../../styles/shared.scss']
})
export class TotalvaluesComponent implements OnInit {

  @Input() extended: any;                   //Extended Values

  public currentSort: Observable<SortProperties>;

  constructor(public sortService: SortService) { 
    this.currentSort = this.sortService.getSort();
  }

  ngOnInit(): void {
  }

}
