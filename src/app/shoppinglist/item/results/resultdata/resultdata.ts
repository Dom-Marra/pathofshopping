export interface queryProps {
  psuedos: string,
  res: Array<string>,
  total: number,
  inexact: boolean,
  id: string,
}

export class Resultdata {

  public startIndex = 0;                              //Start index of items to display 
  public endIndex = 10;                               //End index of items to display
  public pageIndex = 0;                               //Index of paginators
  public queryData: Array<any> = [];                  //The current query data to display
  public retrievedItems: Array<string> = [];         //Item IDs already fetched

  
  public queryProps: queryProps;                       //Data pertaining to the current query

  /**
   * Clears the results properties to default
   */
  public reset() {
    this.queryProps = null;
    this.startIndex = 0;
    this.endIndex = 10;
    this.pageIndex = 0;
    this.queryData = [];
    this.retrievedItems = [];
  }
}
