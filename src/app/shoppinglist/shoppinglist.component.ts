import { ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  @ViewChildren("shoppingListNameInput") shoppingListNameInput: QueryList<ElementRef>;            //Item name input element
  
  public readonly LEAGUES = leagues;                                //Used for iterating over leagues
  public readonly CURRENCY_TYPES = currencyType;                    //Used fro iterating over currency types

  public editShoppingListName: boolean = false;                     //Whether the shopping list input is disabled or not
  public estCost: number = 0;                                       //Estimated Cost of the items

  public shoppingList = new FormGroup({                             //Shopping list base inputs
    league: new FormControl(Object.keys(this.LEAGUES)[0]),
    budget: new FormControl(0),
    currency: new FormControl(Object.keys(this.CURRENCY_TYPES)[0]),
    name: new FormControl('Your Shopping List')
  })

  constructor(private compResolver: ComponentFactoryResolver, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
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
}
