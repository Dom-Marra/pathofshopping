import { Component, Input, OnInit } from '@angular/core';
import { CurrentsortService } from 'src/app/services/currentsort.service';
import { propertyValues } from '../../../enums/propertyValues.enum';

@Component({
  selector: 'app-additionalproperties',
  templateUrl: './additionalproperties.component.html',
  styleUrls: ['./additionalproperties.component.scss', '../parsedlist.scss', '../shared.scss']
})
export class AdditionalpropertiesComponent implements OnInit {  
  public readonly PROP_VALUES = propertyValues;        //Keys of the prop values

  @Input() item: any;                                  //Item Values

  constructor(public currentSort: CurrentsortService) { }

  ngOnInit(): void {
  }

}
