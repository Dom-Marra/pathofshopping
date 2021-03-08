import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { currentSortProperties } from '../models/currentSortProperties';

@Injectable({
  providedIn: 'root'
})
export class CurrentsortService {

  public currentSort: BehaviorSubject<currentSortProperties> = new BehaviorSubject<currentSortProperties>(null);

  constructor() { }
}
