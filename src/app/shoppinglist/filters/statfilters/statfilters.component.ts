import { Component, Input, OnInit, ViewEncapsulation, ViewRef } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Stat } from '../../statselect/stat/stat';

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

  @Input() itemForm: FormArray;                                                                 //Main item form
  @Input() viewRef: ViewRef;
  @Input() stats: Array<Stat> = [];                                                             //Stats that belong to this filter group

  public statFilters = new FormGroup({
    type: new FormControl('and'),
    filters: new FormArray([]),
    value: new FormGroup({
      min: new FormControl(),
      max: new FormControl()
    })
  })

  constructor() {
  }

  ngOnInit(): void { 
    this.itemForm.push(this.statFilters);
  }

  ngAfterViewInit(): void {
  }

  /**
   * Adds a new stat
   */
  public addStatFilter() {
    this.stats.push(new Stat(this.statFilters.controls.filters as FormArray));
  }

  /**
   * Removes a stat from this filter group
   * 
   * @param stat 
   *        the stat to remove
   */
  public removeStat(stat: Stat) {
    let statIndex = this.stats.indexOf(stat);     //index of the stat in the stat array
    this.stats.splice(statIndex, 1);              //remove it from the stat array

    //Find the index of the stat form group in the filters array and remove it
    let filterIndex = (this.statFilters.controls.filters as FormArray).controls.indexOf(stat.statGroup);
    (this.statFilters.controls.filters as FormArray).removeAt(filterIndex);
  }

  /**
   * Deletes this stat filter group
   */
  public destroy() {
    let index = this.itemForm.controls.indexOf(this.statFilters);
    this.itemForm.removeAt(index);
    this.viewRef.destroy();
  }
}
