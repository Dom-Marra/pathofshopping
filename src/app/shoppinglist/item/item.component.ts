import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren, ViewEncapsulation, ViewRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ItemsearchService, searchItem } from '../../itemsearch.service';
import {map, startWith} from 'rxjs/operators';

export const filterSearch = (items: Array<string>, searchText: string): Array<string> => {    //Filters items by search text
  const text = searchText.toLowerCase();

  return items.filter(item => item.toLowerCase().indexOf(text) != -1);
}

enum itemRarities {
  all = 'All',
  normal = 'Normal',
  magic = 'Magic',
  rare = 'Rare',
  unique = 'Unique',
  uniqueFoil = 'Unique Relic',
  nonunique = 'Non Unique'
}

enum itemTypes {
  all = 'All',
  weapon = 'All Weapons',
  'weapon.one' = 'One-Handed Weapon',
  'weapon.onemelee' = 'One-Handed Melee Weapon',
  'weapon.twomelee' = 'Two-Handed Melee Weapon',
  'weapon.bow' = 'Bow',
  'weapon.claw' = 'Claw',
  'weapon.dagger' = 'All Daggers',
  'weapon.basedagger' = 'Base Dagger',
  'weapon.runicdagger' = 'Runic Dagger',
  'weapon.oneaxe' = 'One-Handed Axe',
  'weapon.onemace' = 'One-Handed Mace',
  'weapon.onesword' = 'One-Handed Sword',
  'weapon.sceptre' = 'Sceptre',
  'weapon.staff' = 'All Staffs',
  'weapon.basestaff' = 'Base Staffs',
  'weapon.warstaff' = 'War Staffs',
  'weapon.twoaxe' = 'Two-Handed Axe',
  'weapon.twosword' = 'Two-Handed Sword',
  'weapon.wand' = 'Wand',
  'weapon.rod' = 'Rod',
  'armour' = 'All Armour',
  'armour.chest' = 'Body Armour',
  'armour.boots' = 'Boots',
  'armour.gloves' = 'Gloves',
  'armour.helmet' = 'Helmet',
  'armour.shield' = 'Shield',
  'armour.quiver' = 'Quiver',
  'accessory' = 'Accessory',
  'accessory.amulet' = 'Amulet',
  'accessory.belt' = 'Belt',
  'accessory.ring' = 'Ring',
  'accessory.trinket' = 'Trinket',
  'gem' = 'All Gems',
  'gem.activegem' = 'Skill Gem',
  'gem.supportgem' = 'Support Gem',
  'gem.supportgemplus' = 'Awakened Support Gem',
  'jewel' = 'All Jewels',
  'jewel.base' = 'Base Jewel',
  'jewel.abyss' = 'Abyss Jewel',
  'jewel.cluster' = 'Cluster Jewel',
  'flask' = 'Flask',
  'map' = 'Map',
  'map.fragment' = 'Map Fragment',
  'map.scarab' = 'Scarab',
  'watchstone' = 'Watchstone',
  'leaguestone' = 'Leaguestone',
  'prophecy' = 'Prophecy',
  'card' = 'Divination Card',
  'monster.beast' = 'Beast',
  'monster.sample' = 'Metamorph Sample',
  'currency' = 'All Currencies',
  'currency.piece' = 'Unique Fragment',
  'currency.resonator' = 'Resonator',
  'currency.fossil' = 'Fossil',
  'currency.incubator' = 'Incubator',
}

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemComponent implements OnInit {

  public readonly originalOrder = (): number => {                         //Keeps enums in original order
    return 0;
  }

  public readonly ITEM_TYPES: typeof itemTypes = itemTypes;               //Used for item type selection

  public readonly ITEM_RARITIES: typeof itemRarities = itemRarities;      //Used for item rarity selection

  @ViewChildren("itemNameInput") itemNameInput: QueryList<ElementRef>;    //Item name input element

  private editName: boolean = false;                        //Whether name is in edit mode or not

  private viewRef: ViewRef = null;                          //Reference of the view, used when deleting the component

  private itemsToSearch: Array<searchItem> = [];            //POE items
  private filteredItems: Observable<Array<searchItem>>;     //Filtered results of the items

  public itemForm = new FormGroup({
    itemName: new FormControl('New Item'),
    itemSearch: new FormControl(''),
    itemCategory: new FormControl('all'),
    itemRarity: new FormControl('all')
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
