import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  private items: Array<Item> = [];

  constructor() { }

  /**
   * Adds an item to the array of items
   * 
   * @param item
   *        Item: the item to add 
   */
  public addItem(item: Item) {
    this.items.push(item);
  }

  /**
   * Returns the observable of items
   * 
   * @returns
   *        Observable<Array<Item>>: the items
   */
  public getItems(): Observable<Array<Item>> {
    return of(this.items);
  }
}
