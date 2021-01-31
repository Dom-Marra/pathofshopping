import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { _MatAutocompleteBase } from '@angular/material/autocomplete';

@Component({
  selector: 'app-filtergroupselect',
  templateUrl: './filtergroupselect.component.html',
  styleUrls: ['./filtergroupselect.component.scss']
})
export class FiltergroupselectComponent implements OnInit {

  @Input() inputName: string;                               //Name of the input
  @Input() control: AbstractControl;                        //Form control of the input
  @Input() selectEnum: any;                                 //Enum for values
  @Input() autoCompleteClass: string = 'autocomplete-panel-300';
  @Input() autoCompleteHost: _MatAutocompleteBase;

  public filter: Array<any>;                                //Filtered results

  constructor() { }

  ngOnInit(): void {
    this.filter = Object.keys(this.selectEnum);     //Autofill the results
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
