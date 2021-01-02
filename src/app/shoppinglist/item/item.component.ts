import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren, ViewEncapsulation, ViewRef } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { QueryitemService } from '../../queryitem.service'

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemComponent implements OnInit {

  @ViewChildren("itemNameInput") itemNameInput: QueryList<ElementRef>;    //Item name input element

  private editName: boolean = false;                        //Whether name is in edit mode or not
  private viewRef: ViewRef = null;                          //Reference of the view, used when deleting the component

  public itemForm = new FormGroup({
    itemName: new FormControl('New Item'),
    query: new FormGroup({
      status: new FormGroup({
        option: new FormControl('online')
      }),
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

  constructor(private cd: ChangeDetectorRef, private queryService: QueryitemService) { 
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

    let data = {                                                          //create query data
      query: (this.itemForm.controls.query as FormGroup).getRawValue(),
      sort: (this.itemForm.controls.sort as FormGroup).getRawValue()
    }

    data = this.removeEmpty(data);                                        //clean the data

    this.queryService.fetchResults(data).subscribe((data: any) => {       //Fetch items based on data
      if (data.result != null && data.result.length > 0) {
        this.queryService.fetchItems(data.result).subscribe(items => {
          console.log(items);
        })
      }
    })
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
   * Sets editName
   * 
   * @param edit
   *        boolean: whether to edit or not 
   */
  public setEditName(edit: boolean) {
    this.editName = edit;
  }

  /**
   * Retursn editName
   * 
   * @returns
   *        boolean: whether to edit or not
   */
  public getEditName(): boolean {
    return this.editName;
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
