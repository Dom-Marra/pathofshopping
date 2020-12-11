import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[digitsonly]'
})
export class DigitsonlyDirective {

  @Input() float: boolean = false;                //Whether to accept floats or not

  private lastInput: number;                      //The last input                

  @HostListener('keydown')
  onKeyDown() {
    this.lastInput = this.el.nativeElement.value;
  }

  @HostListener('input')
  onInput() {
    let input = this.el.nativeElement.value;          //Set the inputs value

    if (isNaN(input)) {                               //If the input is NaN reset it to the previous value
      this.el.nativeElement.value = this.lastInput;
    } 
  }

  @HostListener('change')
  onChange() {
    let input = this.el.nativeElement.value;          //Set the inputs value

    if (input == '') {                                //If the input is empty set it to 0, and the input var to 0
      this.el.nativeElement.value = 0;
      input = 0;
    }

    if (this.float) {                                 //Parse the value of the input to float
      this.el.nativeElement.value = parseFloat(input);
    } else {                                          //Parse the value of the input to an Int
      this.el.nativeElement.value = parseInt(input);
    }
  }
  
  constructor(private el: ElementRef) { }

}
