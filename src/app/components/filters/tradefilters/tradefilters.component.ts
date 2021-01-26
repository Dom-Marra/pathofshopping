import { Component, Input, OnInit } from '@angular/core';
import { TradeForm } from 'src/app/classes/formgroups/trade-form';

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

  @Input() tradeForm: TradeForm;          //Filters from group to add filters to
  
  constructor() { }

  ngOnInit(): void {
    this.tradeForm.controls.disabled.valueChanges.subscribe(disabled => {          //When disbaled changes to false, and the form is still disabled then enable it
      if (!disabled && this.tradeForm.disabled) this.tradeForm.enable({emitEvent: false});
    });
  }

  ngAfterContentChecked() {       //Disable the form when the disable value is true and the form is enabled
    if (this.tradeForm.controls.disabled.value && this.tradeForm.enabled) {
      this.tradeForm.disable();
    }
  }

  /**
   * Reset to inputs to default values
   */
  public reset() {
    this.tradeForm.reset();
  }

}
