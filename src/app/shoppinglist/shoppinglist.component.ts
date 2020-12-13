import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Item } from './item';
import { ItemComponent } from './item/item.component';

enum currencyType {
  chaos = "Chaos",
  exalt = "Exalt"
}

enum leagues {
  heist = "Heist",
  heistHC = "Heist HC",
  standard = "Standard",
  standardHC = "Standard HC"
}

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShoppinglistComponent implements OnInit {

  @ViewChild('itemContainerRef', {read: ViewContainerRef}) itemContainerRef: ViewContainerRef;    //Container Ref for adding item components
  @ViewChild(MatAccordion) accordion: MatAccordion;                                               //Accordion component which wraps the item components

  public readonly LEAGUES = leagues;                                //Used for iterating over leagues
  public readonly CURRENCY_TYPES = currencyType;                    //Used fro iterating over currency types

  private editShoppingListName: boolean = false;                    //Whether the shopping list input is disabled or not

  private budget: number = 0;                                       //Users budget
  private estCost: number = 0;                                      //Estimated Cost of the items
  private budgetCurrencyType: currencyType = currencyType.chaos;    //Type of currency to use for items
  private shoppingListName: string = "Your Shopping List";          //Name of the shopping list
  private league: leagues = leagues.heist;                          //League to use for indexing items

  constructor(private compResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  /**
   * Adds a new Item Component
   * 
   * @param itemData 
   *        Item: data to bind when creating the item
   */
  public addItem(itemData?: Item) {
    const newItemComp = this.compResolver.resolveComponentFactory(ItemComponent);
    const componentRef = this.itemContainerRef.createComponent(newItemComp);
    
    componentRef.instance.setViewRef(componentRef.hostView);
    //TODO: Add item data
    //if (item) componentRef.instance;
  }

  /**
   * Returns the budget of the shopping list
   * 
   * @returns 
   *          number: amount of budget
   */
  public getBudget(): number {
    return this.budget;
  }

  /**
   * Sets the budget amount for the shopping list
   * 
   * @param amount  
   *        number: the amount of the budget 
   */
  public setBudget(amount: number) {
    this.budget = amount;
  }

  /**
   * Returns the estimated cost of the shopping list
   * 
   * @returns
   *         number: amount of estimated cost
   */
  public getEstCost(): number {
    return this.estCost;
  }

  /**
   * Sets the estimated cost of the shopping list
   * 
   * @param amount 
   *        number: amount of the estimated cost
   */
  public setEstCost(amount: number) {
    this.estCost = amount;
  }

  /**
   * Returns the budget currency type for the shopping list
   * 
   * @returns
   *        currencyType: the type of currency
   */
  public getBudgetCurrencyType(): currencyType {
    return this.budgetCurrencyType;
  }

  /**
   * Sets the currency type of the shopping list
   * 
   * @param currencyType
   *        currencyType: the type of currency 
   */
  public setBudgetCurrencyType(currencyType: currencyType) {
    this.budgetCurrencyType = currencyType;
  }

  /**
   * Returns the name of the shopping list
   * 
   * @returns
   *        string: name of the shopping list
   */
  public getShoppingListName(): string {
    return this.shoppingListName;
  }

  /**
   * Sets the name of the shopping list
   * 
   * @param name
   *            string: name of the shopping list 
   */
  public setShoppingListName(name: string) {
    this.shoppingListName = name;
  }

  /**
   * Returns whether the shopping list name is in edit mode or not
   * 
   * @returns
   *        Boolean
   */
  public getEditShoppingListName() {
    return this.editShoppingListName;
  }

  /**
   * Sets whether the shopping list name is editable or not
   * 
   * @param edit 
   *        Boolean
   */
  public setEditShoppingListName(edit: boolean) {
    this.editShoppingListName = edit;
  }

  /**
   * Returns the league type for indexing items
   * 
   * @returns
   *        leagues: the league type
   */
  public getLeague(): leagues {
    return this.league;
  }

  /**
   * Sets the league type for indexing the items for the shopping list
   * 
   * @param leagueType 
   *                  leagues: the type of league
   */
  public setLeague(leagueType: leagues) {
    this.league = leagueType;
  }
}
