import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SortProperties } from 'src/app/core/models/sort-properties';
import { SortService } from 'src/app/core/services/currentsort.service';
import { propertyValues } from '../../constants/properties';

@Component({
  selector: 'pos-item-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss', '../../styles/parsedlist.scss',  '../../styles/shared.scss']
})
export class PropertiesComponent implements OnInit {
  public readonly PROP_VALUES = propertyValues;        //Keys of the prop values

  @Input() item: any;                                  //Item Values

  public currentSort: Observable<SortProperties>;

  constructor(public sortService: SortService) { 
    this.currentSort = this.sortService.getSort();
  }

  ngOnInit(): void {
  }

}
