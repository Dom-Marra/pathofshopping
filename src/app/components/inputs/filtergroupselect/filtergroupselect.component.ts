import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { _MatAutocompleteBase } from '@angular/material/autocomplete';
import { ControldefaultsDirective } from 'src/app/directives/controldefaults.directive';

@Component({
  selector: 'app-filtergroupselect',
  templateUrl: './filtergroupselect.component.html',
  styleUrls: ['./filtergroupselect.component.scss']
})
export class FiltergroupselectComponent implements OnInit {

  @Input() inputName: string;                               //Name of the input
  @Input() control: AbstractControl;                        //Form control of the input
  @Input() selectEnum: any;                                 //Enum for values
  @Input() disableDefault: boolean = false;                 //Whether the default control directive should be disabled
  @Input() default: any;                                    //Default value
  @Input() autoCompleteClass: string = 'autocomplete-panel-300';
  @Input() autoCompleteHost: _MatAutocompleteBase;

  public filter: Array<any>;                                //Filtered results

  public controlDefault: ControldefaultsDirective;          //Control default directive

  constructor() { }

  ngOnInit(): void {
    if (!this.disableDefault) {   //Create control default directive if enabled
      this.controlDefault = new ControldefaultsDirective(null);
      this.controlDefault.control = this.control;
      this.controlDefault.default = this.default;
      this.controlDefault.ngOnInit();
    }

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
