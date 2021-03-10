import { Component, Input, OnInit } from '@angular/core';
import { modProperties } from 'src/app/item/models/modProperties';
import { queryProps } from '../core/classes/resultdata';
import { PoeService } from '../core/services/poe.service';

@Component({
  selector: 'pos-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() item: any;                  //Full item object
  @Input() queryProps: queryProps;     //Properties relating to the item query

  public readonly enchantModProperties: Array<modProperties> = [{
    modPropString: 'enchantMods',
    extendedPropName: 'enchant',
    specialClass: 'enchant'
  }];

  public readonly implicitModProperties: Array<modProperties> = [{
    modPropString: 'implicitMods',
    extendedPropName: 'implicit'
  }];

  public readonly explicitModProperties: Array<modProperties> = [
    {
        modPropString: 'fracturedMods',
        extendedPropName: 'fractured',
        specialClass: 'fractured'
    },
    {
        modPropString: 'explicitMods',
        extendedPropName: 'explicit'
    },
    {
        modPropString: 'craftedMods',
        extendedPropName: 'crafted',
        specialClass: 'crafted'
    },
    {
        modPropString: 'veiledMods',
        extendedPropName: 'veiled',
        specialClass: 'veiled'
    },
    {
        modPropString: 'pseudoMods',
        extendedPropName: 'pseudo',
        specialClass: 'pseudo'
    }
  ];

  public refreshing: boolean = false;           //Status of item refresh

  constructor(private poeService: PoeService) { }

  ngOnInit(): void {
  }

  /**
   * Re-fetches the item using the Poe Service
   */
  public refresh(): void {
    if (!this.queryProps) return;     //If the queryProps are null then don't fecth

    this.refreshing = true;           //Init fetch status

    let queryParams = "?query=" + this.queryProps.id + "&" + this.queryProps.psuedos;   //Set params for the fetch

    this.poeService.fetch([this.item.id], queryParams).subscribe(                       //Get the item
      (res: any) => {                                   //Re-assign the item properties and update refresh status
        if (this.item.listing?.copied) res.result[0].listing.copied = true;
        this.item = Object.assign({}, res.result[0]);
        this.refreshing = false;
      },
      () => {                                           //Error while fetching, reset refresh status                                    
        this.refreshing = false;
      }
    );
  }
}
