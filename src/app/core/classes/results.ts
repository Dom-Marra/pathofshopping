import { FetchedProperties } from "../models/fetchedproperties.model";

interface PageData {
  startIndex: number,
  endIndex: number,
  pageIndex: number
}

export class Results {

  public pageData: PageData;                         //Data for pages             
  public retrievedItems: Array<any> = [];           //Item IDs already fetched

  constructor(public fetchedResults: FetchedProperties) {
    this.setPageData(0);
  }

  /**
   * Sets the properties of the pageData object
   * 
   * @param pageIndex
   *        number: index of the page 
   */
  public setPageData(pageIndex: number) {
    let index = Math.floor(pageIndex);
    
    this.pageData = {
      startIndex: index * 10,
      endIndex: index * 10 + 10,
      pageIndex: index
    }
  }
  
  /**
   * Adds items to the array of retrieved items
   * 
   * @param items
   *        the items which have been retrieved from the poe API to add
   */
  public addRetrievedItems(items: Array<any>) {
    this.retrievedItems = this.retrievedItems.concat(items);     //Add the IDs as retrieved  
  }
}