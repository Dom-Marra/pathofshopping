import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ItemsearchService, searchItem } from 'src/app/shoppinglist/filters/typefilters/services/itemsearch.service';

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

export const filterSearch = (items: searchItem['items'], searchText: string): searchItem['items'] => {    //Filters items by search text
  const text = searchText.toLowerCase().trim().split(/\s+/);

  return items.filter(item => {
    return text.filter(text => {
      
      if (text.length > 0) {
        return item.text.toLowerCase().indexOf(text) != -1;
      }
      
      return false;
    }).length == text.length;
  });
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
    search: new FormControl(''),
    term: new FormControl(),
    type: new FormControl(),
    name: new FormControl(),
    cat_rar: new FormGroup({
      filters: new FormGroup({
        category: new FormGroup({
          option: new FormControl('')
        }),
        rarity: new FormGroup({
          option: new FormControl('')
        }),
      })
    })
  });

  constructor(private itemSearch: ItemsearchService) { 
    this.itemsToSearch = this.itemSearch.getItems();                            //Init items to search

    this.filteredItems = this.typeFilters.controls.search.valueChanges.pipe(    //filter items when item search changes
      startWith(''),
      map(searchText => this.filterGroups(searchText))
    );

    this.typeFilters.controls.search.valueChanges.subscribe(value => {          //Update term, type, and name controls
      let filtered = this.filterGroups(value);             //filtered value of the search
      let items = filtered[0]?.items;                     //first item
      
      if (filtered.length == 1 && items.length == 1) {      //Update name, and type of found item, also clear term if only one item found
        if (items[0].name) this.typeFilters.controls.name.patchValue(items[0].name);
        this.typeFilters.controls.type.patchValue(items[0].type);
        this.typeFilters.controls.term.patchValue('');
      } else if (this.typeFilters.controls.type.value != '' || this.typeFilters.controls.name.value != '') { 
        this.typeFilters.controls.type.patchValue('');          //clear type control
        this.typeFilters.controls.name.patchValue('');          //clear name control
        this.typeFilters.controls.term.patchValue(value);       //set term control
      }
    })
  }

  ngOnInit(): void {
    if ((this.itemForm.get('query.filters') as FormGroup).controls['type_filters']) {
      this.typeFilters.controls['cat_rar'] = (this.itemForm.get('query.filters') as FormGroup).controls['type_filters'];
    } else {
      (this.itemForm.get('query.filters') as FormGroup).addControl('type_filters', this.typeFilters.get('cat_rar'));
    }

    if ((this.itemForm.get('query') as FormGroup).controls['term']?.value?.length > 0) {
      this.typeFilters.controls.term = (this.itemForm.get('query') as FormGroup).controls['term'];
      this.typeFilters.controls.search.patchValue(this.typeFilters.controls.term.value);
    } else {
      (this.itemForm.get('query') as FormGroup).addControl('term', this.typeFilters.controls.term);

      if ((this.itemForm.get('query') as FormGroup).controls['name']?.value?.length > 0) {
        this.typeFilters.controls.name = (this.itemForm.get('query') as FormGroup).controls['name'];
        this.typeFilters.controls.search.patchValue(this.typeFilters.controls.name.value);
      } else {
        (this.itemForm.get('query') as FormGroup).addControl('name', this.typeFilters.controls.name);
      }

      if ((this.itemForm.get('query') as FormGroup).controls['type']?.value?.length > 0) {
        this.typeFilters.controls.type = (this.itemForm.get('query') as FormGroup).controls['type'];
        this.typeFilters.controls.search.patchValue(this.typeFilters.controls.search.value + " " + this.typeFilters.controls.type.value);
      } else {
        (this.itemForm.get('query') as FormGroup).addControl('type', this.typeFilters.controls.type);
      }
    }
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
