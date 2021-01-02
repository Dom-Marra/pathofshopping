import { Component, Input, OnInit, Output, ViewEncapsulation, ViewRef, EventEmitter } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { statCategory, StatsearchService } from '../../statsearch.service';

export const filterSearch = (items: any, searchText: string): any => {    //Filters items by search text
  const text = searchText.toLowerCase();

  return items.filter(item => item.text.toLowerCase().indexOf(text) != -1);
}

@Component({
  selector: 'app-statselect',
  templateUrl: './statselect.component.html',
  styleUrls: ['./statselect.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StatselectComponent implements OnInit {

  @Output() newGroupCreated: EventEmitter<null> = new EventEmitter();   //Emmits to the parent the form group was added

  @Input() array: FormArray;                                            //Group to add stats to
  
  public filteredStats: Array<statCategory>;                            //Filtered Stats
  public filteredStatOptions: statCategory['stats'][0]['option'];       //Filtered Stat Options
  public statSelected: boolean = false;                                 //Whether a stat has been selected or not

  public viewRef: ViewRef;                                              //Ref of this component

  public selectedStat: statCategory['stats'][0] = null;                 //the selected stat
  public selectedStatOption: statCategory['stats'][0]['option'][0];     //the selected option

  public statGroup: FormGroup = new FormGroup({                         //holds stat data
    id: new FormControl(),
    value: new FormGroup({
      min: new FormControl(),
      max: new FormControl(),
      option: new FormControl()
    })
  })

  constructor(private statSearch: StatsearchService) { 
    this.filteredStats = this.statSearch.getStats();        //Init stats to search
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
  public filterStats(searchText: string): Array<statCategory> {

    this.filteredStats = this.statSearch.getStats();

    return this.filteredStats.map(statCategory => ({
    category: statCategory.category, 
    stats: filterSearch(statCategory.stats, searchText)
    })).filter(statSearch => statSearch.stats.length > 0);
  }

  /**
   * Filters stat options based on input
   * 
   * @param searchText 
   *        string: text to filter by
   */
  public filterStatOptions(searchText: string) {
    let statOptions = this.selectedStat.option.filter(stat => {
      return stat.text.toLowerCase().indexOf(searchText.toLowerCase()) != -1;
    });

    return statOptions;
  }

  /**
   * Pushes the new stat to the array if it is newly initiated, and resets other form values
   */
  public setStat() {
    if (!this.statSelected) {                         //No previous stat was selected
      this.statSelected = true;                       //Set stat selected to true
      this.array.push(this.statGroup);                //Add stat group to main item form
      this.newGroupCreated.emit(null);                //emmite event for group addition
    } else if (this.selectedStat.option == null) {
      this.statGroup.get('value.option').patchValue('');    //Reset value option field and selected stat option when a minmax option is selected
      this.selectedStatOption = null;
    } else {                                                //reset all value fields when a stat is selected that has options
      this.statGroup.get('value.option').patchValue('');
      this.statGroup.get('value.min').patchValue('');
      this.statGroup.get('value.max').patchValue('');
    }
  }

  /**
   * Deletes this component and removes the stat group from the main item form
   */
  public deleteStatFilter() {
    let index = this.array.controls.indexOf(this.statGroup);
    this.array.removeAt(index);
    this.viewRef.destroy();
  }
}
