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
import { WeaponfiltersComponent } from './weaponfilters.component';

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

describe('WeaponfiltersComponent', () => {
  let component: WeaponfiltersComponent;
  let fixture: ComponentFixture<WeaponfiltersComponent>;

  const mockWeaponForm = new FormGroup({
    disabled: new FormControl({ value: false, disabled: true }),
    filters: new FormGroup({
      damage: new FormGroup({
          min: new Defaultvaluecontrol('', ''),
          max: new Defaultvaluecontrol('', '')
      }),
      aps: new FormGroup({
          min: new Defaultvaluecontrol('', ''),
          max: new Defaultvaluecontrol('', '')
      }),
      crit: new FormGroup({
          min: new Defaultvaluecontrol('', ''),
          max: new Defaultvaluecontrol('', '')
      }),
      dps: new FormGroup({
          min: new Defaultvaluecontrol('', ''),
          max: new Defaultvaluecontrol('', '')
      }),
      pdps: new FormGroup({
          min: new Defaultvaluecontrol('', ''),
          max: new Defaultvaluecontrol('', '')
      }),
      edps: new FormGroup({
          min: new Defaultvaluecontrol('', ''),
          max: new Defaultvaluecontrol('', '')
      })
    })
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeaponfiltersComponent, MinMaxInputStub, FilterActionButtonsStub, InputWrapperStub ],
      imports:  [MatExpansionModule, NoopAnimationsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaponfiltersComponent);
    component = fixture.componentInstance;
    component.weaponForm = mockWeaponForm;
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
        component.weaponForm.controls.disabled.patchValue(true);
        component.weaponForm.disable();
        expect(await expansionHarness.isDisabled()).toBeTrue();
      });
    });

    describe('FilterActionButtons', () => {

      it('should have the formGroup input set as the weaponForm', () => {
        let weaponFormComp = fixture.debugElement.query(By.css('itemForm-filteractionbuttons')).componentInstance as FilterActionButtonsStub;
        expect(weaponFormComp.formGroup).toBe(component.weaponForm);
      });

      it('should close the expansion panel if the weaponForm is disabled on disableChange', async () => {
        let weaponFormComp = fixture.debugElement.query(By.css('itemForm-filteractionbuttons'));
        component.weaponForm.controls.disabled.patchValue(true);
        component.weaponForm.disable();

        await expansionHarness.toggle();
        weaponFormComp.triggerEventHandler('disableChange', {});
        expect(await expansionHarness.isExpanded()).toBeFalse();
      });

      it('should update the disable control value to false if the weaponForm is enabled on disableChange', async () => {
        component.weaponForm.enable();
        component.weaponForm.controls.disabled.patchValue(true, {emitEvent: false, onlySelf: true});
        let weaponFormComp = fixture.debugElement.query(By.css('itemForm-filteractionbuttons'));

        weaponFormComp.triggerEventHandler('disableChange', {});
        expect(component.weaponForm.controls.disabled.value).toBeFalse();
      });
    });

    describe('MinMaxInputs', () => {
      
      it('should set the inputs correctly', async () => {
        component.weaponForm.enable();
        component.weaponForm.controls.disabled.patchValue(false);
        await expansionHarness.expand();
        let inputwrapper = fixture.debugElement.queryAll(By.css('itemForm-inputwrapper'));

        let dmgInput = inputwrapper[0].query(By.css('itemForm-minmaxinput')).componentInstance as MinMaxInputStub;
        let apsInput = inputwrapper[1].query(By.css('itemForm-minmaxinput')).componentInstance as MinMaxInputStub;
        let critInput = inputwrapper[2].query(By.css('itemForm-minmaxinput')).componentInstance as MinMaxInputStub;
        let totalDPSInput = inputwrapper[3].query(By.css('itemForm-minmaxinput')).componentInstance as MinMaxInputStub;
        let physDPSInput = inputwrapper[4].query(By.css('itemForm-minmaxinput')).componentInstance as MinMaxInputStub;
        let eleDPSInput = inputwrapper[5].query(By.css('itemForm-minmaxinput')).componentInstance as MinMaxInputStub;

        expect(dmgInput.group).toBe(component.weaponForm.get('filters.damage') as FormGroup);
        expect(apsInput.group).toBe(component.weaponForm.get('filters.aps') as FormGroup);
        expect(critInput.group).toBe(component.weaponForm.get('filters.crit') as FormGroup);
        expect(totalDPSInput.group).toBe(component.weaponForm.get('filters.dps') as FormGroup);
        expect(physDPSInput.group).toBe(component.weaponForm.get('filters.pdps') as FormGroup);
        expect(eleDPSInput.group).toBe(component.weaponForm.get('filters.edps') as FormGroup);
      });
    });
  });

  describe('class functions', () => {

    describe('ngAfterContentChecked', () => {

      it('should disable the weaponForm if the disable control is true and the for is already enabled', () => {
        component.weaponForm.enable();
        component.weaponForm.controls.disabled.patchValue(true, {emitEvent: false, onlySelf: true});

        component.ngAfterContentChecked();
        expect(component.weaponForm.disabled).toBeTrue();
      });
    });

    describe('disable control value change', () => {
      it('should enable the form if the value is false and the form is disabled', () => {
        component.weaponForm.disable({emitEvent: false});
        component.weaponForm.controls.disabled.patchValue(false);
        expect(component.weaponForm.enabled).toBeTrue();
      });
    });
  });
});
