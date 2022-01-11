import { Component, Input, OnInit } from '@angular/core';
import { ModProperties } from '../../models/mod-properties';

@Component({
  selector: 'pos-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {

  @Input() item: any;

  @Input() base: any;

  public readonly enchantModProperties: Array<ModProperties> = [{
    modPropString: 'enchantMods',
    extendedPropName: 'enchant'
  }];

  public readonly scourgeModsProperties: Array<ModProperties> = [{
    modPropString: 'scourgeMods',
    extendedPropName: 'scourge'
  }];

  public readonly implicitModProperties: Array<ModProperties> = [{
    modPropString: 'implicitMods',
    extendedPropName: 'implicit'
  }];

  public readonly explicitModProperties: Array<ModProperties> = [
    {
        modPropString: 'fracturedMods',
        extendedPropName: 'fractured'
    },
    {
        modPropString: 'explicitMods',
        extendedPropName: 'explicit'
    },
    {
        modPropString: 'craftedMods',
        extendedPropName: 'crafted'
    },
    {
        modPropString: 'veiledMods',
        extendedPropName: 'veiled'
    },
    {
        modPropString: 'pseudoMods',
        extendedPropName: 'pseudo'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
