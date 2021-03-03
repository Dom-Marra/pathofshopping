import { Component, ElementRef, EventEmitter, Input, KeyValueDiffer, KeyValueDiffers, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Resultdata } from '../../classes/resultdata/resultdata';
import { PoeService } from 'src/app/services/poe.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  @ViewChildren('itemsPaginator') itemsPaginators: QueryList<MatPaginator>;                         //Paginator
  @ViewChildren('itemsPaginator', { read: ElementRef }) itemsPaginatorsRef: QueryList<ElementRef>;  //results container

  @Input() resultData: Resultdata;                     //Data pertaining to results

  public inProgress: boolean = false;                 //Whether the query is in progress or not

  public differ: KeyValueDiffer<any, any>;            //Used to detect changes in the queryProps
  constructor(private poeAPI: PoeService, private kvDiffers: KeyValueDiffers) { }

  ngOnInit(): void { 
    this.differ = this.kvDiffers.find(this.resultData).create();    //Create the differ

    //Retrieve data if first search
    if (this.resultData.retrievedItems.length == 0 && this.resultData.queryProps.res.length > 0) {
      this.getItems();
    }
  }

  ngAfterViewInit() {
    if (this.itemsPaginatorsRef.first) this.itemsPaginatorsRef.first.nativeElement.scrollIntoView();    //Scroll to first paginator

    this.itemsPaginatorsRef.changes.subscribe(paginators => {                       //When paginators become visible scroll to first 
      if (paginators.length > 0) paginators.first.nativeElement.scrollIntoView();
    });
  }

  ngDoCheck() {
    if (this.differ && this.resultData?.queryProps) {
      let resultChange = this.differ.diff(this.resultData.queryProps);    //Get changes
      
      if (resultChange) {
        resultChange.forEachChangedItem(item => {           //Cycle changed items
          
          if (item.key == 'res') {                          //If results changed perform a new search
            this.resultData.queryData = [];
            this.resultData.retrievedItems = [];
            if (this.itemsPaginators) this.itemsPaginators.forEach(paginator => paginator.firstPage());
            this.getItems();
          }
        });
      }
    }
  }

  /**
   * Gets item data from a range of item IDs
   */
  public getItems() {
    
    let query: Subscription;        //Query sub

    let results = this.resultData.queryProps.res
                  .slice(this.resultData.startIndex, this.resultData.endIndex);   //Get the IDs to retrive items for

    for (let item of results) {                            //Already have the information so return
      if (this.resultData.retrievedItems.indexOf(item) > -1) return;
    }

    if (results.length < 1) return;

    this.inProgress = true;                               //Set in progress

    //Get items
    query = this.poeAPI.fetch(results, "?query=" + this.resultData.queryProps.id + "&" + this.resultData.queryProps.psuedos)
    .subscribe((items: any) => {  
      this.resultData.queryData = this.resultData.queryData.concat(items.result);          //Add results   
      this.resultData.retrievedItems = this.resultData.retrievedItems.concat(results);     //Add the IDs as retrieved  

      //Out of progress unsub
      this.inProgress = false;
      query.unsubscribe();
    });
  }

  /**
   * Changes the start and end index depending on the page data
   * 
   * @param pageData 
   *        data passed by the paginator on page change
   */
  public changeIndices(pageData) {
    this.resultData.startIndex = (pageData.pageIndex * 10);
    this.resultData.endIndex = ((pageData.pageIndex * 10) + 10);
    this.resultData.pageIndex = pageData.pageIndex;

    this.getItems();
  }
}
