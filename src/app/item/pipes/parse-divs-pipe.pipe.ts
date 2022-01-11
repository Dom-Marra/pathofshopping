import { Pipe, PipeTransform } from '@angular/core';
import { ParsedDivData } from '../models/parsed-div-data';

@Pipe({
  name: 'parseDivs',
  pure: true
})
export class ParseDivsPipePipe implements PipeTransform {

  /**
   * Transforms the div mod data into usable data for the ngFor directive
   * 
   * @param mods
   *        explicit mods from the div item 
   */
  transform(mods: any) {
    let parsedDivData: Array<ParsedDivData> = [];                 //Stores all the div data

    mods.forEach(mod => {                 
      let subMods = (mod as String).split(/\n/);      //Every new line is another mod

      subMods.forEach(subMod => {                             //Cycle submods of the mod
        let divModData: ParsedDivData = {values: []};               //Stores the div data for the current mod   
        let modPairs = subMod.match(/<(.*?)>{(.*?)}/gi);      //Split the different parts of the text

        modPairs.forEach((modPair, i) => {                    //Cycle the split parts
          let displayModes = modPair.match(/<(.*?)>/gi);                                  //parse the display modes
          let display = displayModes[displayModes.length -1].replace(/[<>]/gi, '');       //Get the most recent one
          let value = modPair.replace(/<(.*?)>/gi, '').replace(/[{}]/gi, '');             //Parse the value              

          if (i > 0) value = ' ' + value;                                                 //Add a space between mod pairs
          divModData.values.push({text: value, display: display});                        //Push data to the main mod data values 
        });

        parsedDivData.push(divModData);            //Push the mod data to the array of mod data 
      });
    });

    return parsedDivData;
  }
}
