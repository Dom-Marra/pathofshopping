import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PoeService } from 'src/app/core/services/poe.service';
import { simpleData } from 'src/app/core/models/simpleData';
import { SimpleDataService } from 'src/app/core/services/simpledata.service';
import { CurrentsortService } from 'src/app/core/services/currentsort.service';
import { currentSortProperties } from 'src/app/core/models/currentSortProperties';
import { ItemForm } from '../core/classes/itemform';
import { StatFilterForm } from '../core/classes/stat-filter-form';
import { skip, take } from 'rxjs/operators';
import { FetchedProperties } from '../core/models/fetchedproperties.model';
import { Results } from '../core/classes/results';
import { PoeAPISearchProperties } from '../core/models/poeapisearchproperties.model';

@Component({
  selector: 'pos-itemForm',
  templateUrl: './itemForm.component.html',
  styleUrls: ['./itemForm.component.scss']
})
export class ItemFormComponent implements OnInit {

  @Output() deleteItem: EventEmitter<ItemForm> = new EventEmitter<ItemForm>();  //Event emitter for removal
  @Input() itemForm: ItemForm;                                                  //Item Form 
  @Input() league: string;                                                      //League selected
  @ViewChildren("itemNameInput") itemNameInput: QueryList<ElementRef>;          //Item name input element

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
      let sortValue = this.itemForm.setSortBy(val.sortKey, val.sortValue);
      if (sortValue) val.sortValue = sortValue;
      this.queryIDs();
    });
  }

  /**
   * Fetches item IDs from the POE API using the query form data
   */
  public queryIDs() {
    let data = this.itemForm.getDataForQuery();

    this.poe.search(data, this.league).pipe(
      take(1)
    ).subscribe(
      (fetch: FetchedProperties) => {                             //Fetch items based on data

        if (fetch.result != null && fetch.result.length > 0) {    //If there are results set the result data
          this.itemForm.results = new Results(fetch);
          this.itemForm.results.fetchedResults.pseudos = this.getPseudoParams(data); 

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
   * Returns the pseudo query param data
   * 
   * @param data
   *        PoeAPISearchProperties
   */
  private getPseudoParams(data: PoeAPISearchProperties): string {
    let pseudos: string = "";                                             //Pseudo mod params

    data.query.stats?.forEach(statGroup => {                              //Add pseudo mods
      statGroup.filters?.forEach((filter, i) => {
        if (this.poe.getStatByID(filter.id)?.type == 'pseudo') 
          pseudos = pseudos.concat("pseudos[]=" + filter.id + (statGroup.filters[i + 1] ? '&' : ''));
      });
    });

    return pseudos;
  }

  /**
   * Adds a stat filter to the item data
   */
  public addStatGroup() {
    this.itemForm.addStatFilterForm();
  }

  /**
   * Removes a stat filter from the item
   * 
   * @param form
   *        stat filter to remove 
   */
  public removeStatFilter(form: StatFilterForm) {
    this.itemForm.removeStatFilterForm(form);
  }

  /**
   * Clears the item
   */
  public clear() {
    this.itemForm.clear();
    this.showResults = false;
  }

  /**
   * Deletes the item
   */
  public remove() {
    this.deleteItem.emit(this.itemForm);
  }
}
