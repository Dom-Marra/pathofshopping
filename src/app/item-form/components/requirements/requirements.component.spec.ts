import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatExpansionPanelHarness } from '@angular/material/expansion/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Defaultvaluecontrol } from 'src/app/core/classes/defaultvaluecontrol';
import { RequirementsComponent } from './requirements.component';

@Component({selector: 'itemForm-filteractionbuttons', template: ''})
class FilterActionButtonsStub {
  @Output() remove: EventEmitter<void> = new EventEmitter();         
  @Output() disableChange: EventEmitter<void> = new EventEmitter();  

  @Input() formGroup: FormGroup;       
}

@Component({selector: 'itemForm-minmaxinput', template: ''})
class MinMaxInputStub {
  @Input() group: FormGroup;       
}

@Component({selector: 'itemForm-inputwrapper', template: '<ng-content></ng-content>'})
class InputWrapperStub { }

describe('RequirementsComponent', () => {
  let mockReqForm = new FormGroup({
    disabled: new FormControl({ value: false, disabled: true }),
      filters: new FormGroup({
          lvl: new FormGroup({
              min: new Defaultvaluecontrol('', ''),
              max: new Defaultvaluecontrol('', ''),
          }),
          str: new FormGroup({
              min: new Defaultvaluecontrol('', ''),
              max: new Defaultvaluecontrol('', '')
          }),
          dex: new FormGroup({
              min: new Defaultvaluecontrol('', ''),
              max: new Defaultvaluecontrol('', '')
          }),
          int: new FormGroup({
              min: new Defaultvaluecontrol('', ''),
              max: new Defaultvaluecontrol('', '')
          })
      })
  });

  let component: RequirementsComponent;
  let fixture: ComponentFixture<RequirementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequirementsComponent, MinMaxInputStub, FilterActionButtonsStub, InputWrapperStub ],
      imports:  [MatExpansionModule, NoopAnimationsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementsComponent);
    component = fixture.componentInstance;
    component.requirementsForm = mockReqForm;
    fixture.detectChanges();
  });

  describe('component HTML', () => {
    let loader: HarnessLoader;
    let expansionHarness: MatExpansionPanelHarness;

    beforeEach(async () => {
      loader = TestbedHarnessEnvironment.loader(fixture);
      expansionHarness = await loader.getHarness(MatExpansionPanelHarness)
    });
    
    describe('MatExpansionPanel', () => {

      it('should be disabled when the armour form is disabled', async () => {
        component.requirementsForm.controls.disabled.patchValue(true);
        component.requirementsForm.disable();
        expect(await expansionHarness.isDisabled()).toBeTrue();
      });
    });

    describe('FilterActionButtons', () => {

      it('should have the formGroup input set as the requirementsForm', () => {
        let requirementsFormComp = fixture.debugElement.query(By.css('itemForm-filteractionbuttons')).componentInstance as FilterActionButtonsStub;
        expect(requirementsFormComp.formGroup).toBe(component.requirementsForm);
      });

      it('should close the expansion panel if the requirementsForm is disabled on disableChange', async () => {
        let requirementsFormComp = fixture.debugElement.query(By.css('itemForm-filteractionbuttons'));
        component.requirementsForm.controls.disabled.patchValue(true);
        component.requirementsForm.disable();

        await expansionHarness.toggle();
        requirementsFormComp.triggerEventHandler('disableChange', {});
        expect(await expansionHarness.isExpanded()).toBeFalse();
      });

      it('should update the disable control value to false if the requirementsForm is enabled on disableChange', async () => {
        component.requirementsForm.enable();
        component.requirementsForm.controls.disabled.patchValue(true, {emitEvent: false, onlySelf: true});
        let requirementsFormComp = fixture.debugElement.query(By.css('itemForm-filteractionbuttons'));

        requirementsFormComp.triggerEventHandler('disableChange', {});
        expect(component.requirementsForm.controls.disabled.value).toBeFalse();
      });
    });

    describe('MinMaxInputs', () => {
      
      it('should set the inputs correctly', async () => {
        component.requirementsForm.enable();
        component.requirementsForm.controls.disabled.patchValue(false);
        await expansionHarness.toggle();
        let inputwrapper = fixture.debugElement.queryAll(By.css('itemForm-inputwrapper'));

        let levelInput = inputwrapper[0].query(By.css('itemForm-minmaxinput')).componentInstance as MinMaxInputStub;
        let strInput = inputwrapper[1].query(By.css('itemForm-minmaxinput')).componentInstance as MinMaxInputStub;
        let intInput = inputwrapper[2].query(By.css('itemForm-minmaxinput')).componentInstance as MinMaxInputStub;
        let dexInput = inputwrapper[3].query(By.css('itemForm-minmaxinput')).componentInstance as MinMaxInputStub;

        expect(levelInput.group).toEqual(component.requirementsForm.get('filters.lvl') as FormGroup);
        expect(strInput.group).toEqual(component.requirementsForm.get('filters.str') as FormGroup);
        expect(intInput.group).toEqual(component.requirementsForm.get('filters.int') as FormGroup);
        expect(dexInput.group).toEqual(component.requirementsForm.get('filters.dex') as FormGroup);
      });
    });
  });

  describe('class functions', () => {

    describe('ngAfterContentChecked', () => {

      it('should disable the requirementsForm if the disable control is true and the for is already enabled', () => {
        component.requirementsForm.enable();
        component.requirementsForm.controls.disabled.patchValue(true, {emitEvent: false, onlySelf: true});

        component.ngAfterContentChecked();
        expect(component.requirementsForm.disabled).toBeTrue();
      });
    });

    describe('disable control value change', () => {
      it('should enable the form if the value is false and the form is disabled', () => {
        component.requirementsForm.disable({emitEvent: false});
        component.requirementsForm.controls.disabled.patchValue(false);
        expect(component.requirementsForm.enabled).toBeTrue();
      });
    });
  });
});
