import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-filtergroupselect',
  templateUrl: './filtergroupselect.component.html',
  styleUrls: ['./filtergroupselect.component.scss']
})
export class FiltergroupselectComponent implements OnInit {

  @Input() inputName: string;                               //Name of the input
  @Input() control: AbstractControl;                        //Form control of the input
  @Input() selectEnum: any;                                 //Enum for values

  public filter: Array<any>;                                //Filtered results

  public readonly originalOrder = (): number => {           //Keeps enums in original order
    return 0;
  }

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Filters enumeration objects based on search text
   * 
   * @param searchText
   *        string: search text 
   * @param enumToFilter 
   *        typeof enum: the enumeration to filter
   */
  public filterEnums(searchText: string, enumToFilter: any): Array<any> {
    const text = searchText.toLowerCase();

    return Object.values(enumToFilter).filter((enumValue: string) => enumValue.toLowerCase().indexOf(text) != -1);
  }
}
