import { Component, OnInit } from '@angular/core';
import { SimpleData } from 'src/app/core/models/simple-data.model';
import { SimpleDataService } from 'src/app/core/services/simpledata.service';
import { SortService } from 'src/app/core/services/currentsort.service';
import { ShoppingListService } from '../core/services/shopping-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ItemForm } from './classes/item-form';
import { StatFilterForm } from './classes/stat-filter-form';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'pos-itemForm',
  templateUrl: './itemForm.component.html',
  styleUrls: ['./itemForm.component.scss']
})
export class ItemFormComponent implements OnInit {

  /** Item Form Object */
  public itemForm: ItemForm;

  /** Form control for item name */
  public itemName: FormControl;

  /** Status Options */
  public statusOptions: Array<SimpleData> = [
    {id: 'any', text: 'All'},
    {id: 'online', text: 'Online'}
  ];

  /** Unsubber */
  private readonly unsubscribe: Subject<void> = new Subject();
  
  constructor(
    public simpleDataService: SimpleDataService,
    public sortService: SortService,
    private listService: ShoppingListService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {  

  }

  ngOnInit(): void {

    let itemReference: number;

    this.listService.getItems().pipe(takeUntil(this.unsubscribe)).subscribe(items => {
      if (items.length === 0) this.router.navigate(['..']);
      else if (itemReference + 1 > items.length) this.router.navigate(['..', items.length], {relativeTo: this.activatedRoute, replaceUrl: true});
    });

    this.activatedRoute.paramMap.pipe(takeUntil(this.unsubscribe)).subscribe(map => {
      if (!map.has('itemID')) this.router.navigateByUrl('list');

      itemReference = parseInt(map.get('itemID')) - 1;
      
      this.listService.getItems().pipe(take(1)).subscribe(items => {
        this.itemForm = items[itemReference];

        this.itemName = this.itemForm.itemForm.controls.itemName as FormControl;
      });
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  /**
   * Navigates to results page
   */
  public search() {
    this.sortService.newSort('price', 'asc');
    this.router.navigate([`results`], {relativeTo: this.activatedRoute});
  }

  /**
   * Adds a stat filter to the item data
   */
  public addStatGroup() {
    this.itemForm.addStatFilterForm();
  }

  /**
   * Removes a stat filter from the item
   * 
   * @param form
   *        stat filter to remove 
   */
  public removeStatFilter(form: StatFilterForm) {
    this.itemForm.removeStatFilterForm(form);
  }

  /**
   * Clears the item
   */
  public clear() {
    this.itemForm.clear();
  }

  /**
   * Deletes the item
   */
  public remove() {
    this.listService.deleteItem(this.itemForm);
  }
}
