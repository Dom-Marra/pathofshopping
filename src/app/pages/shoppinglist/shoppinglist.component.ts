import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LeaguesService, leagueData } from '../../services/leagues.service';
import { Item } from '../../classes/itemdata/item';
import { itemSaveData } from 'src/app/models/itemSaveData';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.scss']
})
export class ShoppinglistComponent implements OnInit {

  @ViewChildren("shoppingListNameInput") shoppingListNameInput: QueryList<ElementRef>;            //Item name input element
  
  public LEAGUES: leagueData;                                       //Used for iterating over leaguess
  public editShoppingListName: boolean = false;                     //Whether the shopping list input is disabled or not
  public items: Array<Item> = [];                                   //Stores item data

  public shoppingList = new FormGroup({                             //Shopping list base inputs
    league: new FormControl(),
    name: new FormControl('Your Shopping List')
  })

  constructor(private cd: ChangeDetectorRef, private league: LeaguesService) { 
    this.LEAGUES = this.league.getLeagues();
    this.addItem();
  }

  ngOnInit(): void {
  }

  ngDoCheck() {
    if (this.shoppingList.controls.league.value == null && Object.keys(this.LEAGUES).length > 0) {
      this.shoppingList.controls.league.patchValue(this.LEAGUES[Object.keys(this.LEAGUES)[0]]);
    }
  }

  ngAfterViewInit() {
    this.shoppingListNameInput.changes.subscribe(() => {        //focus name input element after processed by ngIf
      
      if (this.editShoppingListName) {
        this.shoppingListNameInput.first.nativeElement.focus();
        this.cd.detectChanges();
      }
    });
  }

  /**
   * Adds a new Item to the shopping list
   * 
   * @param itemSaveData 
   *        Saved data to initiate the new item with
   */
  public addItem(itemSaveData?: itemSaveData) {
    let item: Item = new Item(itemSaveData);
    this.items.push(item);
  }

  /**
   * Deletes an item
   * 
   * @param itemData 
   *        Item to delete
   */
  public deleteItem(itemData: Item) {
    this.items.splice(this.items.indexOf(itemData), 1);
  }
}