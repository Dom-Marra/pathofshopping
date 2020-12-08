import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.scss']
})
export class ShoppinglistComponent implements OnInit {

  private budget: number = 0;                                   //Users budget
  private estCost: number = 0;                                  //Estimated Cost of the items
  private budgetCurrencyType = null;                            //Type of currency to use for items
  private shoppingListName: string = "Your Shopping List";      //Name of the shopping list
  private league = null;                                        //League to use for indexing items

  constructor() { }

  ngOnInit(): void {
  }

}
