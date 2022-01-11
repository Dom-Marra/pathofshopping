import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SortProperties } from 'src/app/core/models/sort-properties';
import { SortService } from 'src/app/core/services/currentsort.service';
import { propertyValues } from '../../constants/properties';

@Component({
  selector: 'pos-item-additionalproperties',
  templateUrl: './additionalproperties.component.html',
  styleUrls: ['./additionalproperties.component.scss', '../../styles/parsedlist.scss', '../../styles/shared.scss']
})
export class AdditionalpropertiesComponent implements OnInit {  
  public readonly PROP_VALUES = propertyValues;        //Keys of the prop values

  @Input() additionalProperties: any;                  //Item additional property values

  public currentSort: Observable<SortProperties>;

  constructor(public sortService: SortService) {
    this.currentSort = this.sortService.getSort();
  }

  ngOnInit(): void {
  }

}
