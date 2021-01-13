import { ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, Input, OnInit, QueryList, Renderer2, ViewChild, ViewChildren, ViewContainerRef, ViewEncapsulation, ViewRef } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { QueryitemService } from '../../queryitem.service'
import { StatfiltersComponent } from '../filters/statfilters/statfilters.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemComponent implements OnInit {

  @Input() league: string;
  @ViewChild('statFilterGroups', {read: ViewContainerRef}) itemContainerRef: ViewContainerRef;    //Container Ref for adding filter groups
  @ViewChildren("itemNameInput") itemNameInput: QueryList<ElementRef>;                            //Item name input element

  public editName: boolean = false;                        //Whether name is in edit mode or not
  private viewRef: ViewRef = null;                          //Reference of the view, used when deleting the component
  public showResults: boolean = false;                      //Used to show results tab
  public queryResults: Array<any> = [];                     //Query Results

  public itemForm = new FormGroup({
    itemName: new FormControl('New Item'),
    query: new FormGroup({
      stats: new FormArray([
      ])
    }),
    sort: new FormGroup({
      price: new FormControl("asc")
    })
  });

  public misc_filters = new FormGroup({                    //misc filter group
    disabled: new FormControl(false)
  })

  constructor(private cd: ChangeDetectorRef, private queryService: QueryitemService, private compResolver: ComponentFactoryResolver, private renderer2: Renderer2) { 
    (this.itemForm.get('query') as FormGroup).addControl('filters', new FormGroup({}));               //add filters group
    (this.itemForm.get('query') as FormGroup).addControl('sort', new FormGroup({}));                  //add sort group
    this.misc_filters.addControl('filters', new FormGroup({}));                                       //add filters to misc
    (this.itemForm.get('query.filters') as FormGroup).addControl('misc_filters', this.misc_filters);  //add misc filter to query
  }

  ngAfterViewInit() {
    this.itemNameInput.changes.subscribe(() => {        //focus name input element after processed by ngIf
      
      if (this.editName) {
        this.itemNameInput.first.nativeElement.focus();
        this.cd.detectChanges();
      }
    });
  }

  ngOnInit(): void {
  }

  /**
   * Gets the items from the poe API based on form inputs
   */
  public fetchItems() {

    this.queryResults = [];                                               //Reset previous results
    let data = {                                                          //create query data
      query: (this.itemForm.controls.query as FormGroup).getRawValue(),
      sort: (this.itemForm.controls.sort as FormGroup).getRawValue()
    }

    data = this.removeEmpty(data);                                        //clean the data

    let psuedos: string = "";                                             //Pseudo mod params
    data.query.stats?.forEach(statGroup => {                              //Add pseudo mods to psueod mod params
      statGroup.filters?.forEach((filter, i) => {
        if ((filter.id as string).includes('pseudo')) 
          psuedos = psuedos.concat("pseudos[]=" + filter.id + (statGroup.filters[i + 1] ? '&' : ''));
      });
    });

    let fetch = this.queryService.fetchResults(data, this.league).subscribe((data: any) => {       //Fetch items based on data
      if (data.result != null && data.result.length > 0) {
        let query: Subscription;                                                      //Query sub
        let length = data.result.length;                                              //Inital length of results

        do {                                                                          //Have to get results 10 at a time
          let results = data.result.splice(0, 10);

          query = this.queryService.fetchItems(results, "?query=" + data.id + "&" + psuedos) //Get next ten results
          .subscribe((items: any) => {  
            this.queryResults = this.queryResults.concat(items.result);                      //Add results

            if (this.queryResults.length == length) {                                        //Unsub and show results
              query.unsubscribe();
              fetch.unsubscribe();
              this.showResults = true;
            }
          });
        } while(data.result.length);
      }
    });
  }

  /**
   * Removes empty objects and empty object fields
   * 
   * @param obj 
   *        Object: object to remove empty fields from
   */
  public removeEmpty(obj: any): any {

    Object.keys(obj).forEach(key => {                                                       //cycle through fields
      if (obj[key] && typeof obj[key] === 'object') this.removeEmpty(obj[key]);             //If it has nested objects cycle through
      else if (obj[key] == null || obj[key] == "all" || obj[key] == "") delete obj[key];    //delete field if empty, or has a value of all
  
      if (!obj[key] || typeof obj[key] !== "object") return;                                //return if the current value is not a object
  
      if (Object.keys(obj[key]).length === 0) delete obj[key];                              //delete empty objects
    });

    return obj;
  }

  /**
   * Sorts by a new value
   * 
   * @param key
   *        sort key, for example the hash of a stat
   * @param value 
   *        sort value, either 'asc' for ascending, or 'desc' for descending
   */
  public searchWithSortBy(key: string, value?: string) {
    let currentSort = Object.keys((this.itemForm.controls.sort as FormGroup).getRawValue())[0];   //The current key in use
    let sortValue = (this.itemForm.controls.sort as FormGroup).controls[currentSort].value;       //The current value

    if (currentSort == key) {
      this.itemForm.get('sort.' + currentSort).patchValue(value ? value : sortValue == 'asc' ? 'desc' : 'asc');   //Alternate value if key is the same
      this.fetchItems();                                                                                          //Re-fecth items
    } else {
      (this.itemForm.controls.sort as FormGroup).removeControl(currentSort);                                      //Remove old control
      (this.itemForm.controls.sort as FormGroup).addControl(key, new FormControl(value ? value : 'desc'));        //Add new control
      this.fetchItems();                                                                                          //re-fecth items
    }
  }

  /**
   * Adds a filter group to the form
   */
  public addStatGroup() {
    const newFilterGroup = this.compResolver.resolveComponentFactory(StatfiltersComponent);
    const componentRef = this.itemContainerRef.createComponent(newFilterGroup);

    this.renderer2.addClass(componentRef.location.nativeElement, 'filter');
    
    componentRef.instance.viewRef = componentRef.hostView;
    componentRef.instance.itemForm = (this.itemForm.get('query.stats') as FormArray);
  }

  /**
   * Sets the View Ref variable
   * 
   * @param ref
   *        ViewRef: The view of this component 
   */
  public setViewRef(ref: ViewRef) {
    this.viewRef = ref;
  }

  /**
   * Returns the view ref
   * 
   * @returns
   *        ViewRef: The view of this component
   */
  public getViewRef(): ViewRef {
    return this.viewRef;
  }

  /**
   * Destroys this component
   */
  public remove() {
    this.viewRef.destroy();
  }
}
