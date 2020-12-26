import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appEqualflex]'
})
export class EqualflexDirective {

  @HostListener('window:resize')  //We resize the padding on window resize
  onResize() {
    this.padLast();
  }
 
  private children: HTMLCollection;                           //Flex items

  constructor(private container: ElementRef) { }

  ngAfterViewInit() {
    this.children = this.container.nativeElement.children;    //set children
    this.padLast();                                           //set the inital padding
  }

  /**
   * Sets the padding on the last element so that each element in the flex container is of equal width
   */
  private padLast() {
    let lastChild = (this.children.item(this.children.length - 1)) as HTMLElement   //get the last element in the container
    let firstChild = this.children.item(0) as HTMLElement;                          //first element in the container
    let totalChildWidth = this.getTotalWidth(firstChild);                           //total width that all elements should be]
    lastChild.style.marginRight = '';                                               //reset inline margin right
    let lastChildWidth = this.getTotalWidth(lastChild);                             //total width of the lastChild
    let multiplier = 0;                                                             //What to multiply the total width by

    if (totalChildWidth >= lastChildWidth) return;                                  //ignore if the size of the last element is already equal

    multiplier = Math.round(lastChildWidth / totalChildWidth);                      //initiate multiplier

    if (multiplier == this.children.length - 1) multiplier--;                       //Decrement multiplier, this is done because this means that the last child is the only one the current row

    lastChild.style.marginRight = parseFloat(getComputedStyle(lastChild).borderRight)     //set padding
                                  + parseFloat(getComputedStyle(lastChild).borderRight)
                                  + (totalChildWidth * multiplier) + 'px';
  }

  /**
   * Retrieves the width of the inputted element
   * 
   * @param el 
   *        HTMLElement: The element to get the width of of
   */
  private getTotalWidth(el: HTMLElement): number {
    let marginLeft = parseFloat(getComputedStyle(el).marginLeft);
    let marginRight = parseFloat(getComputedStyle(el).marginRight);
    let paddingLeft = parseFloat(getComputedStyle(el).paddingLeft);
    let paddingRight = parseFloat(getComputedStyle(el).paddingRight);
    let borderLeft = parseFloat(getComputedStyle(el).borderLeft);
    let borderRight = parseFloat(getComputedStyle(el).borderRight);
    let width = parseFloat(getComputedStyle(el).width);

    return marginLeft + marginRight + paddingLeft + paddingRight + width + borderLeft + borderRight;
  }

}
