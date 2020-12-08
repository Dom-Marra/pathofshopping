import { Component, OnInit } from '@angular/core';

enum currencyType {
  chaos,
  exalt
}

enum leagues {
  heist,
  heistHC,
  standard,
  standardHC
}

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.scss']
})
export class ShoppinglistComponent implements OnInit {

  private budget: number = 0;                                       //Users budget
  private estCost: number = 0;                                      //Estimated Cost of the items
  private budgetCurrencyType: currencyType = currencyType.chaos;    //Type of currency to use for items
  private shoppingListName: string = "Your Shopping List";          //Name of the shopping list
  private league: leagues = leagues.heist;                          //League to use for indexing items

  constructor() { }

  ngOnInit(): void {
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
