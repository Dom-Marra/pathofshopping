import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { StatForm } from 'src/app/classes/stat-form';
import { poeCategorizedStats } from 'src/app/models/poeCategorizedStats';
import { PoeService } from 'src/app/services/poe.service';

@Component({
  selector: 'itemForm-statselect',
  templateUrl: './statselect.component.html',
  styleUrls: ['./statselect.component.scss']
})
export class StatselectComponent implements OnInit {

  @Output() statRemoved: EventEmitter<StatForm> = new EventEmitter<StatForm>();     //Transmits event for removal of the stat
  @Input() isWeight: boolean = false;                                               //Whether this stat is under a wieghted sum filter group
  @Input() statGroup: StatForm;                                                     //Stat data that belongs to this selector
  
  public filteredStatOptions: poeCategorizedStats['stats'][0]['option'];       //Filtered Stat Options
  public statsToSearch: Array<poeCategorizedStats>;

  constructor(private poeAPI: PoeService) { 
    this.statsToSearch = this.poeAPI.getStats();                               //Init stats to search
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
   * Function to return the text value of a stat object
   * 
   * @param stat 
   *        The stat to extract the text vaue from
   * @returns
   *        string: text value of the stat
   */
  public statDisplayBy(stat: poeCategorizedStats['stats'][0]) {
    return stat?.text;
  }

  /**
   * Function to return the text value of an option object
   * 
   * @param option
   *        The option to extract the text value from 
   * @returns
   *        string: text value of the option
   */
  public optionDisplayBy(option: poeCategorizedStats['stats'][0]['option'][0]) {
    return option?.text;
  }

  /**
   * Filters the items from each category of the search items
   * 
   * @param searchText
   *        string: text to filter by
   * 
   * @param values
   *        Array<poeCategorizedStats>: the values to filter by
   * 
   * @returns 
   *       Array<poeCategorizedStats>: The filtered results
   */
  public filterStats(searchText: string, values: Array<poeCategorizedStats>): Array<poeCategorizedStats> {
    if (!searchText) return values;

    let filteredStats = values.map(statCategory => ({
      category: statCategory.category, 
      stats: statCategory.stats.filter(stat => {
        const text = searchText.toLowerCase().trim().split(/\s+/);

        return text.filter(text => {
          return stat.text.toLowerCase().indexOf(text) != -1;
        }).length == text.length;
      })
    }));

    return filteredStats.filter(statSearch => statSearch.stats.length > 0);
  }

  /**
   * Filters stat options based on input
   * 
   * @param searchText 
   *        string: text to filter by
   * @param values
   *         poeCategorizedStats['stats'][0]['option']: The options to filter by
   * 
   * @returns  poeCategorizedStats['stats'][0]['option']: The filtered results
   */
  public filterStatOptions(searchText: string, values: poeCategorizedStats['stats'][0]['option']) {
    let statOptions = values.filter(stat => {
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
  public setStat(stat: poeCategorizedStats['stats'][0]) {
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
  public setStatOption(option: poeCategorizedStats['stats'][0]['option'][0]) {
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
