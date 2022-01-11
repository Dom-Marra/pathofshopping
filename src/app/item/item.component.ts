import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { PoeService } from '../core/services/poe.service';

@Component({
  selector: 'pos-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @HostBinding('class.gone') gone: boolean = false;
  @Input() item: any;
  @Input() pseudos: string;
  @Input() searchID: string;

  public refreshing: boolean = false;

  constructor(private poeService: PoeService) { }

  ngOnInit(): void {
  }

  /**
   * Re-fetches the item using the Poe Service
   */
  public refresh(): void {

    if (!this.searchID) return;

    let queryParams = `?query=${this.searchID}&${this.pseudos}`;   //Set params for the fetch
    this.refreshing = true;

    this.poeService.fetch([this.item.id], queryParams).subscribe(
      (res: any) => {
        this.gone = res.result[0].gone;
        this.refreshing = false;
      },
      () => {                                  
        this.refreshing = false;
      }
    );
  }
}
