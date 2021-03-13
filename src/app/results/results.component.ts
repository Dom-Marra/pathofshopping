import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Results } from '../core/classes/results';
import { PoeService } from 'src/app/core/services/poe.service';
import { poeAPIResult } from '../core/models/poeAPIResult';

@Component({
  selector: 'pos-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  @ViewChildren('itemsPaginator') itemsPaginators: QueryList<MatPaginator>;                         //Paginator
  @ViewChildren('itemsPaginator', { read: ElementRef }) itemsPaginatorsRef: QueryList<ElementRef>;  //results container

  @Input() set results(results: Results) {         //Setter function for the results
    this._results = results;
    this.getItems();
  }              

  public _results: Results;                        //Data pertaining to results
  public inProgress: boolean = false;              //Whether the query is in progress or not

  constructor(private poeAPI: PoeService) { }

  ngOnInit(): void { 

    //Retrieve data if first search
    if (this._results.retrievedItems.length == 0 && this._results.fetchedResults.result.length > 0) {
      this.getItems();
    }
  }

  ngAfterViewInit() {
    if (this.itemsPaginatorsRef.first) this.itemsPaginatorsRef.first.nativeElement.scrollIntoView();    //Scroll to first paginator

    this.itemsPaginatorsRef.changes.subscribe(paginators => {                       //When paginators become visible scroll to first 
      if (paginators.length > 0) paginators.first.nativeElement.scrollIntoView();
    });
  }

  /**
   * Gets item data from a range of item IDs
   */
  public getItems() {

    let results = this._results.fetchedResults.result
                  .slice(this._results.pageData.startIndex, this._results.pageData.endIndex);   //Get the IDs to retrive items for

    for (let item of results) {                            //Already have the information so return
      if (this._results.retrievedItems.find(retrievedItem => retrievedItem?.id == item)) return;
    }

    if (results.length < 1) return;

    this.inProgress = true;                               //Set in progress

    //Get items
    this.poeAPI.fetch(results, "?query=" + this._results.fetchedResults.id + "&" + this._results.fetchedResults.pseudos)
    .subscribe((items: poeAPIResult) => {  
      this._results.addRetrievedItems(items.result);

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
    this._results.setPageData(pageData.pageIndex);
    this.getItems();
  }
}
