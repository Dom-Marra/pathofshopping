import { Component, Input, OnInit } from '@angular/core';
import { modProperties } from 'src/app/models/modProperties';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() item: any;             //Full item object

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
        extendedPropName: 'fractured'
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

  constructor() { }

  ngOnInit(): void {
  }

}
