import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, DebugElement, EventEmitter, Input, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteOrigin } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatExpansionPanelHarness } from '@angular/material/expansion/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Defaultvaluecontrol } from 'src/app/classes/defaultvaluecontrol';
import { simpleData } from 'src/app/models/simpleData';
import { SimpleDataService } from 'src/app/services/simpledata.service';
import { GemfiltersComponent } from './gemfilters.component';

@Component({selector: 'app-filteractionbuttons', template: ''})
class FilterActionButtonsStub {
  @Output() remove: EventEmitter<void> = new EventEmitter();         
  @Output() disableChange: EventEmitter<void> = new EventEmitter();  

  @Input() formGroup: FormGroup;       
}

@Component({selector: 'app-minmaxinput', template: ''})
class MinMaxInputStub {
  @Input() group: FormGroup;       
}

@Component({selector: 'app-searchselect', template: ''})
class SearchSelectStubComponent {      
  @Input() autoCompleteHost: MatAutocompleteOrigin;                               
  @Input() values: any;                                             
  @Input() groupOptions: any;
  @Input() autoCompleteClass: string;                  
  @Input() setValue: any;                                    
  @Input() placeholder: string;                   
  @Input() filterBy: any;        
  @Input() displayBy: any;      
  @Input() inputName: any;        
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();  
}

@Component({selector: 'app-inputwrapper', template: '<ng-content></ng-content>'})
class InputWrapperStub { }

class SimpleDataServiceStub {
  public filterSimpleData(searchText: string, values: Array<simpleData>) {}

  public displayByText(value: simpleData) {}

  public getSelectedValue(id: string, values: Array<simpleData>) {}
}

