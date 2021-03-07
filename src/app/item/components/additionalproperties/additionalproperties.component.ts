import { Component, Input, OnInit } from '@angular/core';
import { CurrentsortService } from 'src/app/services/currentsort.service';
import { propertyValues } from '../../enums/propertyValues.enum';

@Component({
  selector: 'item-additionalproperties',
  templateUrl: './additionalproperties.component.html',
  styleUrls: ['./additionalproperties.component.scss', '../../styles/parsedlist.scss', '../../styles/shared.scss']
})
export class AdditionalpropertiesComponent implements OnInit {  
  public readonly PROP_VALUES = propertyValues;        //Keys of the prop values

  @Input() additionalProperties: any;                  //Item additional property values

  constructor(public currentSort: CurrentsortService) { }

  ngOnInit(): void {
  }

}
