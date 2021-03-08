import { Pipe, PipeTransform } from '@angular/core';
import { parsedModData } from '../models/parsedModData';


@Pipe({
  name: 'parseMods',
  pure: true
})
export class ParseModsPipePipe implements PipeTransform {

  transform(item: any, modPropString: string, extendedPropName: string) : any {

    let mods: Array<parsedModData> = [];                  //Stores mod data                                  

    if (item[modPropString] == null || item[modPropString].length == 0) return null;    //Return null if no mod data

    item[modPropString].forEach((mod, i) => {                                   //cycle through mods
      let hashIndices = item.extended.hashes?.[extendedPropName]?.[i][1];        //Indices of the mod for its extended data

      let parsedModData: parsedModData = {                                      //Set data
        text: (mod as string).replace(/\n/, '<br>'),                //Add break when there is a new line
        name: item.extended.mods?.[extendedPropName]?.[hashIndices?.[0]]?.name,
        tiers: [],
        hash: item.extended.hashes?.[item.extended.hashes?.hasOwnProperty('delve') ? 'delve' : extendedPropName]
              ?.[i]?.[0]  //If it is a delve item use delve property
      }

      if (hashIndices) {
        for (let hashIndex of hashIndices) {
          let tierData = {                                                        //Init data for tier
            tier: item.extended.mods?.[extendedPropName]?.[hashIndex]?.tier,
            ranges: [],
          }
  
          if (item.extended.mods?.[extendedPropName]?.[hashIndex]?.magnitudes) {        //Check if there are magnitudes for the mod
            item.extended.mods[extendedPropName][hashIndex].magnitudes.forEach(magnitude => {    //Cycle through magnitudes
              if (magnitude.hash == parsedModData.hash  && !(magnitude.min == 0 && magnitude.max == 0)) {   //If the magnitude hash matched the mod hash and the value isn't 0
                tierData.ranges.push({           //Add the magnitudes to the tier data ranges
                  min: magnitude.min,
                  max: magnitude.max
                });
              }
            });
          }
  
          parsedModData.tiers.push(tierData);
        }
      }

      mods.push(parsedModData);
    });

    return mods;
  }

}
