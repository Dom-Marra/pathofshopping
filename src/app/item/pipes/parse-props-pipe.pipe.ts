import { Pipe, PipeTransform } from '@angular/core';
import { parsedPropData } from '../models/parsedPropData';

@Pipe({
  name: 'parseProps',
  pure: true
})
export class ParsePropsPipePipe implements PipeTransform {

  transform(props: any): any {
    let parsedPropData: Array<parsedPropData> = [];                                             

    props.forEach(prop => {            
      if (prop.displayMode == 3) {
        parsedPropData.push(this.parseDisplay3(prop));
      } else if (prop.displayMode == 1 || (prop.displayMode == 0 && prop.values.length > 0) || prop.displayMode == 2) {
        parsedPropData.push(this.parseDisplay1and2(prop));
      } else if(prop.displayMode == 0) {
        parsedPropData.push(this.parseDisplay0(prop));
      }else {
        parsedPropData.push({values: [{text: prop.name}], type: prop.type});                       
      }
    });

    return parsedPropData;
  }

  /**
   * Does specific parsing for properties that are in display mode 3
   * 
   * @param prop 
   *        property to parse
   */
  private parseDisplay3(prop: any): parsedPropData {
    let parsedPropData = {values: [], type: prop.type};     //Prop Data
    let name: string = prop.name;                     //name of the property
    let regex = new RegExp(/({\d*})/);                //Reg exp to find value positions in the name
    let substrs = name.split(regex);                  //Substrings of value postions and text before them

    substrs.forEach(str => {                          //Cycle substrings

      if (str.match(regex)) {                                      //If the sub string is a value position
        let valueIndex: number = parseInt(str.match(/(\d+)/)[0]);               //Reference of the value 

        let value = prop.values[valueIndex][0];                                 //Value data
        let dispay = prop.values[valueIndex][1];                                //Display mode
        parsedPropData.values.push({text: value, display: dispay});                   //Push to values of prop

      } else {
        parsedPropData.values.push({text: str, display: null});                       //Push str to values of prop
      }
    });

    return parsedPropData;
  }

  /**
   * Does specific parsing for properties that are in display mode 0
   * 
   * @param prop 
   *        property to parse
   */
  private parseDisplay0(prop: any): parsedPropData {
    let parsedPropData = {values: [], type: prop.type};                         //Prop Data
    let propStrs = (prop.name as string).split(/(<.+?>{.+?})+/g);         //Split the array keep the delimiter (should look like <value>{othervalue})

    propStrs.forEach((propStr, i) => {                                    //Cycle throgh the array
      let value = propStr;                                                //Init the text value
      let display: any = -1;

      if (new RegExp(/(<.+?>{.+?})+/g).test(propStr)) {                   //If the delimiter is found extract the value, and the class for it
        let displayModes = propStr.match(/<(.*?)>/g);                                     //extract class, should look like <value>
        display = displayModes[displayModes.length -1].replace(/[<>]/gi, '');             //Get the value of the class
        value = propStr.replace(/<(.*?)>/gi, '').replace(/[{}]/gi, '');                   //Set the new value for the text
      }

      parsedPropData.values.push({text: value, display: display});                              //Push data
    });

    return parsedPropData;
  }

  /**
   * Does specific parsing for properties that are in display mode 0 & 1
   * 
   * @param prop 
   *        property to parse
   */
  private parseDisplay1and2(prop: any): parsedPropData {
    let parsedPropData = {values: [], type: prop.type};                     //Prop Data
    let name = prop.name;                                             //name of the property

    if (name && name.length > 0) name = name + ": ";                  //Add if there is a name to prefix it
    parsedPropData.values.push({text: name});                               //push name

    prop.values.forEach((value, i) => {
      let val = value[0];                                               //Value
      let display = value[1];                                           //Display Mode

      if (i > 0) parsedPropData.values.push({text: ', '});
      if (prop.displayMode == 2) parsedPropData['progress'] = prop.progress;     
      parsedPropData.values.push({text: val, display: display});            //push value data
    });
    
    return parsedPropData;                                             
  }

}
