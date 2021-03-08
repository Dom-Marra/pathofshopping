import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { simpleData } from 'src/app/core/models/simpleData';
import { SimpleDataService } from 'src/app/core/services/simpledata.service';

@Component({
  selector: 'itemForm-tradefilters',
  templateUrl: './tradefilters.component.html',
  styleUrls: ['./tradefilters.component.scss']
})
export class TradefiltersComponent implements OnInit {

  public readonly listedOptions: Array<simpleData> = [
    {id: '', text: 'Any Date'},
    {id: '1day', text: 'Up To 1 Day Ago'},
    {id: '3day', text: 'Up To 3 Days Ago'},
    {id: '1week', text: 'Up To 1 Week Ago'},
    {id: '2week', text: 'Up To 2 Weeks Ago'},
    {id: '1month', text: 'Up To 1 Month Ago'},
    {id: '2month', text: 'Up To 2 Months Ago'}
  ]
  public readonly saleTypes: Array<simpleData> = [
    {id: 'any', text: 'All'},
    {id: '', text: 'Buyout or Fixed Price'},
    {id: 'priced_with_info', text: 'Price With Note'},
    {id: 'unpriced', text: 'No Price'}
  ]
  public readonly buyOutOptons: Array<simpleData> = [
    {id: '', text: 'Chaos Orb Equivalent'},
    {id: 'alt', text: "Orb of Alteration"},
    {id: 'fusing', text: "Orb of Fusing"},
    {id: 'alch', text: " Orb of Alchemy"},
    {id: 'gcp', text: "Gemcutter's Prism"},
    {id: 'exalted', text: "Exalted Orb"},
    {id: 'chrom', text: "Chromatic Orb"},
    {id: 'jewellers', text: "Jeweller's Orb"},
    {id: 'chance', text: "Orb of Chance"},
    {id: 'chisel', text: "Cartographer's Chisel"},
    {id: 'scour', text: "Orb of Scouring"},
    {id: 'blessed', text: "Blessed Orb"},
    {id: 'regret', text: "Orb of Regret"},
    {id: 'regal', text: "Regal Orb"},
    {id: 'divine', text: "Divine Orb"},
    {id: 'vaal', text: "Vaal Orb"},
  ]

  @Input() tradeForm: FormGroup;          //Filters from group to add filters to
  
  constructor(public simpleDataService: SimpleDataService) { }

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
}
