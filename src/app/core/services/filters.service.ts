import { Injectable } from '@angular/core';
import { FilterGroup } from 'src/app/item-form/classes/filter-group';


@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  
  constructor() { }

  public exportFilters(filters: Array<FilterGroup>) {
    return filters.map(filterGroup => {
      return {
        filterGroup: filterGroup,
        formGroup: filterGroup.toFormGroup()
      }
    })
  }
}
