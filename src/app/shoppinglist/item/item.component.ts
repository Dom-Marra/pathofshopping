import { Component, OnInit, ViewEncapsulation, ViewRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemComponent implements OnInit {

  private viewRef: ViewRef = null;                    //Reference of the view, used when deleting the component

  public itemForm = new FormGroup({
    itemName: new FormControl('New Item'),
    itemSearch: new FormControl(''),
    itemCategory: new FormControl('All'),
    itemRarity: new FormControl('All')
  });

  private disableExpansion: boolean = false;          //Disable state of the expansion of the item

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Sets the disable state of the expansion of the item contents
   * 
   * @param disable
   *        boolean 
   */
  public setDisableExpansion(disable: boolean) {
    this.disableExpansion = disable;
  }

  /**
   * Returns the disable state of the expansion of the item contents
   * 
   * @returns
   *        disableExpansion: boolean 
   */
  public getDisableExpansion(): boolean {
    return this.disableExpansion;
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
