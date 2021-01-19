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
   * Clears the queryProps
   */
  public clearQueryProps() {
    this.queryProps = null;
  }
}
