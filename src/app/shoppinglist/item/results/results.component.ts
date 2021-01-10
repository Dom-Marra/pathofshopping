import { Component, Directive, ElementRef, EventEmitter, Input, OnInit, Output, Pipe, PipeTransform, Renderer2, SimpleChanges } from '@angular/core';
import { Currency } from '../../currency';

interface modData {
  text: string,
  name: string,
  tier: string,
  ranges: Array<{
    min: number,
    max: number
  }>,
  hash: string
}

enum propertyValues {
  map_tier = 1,
  map_iiq = 2,
  map_iir = 3,
  map_packsize = 4,
  gem_level = 5,
  quality = 6,
  pdps = 9,
  edps = 10,
  'pseudo.pseudo_adds_chaos_damage_to_attacks' = 11,
  crit = 12,
  aps = 13,
  block = 15,
  ar = 16,
  ev = 17,
  es = 18,
  gem_level_progress = 20,
  stack_size = 32,
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  @Input() queryData: Array<any>;
  @Input() currentSort: any;                          //The current sort option
  @Output() newSort = new EventEmitter<string>();     //New sort option emitter

  public currencies: Currency = new Currency();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.queryData);
    console.log(this.currentSort);
  }

  /**
   * Returns the time difference from a given date and the current date
   * 
   * @param date
   *        string: item date 
   */
  public subtractDate(date) {
    let compare = new Date(date);
    let currentDate = new Date();
    let diff = Math.abs(currentDate.getTime() - compare.getTime());

    let days = diff / (1000 * 60 * 60 * 24);
    let hours = diff / (1000 * 60 * 60);
    let minutes = diff / (1000 * 60);
    let seconds = diff / 1000;

    if (days >= 1) return Math.floor(days) + ' Days ago';
    if (hours >= 1) return Math.floor(hours) + ' Hours ago';
    if (minutes >= 1) return Math.floor(minutes) + ' Minutes ago';
    if (seconds >= 1) return Math.floor(seconds) + ' Seconds ago';
  }

  /**
   * Tracks ngFor items by the id of the item
   * 
   * @param index 
   *        number: index of the item
   * @param value 
   *        any: the item from the query data
   */
  public trackyByID(index: number, value: any) {
    return value.id;
  }

  /**
   * Outputs the value to sort by
   * 
   * @param key 
   *        The value to sort by
   */
  public sortBy(key: string) {
    this.newSort.emit(key);
  }
}

@Directive({
  selector: '[parser]'
})
export class ParserDirective {

  @Input() props: Array<any>;                                   //Properties
  @Output() sortByProp = new EventEmitter<string>();            //Sort event emmitter

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    if (this.props) this.parseProperties();   //Parse the properties
  }

  /**
   * Parses the properties and displays them in the element
   */
  public parseProperties() {

    this.props.forEach(prop => {                      //Cycle properties
      let li = this.renderer.createElement('li');     //li element holds property

      if (prop.displayMode == 3) {
        this.parseDisplay3(prop, li);
      } else if (prop.displayMode == 1 || (prop.displayMode == 0 && prop.values.length > 0)) {
        this.parseDisplay1(prop, li)
      } else if(prop.displayMode == 0) {
        this.parseDisplay0(prop, li);
      }else {
        let name: string = prop.name;                            //Propery name
        let text = this.renderer.createText(name);               //Holds property name
        this.renderer.appendChild(li, text);                     //Add property name to the p element
      }

      if (prop.type && Object.values(propertyValues).indexOf(prop.type) > -1) {
        this.addSortEmmit(prop.type, li);              //Add sort event on click
        this.renderer.addClass(li, 'sortable');        //Add sortable class on it
      }

      this.renderer.appendChild(this.el.nativeElement, li);    //Add property to the host element
    });
  }

  /**
   * Does specific parsing for properties that are in display mode 3,
   * creates and appends elements that hold the data
   * 
   * @param prop 
   *        property to parse
   * @param li
   *        list item to add property data to
   */
  private parseDisplay3(prop: any, li: any) {
    let name: string = prop.name;                     //name of the property
    let regex = new RegExp(/({\d*})/);                //Reg exp to find value positions in the name
    let substrs = name.split(regex);                  //Substrings of value postions and text before them

    substrs.forEach(str => {                          //Cycle substrings

      if (str.match(regex)) {                                      //If the sub string is a value position
        let valueIndex: number = parseInt(str.match(/(\d+)/)[0]);               //Reference of the value 

        let span = this.renderer.createElement('span');                         //Span element holds the value
        let spanText = this.renderer.createText(prop.values[valueIndex][0]);    //Value data
        this.renderer.addClass(span, "display-" + prop.values[valueIndex][1]);  //Property class
        this.renderer.appendChild(span, spanText);                              //add the value data to the span element
        this.renderer.appendChild(li, span);                                     //Append span to the p element
      } else {
        let preText = this.renderer.createText(str);                            //Text of the name
        this.renderer.appendChild(li, preText);                                  //Add text of the name to the p element
      }
    });
  }

  /**
   * Does specific parsing for properties that are in display mode 0,
   * creates and appends elements that hold the data
   * 
   * @param prop 
   *        property to parse
   * @param li
   *        list item to add property data to
   */
  private parseDisplay0(prop: any, li: any) {
    
    let propStrs = (prop.name as string).split(/(<.+?>{.+?})+/g);         //Split the array keep the delimiter (should look like <value>{othervalue})

    propStrs.forEach((propStr, i) => {                                    //Cycle throgh the array
      let value = propStr;                                                //Init the text value
      let span = this.renderer.createElement('span');                     //Create a span to put the text into

      if (new RegExp(/(<.+?>{.+?})+/g).test(propStr)) {                   //If the delimiter is found extract the value, and the class for it
        let displayModes = propStr.match(/<(.*?)>/g);                                   //extract class, should look like <value>
        let display = displayModes[displayModes.length -1].replace(/[<>]/gi, '');       //Get the value of the class
        value = propStr.replace(/<(.*?)>/gi, '').replace(/[{}]/gi, '');                 //Set the new value for the text
        this.renderer.addClass(span, display);                                          //Add class to the span
      }

      let text = this.renderer.createText(value);                                       //Create text for the span

      //Append
      this.renderer.appendChild(span, text);
      this.renderer.appendChild(li, span);
    });
  }

  /**
   * Does specific parsing for properties that are in display mode 0 & 1,
   * creates and appends elements that hold the data
   * 
   * @param prop 
   *        property to parse
   * @param li
   *        list item to add property data to
   */
  private parseDisplay1(prop: any, li: any) {
    let name = prop.name;                                         //name of the property
    let span = this.renderer.createElement('span');               //Holds values of the property
    let spanText = this.renderer.createText(prop.values[0][0]);   //Value for the span element
    this.renderer.addClass(span, "display-" + prop.values[0][1]); //Class of the value
    this.renderer.appendChild(span, spanText);                    //Add the value to the span element
    let preText = this.renderer.createText(name + ": ");          //Name of the property to go before the value

    //Append the other elements
    this.renderer.appendChild(li, preText);    
    this.renderer.appendChild(li, span);
    this.renderer.appendChild(this.el.nativeElement, li);
  }

  /**
   * Adds sort emmit event to property list items 
   * 
   * @param propType
   *        the type value on the property 
   * @param li
   *        list item to add event to
   */
  private addSortEmmit(propType: any, li: any) {
    this.renderer.listen(li, 'click', () => {   //On Click emmit event to sort by the prop
      this.sortByProp.emit(Object.keys(propertyValues).find(key => propertyValues[key] === propType));
    });
  }
}

