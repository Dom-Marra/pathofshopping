import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

interface modData {
  text: string,
  name: string,
  tier: string,
  min: number,
  max: number,
  hash: string
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  @Input() queryData: Array<any>;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.queryData);
  }

  /**
   * Parses the explicit mod data from a given item
   * 
   * @param item 
   *        POE API Item
   */
  public parseExplicitData(item: any): Array<modData> {
    let explicits: Array<modData> = [];                  //Stores explicit mod data                                  

    if (item.explicitMods == null || item.explicitMods.length == 0) return null;    //Return null if no explicits

    item.explicitMods.forEach((mod, i) => {                           //cycle through explicits
      let hashIndex = item.extended.hashes?.explicit?.[i][1]?.[0];       //Index of the mod for its extended data
      let minMaxIndex = item.extended.hashes?.explicit?.[i][1]?.[1] ?    //Index of the mod for its min max data
                        item.extended.hashes.explicit[i][1]?.[1] : 0;

      let modData: modData = {                                      //Set data
        text: mod,
        name: item.extended.mods?.explicit?.[hashIndex]?.name,
        tier: item.extended.mods?.explicit?.[hashIndex]?.tier,  
        min: item.extended.mods?.explicit?.[hashIndex]?.magnitudes?.[minMaxIndex]?.min,
        max: item.extended.mods?.explicit?.[hashIndex]?.magnitudes?.[minMaxIndex]?.max,
        hash: item.extended.hashes.explicit[i][0]
      }

      explicits.push(modData);
    });

    return explicits;
  }

  /**
   * Parses the implicit mod data from a given item
   * 
   * @param item 
   *        POE API Item
   */
  public parseImplicitData(item: any): Array<modData> {
    let implicits: Array<modData> = [];                  //Stores implicit mod data 

    if (item.implicitMods == null || item.implicitMods.length == 0) return null;    //Return null if no implicits

    item.implicitMods.forEach((mod, i) => {                           //cycle through implicits
      let hashIndex = item.extended.hashes?.implicit?.[i][1]?.[0];       //Index of the mod for its extended data
      let minMaxIndex = item.extended.hashes?.implicit?.[i][1]?.[1] ?    //Index of the mod for its min max data
                        item.extended.hashes.implicit[i][1]?.[1] : 0;
      let modData: modData = {                                        //Set data
        text: mod,
        name: item.extended.mods?.implicit?.[hashIndex]?.name,
        tier: item.extended.mods?.implicit?.[hashIndex]?.tier,  
        min: item.extended.mods?.implicit?.[hashIndex]?.magnitudes?.[minMaxIndex]?.min,
        max: item.extended.mods?.implicit?.[hashIndex]?.magnitudes?.[minMaxIndex]?.max,
        hash: item.extended.hashes.implicit[i][0]
      }

      implicits.push(modData);
    });

    return implicits;
  }

}
