import { Component, Input, OnInit, Output, ViewEncapsulation, EventEmitter } from '@angular/core';
import { statCategory, StatsearchService } from '../statsearch.service';
import { Stat } from './stat/stat';

export const filterSearch = (items: any, searchText: string): any => {    //Filters items by search text
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
  selector: 'app-statselect',
  templateUrl: './statselect.component.html',
  styleUrls: ['./statselect.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StatselectComponent implements OnInit {

  @Output() statRemoved: EventEmitter<Stat> = new EventEmitter<Stat>();  //Transmits event for removal of the stat
  @Input() isWeight: boolean = false;                                    // Whether this stat is under a wieghted sum filter group
  @Input() stat: Stat;                                                   //Stat that belongs to this selector
  
  public filteredStats: Array<statCategory>;                            //Filtered Stats
  public filteredStatOptions: statCategory['stats'][0]['option'];       //Filtered Stat Options

  constructor(private statSearch: StatsearchService) { 
    this.filteredStats = this.statSearch.getStats();                    //Init stats to search
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes) {
    if (changes.isWeight) {                         //Toggle weighted on isWeighted change
      this.stat?.makeWeighted(this.isWeight);
    }
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
    let statOptions = this.stat.selectedStat.option.filter(stat => {
      return stat.text.toLowerCase().indexOf(searchText.toLowerCase()) != -1;
    });

    return statOptions;
  }

  /**
   * Sets the stat
   */
  public setStat(stat: statCategory['stats'][0]) {
    this.stat.setStat(stat);
  }

  /**
   * Sets the stat option
   * 
   * @param option 
   *        option to set
   */
  public setStatOption(option: statCategory['stats'][0]['option'][0]) {
    this.stat.setStatOption(option);
  }

  /**
   * Triggers the stat removed event with the stat to remove as the payload
   */
  public deleteStatFilter() {
    this.statRemoved.emit(this.stat);
  }
}
