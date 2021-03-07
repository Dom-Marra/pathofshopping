import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { _MatAutocompleteBase } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-searchselect',
  templateUrl: './searchselect.component.html',
  styleUrls: ['./searchselect.component.scss']
})
export class SearchSelectComponent implements OnInit {

  @Input() clearOnFocus: boolean = true;                            //Whether on focus to clear the input
  @Input() clearable: boolean = false;                              //Whether the input can be cleared
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
  @Output() cleared: EventEmitter<void> = new EventEmitter<void>(); //Emits when the input hase been cleared

  public selectedValue: any = null;                         //The current selected value
  public search: FormControl = new FormControl('');         //Search form control
  public filteredSearch: Observable<Array<any>>;            //Filtered results
  public selectingOption: boolean = false;                  //An option is currently in the process of being selected

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.setValue) {     //update the selected value on setValue change
      this.selectValue(this.setValue);
    }
  }

  ngAfterContentInit() {
    if (this.setValue != null) {                            //set the value if it has one provided
      this.selectValue(this.setValue);
    }

    this.filteredSearch = this.search.valueChanges.pipe(    //filter the values 
      startWith(''),
      filter(value => typeof value == 'string'),
      map(value =>  this.filterBy(value, this.values))
    );
  }

  /**
   * Updates the selected value and can emit an event providing the value
   * 
   * @param value 
   *        any: the value to select
   * @param emitEvent 
   *        boolean: whether to emit an event or not
   */
  public selectValue(value: any, emitEvent?: boolean): void {
    this.selectedValue = value;
    this.search.patchValue(this.displayBy ? this.displayBy(value): value, {emitEvent: false, onlySelf: true});
    if (emitEvent) this.selected.emit(this.selectedValue);
  }

  /**
   * Returns a value that should be used as the placeholder
   * 
   * @returns
   *        string: the placeholder
   */
  public getPlaceholder(): string {
    if (this.selectedValue && !this.clearable) return this.displayBy ? this.displayBy(this.selectedValue) : this.selectedValue;
    if (this.inputName) return this.inputName;

    return this.placeholder;
  }

  /**
   * Clears the search control and emits a cleared event
   */
  public clear(): void {
    this.search.patchValue('');
    this.cleared.emit();
  }
}
