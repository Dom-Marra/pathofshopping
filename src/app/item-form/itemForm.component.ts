import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PoeService } from 'src/app/core/services/poe.service';
import { simpleData } from 'src/app/core/models/simpleData';
import { SimpleDataService } from 'src/app/core/services/simpledata.service';
import { Subscription } from 'rxjs';
import { CurrentsortService } from 'src/app/core/services/currentsort.service';
import { currentSortProperties } from 'src/app/core/models/currentSortProperties';
import { Item } from '../core/classes/item';
import { StatFilterForm } from '../core/classes/stat-filter-form';
import { skip, take } from 'rxjs/operators';

@Component({
  selector: 'pos-itemForm',
  templateUrl: './itemForm.component.html',
  styleUrls: ['./itemForm.component.scss']
})
export class ItemFormComponent implements OnInit {

  @Output() deleteItem: EventEmitter<Item> = new EventEmitter<Item>();
  @Input() itemData: Item;
  @Input() league: string;
  @ViewChildren("itemNameInput") itemNameInput: QueryList<ElementRef>;                            //Item name input element

  public editName: boolean = false;                         //Whether name is in edit mode or not
  public showResults: boolean = false;                      //Used to show results tab
  public statusOptions: Array<simpleData> = [               //Status options
    {id: 'any', text: 'All'},
    {id: 'online', text: 'Online'}
  ];

  constructor(private cd: ChangeDetectorRef, 
              private snackBar: MatSnackBar, 
              private poe: PoeService,
              public simpleDataService: SimpleDataService,
              public currentSort: CurrentsortService) {  
  }

  ngAfterViewInit() {
    this.itemNameInput.changes.subscribe(() => {        //focus name input element after processed by ngIf
      
      if (this.editName) {
        this.itemNameInput.first.nativeElement.focus();
        this.cd.detectChanges();
      }
    });
  }

  ngOnInit(): void {
    this.currentSort.currentSort.pipe(
      skip(1)
    ).subscribe((val: currentSortProperties) => {
      if (!val) return;
      this.setSortBy(val.sortKey, val.sortValue);
      this.queryIDs();
    });
  }

  /**
   * Fetches item IDs from the POE API using the query form data
   */
  public queryIDs() {
    let data = this.removeEmpty({                               //create query data
      query: (this.itemData.itemForm.get('queryForm.query') as FormGroup).value,
      sort: (this.itemData.itemForm.get('queryForm.sort') as FormGroup).value
    }); 

    this.itemData.resultData.reset();                           //Reset previous results

    this.poe.search(data, this.league).pipe(
      take(1)
    ).subscribe(
      (fetch: any) => {                                        //Fetch items based on data
        if (fetch.result != null && fetch.result.length > 0) {

          //Set item query data
          this.itemData.resultData.queryProps = {
            psuedos: this.getPsuedoQuery(data),
            res: fetch.result,
            total: fetch.total,
            inexact: fetch.inexact,
            id: fetch.id
          }

          //Show results and close sub
          this.showResults = true;
        } else {
          this.displayErrorSnackBar('No results found. Please widen parameters');
        }
    },
    (error) => {    //Handle http error
      this.displayErrorSnackBar(error);
    }
    );
  }

  /**
   * Displays error message
   * 
   * @param err 
   *        string: error message
   */
  private displayErrorSnackBar(err: string) {
    this.snackBar.open(err, 'close', {
      panelClass: 'error-snack-bar',
      duration: 3000
    });
  }

  /**
   * Returns the psuedo query param data
   * 
   * @param data
   *        object: raw data of the query form 
   */
  private getPsuedoQuery(data: any): string {
    let psuedos: string = "";                                             //Pseudo mod params

    data.query.stats?.forEach(statGroup => {                              //Add pseudo mods to psueod mod params
      statGroup.filters?.forEach((filter, i) => {
        if ((filter.id as string).includes('pseudo')) 
          psuedos = psuedos.concat("pseudos[]=" + filter.id + (statGroup.filters[i + 1] ? '&' : ''));
      });
    });

    return psuedos;
  }

  /**
   * Removes empty objects and empty object fields
   * 
   * @param obj 
   *        Object: object to remove empty fields from
   */
  private removeEmpty(obj: any): any {

    Object.keys(obj).forEach(key => {                                                       //cycle through fields
      if (obj[key] && typeof obj[key] === 'object') this.removeEmpty(obj[key]);             //If it has nested objects cycle through
      else if (obj[key] == null || obj[key] == "all" || obj[key] == "")  {                  //delete field if empty, or has a value of all
        if (Array.isArray(obj)) obj.splice(parseInt(key), 1);
        else delete obj[key];
      }

      if (!obj[key] || typeof obj[key] !== "object") return;                                //return if the current value is not a object
  
      if (Object.keys(obj[key]).length === 0) delete obj[key];                              //delete empty objects
    });

    return obj;
  }

  /**
   * Sets the sort
   * 
   * @param key
   *        sort key, for example the hash of a stat
   * @param value 
   *        sort value, either 'asc' for ascending, or 'desc' for descending
   */
  private setSortBy(key: string, value?: 'asc' | 'desc') {
    let currentSort = Object.keys((this.itemData.itemForm.get('queryForm.sort') as FormGroup).getRawValue())[0];   //The current key in use

    if (!value && currentSort != key) {             //Set the value for the sort to desc if its a new sort
      value = 'desc';
      this.currentSort.currentSort.value.sortValue = 'desc';
    } else if (currentSort == key && !value) {      //Switch the value for the sort if the sort is the same but no value is provided
      this.itemData.itemForm.get('queryForm.sort')['controls'][currentSort].value == 'asc' ? value = 'desc' : value = 'asc';
      this.currentSort.currentSort.value.sortValue = (value as ('asc' | 'desc'));
    }

    if (currentSort == key) {
      this.itemData.itemForm.get('queryForm.sort')['controls'][currentSort].patchValue(value);   //Alternate value if key is the same
    } else {
      (this.itemData.itemForm.get('queryForm.sort') as FormGroup).removeControl(currentSort);                                      //Remove old control
      (this.itemData.itemForm.get('queryForm.sort') as FormGroup).addControl(key, new FormControl(value));                         //Add new control
    }
  }

  /**
   * Adds a stat filter to the item data
   */
  public addStatGroup() {
    let newStatFilter = new StatFilterForm();
    (this.itemData.itemForm.get('queryForm.query.stats') as FormArray).push(newStatFilter);
  }

  /**
   * Removes a stat filter from the item
   * 
   * @param statFilter
   *        stat filter to remove 
   */
  public removeStatFilter(statFilter: FormGroup) {
    let statsArryayIndex = (this.itemData.itemForm.get('queryForm.query.stats') as FormArray).controls.indexOf(statFilter);
    (this.itemData.itemForm.get('queryForm.query.stats') as FormArray).removeAt(statsArryayIndex);
  }

  /**
   * Clears the item
   */
  public clear() {
    this.itemData.clear();
    this.showResults = false;
  }

  /**
   * Deletes the item
   */
  public remove() {
    this.deleteItem.emit(this.itemData);
  }
}
