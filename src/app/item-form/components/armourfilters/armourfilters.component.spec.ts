import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatExpansionPanelHarness } from '@angular/material/expansion/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Defaultvaluecontrol } from 'src/app/classes/defaultvaluecontrol';
import { ArmourfiltersComponent } from './armourfilters.component';

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

describe('ArmourfiltersComponent', () => {
  let mockArmorForm = new FormGroup({
    disabled: new FormControl({ 
      value: false, disabled: true }),
      filters: new FormGroup({
          ar: new FormGroup({
              min: new Defaultvaluecontrol('', ''),
              max: new Defaultvaluecontrol('', '')
          }),
          es: new FormGroup({
              min: new Defaultvaluecontrol('', ''),
              max: new Defaultvaluecontrol('', '')
          }),
          ev: new FormGroup({
              min: new Defaultvaluecontrol('', ''),
              max: new Defaultvaluecontrol('', '')
          }),
          block: new FormGroup({
              min: new Defaultvaluecontrol('', ''),
              max: new Defaultvaluecontrol('', '')
          })
      })
  });

  let component: ArmourfiltersComponent;
  let fixture: ComponentFixture<ArmourfiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmourfiltersComponent, MinMaxInputStub, FilterActionButtonsStub, InputWrapperStub ],
      imports:  [MatExpansionModule, NoopAnimationsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArmourfiltersComponent);
    component = fixture.componentInstance;
    component.armourForm = mockArmorForm;

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
        component.armourForm.controls.disabled.patchValue(true);
        component.armourForm.disable();
        expect(await expansionHarness.isDisabled()).toBeTrue();
      });
    });

    describe('FilterActionButtons', () => {

      it('should have the formGroup input set as the armourForm', () => {
        let armourFormComp = fixture.debugElement.query(By.css('itemForm-filteractionbuttons')).componentInstance as FilterActionButtonsStub;
        expect(armourFormComp.formGroup).toBe(component.armourForm);
      });

      it('should close the expansion panel if the armourForm is disabled on disableChange', async () => {
        let armourFormComp = fixture.debugElement.query(By.css('itemForm-filteractionbuttons'));
        component.armourForm.controls.disabled.patchValue(true);
        component.armourForm.disable();

        await expansionHarness.toggle();
        armourFormComp.triggerEventHandler('disableChange', {});
        expect(await expansionHarness.isExpanded()).toBeFalse();
      });

      it('should update the disable control value to false if the armourForm is enabled on disableChange', async () => {
        component.armourForm.enable();
        component.armourForm.controls.disabled.patchValue(true, {emitEvent: false, onlySelf: true});
        let armourFormComp = fixture.debugElement.query(By.css('itemForm-filteractionbuttons'));

        armourFormComp.triggerEventHandler('disableChange', {});
        expect(component.armourForm.controls.disabled.value).toBeFalse();
      });
    });

    describe('MinMaxInputs', () => {
      
      it('should set the inputs correctly', async () => {
        component.armourForm.enable();
        component.armourForm.controls.disabled.patchValue(false);
        await expansionHarness.toggle();
        let inputwrapper = fixture.debugElement.queryAll(By.css('itemForm-inputwrapper'));

        let arInput = inputwrapper[0].query(By.css('itemForm-minmaxinput')).componentInstance as MinMaxInputStub;
        let esInput = inputwrapper[1].query(By.css('itemForm-minmaxinput')).componentInstance as MinMaxInputStub;
        let evInput = inputwrapper[2].query(By.css('itemForm-minmaxinput')).componentInstance as MinMaxInputStub;
        let blockInput = inputwrapper[3].query(By.css('itemForm-minmaxinput')).componentInstance as MinMaxInputStub;

        expect(arInput.group).toBe(component.armourForm.get('filters.ar') as FormGroup);
        expect(esInput.group).toBe(component.armourForm.get('filters.es') as FormGroup);
        expect(evInput.group).toBe(component.armourForm.get('filters.ev') as FormGroup);
        expect(blockInput.group).toBe(component.armourForm.get('filters.block') as FormGroup);
      });
    });
  });

  describe('class functions', () => {

    describe('ngAfterContentChecked', () => {

      it('should disable the armourForm if the disable control is true and the for is already enabled', () => {
        component.armourForm.enable();
        component.armourForm.controls.disabled.patchValue(true, {emitEvent: false, onlySelf: true});

        component.ngAfterContentChecked();
        expect(component.armourForm.disabled).toBeTrue();
      });
    });

    describe('disable control value change', () => {
      it('should enable the form if the value is false and the form is disabled', () => {
        component.armourForm.disable({emitEvent: false});
        component.armourForm.controls.disabled.patchValue(false);
        expect(component.armourForm.enabled).toBeTrue();
      });
    });
  });
});
