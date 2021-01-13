import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
      option: new FormControl()
    }),
    account: new FormGroup({
      input: new FormControl()
    }),
    sale_type: new FormGroup({
      option: new FormControl()
    }),
    indexed: new FormGroup({
      option: new FormControl()
    })
  })
  
  constructor() { }

  ngOnInit(): void {
    this.filterGroup.addControl('trade_filters', this.tradefilters);    //Add trade filters to filter group
  }

}
