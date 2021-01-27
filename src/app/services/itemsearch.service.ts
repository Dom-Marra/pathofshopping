import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface searchItem {
  category: string,
  items: Array<{
    name: string,
    type: string,
    text: string
  }>
}

@Injectable({
  providedIn: 'root'
})
export class ItemsearchService {

  private items: Array<searchItem> = [];                        //Array of items to search from
  private api = "http://localhost:4200/api/trade/data/items";

  constructor(private http: HttpClient) { 

    this.http.get(this.api).subscribe(data => {                 //Get the items
      data['result'].forEach(entry => {                         //Traverse each category
        entry['entries'].forEach(item => {                      //Traverse each entry per category

          let searchItem = this.items.find(item => item.category == entry['label']);    //Get search item if it exists

          if (searchItem != null) {               //push item to category if it exists
            searchItem.items.push({
              name: item['name'],
              type: item['type'],
              text: item['text']});
          } else {                                //if not push new category with the item
            this.items.push({
              category: entry['label'],
              items: [{
                name: item['name'],
                type: item['type'],
                text: item['text']}]
            });
          }

        });
      });
    });
  }

  /**
   * Returns items
   * 
   * @returns
   *        Array<searchItem>: The array of all items to search from
   */
  public getItems(): Array<searchItem> {
    return this.items;
  }
}
