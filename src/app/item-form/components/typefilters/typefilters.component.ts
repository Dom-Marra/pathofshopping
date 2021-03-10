import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { item, poeCategorizedItems } from 'src/app/core/models/poeAPIItems';
import { simpleData } from 'src/app/core/models/simpleData';
import { PoeService } from 'src/app/core/services/poe.service';
import { SimpleDataService } from 'src/app/core/services/simpledata.service';

@Component({
  selector: 'itemForm-typefilters',
  templateUrl: './typefilters.component.html',
  styleUrls: ['./typefilters.component.scss']
})
export class TypefiltersComponent implements OnInit {

  @Input() queryForm: FormGroup;                            //Main query form

  public itemsToSearch: Array<poeCategorizedItems> = [];   //POE items
  public filteredItems: Array<poeCategorizedItems>;        //Filtered results of the items
  public matchedText: string = '';                         //Name of an items text if macthed with search

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

  public customItemSearch: poeCategorizedItems = {      //Custom search item
    label: 'Custom Search',
    entries: [ { name: '', type: '', text: '' } ]
  };

  constructor(private poeAPI: PoeService, public simpleDataService: SimpleDataService) {                    
    this.itemsToSearch = this.poeAPI.getItems();            //Init items to search
  }

  ngOnInit(): void {
  }

  /**
   * Returns item text value
   * 
   * @param item
   *        item to extract the text value from 
   */
  public displayItemBy(item: item): string {
    return item.text;
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
    if (itemName || itemType) itemTerm = null;

    //Patch values
    this.queryForm.controls.name.patchValue(itemName ? itemName : '');
    this.queryForm.controls.type.patchValue(itemType ? itemType : '');
    this.queryForm.controls.term.patchValue(itemTerm ? itemTerm : '');
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
  public filterGroups(searchText: string, values: Array<poeCategorizedItems>): Array<poeCategorizedItems> {

    let shift: boolean;                                   //Whether the custom search should be shifted

    this.customItemSearch.entries[0].text = searchText;     //Update custom search text

    if (!searchText) return values;                       //search is empty return all values

    const text = searchText.toLowerCase().trim().split(/\s+/);    //Format search text

    let res = values.map(searchItem => ({
      label: searchItem.label, 
      entries: searchItem.entries.filter(item => {

        //Exact match found or the the trimmed text is empty so the custom search will be shifted
        if ((searchText.toLowerCase().trim() == item.text.toLocaleLowerCase() && item != this.customItemSearch.entries[0]) || 
            searchText.trim() === '' || !searchText) {
          this.matchedText = item ? item.text : '';
          shift = true;
        }

        return text.filter(text => {    //Filter items
          return item.text.toLowerCase().indexOf(text) != -1;
        }).length == text.length;
      })
    })).filter(searchItem => searchItem.entries.length > 0);

    this.shiftCustomSearch(shift, res);       //Perform shift

    return res;
  }

  /**
   * Will either shift or unshift the custom search object from the given array
   * 
   * @param shift
   *        boolean: whether to shift or unshift 
   * @param values 
   *        Array<poeCategorizedItem>: array to unshift from
   */
  private shiftCustomSearch(shift: boolean, values: Array<poeCategorizedItems>) {
    if (values.indexOf(this.customItemSearch) == 0 && shift) {
      values.shift();
    } else if (values.indexOf(this.customItemSearch) == -1 && !shift) {
      values.unshift(this.customItemSearch);
    }
  }
}
