import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DigitsonlyDirective } from './digitsonly.directive';

@Component({
  selector: 'test-input',
  template: `<input digitsonly float='true' [formControl]='controlOne'/>
             <input digitsonly defaultZero='true' [formControl]='controlTwo'/>
             <input digitsonly [formControl]='controlThree'/>`,
})
class TestInputComponent {
  private controlOne: FormControl = new FormControl();
  private controlTwo: FormControl = new FormControl();
  private controlThree: FormControl = new FormControl();
}

describe('DigitsonlyDirective', () => {
  let fixture: ComponentFixture<TestInputComponent>;
  let inputs: Array<DebugElement>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ DigitsonlyDirective, TestInputComponent ],
      imports: [FormsModule, ReactiveFormsModule]
    }).createComponent(TestInputComponent);

    fixture.detectChanges();
    inputs = fixture.debugElement.queryAll(By.directive(DigitsonlyDirective));
  });
  
  it('should allow float numbers on the first input element', () => {
    const input = inputs[0];
    let mockInput = '12.34';
    let control = input.injector.get(NgControl) as NgControl;

    Array.from(mockInput).forEach(val => {
      input.triggerEventHandler('keydown', {});
      input.nativeElement.value += val;
      input.triggerEventHandler('input', { target: input.nativeElement });
    });

    input.triggerEventHandler('change', {});
    expect(control.value).toEqual(12.34);
  });

  it('should default to zero on the second input', () => {
    const input = inputs[1];
    let control = input.injector.get(NgControl) as NgControl;

    input.triggerEventHandler('keydown', {});
    input.nativeElement.value = '';
    input.triggerEventHandler('input', { target: input.nativeElement });

    input.triggerEventHandler('change', {});
    expect(control.value).toEqual(0);
  });

  it('should prevent non numerical values from being input on the inputs', () => {
    let mockInput = '12asd00';

    inputs.forEach(input => {
      let control = input.injector.get(NgControl) as NgControl;
      Array.from(mockInput).forEach(val => {
        input.triggerEventHandler('keydown', {});
        input.nativeElement.value += val;
        input.triggerEventHandler('input', { target: input.nativeElement });
      });

      input.triggerEventHandler('change', {});
      expect(control.value).toEqual(1200);
    })
  });
});
