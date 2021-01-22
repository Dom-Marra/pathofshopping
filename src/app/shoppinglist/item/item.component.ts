import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { QueryitemService } from './services/queryitem.service'
import { Statfilter } from '../filters/statfilters/statfilter/statfilter';
import { Item } from './itemdata/item';

enum statusOptions {
  any = 'All',
  online = 'Online'
}

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemComponent implements OnInit {

  @Input() itemData: Item;
  @Input() league: string;
  @ViewChildren("itemNameInput") itemNameInput: QueryList<ElementRef>;                            //Item name input element
  public readonly STATUS_OPTIONS: typeof statusOptions = statusOptions;

  public editName: boolean = false;                        //Whether name is in edit mode or not
  public showResults: boolean = false;                      //Used to show results tab
  public queryResults: Array<any> = [];                     //Query Results

  public queryForm = new FormGroup({
    query: new FormGroup({
      stats: new FormArray([
      ]),
      status: new FormGroup({
        option: new FormControl('online')
      })
    }),
    sort: new FormGroup({
      price: new FormControl("asc")
    })
  });

  public misc_filters = new FormGroup({                    //misc filter group
    disabled: new FormControl(false)
  })

  constructor(private cd: ChangeDetectorRef, private queryService: QueryitemService) {  
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
    if (this.itemData.itemForm.controls.queryForm != null) {              //Check if the current item already has data set
      this.queryForm = this.itemData.itemForm.controls.queryForm as FormGroup;
    } else {
      (this.queryForm.get('query') as FormGroup).addControl('filters', new FormGroup({}));              //add filters group
      this.misc_filters.addControl('filters', new FormGroup({}));                                       //add filters to misc
      (this.queryForm.get('query.filters') as FormGroup).addControl('misc_filters', this.misc_filters); //add misc filter to query
      this.itemData.itemForm.addControl('queryForm', this.queryForm);                                   //Add queryForm to itemForm
    }
  }

  /**
   * Fetches item IDs from the POE API using the query form data and inputted sort values
   * 
   * @param key
   *        sort key, for example the hash of a stat
   * @param value 
   *        sort value, either 'asc' for ascending, or 'desc' for descending
   */
  public queryIDs(sortKey: string, sortValue?: string) {

    this.itemData.resultData.reset();                           //Reset previous results

    this.setSortBy(sortKey, sortValue);                                   //Set the sort data

    let data = {                                                          //create query data
      query: (this.queryForm.controls.query as FormGroup).value,
      sort: (this.queryForm.controls.sort as FormGroup).value
    }

    data = this.removeEmpty(data);                            //clean the data

    let fetchSub = this.queryService.fetchResults(data, this.league).subscribe((fetch: any) => {       //Fetch items based on data
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
        fetchSub.unsubscribe();
      }
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
  public removeEmpty(obj: any): any {

    Object.keys(obj).forEach(key => {                                                       //cycle through fields
      if (obj[key] && typeof obj[key] === 'object') this.removeEmpty(obj[key]);             //If it has nested objects cycle through
      else if (obj[key] == null || obj[key] == "all" || obj[key] == "") delete obj[key];    //delete field if empty, or has a value of all
  
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
    let currentSort = Object.keys((this.queryForm.controls.sort as FormGroup).getRawValue())[0];   //The current key in use
    let sortValue = (this.queryForm.controls.sort as FormGroup).controls[currentSort].value;       //The current value

    if (currentSort == key) {
      this.queryForm.controls['sort']['controls'][currentSort].patchValue(value ? value : sortValue == 'asc' ? 'desc' : 'asc');   //Alternate value if key is the same
    } else {
      (this.queryForm.controls.sort as FormGroup).removeControl(currentSort);                                      //Remove old control
      (this.queryForm.controls.sort as FormGroup).addControl(key, new FormControl(value ? value : 'desc'));        //Add new control
    }
  }

  /**
   * Adds a stat filter to the item data
   */
  public addStatGroup() {
    let newStatGroup = new Statfilter(this.itemData.itemForm.get('queryForm.query.stats') as FormArray);
    this.itemData.statFilters.push(newStatGroup);
  }

  /**
   * Removes a stat filter from the item
   * 
   * @param statFilter
   *        stat filter to remove 
   */
  public removeStatFilter(statFilter: Statfilter) {
    let statFiltersIndex = this.itemData.statFilters.indexOf(statFilter);
    this.itemData.statFilters.splice(statFiltersIndex, 1);

    let statsArryayIndex = statFilter.statsFormArray.controls.indexOf(statFilter.statFilters);
    statFilter.statsFormArray.removeAt(statsArryayIndex);
  }

  /**
   * Destroys this component
   */
  public remove() {
    //TODO
  }
}
