import { isDefined } from '@angular/compiler/src/util';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { _MatAutocompleteBase } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-filtergroupselect',
  templateUrl: './filtergroupselect.component.html',
  styleUrls: ['./filtergroupselect.component.scss']
})
export class FiltergroupselectComponent implements OnInit {

  @Input() inputName: string;                                       //Name of the input
  @Input() values: any;                                             //Values for the autocomplete
  @Input() groupOptions: {                                          //Group options
    groupedBy: string;                                              //The label of the group
    groupedInto: string;                                            //Property holding grouped values
  }
  @Input() autoCompleteClass: string = 'autocomplete-panel-300';    //The class for the autocomplete panel 
  @Input() autoCompleteHost: _MatAutocompleteBase;                  //The base element for the autocomplate panel
  @Input() setValue: any = null;                                    //Init with this value
  @Input() placeholder: string = 'Select Option';                   //Used for default placeholder text
  @Input() filterBy: ((text: string, values: any) => any) | null = null;        //Function to filter by
  @Input() displayBy: ((value: any) => string) | null = null;       //Function to get the display value
  @Input() set disabled(value: boolean) {                           //Disables the input
    if (value) {
      this.search.disable();
    } else {
      this.search.enable();
    }
  }             
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();  //Emits the value selection

  public selectedValue: any = null;                         //The current selected value
  public search: FormControl = new FormControl('');         //Search form control
  public filteredSearch: Observable<Array<any>>;            //Filtered results

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    if (this.setValue != null) {
      this.selectValue(this.setValue);
    }

    this.filteredSearch = this.search.valueChanges.pipe(
      startWith(''),
      filter(value => typeof value == 'string'),
      map(value =>  this.filterBy(value, this.values))
    );
  }

  public selectValue(value: any, emitEvent?: boolean): void {
    this.selectedValue = value;
    this.search.patchValue(this.displayBy ? this.displayBy(value): value, {emitEvent: false});
    if (emitEvent) this.selected.emit(this.selectedValue);
  }

  public getPlaceholder(): string {
    
    if (isDefined(this.selectedValue)) return this.displayBy ? this.displayBy(this.selectedValue) : this.selectedValue;
    if (this.inputName) return this.inputName;

    return this.placeholder;
  }
}
