import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl } from '@angular/forms';

enum styles {
  normal = 'normal',
  basicMaterial = 'basicMaterial'
}

@Component({
  selector: 'app-filtergroupselect',
  templateUrl: './filtergroupselect.component.html',
  styleUrls: ['./filtergroupselect.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FiltergroupselectComponent implements OnInit {

  @Input() inputName: string;                               //Name of the input
  @Input() control: AbstractControl;                        //Form control of the input
  @Input() selectEnum: any;                                 //Enum for values
  @Input() styleType: styles = styles.normal;               //Style of the select

  public filter: Array<any>;                                //Filtered results

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

    return Object.keys(enumToFilter).filter(key => enumToFilter[key].toLowerCase().indexOf(text.toLocaleLowerCase()) != -1);
  }
}
