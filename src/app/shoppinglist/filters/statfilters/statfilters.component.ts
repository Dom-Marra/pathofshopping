import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { StatForm } from '../../item/shared/stat-form';

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
  styleUrls: ['./statfilters.component.scss']
})
export class StatfiltersComponent implements OnInit {

  public readonly FILTER_TYPES: typeof filterTypes = filterTypes;                               //Used to cycle over filter types

  @Input() statFilter: FormGroup;                                                              //Filter data
  @Output() filterRemoved: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();             //Emitter for removal

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentChecked() {
    if (this.statFilter.controls.disabled.value && this.statFilter.enabled) {
      this.statFilter.disable();
    }
  }

  /**
   * Adds a new stat
   */
  public addStatFilter() {
    let newStat = new StatForm();
    (this.statFilter.controls.filters as FormArray).push(newStat);
  }

  /**
   * Removes a stat from this filter group
   * 
   * @param stat 
   *        the stat to remove
   */
  public removeStat(stat: FormGroup) {
    //Find the index of the stat form group in the filters array and remove it
    let filterIndex = (this.statFilter.controls.filters as FormArray).controls.indexOf(stat);
    (this.statFilter.controls.filters as FormArray).removeAt(filterIndex);
  }

  /**
   * Emits the event to remove the filter
   */
  public remove() {
    this.filterRemoved.emit(this.statFilter);
  }
}
