import { Component, Input, OnInit, Output, ViewEncapsulation, ViewRef, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { statCategory, StatsearchService } from '../../statsearch.service';

export const filterSearch = (items: Array<string>, searchText: string): Array<string> => {    //Filters items by search text
  const text = searchText.toLowerCase();

  return items.filter(item => item.toLowerCase().indexOf(text) != -1);
}

@Component({
  selector: 'app-statselect',
  templateUrl: './statselect.component.html',
  styleUrls: ['./statselect.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StatselectComponent implements OnInit {

  @Output() newGroupCreated: EventEmitter<null> = new EventEmitter();   //Emmits to the parent the form group was added

  @Input() group: FormGroup;                                            //Group to add stats to
  
  public filteredStats: Array<statCategory>;                            //Filtered Stats

  public statSelected: boolean = false;                                 //Whether a stat has been selected or not

  public viewRef: ViewRef;                                              //Ref of this component

  public statGroup: FormGroup = new FormGroup({                         //Holds stat data
    stat: new FormControl({id: "", text: ""}),
    min: new FormControl,
    max: new FormControl()
  });

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

    if (searchText == '') return this.filteredStats;

    let stats = this.filteredStats.map(statCategory => ({category: statCategory.category, 
    stats: filterSearch(statCategory.stats.map(stat => stat.text), searchText).map(stat => ({id: statCategory.category, text: stat}))})).
    filter(statSearch => statSearch.stats.length > 0);

    return stats;
  }

  /**
   * Adds the stat form group to the main item form
   * 
   * @param statId 
   *        String: id of the stat
   */
  public setStat(statId: string) {

    if (!this.statSelected) {                               //No previous stat was selected
      this.statSelected = true;                                  //Set stat selected to true
      this.group.addControl(statId, this.statGroup);             //Add stat group to main item form
      this.newGroupCreated.emit(null);                           //emmite event for group addition
    } else {                                                //There was a stat previously selected
      this.removeGroupFromParent(this.statGroup.value.stat.id)    //remove the group with the previous ID
      this.group.addControl(statId, this.statGroup);              //add new group with new ID
    }
  }

  /**
   * Removes the stat group from the main item form
   * 
   * @param statId 
   *        String: id of the stat
   */
  public removeGroupFromParent(statId: string) {
    this.group.removeControl(statId);
  }

  /**
   * Deletes this component and removes the stat group from the main item form
   */
  public deleteStatFilter() {
    this.removeGroupFromParent(this.statGroup.value.stat.id);
    this.viewRef.destroy();
  }
}
