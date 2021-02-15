import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { DebugElement, Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';

import { MinmaxinputComponent } from './minmaxinput.component';
import { By } from '@angular/platform-browser';

@Directive({
  selector: '[digitsonly]'
})
export class DigitsonlyStubDirective {
  @Input() float: boolean;
}

fdescribe('MinmaxinputComponent', () => {
  let component: MinmaxinputComponent;
  let fixture: ComponentFixture<MinmaxinputComponent>;
  let mockFormGroup: FormGroup;
  let loader: HarnessLoader;
  let inputs: Array<DebugElement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinmaxinputComponent, DigitsonlyStubDirective ],
      imports: [ MatInputModule, MatFormFieldModule, NoopAnimationsModule,ReactiveFormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinmaxinputComponent);
    component = fixture.componentInstance;

    mockFormGroup = new FormGroup({
      min: new FormControl(),
      max: new FormControl()
    });

    component.group = mockFormGroup;
    
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
    inputs = fixture.debugElement.queryAll(By.directive(DigitsonlyStubDirective));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be using the min control in the min form field', async () => {
    const formField = await loader.getHarness(MatFormFieldHarness.with({floatingLabelText: 'Min'}));
    let control = await (await formField.getControl() as MatInputHarness);
    await control.setValue('5');

    expect(component.group.controls.min.value).toEqual('5');
  });

  it('should be using the max control in the max form field', async () => {
    const formField = await loader.getHarness(MatFormFieldHarness.with({floatingLabelText: 'Max'}));
    let control = await (await formField.getControl() as MatInputHarness);
    await control.setValue('5');

    expect(component.group.controls.max.value).toEqual('5');
  });

  it('should be using digitsonly directive', () => {
    expect(inputs.length).toEqual(2);
  });

  it('should be using float for the digitsonly directive', () => {
    expect(inputs[0].injector.get(DigitsonlyStubDirective).float).toBe(true);
    expect(inputs[1].injector.get(DigitsonlyStubDirective).float).toBe(true);
  });
});
