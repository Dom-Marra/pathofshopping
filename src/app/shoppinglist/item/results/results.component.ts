import { Component, Directive, ElementRef, Input, OnInit, Renderer2, SimpleChanges } from '@angular/core';

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

      let modData: modData = {                                      //Set data
        text: mod,
        name: item.extended.mods?.explicit?.[hashIndex]?.name,
        tier: item.extended.mods?.explicit?.[hashIndex]?.tier,  
        ranges: [],
        hash: item.extended.hashes?.explicit[i][0]
      }

      if (item.extended.mods?.explicit?.[hashIndex]?.magnitudes) {
        item.extended.mods?.explicit?.[hashIndex]?.magnitudes.forEach(magnitude => {
          if (magnitude.hash == modData.hash) {
            modData.ranges.push({
              min: magnitude.min,
              max: magnitude.max
            });
          }
        });
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

      let modData: modData = {                                        //Set data
        text: mod,
        name: item.extended.mods?.implicit?.[hashIndex]?.name,
        tier: item.extended.mods?.implicit?.[hashIndex]?.tier,  
        ranges: [],
        hash: item.extended.hashes?.implicit[i][0]
      }

      if (item.extended.mods?.implicit?.[hashIndex]?.magnitudes) {
        item.extended.mods?.implicit?.[hashIndex]?.magnitudes.forEach(magnitude => {
          if (magnitude.hash == modData.hash) {
            modData.ranges.push({
              min: magnitude.min,
              max: magnitude.max
            });
          }
        });
      }

      implicits.push(modData);
    });

    return implicits;
  }

}

@Directive({
  selector: '[properties]'
})
export class PropertiesDirective {

  @Input() props: Array<any>;       //Properties

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit() {
    if (this.props) this.parseProperties();   //Parse the properties
  }

  /**
   * Parses the properties and displays them in the element
   */
  public parseProperties() {

    this.props.forEach(prop => {                    //Cycle properties
      if (prop.displayMode == 3) {
        this.parseDisplay3(prop);
      } else if (prop.values != null && prop.values.length > 0) {
        this.parseDisplay0and1(prop)
      } else {
        let name: string = prop.name;                 //Propery name
        let li = this.renderer.createElement('li');     //p element holds property
        let text = this.renderer.createText(name);    //Holds property name
        this.renderer.appendChild(li, text);           //Add property name to the p element
        this.renderer.appendChild(this.el.nativeElement, li);    //Add property to the host element
      }
    });
  }

  /**
   * Does specific parsing for properties that are in display mode 3,
   * creates and appends elements that hold the data
   * 
   * @param prop 
   *        property to parse
   */
  private parseDisplay3(prop: any) {
    let name: string = prop.name;                     //name of the property
    let li = this.renderer.createElement('li');        //li element to hold the property data
    let regex = new RegExp(/({\d*})/);                //Reg exp to find value positions in the name
    let substrs = name.split(regex);                  //Substrings of value postions and text before them

    substrs.forEach(str => {                          //Cycle substrings

      if (str.match(regex)) {                                      //If the sub string is a value position
        let valueIndex: number = parseInt(str.match(/(\d+)/)[0]);               //Reference of the value 

        let span = this.renderer.createElement('span');                         //Span element holds the value
        let spanText = this.renderer.createText(prop.values[valueIndex][0]);    //Value data
        this.renderer.addClass(span, "prop-" + prop.values[valueIndex][1]);     //Property class
        this.renderer.appendChild(span, spanText);                              //add the value data to the span element
        this.renderer.appendChild(li, span);                                     //Append span to the p element
      } else {
        let preText = this.renderer.createText(str);                            //Text of the name
        this.renderer.appendChild(li, preText);                                  //Add text of the name to the p element
      }
    });

    this.renderer.appendChild(this.el.nativeElement, li);         //Add the property to the host element
  }

  /**
   * Does specific parsing for properties that are in display mode 0 & 1,
   * creates and appends elements that hold the data
   * 
   * @param prop 
   *        property to parse
   */
  private parseDisplay0and1(prop: any) {
    let name = prop.name;                                         //name of the property
    let li = this.renderer.createElement('li');                   //li element to hold property data
    let span = this.renderer.createElement('span');               //Holds values of the property
    let spanText = this.renderer.createText(prop.values[0][0]);   //Value for the span element
    this.renderer.addClass(span, "prop-" + prop.values[0][1]);    //Class of the value
    this.renderer.appendChild(span, spanText);                    //Add the value to the span element
    let preText = this.renderer.createText(name + ": ");          //Name of the property to go before the value

    //Append the other elements
    this.renderer.appendChild(li, preText);    
    this.renderer.appendChild(li, span);
    this.renderer.appendChild(this.el.nativeElement, li);
  }

}