@Directive({
  selector: '[divCardExplicitParser]'
})
export class DivCardExplicitParser {

  @Input() mods: Array<any>;       //Explicit Mods

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    if (this.mods) this.parseDivExplicits();   //Parse the Mods
  }

  /**
   * Parses the properties and displays them in the element
   */
  public parseDivExplicits() {

    this.mods.forEach((mod, i) => {                 
      let subMods = (mod as String).split(/\n/);

      subMods.forEach(subMod => {
        let modPairs = subMod.match(/<(.*?)>{(.*?)}/gi);
        let li = this.renderer.createElement('li');
        if (!modPairs) return;

        modPairs.forEach((modPair, i) => {
          let displayModes = modPair.match(/<(.*?)>/gi);
          let display = displayModes[displayModes.length -1].replace(/[<>]/gi, '');
          let value = modPair.replace(/<(.*?)>/gi, '').replace(/[{}]/gi, '')

          if (i > 0) value = ' ' + value;
          let text = this.renderer.createText(value);
          let span = this.renderer.createElement('span');
          this.renderer.addClass(span, display);

          this.renderer.appendChild(span, text);
          this.renderer.appendChild(li, span);
          this.renderer.appendChild(this.el.nativeElement, li);
        });
      });
    });
  }
}

@Pipe({
  name: 'parseMods',
  pure: true
})
export class ParseModsPipe implements PipeTransform {
  transform(item: any, modPropString: string, extendedPropName: string) : any {

    let mods: Array<modData> = [];                  //Stores explicit mod data                                  

    if (item[modPropString] == null || item[modPropString].length == 0) return null;    //Return null if no explicits

    item[modPropString].forEach((mod, i) => {                                   //cycle through explicits
      let hashIndex = item.extended.hashes?.[extendedPropName]?.[i][1]?.[0];    //Index of the mod for its extended data

      let modData: modData = {                                      //Set data
        text: (mod as string).replace(/\n/, '<br>'),                //Add break when there is a new line
        name: item.extended.mods?.[extendedPropName]?.[hashIndex]?.name,
        tier: item.extended.mods?.[extendedPropName]?.[hashIndex]?.tier,  
        ranges: [],
        hash: item.extended.hashes?.[item.extended.hashes?.hasOwnProperty('delve') ? 'delve' : extendedPropName]
              ?.[i]?.[0]  //If it is a delve item use delve property
      }

      if (item.extended.mods?.[extendedPropName]?.[hashIndex]?.magnitudes) {        //Check if there are magnitudes for the mod
        item.extended.mods?.[extendedPropName]?.[hashIndex]?.magnitudes.forEach(magnitude => {    //Cycle through magnitudes
          if (magnitude.hash == modData.hash 
              && !(magnitude.min == 0 && magnitude.max == 0)) {    //If the magnitude hash matched the mod hash and the value isn't 0
            modData.ranges.push({                                  //Add the magnitudes to the mod ranges
              min: magnitude.min,
              max: magnitude.max
            });
          }
        });
      }

      mods.push(modData);
    });

    return mods;
  }
}
