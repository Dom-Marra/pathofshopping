import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ItemSaveData } from '../models/item-save-data.model';
import { ShoppingListSaveData } from '../models/shopping-list-save-data';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FiltersService } from './filters.service';
import { ItemForm } from 'src/app/item-form/classes/item-form';
import { FilterGroup } from 'src/app/item-form/classes/filter-group';
import { takeWhile } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  /** Collection that holds shopping lists */
  private readonly SHOPPING_LIST_CO: string = 'shoppinglists';

  /** Items of the list */
  private items: BehaviorSubject<Array<ItemForm>> = new BehaviorSubject([]);

  /** Name of the list */
  private name: BehaviorSubject<string> = new BehaviorSubject('');

  /** League of the list */
  private league: BehaviorSubject<string> = new BehaviorSubject('');

  /** Filter Group Data */
  private filterGroups: Array<FilterGroup> = [];

  public status: BehaviorSubject<{loaded: boolean, msg?: string}> = new BehaviorSubject(null);

  constructor(private filterService: FiltersService, private afs: AngularFirestore) { 
    this.afs.doc<{groups: any}>('filters/formGroups').get().subscribe(
      doc => {
        if (doc.exists) {

          doc.data().groups.forEach(group => {
            this.filterGroups.push(new FilterGroup(group.name, group.label, group.filters, group.parent));
          });

          this.status.next({loaded: true});
        } else {
          this.status.next({loaded: false, msg: 'Cannot get filter groups'});
        }
      },
      (error) => {
        this.status.error('Cannot connect to the service');
      }
    )
  }

  public getStatus() {
    return this.status.asObservable();
  }

  /**
   * Adds a new Item to the shopping list
   * 
   * @param itemSaveData 
   *        Saved data to initiate the new item with
   */
   public addItem(itemSaveData?: ItemSaveData) {
      let item: ItemForm = new ItemForm(this.filterService.exportFilters(this.filterGroups), itemSaveData);
      this.items.next([...this.items.value, item]);
  }

  /**
   * Deletes an item
   * 
   * @param itemData 
   *        Item to delete
   */
  public deleteItem(itemData: ItemForm): void {
    this.items.value.splice(this.items.value.indexOf(itemData), 1);
    this.items.next(this.items.value);
  }

  /**
   * Returns list items as array
   * 
   * @returns
   *        Array<ItemForm> 
   */
  public getItems(): Observable<Array<ItemForm>> {
    return this.items.asObservable();
  }

  /**
   * Returns the lists league as an observable
   * 
   * @returns 
   *        Observable<string>
   */
  public getLeague(): Observable<string> {
    return this.league.asObservable();
  }

  /**
   * Sets the value of the league
   * 
   * @param league 
   *        String: League ID
   */
  public setLeague(league: string): void {
    this.league.next(league);
  }

  /**
   * Returns the name of the list as an observable
   * 
   * @returns 
   *        Observable<string>
   */
  public getName(): Observable<string> {
    return this.name.asObservable();
  }

  /**
   * Sets the name of the list
   * 
   * @param name 
   *            string
   */
  public setName(name: string) {
    this.name.next(name);
  }

  /**
   * Configures the shopping list properties into savable data
   */
  public exportSaveData(): ShoppingListSaveData {
    let save: ShoppingListSaveData = {
      name: this.name.value,
      league: this.league.value,
      savedItems: []
    }

    this.items.value.forEach(item => {
      save.savedItems.push(item.exportSaveData());
    });

    return save;
  }

  /**
   * Loads a shopping list configuration
   * 
   * @param list 
   *        id of the shopping list document
   */
   public load(list: string) {
    const status: Subject<{loaded: boolean, msg?: string}> = new Subject();
    this.items.next([]);

    this.afs.doc<ShoppingListSaveData>(`${this.SHOPPING_LIST_CO}/${list}`).get().subscribe(
      doc => {
        if (doc.exists) {

          //Add Items
          doc.data().savedItems.forEach((save: ItemSaveData) => {
            this.addItem(save);
          });

          //Set league and name
          this.setName(doc.data().name);
          this.setLeague(doc.data().league);

          status.next({loaded: true});
        } else {
          status.next({loaded: false, msg: 'No such list exists!'});
        }
      },
      error => {
        status.error('Could not load the list!');
      }
    )

    return status.asObservable();
  }

  /**
   * Saves the shopping list to firebase
   */
  public save() {
    return this.afs.collection<ShoppingListSaveData>(this.SHOPPING_LIST_CO).add(this.exportSaveData());
  }
}