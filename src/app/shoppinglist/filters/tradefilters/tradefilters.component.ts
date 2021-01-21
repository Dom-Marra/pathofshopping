import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

enum buyOutOptions{
  null = 'Chaos Orb Equivalent',
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
  null = 'Buyout or Fixed Price',
  priced_with_info = 'Price With Note',
  unpriced = 'No Price'
}

enum statusOptions {
  any = 'All',
  online = 'Online'
}

enum listedOptions {
  null = 'Any Date',
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
  styleUrls: ['./tradefilters.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TradefiltersComponent implements OnInit {

  public readonly LISTED_OPTIONS: typeof listedOptions = listedOptions;
  public readonly SALE_TYPES: typeof saleTypes = saleTypes;
  public readonly BUY_OUT_OPTIONS: typeof buyOutOptions = buyOutOptions;
  public readonly STATUS_OPTIONS: typeof statusOptions = statusOptions;

  @Input() filterGroup: FormGroup;          //Filters from group to add filters to
  @Input() queryForm: FormGroup;            //Main query form group

  public tradeFilters = new FormGroup({     //Trade filters
    disabled: new FormControl(false),
    filters: new FormGroup({ 
      price: new FormGroup({
        min: new FormControl(),
        max: new FormControl(),
        option: new FormControl(null)
      }),
      account: new FormGroup({
        input: new FormControl()
      }),
      sale_type: new FormGroup({
        option: new FormControl(null)
      }),
      indexed: new FormGroup({
        option: new FormControl(null)
      })
    }),
  })

  public statusForm = new FormGroup({
    option: new FormControl('online')
  })
  
  constructor() { }

  ngOnInit(): void {
    if (this.filterGroup.controls['trade_filters']) {
      this.tradeFilters = this.filterGroup.controls['trade_filters'] as FormGroup;    //Retain item data for trade filters
    } else {
      this.filterGroup.addControl('trade_filters', this.tradeFilters);                //Add trade filters to filter group
    }

    if (this.filterGroup.controls['status']) {
      this.statusForm = this.filterGroup.controls['status'] as FormGroup;  //Retain item data for status
    } else {
      this.queryForm.addControl('status', this.statusForm);               //Add status to the form group
    }
  }

  /**
   * Reset to inputs to default values
   */
  public reset() {
    this.tradeFilters.reset();
  }

}
