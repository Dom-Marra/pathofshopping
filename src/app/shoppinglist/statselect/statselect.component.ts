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

  public statSelected: boolean = false;                                 //Whether a stat has been selected or not

  public viewRef: ViewRef;                                              //Ref of this component

  public selectedStat: any = null;                             //the selected stat

  public statGroup: FormGroup = new FormGroup({                         //holds stat data
    id: new FormControl(),
    value: new FormGroup({
      min: new FormControl(),
      max: new FormControl()
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
   * Adds the stat form group to the stats filter array
   */
  public setStat() {
    if (!this.statSelected) {             //No previous stat was selected
      this.statSelected = true;           //Set stat selected to true
      this.array.push(this.statGroup);    //Add stat group to main item form
      this.newGroupCreated.emit(null);    //emmite event for group addition
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
