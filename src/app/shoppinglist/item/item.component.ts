import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren, ViewEncapsulation, ViewRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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
    itemName: new FormControl('New Item')
  });

  constructor(private cd: ChangeDetectorRef) { }

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
