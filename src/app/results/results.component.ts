import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PoeService } from 'src/app/core/services/poe.service';
import { PoeAPIResult } from '../core/models/poe-api-result.model';
import { ItemForm } from '../item-form/classes/item-form';
import { ShoppingListService } from '../core/services/shopping-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { skip, take, takeUntil } from 'rxjs/operators';
import { Results } from './results.model';
import { PoeAPISearchProperties } from '../core/models/poe-api-search-properties.model';
import { SortService } from '../core/services/currentsort.service';
import { Observable, Subject } from 'rxjs';
import { SortProperties } from '../core/models/sort-properties';

@Component({
  selector: 'pos-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {  

  /** Query Result Data */
  public results: Results;

  /** Saved search results */
  private cachedResults: Array<Array<string>> = [];

  /** Current result index */
  private index: number = 0;
  
  /** Search Pseudos */
  public pseudos: string = "";

  /** Retrieved items */
  public items: Array<Array<any>> = [];

  /** Whether queries are in progress */
  public inProgress: boolean;

  /** The parent Item Form */
  public itemForm: ItemForm;

  /** The league to search in */
  private league: string;

  /** Query errors */
  public errMsg: string;

  /** Unsubber */
  private readonly unsubscribe: Subject<void> = new Subject();

  public currentSort: Observable<SortProperties>;

  constructor(
    private poe: PoeService, 
    private listService: ShoppingListService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sortService: SortService
  ) { 
    this.currentSort = this.sortService.getSort();
  }

  ngOnInit(): void { 
    let itemReference: number;

    this.activatedRoute.paramMap.pipe(takeUntil(this.unsubscribe)).subscribe(map => {
      if (!map.has('itemID')) this.router.navigate(['..'], {relativeTo: this.activatedRoute, replaceUrl: true});

      itemReference = parseInt(map.get('itemID')) - 1;
      
      this.listService.getItems().pipe(take(1)).subscribe(items => {
        this.itemForm = items[itemReference];
      });
    });

    this.listService.getItems().pipe(takeUntil(this.unsubscribe)).subscribe(items => {
      if (isNaN(itemReference) || items.length === 0) this.router.navigate(['..'], {relativeTo: this.activatedRoute,replaceUrl: true});
      else if (itemReference + 1 > items.length) this.router.navigate(['..', items.length, {replaceUrl: true}]);
    });

    this.currentSort.pipe(take(1), takeUntil(this.unsubscribe)).subscribe(val => {
      this.itemForm.setSortBy(val)
    });

    this.listService.getLeague().pipe(takeUntil(this.unsubscribe)).subscribe(league => {
      this.league = league;
      this.query();
    });
    
    this.currentSort.pipe(skip(1), takeUntil(this.unsubscribe)).subscribe((val) => {
      this.itemForm.setSortBy(val)
      this.query();
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  /**
   * Fetches item IDs from the POE API using the query form data
   */
   public query(): void {
    this.results = null;
    this.cachedResults = [];
    this.index = 0;
    this.pseudos = "";
    this.items = [];

    let data = this.itemForm.exportForQuery();

    this.inProgress = true; 
  
    this.poe.search(data, this.league).pipe(
      take(1),
    ).subscribe(
      (fetch: Results) => {

        if (fetch.error) {
          this.errMsg = 'Sorry, we could not make the request at this time.';
          this.inProgress = false;
          return;
        }

        if (fetch.total > 0) { 
          this.results = fetch;
          this.setPseudos(data); 
          this.getItems();
        } else {
          this.errMsg = 'No results found. Please widen parameters';
          this.inProgress = false;
        }
    },
    (error) => {    //Handle http error
      this.errMsg = error;
    }
    );
  }

  /**
   * Returns the pseudo query param data
   * 
   * @param data
   *        PoeAPISearchProperties
   */
  private setPseudos(data: PoeAPISearchProperties): void {
    data.query.stats?.forEach(statGroup => {                              //Add pseudo mods
      statGroup.filters?.forEach((filter, i) => {
        if (this.poe.getStatByID(filter.id)?.type == 'pseudo') 
          this.pseudos += `${this.pseudos.length > 0 ? '%26' : ''}pseudos[]=${filter.id}`;
      });
    });
  }

  /**
   * Gets item data from a range of item IDs
   */
  public getItems() {

    let results = this.results.result.slice(this.index * 10, (this.index + 1) * 10);   //Get the IDs to retrive items for

    if (this.cachedResults.includes(results)) return;     //Already have the information so return

    if (results.length < 1) return;

    //Get items
    this.poe.fetch(results, "?query=" + this.results.id + "%26" + this.pseudos)
    .subscribe((items: PoeAPIResult) => {  
      this.cachedResults.push(results);

      this.items.push(items.result);

      //Out of progress unsub
      this.inProgress = false;
    });
  }

  /**
   * Changes the start and end index depending on the page data
   * 
   * @param pageData 
   *        PageEvent
   */
  public changeIndices(pageData: PageEvent) {
    this.index = pageData.pageIndex;
    this.getItems();
  }
}
