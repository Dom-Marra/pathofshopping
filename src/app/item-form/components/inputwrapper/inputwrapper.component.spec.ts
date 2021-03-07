import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { InputwrapperComponent } from './inputwrapper.component';

@Component({
  template: `<itemForm-inputwrapper>
                <p label>Label</p>
                <input type='text' placeholder='Stub Wrapper Test'/>
             </itemForm-inputwrapper>`
})
class InputWrapperStubComponent {}


describe('InputwrapperComponent', () => {
  let component: InputWrapperStubComponent;
  let fixture: ComponentFixture<InputWrapperStubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputwrapperComponent, InputWrapperStubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputWrapperStubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should project the content into inputs div', () => {
    const inputsDiv = fixture.debugElement.query(By.css('.inputs'));

    expect(inputsDiv.children[0].name).toEqual('input');
  });

  it('should project the content with the label directive into the input-label div', () => {
    const inputsDiv = fixture.debugElement.query(By.css('.input-label'));

    expect(inputsDiv.children[0].name).toEqual('p');
    expect(inputsDiv.children[0].nativeElement.textContent).toContain('Label');
  });
});
