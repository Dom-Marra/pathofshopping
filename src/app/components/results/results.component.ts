import { Component, ElementRef, EventEmitter, Input, KeyValueDiffer, KeyValueDiffers, OnInit, Output, Pipe, PipeTransform, QueryList, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Resultdata } from '../../classes/resultdata/resultdata';
import { PoeService } from 'src/app/services/poe.service';

interface modData {
  text: string,
  name: string,
  tiers: Array<{
    tier: string,
    ranges: Array<{
      min: number,
      max: number
    }>
  }>,
  hash: string
}

interface propData {
  values: Array<{
    text: string,
    display?: any
  }>,
  progress?: number,
  type?: number
}

interface divData {
  values: Array<{
    text: string,
    display: any
  }>
}

enum propertyValues {
  prop_1 = 'map_tier',
  prop_2 = 'map_iiq',
  prop_3 = 'map_iir',
  prop_4 = 'map_packsize',
  prop_5 = 'gem_level',
  prop_6 = 'quality',
  prop_9 = 'pdps',
  prop_10 = 'edps',
  prop_11 = 'pseudo.pseudo_adds_chaos_damage_to_attacks',
  prop_12 = 'crit',
  prop_13 = 'aps',
  prop_15 = 'block',
  prop_16 = 'ar',
  prop_17 = 'ev',
  prop_18 = 'es',
  prop_20 = 'gem_level_progress',
  prop_32 = 'stack_size',
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  public readonly PROP_VALUES = propertyValues;        //Keys of the prop values

  @ViewChildren('itemsPaginator') itemsPaginators: QueryList<MatPaginator>;                         //Paginator
  @ViewChildren('itemsPaginator', { read: ElementRef }) itemsPaginatorsRef: QueryList<ElementRef>;  //results container

  @Input() resultData: Resultdata;                     //Data pertaining to results
  @Input() currentSort: any;                           //The current sort option
  @Output() newSort = new EventEmitter<string>();      //New sort option emitter

  public inProgress: boolean = false;                 //Whether the query is in progress or not

  public differ: KeyValueDiffer<any, any>;            //Used to detect changes in the queryProps
  constructor(private poeAPI: PoeService, private kvDiffers: KeyValueDiffers) { }

  ngOnInit(): void { 
    this.differ = this.kvDiffers.find(this.resultData).create();    //Create the differ

    //Retrieve data if first search
    if (this.resultData.retrievedItems.length == 0 && this.resultData.queryProps.res.length > 0) {
      this.getItems();
    }
  }

  ngAfterViewInit() {
    if (this.itemsPaginatorsRef.first) this.itemsPaginatorsRef.first.nativeElement.scrollIntoView();    //Scroll to first paginator

    this.itemsPaginatorsRef.changes.subscribe(paginators => {                       //When paginators become visible scroll to first 
      if (paginators.length > 0) paginators.first.nativeElement.scrollIntoView();
    });
  }

  ngDoCheck() {
    if (this.differ && this.resultData?.queryProps) {
      let resultChange = this.differ.diff(this.resultData.queryProps);    //Get changes
      
      if (resultChange) {
        resultChange.forEachChangedItem(item => {           //Cycle changed items
          
          if (item.key == 'res') {                          //If results changed perform a new search
            this.resultData.queryData = [];
            this.resultData.retrievedItems = [];
            if (this.itemsPaginators) this.itemsPaginators.forEach(paginator => paginator.firstPage());
            this.getItems();
          }
        });
      }
    }
  }

  /**
   * Gets item data from a range of item IDs
   */
  public getItems() {
    
    let query: Subscription;        //Query sub

    let results = this.resultData.queryProps.res
                  .slice(this.resultData.startIndex, this.resultData.endIndex);   //Get the IDs to retrive items for

    for (let item of results) {                            //Already have the information so return
      if (this.resultData.retrievedItems.indexOf(item) > -1) return;
    }

    if (results.length < 1) return;

    this.inProgress = true;                               //Set in progress

    //Get items
    query = this.poeAPI.fetch(results, "?query=" + this.resultData.queryProps.id + "&" + this.resultData.queryProps.psuedos)
    .subscribe((items: any) => {  
      this.resultData.queryData = this.resultData.queryData.concat(items.result);          //Add results   
      this.resultData.retrievedItems = this.resultData.retrievedItems.concat(results);     //Add the IDs as retrieved  

      //Out of progress unsub
      this.inProgress = false;
      query.unsubscribe();
    });
  }

