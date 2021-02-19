import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { poeCategorizedItems } from 'src/app/models/poeCategorizedItems';
import { simpleData } from 'src/app/models/simpleData';
import { PoeService } from 'src/app/services/poe.service';
import { SimpleDataService } from 'src/app/services/simpledata.service';

@Component({
  selector: 'app-typefilters',
  templateUrl: './typefilters.component.html',
  styleUrls: ['./typefilters.component.scss']
})
export class TypefiltersComponent implements OnInit {

  @Input() queryForm: FormGroup;                            //Main query form

  public itemsToSearch: Array<poeCategorizedItems> = [];   //POE items
  public filteredItems: Array<poeCategorizedItems>;        //Filtered results of the items
  public exactMatchFound: boolean;                         //Determines if the given search string has an exact item match

  public itemRarities: Array<simpleData> = [
    {id: '' , text: 'All'},
    {id: 'normal', text: 'Normal'},
    {id: 'magic', text: 'Magic'},
    {id: 'rare', text: 'Rare'},
    {id: 'unique', text: 'Unique'},
    {id: 'uniqueFoil', text: 'Unique Relic'},
    {id: 'nonunique', text: 'Non Unique'}
  ]

  public itemTypes: Array<simpleData> = [ 
    {id: '', text: 'All'},
    {id: 'weapon', text: 'All Weapons'},
    {id: 'weapon.one', text: 'One-Handed Weapon'},
    {id: 'weapon.onemelee', text: 'One-Handed Melee Weapon'},
    {id: 'weapon.twomelee', text: 'Two-Handed Melee Weapon'},
    {id: 'weapon.bow', text: 'Bow'},
    {id: 'weapon.claw', text: 'Claw'},
    {id: 'weapon.dagger', text: 'All Daggers'},
    {id: 'weapon.basedagger', text: 'Base Dagger'},
    {id: 'weapon.runicdagger', text: 'Runic Dagger'},
    {id: 'weapon.oneaxe', text: 'One-Handed Axe'},
    {id: 'weapon.onemace', text: 'One-Handed Mace'},
    {id: 'weapon.onesword', text: 'One-Handed Sword'},
    {id: 'weapon.sceptre', text: 'Sceptre'},
    {id: 'weapon.staff', text: 'All Staffs'},
    {id: 'weapon.basestaff', text: 'Base Staffs'},
    {id: 'weapon.warstaff', text: 'War Staffs'},
    {id: 'weapon.twoaxe', text: 'Two-Handed Axe'},
    {id: 'weapon.twosword', text: 'Two-Handed Sword'},
    {id: 'weapon.wand', text: 'Wand'},
    {id: 'weapon.rod', text: 'Rod'},
    {id: 'armour', text: 'All Armour'},
    {id: 'armour.chest', text: 'Body Armour'},
    {id: 'armour.boots', text: 'Boots'},
    {id: 'armour.gloves', text: 'Gloves'},
    {id: 'armour.helmet', text: 'Helmet'},
    {id: 'armour.shield', text: 'Shield'},
    {id: 'armour.quiver', text: 'Quiver'},
    {id: 'accessory', text: 'Accessory'},
    {id: 'accessory.amulet', text: 'Amulet'},
    {id: 'accessory.belt', text: 'Belt'},
    {id: 'accessory.ring', text: 'Ring'},
    {id: 'accessory.trinket', text: 'Trinket'},
    {id: 'gem', text: 'All Gems'},
    {id: 'gem.activegem', text: 'Skill Gem'},
    {id: 'gem.supportgem', text: 'Support Gem'},
    {id: 'gem.supportgemplus', text: 'Awakened Support Gem'},
    {id: 'jewel', text: 'All Jewels'},
    {id: 'jewel.base', text: 'Base Jewel'},
    {id: 'jewel.abyss', text: 'Abyss Jewel'},
    {id: 'jewel.cluster', text: 'Cluster Jewel'},
    {id: 'flask', text: 'Flask'},
    {id: 'map', text: 'Map'},
    {id: 'map.fragment', text: 'Map Fragment'},
    {id: 'map.scarab', text: 'Scarab'},
    {id: 'watchstone', text: 'Watchstone'},
    {id: 'leaguestone', text: 'Leaguestone'},
    {id: 'prophecy', text: 'Prophecy'},
    {id: 'card', text: 'Divination Card'},
    {id: 'monster.beast', text: 'Beast'},
    {id: 'monster.sample', text: 'Metamorph Sample'},
    {id: 'currency', text: 'All Currencies'},
    {id: 'currency.piece', text: 'Unique Fragment'},
    {id: 'currency.resonator', text: 'Resonator'},
    {id: 'currency.fossil', text: 'Fossil'},
    {id: 'currency.incubator', text: 'Incubator'}
  ]
  

  public search = new FormControl('');

  constructor(private poeAPI: PoeService, public simpleDataService: SimpleDataService) {                    
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
