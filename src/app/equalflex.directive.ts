import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appEqualflex]'
})
export class EqualflexDirective {
 
  private children: HTMLCollection;                           //Flex items
  private numOfChildren;

  constructor(private container: ElementRef, private renderer2: Renderer2) { }

  ngAfterViewInit() {
    this.children = this.container.nativeElement.children;    //set children
    this.numOfChildren = this.children.length;
    this.addPlaceHolders();                                           //set the inital padding
  }

  /**
   * Sets the padding on the last element so that each element in the flex container is of equal width
   */
  private addPlaceHolders() {
    let classes: Array<string> = [];                    //Classes of the children

    Array.from(this.children).forEach(child => {        //Add classes of the children
      child.classList.forEach((entry: string) => {
        if (classes.indexOf(entry) < 0) {
          classes.push(entry);
        } 
      });
    });

    for (let i = 0; i < this.numOfChildren; i++) {                    //Create placeholders
      let placeholder = this.renderer2.createElement('div');          //placeholder is a div

      //Set invis styles
      this.renderer2.setStyle(placeholder, 'visibility', 'hidden');
      this.renderer2.setStyle(placeholder, 'height', '0px');
      this.renderer2.setStyle(placeholder, 'margin-top', '0px');
      this.renderer2.setStyle(placeholder, 'margin-bottom', '0px');
      this.renderer2.setStyle(placeholder, 'padding-bottom', '0px');
      this.renderer2.setStyle(placeholder, 'padding-bottom', '0px');

      classes.forEach(entry => {                                              //Add classes to the placeholder
        this.renderer2.addClass(placeholder, entry);
      });

      this.renderer2.appendChild(this.container.nativeElement, placeholder);  //Append to the main container
    }

  }
}
