import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SortProperties } from '../models/sort-properties';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  private sort: BehaviorSubject<SortProperties> = new BehaviorSubject<SortProperties>({
    sortKey: 'price',
    sortValue: 'asc'
  });

  constructor() { }

  /**
   * Returns the sort properties as an observable
   * 
   * @returns 
   *        Observable
   */
  public getSort() {
    return this.sort.asObservable();
  }

  /**
   * Sets the control and value for the sort formgroup
   * 
   * @param key
   *        sort key, for example the hash of a stat
   * @param value 
   *        sort value, either 'asc' for ascending, or 'desc' for descending
   */
   public newSort(key: string, value?: 'asc' | 'desc'): void {
    let currentSort = this.sort.value.sortKey;
    let newSortValue: 'asc' | 'desc';

    if (!value && currentSort != key) {                         //Set the value for the sort to desc if its a new sort
      value = 'desc';
      newSortValue = 'desc';
    } else if (currentSort == key && !value) {      //Switch the value for the sort if the sort is the same but no value is provided
      this.sort.value.sortValue == 'asc' ? value = 'desc' : value = 'asc';
      newSortValue = value;
    }

    if (currentSort == key) this.sort.next({sortKey: this.sort.value.sortKey, sortValue: value});
    else this.sort.next({sortKey: key, sortValue: value});
  }
}
