import { Component, Input, OnInit } from '@angular/core';
import { CurrentsortService } from 'src/app/services/currentsort.service';
import { propertyValues } from '../../enums/propertyValues.enum';

@Component({
  selector: 'item-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss', '../../styles/parsedlist.scss',  '../../styles/shared.scss']
})
export class PropertiesComponent implements OnInit {
  public readonly PROP_VALUES = propertyValues;        //Keys of the prop values

  @Input() item: any;                                  //Item Values

  constructor(public currentSort: CurrentsortService) { }

  ngOnInit(): void {
  }

}