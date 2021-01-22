import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

enum buyOutOptions{
  '' = 'Chaos Orb Equivalent',
  alt = "Orb of Alteration",
  fusing = "Orb of Fusing",
  alch = " Orb of Alchemy",
  gcp = "Gemcutter's Prism",
  exalted = "Exalted Orb",
  chrom = "Chromatic Orb",
  jewellers = "Jeweller's Orb",
  chance = "Orb of Chance",
  chisel = "Cartographer's Chisel",
  scour = "Orb of Scouring",
  blessed = "Blessed Orb",
  regret = "Orb of Regret",
  regal = "Regal Orb",
  divine = "Divine Orb",
  vaal = "Vaal Orb",
}

enum saleTypes {
  any = 'All',
  '' = 'Buyout or Fixed Price',
  priced_with_info = 'Price With Note',
  unpriced = 'No Price'
}

enum listedOptions {
  '' = 'Any Date',
  '1day' = 'Up To 1 Day Ago',
  '3day' = 'Up To 3 Days Ago',
  '1week' = 'Up To 1 Week Ago',
  '2week' = 'Up To 2 Weeks Ago',
  '1month' = 'Up To 1 Month Ago',
  '2month' = 'Up To 2 Months Ago'
}

@Component({
  selector: 'app-tradefilters',
  templateUrl: './tradefilters.component.html',
  styleUrls: ['./tradefilters.component.scss']
})
export class TradefiltersComponent implements OnInit {

  public readonly LISTED_OPTIONS: typeof listedOptions = listedOptions;
  public readonly SALE_TYPES: typeof saleTypes = saleTypes;
  public readonly BUY_OUT_OPTIONS: typeof buyOutOptions = buyOutOptions;

  @Input() filterGroup: FormGroup;          //Filters from group to add filters to

  public tradeFilters = new FormGroup({     //Trade filters
    filters: new FormGroup({ 
      price: new FormGroup({
        min: new FormControl(),
        max: new FormControl(),
        option: new FormControl('')
      }),
      account: new FormGroup({
        input: new FormControl()
      }),
      sale_type: new FormGroup({
        option: new FormControl('')
      }),
      indexed: new FormGroup({
        option: new FormControl('')
      })
    }),
  })
  
  constructor() { }

  ngOnInit(): void {
    if (this.filterGroup.controls['trade_filters']) {
      this.tradeFilters = this.filterGroup.controls['trade_filters'] as FormGroup;    //Retain item data for trade filters
    } else {
      this.filterGroup.addControl('trade_filters', this.tradeFilters);                //Add trade filters to filter group
    }
  }

  /**
   * Reset to inputs to default values
   */
  public reset() {
    this.tradeFilters.reset();
  }

}
