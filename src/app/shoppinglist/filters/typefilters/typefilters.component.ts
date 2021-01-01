import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ItemsearchService, searchItem } from 'src/app/itemsearch.service';

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

export const filterSearch = (items: Array<string>, searchText: string): Array<string> => {    //Filters items by search text
  const text = searchText.toLowerCase();

  return items.filter(item => item.toLowerCase().indexOf(text) != -1);
}

@Component({
  selector: 'app-typefilters',
  templateUrl: './typefilters.component.html',
  styleUrls: ['./typefilters.component.scss']
})
export class TypefiltersComponent implements OnInit {

  public readonly ITEM_TYPES: typeof itemTypes = itemTypes;               //Used for item type selection
  public readonly ITEM_RARITIES: typeof itemRarities = itemRarities;      //Used for item rarity selection

  @Input() itemForm: FormGroup;                                           //Main item form

  public itemsToSearch: Array<searchItem> = [];            //POE items
  public filteredItems: Observable<Array<searchItem>>;     //Filtered results of the items
  public filteredTypes: Array<typeof itemTypes>;           //Filtered item types
  public filteredRarities: Array<typeof itemRarities>;     //filtered item rarities

  public typeFilters: FormGroup = new FormGroup({
    term: new FormControl(''),
    cat_rar: new FormGroup({
      filters: new FormGroup({
        category: new FormControl('all'),
        rarity: new FormControl('all')
      })
    })
  });

  constructor(private itemSearch: ItemsearchService) { 
    this.itemsToSearch = this.itemSearch.getItems();                            //Init items to search

    this.filteredItems = this.typeFilters.controls.term.valueChanges.pipe(                   //filter items when item search changes
      startWith(''),
      map(searchText => this.filterGroups(searchText))
    );
  }

  ngOnInit(): void {
    this.itemForm.addControl('type_filters', this.typeFilters.get('cat_rar'));
    this.itemForm.addControl('term', this.typeFilters.controls.term);
  }

  /**
   * Filters enumeration objects based on search text
   * 
   * @param searchText
   *        string: search text 
   * @param enumToFilter 
   *        typeof enum: the enumeration to filter
   */
  public filterEnums(searchText: string, enumToFilter: any): Array<any> {
    const text = searchText.toLowerCase();

    return Object.keys(enumToFilter).filter(key => enumToFilter[key].toLowerCase().indexOf(text.toLocaleLowerCase()) != -1);
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
}
