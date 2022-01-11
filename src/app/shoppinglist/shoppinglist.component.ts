import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SavedialogComponent } from 'src/app/shoppinglist/components/savedialog/savedialog.component';
import { PoeService } from 'src/app/core/services/poe.service';
import { SimpleDataService } from 'src/app/core/services/simpledata.service';
import { SimpleData } from 'src/app/core/models/simple-data.model';
import { last, skipWhile, take, takeWhile } from 'rxjs/operators';
import { ShoppingListService } from '../core/services/shopping-list.service';
import { ItemForm } from '../item-form/classes/item-form';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'pos-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.scss']
})
export class ShoppinglistComponent implements OnInit {

  /** Determines mode for side nav */
  public readonly sideNavMQ = window.matchMedia('(min-width: 54em)');

  /** Used to detect changes for the macthMedia */
  public readonly detectChanges = () => this.changeDetectorRef.detectChanges();
  
  /** Whether the list is loading or not */
  private listLoading: boolean = true;
  
  /** Whether the POE Service is loading or not */
  private poeLoading: boolean = true;

  /** Whether services are loading */
  public servicesLoading: BehaviorSubject<boolean> = new BehaviorSubject(true);

  /** Whether a save is loading */
  public saveLoading: BehaviorSubject<boolean> = new BehaviorSubject(null);

  /** League Data */
  public leagues: Array<SimpleData> = [];

  /** Current Items */
  public items: Observable<Array<ItemForm>>;

  /** Error Message */
  public errMsg: string;

  /** League form control */
  public league = new FormControl();

  /** Shopping list name form control */
  public listName = new FormControl();

  constructor(private poeAPI: PoeService, 
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private listService: ShoppingListService,
              private snackbar: MatSnackBar,
              public simpleDataService: SimpleDataService,
              private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.poeAPI.loaded.pipe(takeWhile(() => this.poeLoading && !this.errMsg))
    .subscribe(
      (loaded) => {
        if (loaded) {
          this.poeLoading = false;
          this.leagues = this.poeAPI.getLeagues();

          if (!this.listLoading) this.servicesLoading.next(false);
        }
      },
      (err) => { this.errMsg = err }
    );

    this.listService.getStatus().pipe(takeWhile(val => val === null && !this.errMsg, true))
    .subscribe(
      val => {
        if (val?.loaded) {
          this.listLoading = false; 

          if (!this.poeLoading) this.servicesLoading.next(false);
        }
        else if (val?.loaded === false) this.errMsg = val.msg;
      },
      error => this.errMsg = error
    )

    this.servicesLoading.pipe(takeWhile(val => val === true && !this.errMsg, true))
    .subscribe(val => {
      console.log(val);
      if (val === true) return;
      console.log('here')

      if (!this.league.value) this.league.patchValue(this.leagues[0].id);
      if (!this.listName.value) this.listName.patchValue('Your List');

      this.items = this.listService.getItems();
    
      /** Load list */
      this.activatedRoute.paramMap.pipe(take(1)).subscribe(map => {
        const ID  = map.get('listID');

        if (ID === 'new') this.saveLoading.next(false);
        else {
          this.saveLoading.next(true);

          this.listService.load(ID).pipe(take(1)).subscribe(
            val => {
              if (!val.loaded) {
                this.router.navigate(['..', 'new'], {relativeTo: this.activatedRoute, replaceUrl: true});
                this.snackbar.open(val.msg, 'close', {duration: 5000, panelClass: 'dark-default'});
              }

              this.saveLoading.next(false);
            },
            error => {
              this.saveLoading.next(false);
              this.router.navigate(['..', 'new'], {relativeTo: this.activatedRoute, replaceUrl: true});
              this.snackbar.open(error, 'close', {duration: 5000, panelClass: 'dark-default'});
            }
          );
        }
      });

      this.saveLoading.pipe(takeWhile(val => val === null || val === true, true)).subscribe(val => {
        if (val === null || val === true) return;
        
        /** Re-route based on item length */
        this.items.subscribe(items => {
          if (items.length === 0 && this.activatedRoute.children.length !== 0)
            this.router.navigate(['/'], {relativeTo: this.activatedRoute, replaceUrl: true}) 
          else if (items.length > 0 && this.activatedRoute.children.length === 0)
            this.router.navigate(['form', '1'], {relativeTo: this.activatedRoute, replaceUrl: true})
        });
      });

      this.league.valueChanges.subscribe(val => {
        this.listService.setLeague(val);
      });

      this.listName.valueChanges.subscribe(val => {
        this.listService.setName(val);
      });

      this.sideNavMQ.addEventListener('change', this.detectChanges);
    });
  }


  /**
   * Adds an item to the shopping list service
   */
  public addItem() {
    this.listService.addItem();
  }

  /**
   * Deletes item from the shopping list service
   * 
   * @param item 
   *        ItemForm: The item to delete
   */
  public deleteItem(item: ItemForm) {
    this.listService.deleteItem(item);
  }

  /**
   * Saves the shopping list to firebase
   */
  public save() {
    this.dialog.open(SavedialogComponent, {
      panelClass: 'save-dialog',
      disableClose: true,
      data: this.listService.save()
    });
  }
}