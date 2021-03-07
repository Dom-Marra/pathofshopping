import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { StatForm } from 'src/app/classes/stat-form';
import { simpleData } from 'src/app/models/simpleData';
import { SimpleDataService } from 'src/app/services/simpledata.service';

@Component({
  selector: 'itemForm-statfilters',
  templateUrl: './statfilters.component.html',
  styleUrls: ['./statfilters.component.scss']
})
export class StatfiltersComponent implements OnInit {

  public filterTypes: Array<simpleData> = [
      {id: 'and', text: 'And'},
      {id: 'if', text: 'If'},
      {id: 'not', text: 'Not'},
      {id: 'count', text: 'Count'},
      {id: 'weight', text: 'Weighted Sum'}
  ]

  @Input() statFilter: FormGroup;                                                              //Filter data
  @Output() filterRemoved: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();             //Emitter for removal

  constructor(public simpleDataService: SimpleDataService) { }

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