  /**
   * Changes the start and end index depending on the page data
   * 
   * @param pageData 
   *        data passed by the paginator on page change
   */
  public changeIndices(pageData) {
    this.resultData.startIndex = (pageData.pageIndex * 10);
    this.resultData.endIndex = ((pageData.pageIndex * 10) + 10);
    this.resultData.pageIndex = pageData.pageIndex;

    this.getItems();
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
   * Returns the image for a specified currency ID
   * 
   * @param currencyID 
   *        string: currency id
   */
  public getCurrencyImage(currencyID: string): string {
    let currencies = this.poeAPI.getPoeStatic().find(category => { return category.id == 'Currency'});

    let currency = currencies.entries.find(currency => { return currency.id == currencyID});

    return 'http://pathofexile.com' + currency.image;
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

@Pipe({
  name: 'parserPipe',
  pure: true
})
export class ParserPipe implements PipeTransform {

  transform(props: any): any {
    let propData: Array<propData> = [];                                             

    props.forEach(prop => {            
      if (prop.displayMode == 3) {
        propData.push(this.parseDisplay3(prop));
      } else if (prop.displayMode == 1 || (prop.displayMode == 0 && prop.values.length > 0) || prop.displayMode == 2) {
        propData.push(this.parseDisplay1and2(prop));
      } else if(prop.displayMode == 0) {
        propData.push(this.parseDisplay0(prop));
      }else {
        propData.push({values: [{text: prop.name}], type: prop.type});                       
      }
    });

    return propData;
  }

  /**
   * Does specific parsing for properties that are in display mode 3
   * 
   * @param prop 
   *        property to parse
   */
  private parseDisplay3(prop: any): propData {
    let propData = {values: [], type: prop.type};     //Prop Data
    let name: string = prop.name;                     //name of the property
    let regex = new RegExp(/({\d*})/);                //Reg exp to find value positions in the name
    let substrs = name.split(regex);                  //Substrings of value postions and text before them

    substrs.forEach(str => {                          //Cycle substrings

      if (str.match(regex)) {                                      //If the sub string is a value position
        let valueIndex: number = parseInt(str.match(/(\d+)/)[0]);               //Reference of the value 

        let value = prop.values[valueIndex][0];                                 //Value data
        let dispay = prop.values[valueIndex][1];                                //Display mode
        propData.values.push({text: value, display: dispay});                   //Push to values of prop

      } else {
        propData.values.push({text: str, display: null});                       //Push str to values of prop
      }
    });

    return propData;
  }

  /**
   * Does specific parsing for properties that are in display mode 0
   * 
   * @param prop 
   *        property to parse
   */
  private parseDisplay0(prop: any): propData {
    let propData = {values: [], type: prop.type};                         //Prop Data
    let propStrs = (prop.name as string).split(/(<.+?>{.+?})+/g);         //Split the array keep the delimiter (should look like <value>{othervalue})

    propStrs.forEach((propStr, i) => {                                    //Cycle throgh the array
      let value = propStr;                                                //Init the text value
      let display: any = -1;

      if (new RegExp(/(<.+?>{.+?})+/g).test(propStr)) {                   //If the delimiter is found extract the value, and the class for it
        let displayModes = propStr.match(/<(.*?)>/g);                                     //extract class, should look like <value>
        display = displayModes[displayModes.length -1].replace(/[<>]/gi, '');             //Get the value of the class
        value = propStr.replace(/<(.*?)>/gi, '').replace(/[{}]/gi, '');                   //Set the new value for the text
      }

      propData.values.push({text: value, display: display});                              //Push data
    });

    return propData;
  }

  /**
   * Does specific parsing for properties that are in display mode 0 & 1
   * 
   * @param prop 
   *        property to parse
   */
  private parseDisplay1and2(prop: any): propData {
    let propData = {values: [], type: prop.type};                     //Prop Data
    let name = prop.name;                                             //name of the property

    if (name && name.length > 0) name = name + ": ";                  //Add if there is a name to prefix it
    propData.values.push({text: name});                               //push name

    prop.values.forEach((value, i) => {
      let val = value[0];                                               //Value
      let display = value[1];                                           //Display Mode

      if (i > 0) propData.values.push({text: ', '});
      if (prop.displayMode == 2) propData['progress'] = prop.progress;     
      propData.values.push({text: val, display: display});            //push value data
    });
    
    return propData;                                             
  }
}

@Pipe({
  name: 'parseDivs',
  pure: true
})
export class ParseDivsPipe implements PipeTransform { 

  /**
   * Transforms the div mod data into usable data for the ngFor directive
   * 
   * @param mods
   *        explicit mods from the div item 
   */
  transform(mods: any) {
    let divData: Array<divData> = [];                 //Stores all the div data

    mods.forEach(mod => {                 
      let subMods = (mod as String).split(/\n/);      //Every new line is another mod

      subMods.forEach(subMod => {                             //Cycle submods of the mod
        let divModData: divData = {values: []};               //Stores the div data for the current mod   
        let modPairs = subMod.match(/<(.*?)>{(.*?)}/gi);      //Split the different parts of the text

        modPairs.forEach((modPair, i) => {                    //Cycle the split parts
          let displayModes = modPair.match(/<(.*?)>/gi);                                  //parse the display modes
          let display = displayModes[displayModes.length -1].replace(/[<>]/gi, '');       //Get the most recent one
          let value = modPair.replace(/<(.*?)>/gi, '').replace(/[{}]/gi, '');             //Parse the value              

          if (i > 0) value = ' ' + value;                                                 //Add a space between mod pairs
          divModData.values.push({text: value, display: display});                        //Push data to the main mod data values 
        });

        divData.push(divModData);            //Push the mod data to the array of mod data 
      });
    });

    return divData;
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
      let hashIndices = item.extended.hashes?.[extendedPropName]?.[i][1];        //Indices of the mod for its extended data

      let modData: modData = {                                      //Set data
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
              if (magnitude.hash == modData.hash  && !(magnitude.min == 0 && magnitude.max == 0)) {   //If the magnitude hash matched the mod hash and the value isn't 0
                tierData.ranges.push({           //Add the magnitudes to the tier data ranges
                  min: magnitude.min,
                  max: magnitude.max
                });
              }
            });
          }
  
          modData.tiers.push(tierData);
        }
      }

      mods.push(modData);
    });

    return mods;
  }
}
