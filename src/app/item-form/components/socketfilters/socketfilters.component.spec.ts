import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatExpansionPanelHarness } from '@angular/material/expansion/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Defaultvaluecontrol } from 'src/app/core/classes/defaultvaluecontrol';
import { SocketfiltersComponent } from './socketfilters.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material/input/testing';

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

describe('SocketfiltersComponent', () => {
  let component: SocketfiltersComponent;
  let fixture: ComponentFixture<SocketfiltersComponent>;
  let mockSocketForm = new FormGroup({
    disabled: new FormControl({ value: false, disabled: true }),
      filters: new FormGroup({
          sockets: new FormGroup({
              r: new Defaultvaluecontrol('', ''),
              g: new Defaultvaluecontrol('', ''),
              b: new Defaultvaluecontrol('', ''),
              w: new Defaultvaluecontrol('', ''),
              min: new Defaultvaluecontrol('', ''),
              max: new Defaultvaluecontrol('', ''),
          }),
          links: new FormGroup({
              r: new Defaultvaluecontrol('', ''),
              g: new Defaultvaluecontrol('', ''),
              b: new Defaultvaluecontrol('', ''),
              w: new Defaultvaluecontrol('', ''),
              min: new Defaultvaluecontrol('', ''),
              max: new Defaultvaluecontrol('', ''),
          })
      })
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocketfiltersComponent, MinMaxInputStub, FilterActionButtonsStub, InputWrapperStub ],
      imports:  [MatExpansionModule, NoopAnimationsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocketfiltersComponent);
    component = fixture.componentInstance;
    component.socketForm = mockSocketForm;
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
        component.socketForm.controls.disabled.patchValue(true);
        component.socketForm.disable();
        expect(await expansionHarness.isDisabled()).toBeTrue();
      });
    });

    describe('FilterActionButtons', () => {

      it('should have the formGroup input set as the socketForm', () => {
        let socketFormComp = fixture.debugElement.query(By.css('itemForm-filteractionbuttons')).componentInstance as FilterActionButtonsStub;
        expect(socketFormComp.formGroup).toBe(component.socketForm);
      });

      it('should close the expansion panel if the socketForm is disabled on disableChange', async () => {
        let socketFormComp = fixture.debugElement.query(By.css('itemForm-filteractionbuttons'));
        component.socketForm.controls.disabled.patchValue(true);
        component.socketForm.disable();

        await expansionHarness.toggle();
        socketFormComp.triggerEventHandler('disableChange', {});
        expect(await expansionHarness.isExpanded()).toBeFalse();
      });

      it('should update the disable control value to false if the socketForm is enabled on disableChange', async () => {
        component.socketForm.enable();
        component.socketForm.controls.disabled.patchValue(true, {emitEvent: false, onlySelf: true});
        let socketFormComp = fixture.debugElement.query(By.css('itemForm-filteractionbuttons'));

        socketFormComp.triggerEventHandler('disableChange', {});
        expect(component.socketForm.controls.disabled.value).toBeFalse();
      });
    });

    describe('MinMaxInputs', () => {
      
      it('should set the inputs correctly', async () => {
        component.socketForm.enable();
        component.socketForm.controls.disabled.patchValue(false);
        await expansionHarness.toggle();
        let inputwrapper = fixture.debugElement.queryAll(By.css('itemForm-inputwrapper'));

        let socketsMinMaxInput = inputwrapper[0].query(By.css('itemForm-minmaxinput')).componentInstance as MinMaxInputStub;
        let linksMinMaxInput = inputwrapper[1].query(By.css('itemForm-minmaxinput')).componentInstance as MinMaxInputStub;

        expect(socketsMinMaxInput.group).toEqual(component.socketForm.get('filters.sockets') as FormGroup);
        expect(linksMinMaxInput.group).toEqual(component.socketForm.get('filters.links') as FormGroup);
      });
    });

    describe('socketExtra formfields', () => {
      let formfieldHarnesses: MatFormFieldHarness[];
      const mockFormControl = new FormControl();

      beforeEach(() => {
        component.socketLinksExtras = null;
        component.socketSocketsExtras = [{label: 'Mock Label', control: mockFormControl, inputClass: 'mockClass'}];
        component.socketForm.enable();
        component.socketForm.controls.disabled.patchValue(false);
      })

      beforeEach(async () => {
        await expansionHarness.expand();
        formfieldHarnesses = await loader.getAllHarnesses(MatFormFieldHarness);
      });

      it('should use the socketSocketExtra label as the label', async () => {
        expect(await formfieldHarnesses[0].getLabel()).toEqual('Mock Label');
      });

      it('should use the socketSocketExtra control as the label', async () => {
        let control = await formfieldHarnesses[0].getControl() as MatInputHarness;
        await control.setValue('2');
        expect(mockFormControl.value).toEqual('2');
      });

      it('should use the inputClass on the formfield', async () => {
        expect(await (await formfieldHarnesses[0].host()).hasClass('mockClass')).toBeTrue();
      });
    });

    describe('linkExtra formfields', () => {
      let formfieldHarnesses: MatFormFieldHarness[];
      const mockFormControl = new FormControl();

      beforeEach(() => {
        component.socketSocketsExtras = null;
        component.socketLinksExtras = [{label: 'Mock Label', control: mockFormControl, inputClass: 'mockClass'}];
        component.socketForm.enable();
        component.socketForm.controls.disabled.patchValue(false);
      })

      beforeEach(async () => {
        await expansionHarness.expand();
        formfieldHarnesses = await loader.getAllHarnesses(MatFormFieldHarness);
      });

      it('should use the socketSocketExtra label as the label', async () => {
        expect(await formfieldHarnesses[0].getLabel()).toEqual('Mock Label');
      });

      it('should use the socketSocketExtra control as the label', async () => {
        let control = await formfieldHarnesses[0].getControl() as MatInputHarness;
        await control.setValue('2');
        expect(mockFormControl.value).toEqual('2');
      });

      it('should use the inputClass on the formfield', async () => {
        expect(await (await formfieldHarnesses[0].host()).hasClass('mockClass')).toBeTrue();
      });
    });
  });

  describe('class functions', () => {

    describe('ngAfterContentChecked', () => {

      it('should disable the socketForm if the disable control is true and the for is already enabled', () => {
        component.socketForm.enable();
        component.socketForm.controls.disabled.patchValue(true, {emitEvent: false, onlySelf: true});

        component.ngAfterContentChecked();
        expect(component.socketForm.disabled).toBeTrue();
      });
    });

    describe('ngOnInit', () => {
      it('should set the socketLinksExtras and the socketSocketsExtras', () => {
        component.socketSocketsExtras = null;
        component.socketLinksExtras = null;
        fixture.detectChanges();
        component.ngOnInit();

        expect(component.socketSocketsExtras).toBeDefined();
        expect(component.socketLinksExtras).toBeDefined();
      })
    })

    describe('disable control value change', () => {
      it('should enable the form if the value is false and the form is disabled', () => {
        component.socketForm.disable({emitEvent: false});
        component.socketForm.controls.disabled.patchValue(false);
        expect(component.socketForm.enabled).toBeTrue();
      });
    });
  });
});
