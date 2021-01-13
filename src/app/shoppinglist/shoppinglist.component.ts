import { ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { LeaguesService, leagueData } from '../leagues.service';
import { Item } from './item';
import { ItemComponent } from './item/item.component';

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
  
  public LEAGUES: leagueData;                                       //Used for iterating over leaguess
  public object: Object = Object;
  public editShoppingListName: boolean = false;                     //Whether the shopping list input is disabled or not

  public shoppingList = new FormGroup({                             //Shopping list base inputs
    league: new FormControl(),
    name: new FormControl('Your Shopping List')
  })

  constructor(private compResolver: ComponentFactoryResolver, private cd: ChangeDetectorRef, private league: LeaguesService) { 
    this.LEAGUES = this.league.getLeagues();
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
   * Adds a new Item Component
   * 
   * @param itemData 
   *        Item: data to bind when creating the item
   */
  public addItem(itemData?: Item) {
    const newItemComp = this.compResolver.resolveComponentFactory(ItemComponent);
    const componentRef = this.itemContainerRef.createComponent(newItemComp);
    
    componentRef.instance.setViewRef(componentRef.hostView);
    componentRef.instance.league = Object.keys(this.LEAGUES).find(key => this.LEAGUES[key] == this.shoppingList.controls.league.value);

    this.shoppingList.controls.league.valueChanges.subscribe(value => {
      componentRef.instance.league = Object.keys(this.LEAGUES).find(key => this.LEAGUES[key] == value);
    })
    
    //TODO: Add item data
    //if (item) componentRef.instance;
  }
}
