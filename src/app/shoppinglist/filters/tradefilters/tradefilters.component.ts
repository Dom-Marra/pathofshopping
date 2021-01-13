import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

enum buyOutOptions{
  all = 'Chaos Orb Equivalent',
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
  any = 'Any',
  all = 'Buyout or Fixed Price',
  priced_with_info = 'Price With Note',
  unpriced = 'No Price'
}

enum listedOptions {
  all = 'Any Date',
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

  @Input() filterGroup: FormGroup;          //Filters from group to add filters to

  public tradefilters = new FormGroup({     //Trade filters
    price: new FormGroup({
      min: new FormControl(),
      max: new FormControl(),
      option: new FormControl('all')
    }),
    account: new FormGroup({
      input: new FormControl()
    }),
    sale_type: new FormGroup({
      option: new FormControl('all')
    }),
    indexed: new FormGroup({
      option: new FormControl('all')
    })
  })
  
  constructor() { }

  ngOnInit(): void {
    this.filterGroup.addControl('trade_filters', this.tradefilters);    //Add trade filters to filter group
  }

}
