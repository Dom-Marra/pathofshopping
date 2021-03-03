import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Item } from '../../classes/itemdata/item';
import { StatFilterForm } from 'src/app/classes/formgroups/stat-filter-form';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PoeService } from 'src/app/services/poe.service';
import { simpleData } from 'src/app/models/simpleData';
import { SimpleDataService } from 'src/app/services/simpledata.service';
import { Subscription } from 'rxjs';
import { CurrentsortService } from 'src/app/services/currentsort.service';
import { currentSortProperties } from 'src/app/models/currentSortProperties';

@Component({
  selector: 'app-itemForm',
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
  private _fetchSub: Subscription = new Subscription();     //Init fetch sub

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
    this.currentSort.currentSort.subscribe((val: currentSortProperties) => {
      if (val) this.queryIDs(val.sortKey, val.sortValue);
    });
  }

  /**
   * Fetches item IDs from the POE API using the query form data and inputted sort values
   * 
   * @param key
   *        sort key, for example the hash of a stat
   * @param value 
   *        sort value, either 'asc' for ascending, or 'desc' for descending
   */
  public queryIDs(sortKey: string, sortValue?: 'asc' | 'desc') {

    this.itemData.resultData.reset();                           //Reset previous results

    this.setSortBy(sortKey, sortValue);                                   //Set the sort data
    let data = {                                                          //create query data
      query: (this.itemData.itemForm.get('queryForm.query') as FormGroup).value,
      sort: (this.itemData.itemForm.get('queryForm.sort') as FormGroup).value
    }

    data = this.removeEmpty(data);                            //clean the data

    this._fetchSub = this.poe.search(data, this.league).subscribe(
      (fetch: any) => {       //Fetch items based on data
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
          this._fetchSub.unsubscribe();
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
  private setSortBy(key: string, value?: string) {
    let currentSort = Object.keys((this.itemData.itemForm.get('queryForm.sort') as FormGroup).getRawValue())[0];   //The current key in use
    let sortValue = (this.itemData.itemForm.get('queryForm.sort') as FormGroup).controls[currentSort].value;       //The current value

    if (!value && currentSort != key) {
      value = 'desc';
      this.currentSort.currentSort.value.sortValue = 'desc';
    } else if (currentSort == key && !value) {
      this.itemData.itemForm.get('queryForm.sort')['controls'][currentSort].value == 'asc' ? value = 'desc' : value = 'asc';
      this.currentSort.currentSort.value.sortValue = (value as ('asc' | 'desc'));
    }

    if (currentSort == key) {
      this.itemData.itemForm.get('queryForm.sort')['controls'][currentSort].patchValue(value ? value : sortValue == 'asc' ? 'desc' : 'asc');   //Alternate value if key is the same
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
