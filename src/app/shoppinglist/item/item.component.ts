import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren, ViewEncapsulation, ViewRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ItemsearchService, searchItem } from '../../itemsearch.service';
import {map, startWith} from 'rxjs/operators';

export const filterSearch = (items: Array<string>, searchText: string): Array<string> => {    //Filters items by search text
  const text = searchText.toLowerCase();

  return items.filter(item => item.toLowerCase().indexOf(text) != -1);
}

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemComponent implements OnInit {

  @ViewChildren("itemNameInput") itemNameInput: QueryList<ElementRef>;    //Item name input element

  private editName: boolean = false;                      //Whether name is in edit mode or not

  private viewRef: ViewRef = null;                        //Reference of the view, used when deleting the component

  private itemsToSearch: Array<searchItem> = [];          //POE items
  private filteredItems: Observable<Array<searchItem>>;   //Filtered results of the items

  public itemForm = new FormGroup({
    itemName: new FormControl('New Item'),
    itemSearch: new FormControl(''),
    itemCategory: new FormControl('All'),
    itemRarity: new FormControl('All')
  });

  constructor(private cd: ChangeDetectorRef, private itemSearch: ItemsearchService) { 
    this.itemsToSearch = this.itemSearch.getItems();                            //Init items to search

    this.filteredItems = this.itemForm.controls.itemSearch.valueChanges.pipe(   //filter items when item search changes
      startWith(''),
      map(searchText => this.filterGroups(searchText))
    );
  }

  ngAfterViewInit() {
    this.itemNameInput.changes.subscribe(() => {        //focus name input element after processed by ngIf
      
      if (this.editName) {
        this.itemNameInput.first.nativeElement.focus();
        this.cd.detectChanges();
      }
    })
  }

  ngOnInit(): void {
  }

  /**
   * Filters the items from each category of the search items
   * 
   * @param searchText
   *        string: text to filter by
   * 
   * @returns 
   *       Array<searchItem>: The filtered results
   */
  private filterGroups(searchText: string): Array<searchItem> {

    if (searchText != '') {
      return this.itemsToSearch.map(searchItem => ({category: searchItem.category, items: filterSearch(searchItem.items, searchText)}))
      .filter(searchItem => searchItem.items.length > 0);
    } else {
      return [];
    }
  }

  /**
   * Returns filtered items
   * 
   * @returns
   *        Observable<Array<searchItem>>: The filtered results of the search items
   */
  public getFilteredItems(): Observable<Array<searchItem>> {
    return this.filteredItems;
  }

  /**
   * Sets editName
   * 
   * @param edit
   *        boolean: whether to edit or not 
   */
  public setEditName(edit: boolean) {
    this.editName = edit;
  }

  /**
   * Retursn editName
   * 
   * @returns
   *        boolean: whether to edit or not
   */
  public getEditName(): boolean {
    return this.editName;
  }

  /**
   * Sets the View Ref variable
   * 
   * @param ref
   *        ViewRef: The view of this component 
   */
  public setViewRef(ref: ViewRef) {
    this.viewRef = ref;
  }

  /**
   * Returns the view ref
   * 
   * @returns
   *        ViewRef: The view of this component
   */
  public getViewRef(): ViewRef {
    return this.viewRef;
  }

  /**
   * Destroys this component
   */
  public remove() {
    this.viewRef.destroy();
  }
}
