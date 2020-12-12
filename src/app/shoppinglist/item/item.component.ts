import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItemComponent implements OnInit {

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

}
