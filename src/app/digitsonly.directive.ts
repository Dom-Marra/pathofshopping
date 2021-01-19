import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[digitsonly]'
})
export class DigitsonlyDirective {

  @Input() float: boolean = false;                //Whether to accept floats or not
  @Input() defaultZero: boolean = false;          //Whether the default value shall be zero after input

  private lastInput: number;                      //The last input                

  @HostListener('keydown')
  onKeyDown() {
    this.lastInput = this.el.nativeElement.value;
  }

  @HostListener('input')
  onInput() {
    let input = this.el.nativeElement.value;          //Set the inputs value

    if ((isNaN(input) || input == ' ') && !(input == '' && !this.defaultZero)) {    //If the input is NaN reset it to the previous value
      this.el.nativeElement.value = this.lastInput;
    } 
  }

  @HostListener('change')
  onChange() {
    let input = this.el.nativeElement.value;          //Set the inputs value

    if (input == '' && this.defaultZero) {            //If the input is empty set it to 0, and the input var to 0
      this.el.nativeElement.value = 0;
      input = 0;
    } else if (input == '' && !this.defaultZero) {
      return;
    }

    if (this.float) {                                 //Parse the value of the input to float
      this.control.control.patchValue(parseFloat(input));
    } else {                                          //Parse the value of the input to an Int
      this.control.control.patchValue(parseInt(input));
    }

  }
  
  constructor(private el: ElementRef, private control: NgControl) { }

}