describe('GemfiltersComponent', () => {
  let mockGemForm = new FormGroup({
    gemForm_disabled: new FormControl({ value: false, disabled: true }),
    gem_alternate_quality: new FormGroup({
        option: new Defaultvaluecontrol('', '')
    }),
    gem_level: new FormGroup({
        min: new Defaultvaluecontrol('', ''),
        max: new Defaultvaluecontrol('', '')
    }),
    gem_level_progress: new FormGroup({
        min: new Defaultvaluecontrol('', ''),
        max: new Defaultvaluecontrol('', '')
    })
  });

  let component: GemfiltersComponent;
  let fixture: ComponentFixture<GemfiltersComponent>;
  let simpleDataService: SimpleDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GemfiltersComponent, MinMaxInputStub, FilterActionButtonsStub, InputWrapperStub, SearchSelectStubComponent ],
      imports:  [ MatExpansionModule, NoopAnimationsModule, MatAutocompleteModule ],
      providers: [
        {provide: SimpleDataService, useClass: SimpleDataServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GemfiltersComponent);
    component = fixture.componentInstance;
    component.gemForm = mockGemForm;

    fixture.detectChanges();
    simpleDataService = TestBed.inject(SimpleDataService);
  });

  describe('component HTML', () => {
    let loader: HarnessLoader;
    let expansionHarness: MatExpansionPanelHarness;

    beforeEach(async () => {
      loader = TestbedHarnessEnvironment.loader(fixture);
      expansionHarness = await loader.getHarness(MatExpansionPanelHarness)
    });
    
    describe('MatExpansionPanel', () => {

      it('should be disabled when the gem form is disabled', async () => {
        component.gemForm.controls.gemForm_disabled.patchValue(true);
        component.gemForm.disable();
        expect(await expansionHarness.isDisabled()).toBeTrue();
      });
    });

    describe('FilterActionButtons', () => {

      it('should have the formGroup input set as the gemForm', () => {
        let gemFormComp = fixture.debugElement.query(By.css('app-filteractionbuttons')).componentInstance as FilterActionButtonsStub;
        expect(gemFormComp.formGroup).toBe(component.gemForm);
      });

      it('should close the expansion panel if the gemForm is disabled on disableChange', async () => {
        let gemFormComp = fixture.debugElement.query(By.css('app-filteractionbuttons'));
        component.gemForm.controls.gemForm_disabled.patchValue(true);
        component.gemForm.disable();

        await expansionHarness.toggle();
        gemFormComp.triggerEventHandler('disableChange', {});
        expect(await expansionHarness.isExpanded()).toBeFalse();
      });

      it('should update the disable control value to false if the gemForm is enabled on disableChange', async () => {
        component.gemForm.enable();
        component.gemForm.controls.gemForm_disabled.patchValue(true, {emitEvent: false, onlySelf: true});
        let gemFormComp = fixture.debugElement.query(By.css('app-filteractionbuttons'));

        gemFormComp.triggerEventHandler('disableChange', {});
        expect(component.gemForm.controls.gemForm_disabled.value).toBeFalse();
      });
    });

    describe('MinMaxInputs', () => {
      
      it('should set the inputs correctly', async () => {
        component.gemForm.enable();
        component.gemForm.controls.gemForm_disabled.patchValue(false);
        await expansionHarness.toggle();
        let inputwrapper = fixture.debugElement.queryAll(By.css('app-inputwrapper'));

        let gemLevelInput = inputwrapper[0].query(By.css('app-minmaxinput')).componentInstance as MinMaxInputStub;
        let gemelvlProgInput = inputwrapper[1].query(By.css('app-minmaxinput')).componentInstance as MinMaxInputStub;

        expect(gemLevelInput.group).toBe(component.gemForm.get('gem_level') as FormGroup);
        expect(gemelvlProgInput.group).toBe(component.gemForm.get('gem_level_progress') as FormGroup);
      });
    });

    describe('gem alternate quality searchselect', () => {
      let inputwrapper: DebugElement[];
      let searchselect: DebugElement;

      beforeEach(async () => {
        component.gemForm.enable();
        component.gemForm.controls.gemForm_disabled.patchValue(false);
        await expansionHarness.toggle();
        inputwrapper = fixture.debugElement.queryAll(By.css('app-inputwrapper'));
        searchselect = inputwrapper[2].query(By.css('app-searchselect'));
      });

      it('should set the inputs correctly', async () => {
        let searchSelectComp =  searchselect.componentInstance as SearchSelectStubComponent
        let autocomplethost = inputwrapper[2].injector.get(MatAutocompleteOrigin);

        expect(searchSelectComp.autoCompleteHost).toEqual(autocomplethost);
        expect(searchSelectComp.filterBy).toEqual(simpleDataService.filterSimpleData);
        expect(searchSelectComp.displayBy).toEqual(simpleDataService.displayByText);
        expect(searchSelectComp.setValue).toEqual(simpleDataService.getSelectedValue(component.gemForm['controls'].gem_alternate_quality['controls'].option.value, component.gemQualityTypes))
      });

      it('should patch the gem_alternate_quality control to the selected event value', () => {
        searchselect.triggerEventHandler('selected', {id: 'mockId'});
        expect(component.gemForm.controls.gem_alternate_quality.value).toEqual({option: 'mockId'});
      });
    });
  });

  describe('class functions', () => {

    describe('ngAfterContentChecked', () => {

      it('should disable the gemForm if the disable control is true and the for is already enabled', () => {
        component.gemForm.enable();
        component.gemForm.controls.gemForm_disabled.patchValue(true, {emitEvent: false, onlySelf: true});

        component.ngAfterContentChecked();
        expect(component.gemForm.disabled).toBeTrue();
      });
    });

    describe('control value changes', () => {
      it('should call checkIfDirty', () => {
        spyOn(component, 'checkIfDirty');
        component.gemForm.get('gem_alternate_quality.option').patchValue('mockvalue');
        expect(component.checkIfDirty).toHaveBeenCalled();
      });
    });

    describe('checkIfDirty', () => {
      it('should set the form to dirty if a control is dirty', () => {
        component.gemForm.markAsPristine();
        component.gemForm.get('gem_alternate_quality.option').markAsDirty();
        component.checkIfDirty();
        expect(component.gemForm.dirty).toBeTrue();
      });

      it('should set the form to pristine if all the controls are pristine', () => {
        for (let control in component.gemForm.controls) {
          component.gemForm.controls[control].markAsPristine();
        }

        component.gemForm.markAsDirty();
        component.checkIfDirty();
        expect(component.gemForm.pristine).toBeTrue();
      });
    });

    describe('disable control value change', () => {
      it('should enable the form if the value is false and the form is disabled', () => {
        component.gemForm.disable({emitEvent: false});
        component.gemForm.controls.gemForm_disabled.patchValue(false);
        expect(component.gemForm.enabled).toBeTrue();
      });
    });
  });
});


