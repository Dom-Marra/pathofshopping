import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { poeCategorizedItems } from 'src/app/models/poeCategorizedItems';
import { PoeService } from 'src/app/services/poe.service';

enum itemRarities {
  '' = 'All',
  normal = 'Normal',
  magic = 'Magic',
  rare = 'Rare',
  unique = 'Unique',
  uniqueFoil = 'Unique Relic',
  nonunique = 'Non Unique'
}

enum itemTypes {
  '' = 'All',
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
  selector: 'app-typefilters',
  templateUrl: './typefilters.component.html',
  styleUrls: ['./typefilters.component.scss']
})
export class TypefiltersComponent implements OnInit {

  public readonly ITEM_TYPES: typeof itemTypes = itemTypes;               //Used for item type selection
  public readonly ITEM_RARITIES: typeof itemRarities = itemRarities;      //Used for item rarity selection

  @Input() queryForm: FormGroup;                            //Main query form

  public itemsToSearch: Array<poeCategorizedItems> = [];   //POE items
  public filteredItems: Array<poeCategorizedItems>;        //Filtered results of the items
  public filteredTypes: Array<typeof itemTypes>;           //Filtered item types
  public filteredRarities: Array<typeof itemRarities>;     //filtered item rarities
  public exactMatchFound: boolean;                         //Determines if the given search string has an exact item match

  public search = new FormControl('');

  constructor(private poeAPI: PoeService) {                    
    this.itemsToSearch = this.poeAPI.getItems();            //Init items to search
  }

  ngOnInit(): void {
    if (this.queryForm.controls.term.value?.length > 0) {
      this.search.patchValue(this.queryForm.controls.term.value);
    } else {
      if (this.queryForm.controls.name.value?.length > 0) this.search.patchValue(this.queryForm.controls.name.value, {emitEvent: false});
      if (this.queryForm.controls.type.value?.length > 0) this.search.patchValue(this.search.value + " " + this.queryForm.controls.type.value, {emitEvent: false});
    }

    this.queryForm.valueChanges.subscribe(() => {
      if (!(this.queryForm.controls.term.value || this.queryForm.controls.type.value || this.queryForm.controls.name.value)) this.search.reset('')
    });

    this.filteredItems = this.filterGroups(this.search.value);
  }

  /**
   * Processes the selected item from the item search autofill
   */
  public selectItem(item: poeCategorizedItems["items"][0]) {
    this.search.patchValue(item.text);              //Set search
    this.setNTT(item.name, item.type, item.text);
  }

  /**
   * Sets the name, term and type for the query form depending on inputted name & type, or 
   * the search value
   * 
   * @param itemName
   *        string: the items name 
   * @param itemType 
   *        string: the items type
   * @param itemTerm
   *        string: term for the search
   */
  public setNTT(itemName?: string, itemType?: string, itemTerm?: string) {

    if (!itemName && !itemType && itemTerm) {
      let itemCats = this.filterGroups(itemTerm);     //Filter items based on input

      //Check if input exactly matches only 1 item, then set the item name and type
      if (itemCats.length == 1 && itemCats[0].items.length == 1 && itemCats[0].items[0].text.toLocaleLowerCase() == itemTerm.toLocaleLowerCase()) {
        itemName = itemCats[0].items[0].name;
        itemType = itemCats[0].items[0].type;
      } 
    } else {
      this.search.patchValue(itemTerm);
    }

    if (itemName || itemType) itemTerm = null;

    //Patch values
    this.queryForm.controls.name.patchValue(itemName ? itemName : '', {emitEvent: false});
    this.queryForm.controls.type.patchValue(itemType ? itemType : '', {emitEvent: false});
    this.queryForm.controls.term.patchValue(itemTerm ? itemTerm : '', {emitEvent: false});
  }
  
  /**
   * Filters the items from each category of the search items
   * 
   * @param searchText
   *        string: text to filter by
   * 
   * @returns 
   *       Array<poeCategorizedItems>: The filtered results
   */
  public filterGroups(searchText: string): Array<poeCategorizedItems> {

    if (!searchText) return this.itemsToSearch;     //Return whole list on empty search

    this.exactMatchFound = null;

    return this.itemsToSearch.map(searchItem => ({category: searchItem.category, items: this.filterSearch(searchItem.items, searchText)}))
    .filter(searchItem => searchItem.items.length > 0);
  }

  /**
   * Filters the items with a given search string, and sets the exact match found variable based on results
   * 
   * @param items 
   *        Array of items to search
   * @param searchText 
   *        search string
   */
  public filterSearch(items: poeCategorizedItems['items'], searchText: string): poeCategorizedItems['items'] {    //Filters items by search text
    if (typeof searchText != 'string') return items;
  
    const text = searchText.toLowerCase().trim().split(/\s+/);
  
    return items.filter(item => {
      return text.filter(text => {

        if (searchText.toLowerCase().trim() == item.text.toLocaleLowerCase()) {
          this.exactMatchFound = true;
        } else if (!this.exactMatchFound) {
          this.exactMatchFound = false;
        }
        
        if (text.length > 0) {
          return item.text.toLowerCase().indexOf(text) != -1;
        }
        
        return false;
      }).length == text.length;
    });
  }
}
