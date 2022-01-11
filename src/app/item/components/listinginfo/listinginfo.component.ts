import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SortProperties } from 'src/app/core/models/sort-properties';
import { SortService } from 'src/app/core/services/currentsort.service';
import { PoeService } from 'src/app/core/services/poe.service';

@Component({
  selector: 'pos-item-listinginfo',
  templateUrl: './listinginfo.component.html',
  styleUrls: ['./listinginfo.component.scss',  '../../styles/shared.scss']
})
export class ListinginfoComponent implements OnInit {

  @Input() listing: any;                  //Item listing values

  public currentSort: Observable<SortProperties>;

  constructor(private poeAPI: PoeService, public sortService: SortService) { 
    this.currentSort = sortService.getSort();
  }

  ngOnInit(): void {
  }

    /**
   * Returns the time difference from a given date and the current date
   * 
   * @param date
   *        string: item date 
   */
  public subtractDate(date) {
    let compare = new Date(date);
    let currentDate = new Date();
    let diff = Math.abs(currentDate.getTime() - compare.getTime());

    let days = diff / (1000 * 60 * 60 * 24);
    let hours = diff / (1000 * 60 * 60);
    let minutes = diff / (1000 * 60);
    let seconds = diff / 1000;

    if (days >= 1) return Math.ceil(days) + ' Days ago';
    if (hours >= 1) return Math.ceil(hours) + ' Hours ago';
    if (minutes >= 1) return Math.ceil(minutes) + ' Minutes ago';
    if (seconds >= 1) return Math.ceil(seconds) + ' Seconds ago';
  }

  /**
   * Returns the image for a specified currency ID
   * 
   * @param currencyID 
   *        string: currency id
   */
  public getCurrency(currencyID: string): {id: string, text: string, image: string} {
    if (!currencyID) return null;

    let currencies = this.poeAPI.getPoeStatic().find(category => { return category.id == 'Currency'});

    let currency = currencies.entries.find(currency => { return currency.id == currencyID});

    return currency;
  }
}
