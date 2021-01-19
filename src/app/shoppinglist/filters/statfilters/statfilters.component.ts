import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Stat } from '../../statselect/stat/stat';
import { Statfilter } from './statfilter/statfilter';

enum filterTypes {
  and = 'And',
  if = 'If',
  not = 'Not',
  count = 'Count',
  weight = 'Weighted Sum'
}

@Component({
  selector: 'app-statfilters',
  templateUrl: './statfilters.component.html',
  styleUrls: ['./statfilters.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StatfiltersComponent implements OnInit {

  public readonly FILTER_TYPES: typeof filterTypes = filterTypes;                               //Used to cycle over filter types

  @Input() filter: Statfilter;                                                                  //Filter data
  @Output() filterRemoved: EventEmitter<Statfilter> = new EventEmitter<Statfilter>();        //Emitter for removal

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Adds a new stat
   */
  public addStatFilter() {
    this.filter.stats.push(new Stat(this.filter.statFilters.controls.filters as FormArray));
  }

  /**
   * Removes a stat from this filter group
   * 
   * @param stat 
   *        the stat to remove
   */
  public removeStat(stat: Stat) {
    let statIndex = this.filter.stats.indexOf(stat);     //index of the stat in the stat array
    this.filter.stats.splice(statIndex, 1);              //remove it from the stat array

    //Find the index of the stat form group in the filters array and remove it
    let filterIndex = (this.filter.statFilters.controls.filters as FormArray).controls.indexOf(stat.statGroup);
    (this.filter.statFilters.controls.filters as FormArray).removeAt(filterIndex);
  }

  /**
   * Emits the event to remove the filter
   */
  public remove() {
    this.filterRemoved.emit(this.filter);
  }
}
