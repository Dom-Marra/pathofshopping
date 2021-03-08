import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, DebugElement, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteOrigin } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatExpansionPanelHarness } from '@angular/material/expansion/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Defaultvaluecontrol } from 'src/app/core/classes/defaultvaluecontrol';
import { simpleData } from 'src/app/core/models/simpleData';
import { SimpleDataService } from 'src/app/core/services/simpledata.service';
import { OtherfiltersComponent } from './otherfilters.component';

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
  @Input() disabled: boolean; 
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();  
}

@Component({selector: 'itemForm-inputwrapper', template: '<ng-content></ng-content>'})
class InputWrapperStub { }

class SimpleDataServiceStub {
  public simpleTrueFalse = [{id: 'mockId', text: 'mock test'}];

  public filterSimpleData(searchText: string, values: Array<simpleData>) {}

  public displayByText(value: simpleData) {}

  public getSelectedValue(id: string, values: Array<simpleData>) {}
}

describe('OtherfiltersComponent', () => {
  let mockOtherForm = new FormGroup({
    otherForm_disabled: new FormControl({ value: false, disabled: true }),
    quality: new FormGroup({
        min: new Defaultvaluecontrol('', ''),
        max: new Defaultvaluecontrol('', '')
    }),
    ilvl: new FormGroup({
        min: new Defaultvaluecontrol('', ''),
        max: new Defaultvaluecontrol('', '')
    }),
    talisman_tier: new FormGroup({
        min: new Defaultvaluecontrol('', ''),
        max: new Defaultvaluecontrol('', '')
    }),
    stored_experience: new FormGroup({
        min: new Defaultvaluecontrol('', ''),
        max: new Defaultvaluecontrol('', '')
    }),
    stack_size: new FormGroup({
        min: new Defaultvaluecontrol('', ''),
        max: new Defaultvaluecontrol('', '')
    }),
    alternate_art: new FormGroup({
        option: new Defaultvaluecontrol('', '')
    }),
    identified: new FormGroup({
        option: new Defaultvaluecontrol('', '')
    }),
    corrupted: new FormGroup({
        option: new Defaultvaluecontrol('', '')
    }),
    mirrored: new FormGroup({
        option: new Defaultvaluecontrol('', '')
    }),
    crafted: new FormGroup({
        option: new Defaultvaluecontrol('', '')
    }),
    veiled: new FormGroup({
        option: new Defaultvaluecontrol('', '')
    }),
    enchanted: new FormGroup({
        option: new Defaultvaluecontrol('', '')
    }),
  });
  let component: OtherfiltersComponent;
  let fixture: ComponentFixture<OtherfiltersComponent>;
  let simpleDataService: SimpleDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherfiltersComponent, InputWrapperStub, SearchSelectStubComponent, MinMaxInputStub, FilterActionButtonsStub ],
      imports:  [ MatExpansionModule, NoopAnimationsModule, MatAutocompleteModule ],
      providers: [
        {provide: SimpleDataService, useClass: SimpleDataServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherfiltersComponent);
    component = fixture.componentInstance;
    component.otherForm = mockOtherForm;
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
        component.otherForm.controls.otherForm_disabled.patchValue(true);
        component.otherForm.disable();
        expect(await expansionHarness.isDisabled()).toBeTrue();
      });
    });

    describe('FilterActionButtons', () => {

      it('should have the formGroup input set as the otherForm', () => {
        let otherFormComp = fixture.debugElement.query(By.css('itemForm-filteractionbuttons')).componentInstance as FilterActionButtonsStub;
        expect(otherFormComp.formGroup).toBe(component.otherForm);
      });

      it('should close the expansion panel if the otherForm is disabled on disableChange', async () => {
        let otherFormComp = fixture.debugElement.query(By.css('itemForm-filteractionbuttons'));
        component.otherForm.controls.otherForm_disabled.patchValue(true);
        component.otherForm.disable();

        await expansionHarness.toggle();
        otherFormComp.triggerEventHandler('disableChange', {});
        expect(await expansionHarness.isExpanded()).toBeFalse();
      });

      it('should update the disable control value to false if the otherForm is enabled on disableChange', async () => {
        component.otherForm.enable();
        component.otherForm.controls.otherForm_disabled.patchValue(true, {emitEvent: false, onlySelf: true});
        let otherFormComp = fixture.debugElement.query(By.css('itemForm-filteractionbuttons'));

        otherFormComp.triggerEventHandler('disableChange', {});
        expect(component.otherForm.controls.otherForm_disabled.value).toBeFalse();
      });
    });

    describe('MinMaxInputs', () => {
      
      it('should set the inputs correctly', async () => {
        component.otherForm.enable();
        component.otherForm.controls.otherForm_disabled.patchValue(false);
        await expansionHarness.toggle();
        let inputwrapper = fixture.debugElement.queryAll(By.css('itemForm-inputwrapper'));
        
        let quality = inputwrapper[0].query(By.css('itemForm-minmaxinput')).componentInstance as MinMaxInputStub;
        let itemlevel = inputwrapper[1].query(By.css('itemForm-minmaxinput')).componentInstance as MinMaxInputStub;
        let talismanTier = inputwrapper[2].query(By.css('itemForm-minmaxinput')).componentInstance as MinMaxInputStub;
        let storedExp = inputwrapper[3].query(By.css('itemForm-minmaxinput')).componentInstance as MinMaxInputStub;
        let stackSize = inputwrapper[4].query(By.css('itemForm-minmaxinput')).componentInstance as MinMaxInputStub;

        expect(quality.group).toEqual(component.otherForm.get('quality') as FormGroup);
        expect(itemlevel.group).toEqual(component.otherForm.get('ilvl') as FormGroup);
        expect(talismanTier.group).toEqual(component.otherForm.get('talisman_tier') as FormGroup);
        expect(storedExp.group).toEqual(component.otherForm.get('stored_experience') as FormGroup);
        expect(stackSize.group).toEqual(component.otherForm.get('stack_size') as FormGroup);
      });
    });

    describe('alternate art searchselect', () => {
      let inputwrapper: DebugElement[];
      let searchselect: DebugElement;

      beforeEach(async () => {
        component.otherForm.enable();
        component.otherForm.controls.otherForm_disabled.patchValue(false);
        await expansionHarness.toggle();
        inputwrapper = fixture.debugElement.queryAll(By.css('itemForm-inputwrapper'));
        searchselect = inputwrapper[5].query(By.css('app-searchselect'));
      });

      it('should set the inputs correctly', async () => {
        let searchSelectComp =  searchselect.componentInstance as SearchSelectStubComponent
        let autocomplethost = inputwrapper[5].injector.get(MatAutocompleteOrigin);

        expect(searchSelectComp.values).toEqual(simpleDataService.simpleTrueFalse);
        expect(searchSelectComp.disabled).toEqual(component.otherForm.disabled);
        expect(searchSelectComp.autoCompleteHost).toEqual(autocomplethost);
        expect(searchSelectComp.filterBy).toEqual(simpleDataService.filterSimpleData);
        expect(searchSelectComp.displayBy).toEqual(simpleDataService.displayByText);
        expect(searchSelectComp.setValue).toEqual(simpleDataService.getSelectedValue(component.otherForm.get('alternate_art.option').value, component.simpleDataService.simpleTrueFalse))
      });

      it('should patch the alternate_art control to the selected event value', () => {
        searchselect.triggerEventHandler('selected', {id: 'mockId'});
        expect(component.otherForm.controls.alternate_art.value).toEqual({option: 'mockId'});
      });
    });

    describe('Identified art searchselect', () => {
      let inputwrapper: DebugElement[];
      let searchselect: DebugElement;

      beforeEach(async () => {
        component.otherForm.enable();
        component.otherForm.controls.otherForm_disabled.patchValue(false);
        await expansionHarness.toggle();
        inputwrapper = fixture.debugElement.queryAll(By.css('itemForm-inputwrapper'));
        searchselect = inputwrapper[6].query(By.css('app-searchselect'));
      });

      it('should set the inputs correctly', async () => {
        let searchSelectComp =  searchselect.componentInstance as SearchSelectStubComponent
        let autocomplethost = inputwrapper[6].injector.get(MatAutocompleteOrigin);

        expect(searchSelectComp.values).toEqual(simpleDataService.simpleTrueFalse);
        expect(searchSelectComp.disabled).toEqual(component.otherForm.disabled);
        expect(searchSelectComp.autoCompleteHost).toEqual(autocomplethost);
        expect(searchSelectComp.filterBy).toEqual(simpleDataService.filterSimpleData);
        expect(searchSelectComp.displayBy).toEqual(simpleDataService.displayByText);
        expect(searchSelectComp.setValue).toEqual(simpleDataService.getSelectedValue(component.otherForm.get('identified.option').value, component.simpleDataService.simpleTrueFalse))
      });

      it('should patch the identified control to the selected event value', () => {
        searchselect.triggerEventHandler('selected', {id: 'mockId'});
        expect(component.otherForm.controls.identified.value).toEqual({option: 'mockId'});
      });
    });

    describe('Corrupted art searchselect', () => {
      let inputwrapper: DebugElement[];
      let searchselect: DebugElement;

      beforeEach(async () => {
        component.otherForm.enable();
        component.otherForm.controls.otherForm_disabled.patchValue(false);
        await expansionHarness.toggle();
        inputwrapper = fixture.debugElement.queryAll(By.css('itemForm-inputwrapper'));
        searchselect = inputwrapper[7].query(By.css('app-searchselect'));
      });

      it('should set the inputs correctly', async () => {
        let searchSelectComp =  searchselect.componentInstance as SearchSelectStubComponent
        let autocomplethost = inputwrapper[7].injector.get(MatAutocompleteOrigin);

        expect(searchSelectComp.values).toEqual(simpleDataService.simpleTrueFalse);
        expect(searchSelectComp.disabled).toEqual(component.otherForm.disabled);
        expect(searchSelectComp.autoCompleteHost).toEqual(autocomplethost);
        expect(searchSelectComp.filterBy).toEqual(simpleDataService.filterSimpleData);
        expect(searchSelectComp.displayBy).toEqual(simpleDataService.displayByText);
        expect(searchSelectComp.setValue).toEqual(simpleDataService.getSelectedValue(component.otherForm.get('corrupted.option').value, component.simpleDataService.simpleTrueFalse))
      });

      it('should patch the corrupted control to the selected event value', () => {
        searchselect.triggerEventHandler('selected', {id: 'mockId'});
        expect(component.otherForm.controls.corrupted.value).toEqual({option: 'mockId'});
      });
    });

    describe('Mirrored art searchselect', () => {
      let inputwrapper: DebugElement[];
      let searchselect: DebugElement;

      beforeEach(async () => {
        component.otherForm.enable();
        component.otherForm.controls.otherForm_disabled.patchValue(false);
        await expansionHarness.toggle();
        inputwrapper = fixture.debugElement.queryAll(By.css('itemForm-inputwrapper'));
        searchselect = inputwrapper[8].query(By.css('app-searchselect'));
      });

      it('should set the inputs correctly', async () => {
        let searchSelectComp =  searchselect.componentInstance as SearchSelectStubComponent
        let autocomplethost = inputwrapper[8].injector.get(MatAutocompleteOrigin);

        expect(searchSelectComp.values).toEqual(simpleDataService.simpleTrueFalse);
        expect(searchSelectComp.disabled).toEqual(component.otherForm.disabled);
        expect(searchSelectComp.autoCompleteHost).toEqual(autocomplethost);
        expect(searchSelectComp.filterBy).toEqual(simpleDataService.filterSimpleData);
        expect(searchSelectComp.displayBy).toEqual(simpleDataService.displayByText);
        expect(searchSelectComp.setValue).toEqual(simpleDataService.getSelectedValue(component.otherForm.get('mirrored.option').value, component.simpleDataService.simpleTrueFalse))
      });

      it('should patch the mirrored control to the selected event value', () => {
        searchselect.triggerEventHandler('selected', {id: 'mockId'});
        expect(component.otherForm.controls.mirrored.value).toEqual({option: 'mockId'});
      });
    });

    describe('Crafted art searchselect', () => {
      let inputwrapper: DebugElement[];
      let searchselect: DebugElement;

      beforeEach(async () => {
        component.otherForm.enable();
        component.otherForm.controls.otherForm_disabled.patchValue(false);
        await expansionHarness.toggle();
        inputwrapper = fixture.debugElement.queryAll(By.css('itemForm-inputwrapper'));
        searchselect = inputwrapper[9].query(By.css('app-searchselect'));
      });

      it('should set the inputs correctly', async () => {
        let searchSelectComp =  searchselect.componentInstance as SearchSelectStubComponent
        let autocomplethost = inputwrapper[9].injector.get(MatAutocompleteOrigin);

        expect(searchSelectComp.values).toEqual(simpleDataService.simpleTrueFalse);
        expect(searchSelectComp.disabled).toEqual(component.otherForm.disabled);
        expect(searchSelectComp.autoCompleteHost).toEqual(autocomplethost);
        expect(searchSelectComp.filterBy).toEqual(simpleDataService.filterSimpleData);
        expect(searchSelectComp.displayBy).toEqual(simpleDataService.displayByText);
        expect(searchSelectComp.setValue).toEqual(simpleDataService.getSelectedValue(component.otherForm.get('crafted.option').value, component.simpleDataService.simpleTrueFalse))
      });

      it('should patch the crafted control to the selected event value', () => {
        searchselect.triggerEventHandler('selected', {id: 'mockId'});
        expect(component.otherForm.controls.crafted.value).toEqual({option: 'mockId'});
      });
    });

    describe('Veiled art searchselect', () => {
      let inputwrapper: DebugElement[];
      let searchselect: DebugElement;

      beforeEach(async () => {
        component.otherForm.enable();
        component.otherForm.controls.otherForm_disabled.patchValue(false);
        await expansionHarness.toggle();
        inputwrapper = fixture.debugElement.queryAll(By.css('itemForm-inputwrapper'));
        searchselect = inputwrapper[10].query(By.css('app-searchselect'));
      });

      it('should set the inputs correctly', async () => {
        let searchSelectComp =  searchselect.componentInstance as SearchSelectStubComponent
        let autocomplethost = inputwrapper[10].injector.get(MatAutocompleteOrigin);

        expect(searchSelectComp.values).toEqual(simpleDataService.simpleTrueFalse);
        expect(searchSelectComp.disabled).toEqual(component.otherForm.disabled);
        expect(searchSelectComp.autoCompleteHost).toEqual(autocomplethost);
        expect(searchSelectComp.filterBy).toEqual(simpleDataService.filterSimpleData);
        expect(searchSelectComp.displayBy).toEqual(simpleDataService.displayByText);
        expect(searchSelectComp.setValue).toEqual(simpleDataService.getSelectedValue(component.otherForm.get('veiled.option').value, component.simpleDataService.simpleTrueFalse))
      });

      it('should patch the veiled control to the selected event value', () => {
        searchselect.triggerEventHandler('selected', {id: 'mockId'});
        expect(component.otherForm.controls.veiled.value).toEqual({option: 'mockId'});
      });
    });

    describe('Enchanted art searchselect', () => {
      let inputwrapper: DebugElement[];
      let searchselect: DebugElement;

      beforeEach(async () => {
        component.otherForm.enable();
        component.otherForm.controls.otherForm_disabled.patchValue(false);
        await expansionHarness.toggle();
        inputwrapper = fixture.debugElement.queryAll(By.css('itemForm-inputwrapper'));
        searchselect = inputwrapper[11].query(By.css('app-searchselect'));
      });

      it('should set the inputs correctly', async () => {
        let searchSelectComp =  searchselect.componentInstance as SearchSelectStubComponent
        let autocomplethost = inputwrapper[11].injector.get(MatAutocompleteOrigin);

        expect(searchSelectComp.values).toEqual(simpleDataService.simpleTrueFalse);
        expect(searchSelectComp.disabled).toEqual(component.otherForm.disabled);
        expect(searchSelectComp.autoCompleteHost).toEqual(autocomplethost);
        expect(searchSelectComp.filterBy).toEqual(simpleDataService.filterSimpleData);
        expect(searchSelectComp.displayBy).toEqual(simpleDataService.displayByText);
        expect(searchSelectComp.setValue).toEqual(simpleDataService.getSelectedValue(component.otherForm.get('enchanted.option').value, component.simpleDataService.simpleTrueFalse))
      });

      it('should patch the enchanted control to the selected event value', () => {
        searchselect.triggerEventHandler('selected', {id: 'mockId'});
        expect(component.otherForm.controls.enchanted.value).toEqual({option: 'mockId'});
      });
    });
  });

  describe('class functions', () => {

    describe('ngAfterContentChecked', () => {

      it('should disable the otherForm if the disable control is true and the for is already enabled', () => {
        component.otherForm.enable();
        component.otherForm.controls.otherForm_disabled.patchValue(true, {emitEvent: false, onlySelf: true});

        component.ngAfterContentChecked();
        expect(component.otherForm.disabled).toBeTrue();
      });
    });

    describe('control value changes', () => {
      it('should call checkIfDirty', () => {
        spyOn(component, 'checkIfDirty');
        component.otherForm.get('mirrored.option').patchValue('mockvalue');
        expect(component.checkIfDirty).toHaveBeenCalled();
      });
    });

    describe('checkIfDirty', () => {
      it('should set the form to dirty if a control is dirty', () => {
        component.otherForm.markAsPristine();
        component.otherForm.get('mirrored.option').markAsDirty();
        component.checkIfDirty();
        expect(component.otherForm.dirty).toBeTrue();
      });

      it('should set the form to pristine if all the controls are pristine', () => {
        for (let control in component.otherForm.controls) {
          component.otherForm.controls[control].markAsPristine();
        }

        component.otherForm.markAsDirty();
        component.checkIfDirty();
        expect(component.otherForm.pristine).toBeTrue();
      });
    });

    describe('disable control value change', () => {
      it('should enable the form if the value is false and the form is disabled', () => {
        component.otherForm.disable({emitEvent: false});
        component.otherForm.controls.otherForm_disabled.patchValue(false);
        expect(component.otherForm.enabled).toBeTrue();
      });
    });
  });
});
