import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { item, PoeCategorizedItems } from 'src/app/core/models/poe-api-item.model';
import { PoeService } from 'src/app/core/services/poe.service';

@Component({
  selector: 'pos-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.scss']
})
export class ItemSearchComponent implements OnInit {

  @Input() queryForm: FormGroup;                            //Main query form

  public itemsToSearch: Array<PoeCategorizedItems> = [];   //POE items
  public filteredItems: Array<PoeCategorizedItems>;        //Filtered results of the items
  public matchedText: string = '';                         //Name of an items text if macthed with search

  public customItemSearch: PoeCategorizedItems = {      //Custom search item
    label: 'Custom Search',
    entries: [ { name: '', type: '', text: '' } ]
  };

  constructor(private poeAPI: PoeService) {                    
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
  public filterGroups(searchText: string, values: Array<PoeCategorizedItems>): Array<PoeCategorizedItems> {

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
  private shiftCustomSearch(shift: boolean, values: Array<PoeCategorizedItems>) {
    if (values.indexOf(this.customItemSearch) == 0 && shift) {
      values.shift();
    } else if (values.indexOf(this.customItemSearch) == -1 && !shift) {
      values.unshift(this.customItemSearch);
    }
  }
}