import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface searchItem {
  category: string,
  name: string
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

          this.items.push({                                     //push the item
            category: entry['label'],
            name: item['text']
          })
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
