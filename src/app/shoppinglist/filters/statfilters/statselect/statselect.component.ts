import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { StatForm } from 'src/app/shoppinglist/item/shared/stat-form';
import { statCategory, StatsearchService } from '../services/statsearch.service';

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
  styleUrls: ['./statselect.component.scss']
})
export class StatselectComponent implements OnInit {

  @Output() statRemoved: EventEmitter<StatForm> = new EventEmitter<StatForm>();     //Transmits event for removal of the stat
  @Input() isWeight: boolean = false;                                               //Whether this stat is under a wieghted sum filter group
  @Input() statGroup: StatForm;                                                     //Stat data that belongs to this selector
  
  public filteredStats: Array<statCategory>;                            //Filtered Stats
  public filteredStatOptions: statCategory['stats'][0]['option'];       //Filtered Stat Options

  constructor(private statSearch: StatsearchService, private fb: FormBuilder) { 
    this.filteredStats = this.statSearch.getStats();                    //Init stats to search
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes) {
    if (changes.isWeight) {                         //Toggle weighted on isWeighted change
      this.makeWeighted(this.isWeight);
    }
  }

  ngAfterContentChecked() {
    if (this.statGroup.controls.disabled.value && this.statGroup.enabled) {
      this.statGroup.disable();
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
    let statOptions = this.statGroup.controls.selectedStat.value.option.filter(stat => {
      return stat.text.toLowerCase().indexOf(searchText.toLowerCase()) != -1;
    });

    return statOptions;
  }

  /**
     * Will add a weight form control if the isWeighted value is true,
     * or remove it if false.
     * 
     * @param isWeighted 
     */
    public makeWeighted(isWeighted: boolean) {
      if (isWeighted) {
          (this.statGroup.get('value') as FormGroup).addControl('weight', new FormControl());
      } else if (!isWeighted && this.statGroup.get('value.weight')) {
          (this.statGroup.get('value') as FormGroup).removeControl('weight');
      }
  }

  /**
   * Patches the stats id, and sets the selected stat.
   * 
   * Will reset option control in value form group if the stat is min max based,
   * or reset the min max controls in said form group if said stat is option based
   */
  public setStat(stat: statCategory['stats'][0]) {
      this.statGroup.controls.id.patchValue(stat.id);
      this.statGroup.controls.selectedStat.patchValue(stat);

      if (this.statGroup.controls.selectedStat.value.option == null) {
          this.statGroup.get('value.option').patchValue('');     //Reset value option field and selected stat option when a minmax option is selected
          this.statGroup.controls.selectedStatOption.reset();
      } else {                                                   //reset all value fields when a stat is selected that has options
          this.statGroup.get('value.option').patchValue('');
          this.statGroup.get('value.min').patchValue('');
          this.statGroup.get('value.max').patchValue('');
      }
  }

  /**
   * Sets the option for the selected stat
   * 
   * @param option 
   *          option to set
   */
  public setStatOption(option: statCategory['stats'][0]['option'][0]) {
    this.statGroup.controls.selectedStatOption.patchValue(option);
    this.statGroup['controls'].value['controls'].option.patchValue(option.id);
  }

  /**
   * Triggers the stat removed event with the stat to remove as the payload
   */
  public deleteStatFilter() {
    this.statRemoved.emit(this.statGroup);
  }
}
