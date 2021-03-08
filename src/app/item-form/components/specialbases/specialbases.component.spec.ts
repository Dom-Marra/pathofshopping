import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, DebugElement, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteOrigin } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatExpansionPanelHarness } from '@angular/material/expansion/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Defaultvaluecontrol } from 'src/app/core/classes/defaultvaluecontrol';
import { simpleData } from 'src/app/core/models/simpleData';
import { SimpleDataService } from 'src/app/core/services/simpledata.service';
import { SpecialbasesComponent } from './specialbases.component';
@Component({selector: 'itemForm-filteractionbuttons', template: ''})
class FilterActionButtonsStub {
  @Output() remove: EventEmitter<void> = new EventEmitter();         
  @Output() disableChange: EventEmitter<void> = new EventEmitter();  

  @Input() formGroup: FormGroup;       
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

describe('SpecialbasesComponent', () => {
  const mockInfluenceForm =  new FormGroup({
    influenceForm_disabled: new FormControl({ value: false, disabled: true }),
    shaper_item: new FormGroup({
        option: new Defaultvaluecontrol('', '')
    }),
    elder_item: new FormGroup({
        option: new Defaultvaluecontrol('', '')
    }),
    crusader_item: new FormGroup({
        option: new Defaultvaluecontrol('', '')
    }),
    redeemer_item: new FormGroup({
        option: new Defaultvaluecontrol('', '')
    }),
    hunter_item: new FormGroup({
        option: new Defaultvaluecontrol('', '')
    }),
    warlord_item: new FormGroup({
        option: new Defaultvaluecontrol('', '')
    }),
    fractured_item: new FormGroup({
        option: new Defaultvaluecontrol('', '')
    }),
    synthesised_item: new FormGroup({
        option: new Defaultvaluecontrol('', '')
    })
  });

  let component: SpecialbasesComponent;
  let fixture: ComponentFixture<SpecialbasesComponent>;
  let simpleDataService: SimpleDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialbasesComponent, InputWrapperStub, SearchSelectStubComponent, FilterActionButtonsStub ],
      imports:  [ MatExpansionModule, NoopAnimationsModule, MatAutocompleteModule ],
      providers: [
        {provide: SimpleDataService, useClass: SimpleDataServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialbasesComponent);
    component = fixture.componentInstance;
    component.influenceForm = mockInfluenceForm;
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
        component.influenceForm.controls.influenceForm_disabled.patchValue(true);
        component.influenceForm.disable();
        expect(await expansionHarness.isDisabled()).toBeTrue();
      });
    });

    describe('FilterActionButtons', () => {

      it('should have the formGroup input set as the influenceForm', () => {
        let influenceFormComp = fixture.debugElement.query(By.css('itemForm-filteractionbuttons')).componentInstance as FilterActionButtonsStub;
        expect(influenceFormComp.formGroup).toBe(component.influenceForm);
      });

      it('should close the expansion panel if the influenceForm is disabled on disableChange', async () => {
        let influenceFormComp = fixture.debugElement.query(By.css('itemForm-filteractionbuttons'));
        component.influenceForm.controls.influenceForm_disabled.patchValue(true);
        component.influenceForm.disable();

        await expansionHarness.toggle();
        influenceFormComp.triggerEventHandler('disableChange', {});
        expect(await expansionHarness.isExpanded()).toBeFalse();
      });

      it('should update the disable control value to false if the influenceForm is enabled on disableChange', async () => {
        component.influenceForm.enable();
        component.influenceForm.controls.influenceForm_disabled.patchValue(true, {emitEvent: false, onlySelf: true});
        let influenceFormComp = fixture.debugElement.query(By.css('itemForm-filteractionbuttons'));

        influenceFormComp.triggerEventHandler('disableChange', {});
        expect(component.influenceForm.controls.influenceForm_disabled.value).toBeFalse();
      });
    });

    describe('Shaper Influence searchselect', () => {
      let inputwrapper: DebugElement[];
      let searchselect: DebugElement;

      beforeEach(async () => {
        component.influenceForm.enable();
        component.influenceForm.controls.influenceForm_disabled.patchValue(false);
        await expansionHarness.toggle();
        inputwrapper = fixture.debugElement.queryAll(By.css('itemForm-inputwrapper'));
        searchselect = inputwrapper[0].query(By.css('app-searchselect'));
      });

      it('should set the inputs correctly', async () => {
        let searchSelectComp =  searchselect.componentInstance as SearchSelectStubComponent
        let autocomplethost = inputwrapper[0].injector.get(MatAutocompleteOrigin);

        expect(searchSelectComp.values).toEqual(simpleDataService.simpleTrueFalse);
        expect(searchSelectComp.disabled).toEqual(component.influenceForm.disabled);
        expect(searchSelectComp.autoCompleteHost).toEqual(autocomplethost);
        expect(searchSelectComp.filterBy).toEqual(simpleDataService.filterSimpleData);
        expect(searchSelectComp.displayBy).toEqual(simpleDataService.displayByText);
        expect(searchSelectComp.setValue).toEqual(simpleDataService.getSelectedValue(component.influenceForm.get('shaper_item.option').value, component.simpleDataService.simpleTrueFalse))
      });

      it('should patch the shaper_item control to the selected event value', () => {
        searchselect.triggerEventHandler('selected', {id: 'mockId'});
        expect(component.influenceForm.controls.shaper_item.value).toEqual({option: 'mockId'});
      });
    });

    describe('Elder Influence searchselect', () => {
      let inputwrapper: DebugElement[];
      let searchselect: DebugElement;

      beforeEach(async () => {
        component.influenceForm.enable();
        component.influenceForm.controls.influenceForm_disabled.patchValue(false);
        await expansionHarness.toggle();
        inputwrapper = fixture.debugElement.queryAll(By.css('itemForm-inputwrapper'));
        searchselect = inputwrapper[1].query(By.css('app-searchselect'));
      });

      it('should set the inputs correctly', async () => {
        let searchSelectComp =  searchselect.componentInstance as SearchSelectStubComponent
        let autocomplethost = inputwrapper[1].injector.get(MatAutocompleteOrigin);

        expect(searchSelectComp.values).toEqual(simpleDataService.simpleTrueFalse);
        expect(searchSelectComp.disabled).toEqual(component.influenceForm.disabled);
        expect(searchSelectComp.autoCompleteHost).toEqual(autocomplethost);
        expect(searchSelectComp.filterBy).toEqual(simpleDataService.filterSimpleData);
        expect(searchSelectComp.displayBy).toEqual(simpleDataService.displayByText);
        expect(searchSelectComp.setValue).toEqual(simpleDataService.getSelectedValue(component.influenceForm.get('elder_item.option').value, component.simpleDataService.simpleTrueFalse))
      });

      it('should patch the elder_item control to the selected event value', () => {
        searchselect.triggerEventHandler('selected', {id: 'mockId'});
        expect(component.influenceForm.controls.elder_item.value).toEqual({option: 'mockId'});
      });
    });

    describe('Crusader Influence searchselect', () => {
      let inputwrapper: DebugElement[];
      let searchselect: DebugElement;

      beforeEach(async () => {
        component.influenceForm.enable();
        component.influenceForm.controls.influenceForm_disabled.patchValue(false);
        await expansionHarness.toggle();
        inputwrapper = fixture.debugElement.queryAll(By.css('itemForm-inputwrapper'));
        searchselect = inputwrapper[2].query(By.css('app-searchselect'));
      });

      it('should set the inputs correctly', async () => {
        let searchSelectComp =  searchselect.componentInstance as SearchSelectStubComponent
        let autocomplethost = inputwrapper[2].injector.get(MatAutocompleteOrigin);

        expect(searchSelectComp.values).toEqual(simpleDataService.simpleTrueFalse);
        expect(searchSelectComp.disabled).toEqual(component.influenceForm.disabled);
        expect(searchSelectComp.autoCompleteHost).toEqual(autocomplethost);
        expect(searchSelectComp.filterBy).toEqual(simpleDataService.filterSimpleData);
        expect(searchSelectComp.displayBy).toEqual(simpleDataService.displayByText);
        expect(searchSelectComp.setValue).toEqual(simpleDataService.getSelectedValue(component.influenceForm.get('crusader_item.option').value, component.simpleDataService.simpleTrueFalse))
      });

      it('should patch the crusader_item control to the selected event value', () => {
        searchselect.triggerEventHandler('selected', {id: 'mockId'});
        expect(component.influenceForm.controls.crusader_item.value).toEqual({option: 'mockId'});
      });
    });

    describe('Redeemer Influence searchselect', () => {
      let inputwrapper: DebugElement[];
      let searchselect: DebugElement;

      beforeEach(async () => {
        component.influenceForm.enable();
        component.influenceForm.controls.influenceForm_disabled.patchValue(false);
        await expansionHarness.toggle();
        inputwrapper = fixture.debugElement.queryAll(By.css('itemForm-inputwrapper'));
        searchselect = inputwrapper[3].query(By.css('app-searchselect'));
      });

      it('should set the inputs correctly', async () => {
        let searchSelectComp =  searchselect.componentInstance as SearchSelectStubComponent
        let autocomplethost = inputwrapper[3].injector.get(MatAutocompleteOrigin);

        expect(searchSelectComp.values).toEqual(simpleDataService.simpleTrueFalse);
        expect(searchSelectComp.disabled).toEqual(component.influenceForm.disabled);
        expect(searchSelectComp.autoCompleteHost).toEqual(autocomplethost);
        expect(searchSelectComp.filterBy).toEqual(simpleDataService.filterSimpleData);
        expect(searchSelectComp.displayBy).toEqual(simpleDataService.displayByText);
        expect(searchSelectComp.setValue).toEqual(simpleDataService.getSelectedValue(component.influenceForm.get('redeemer_item.option').value, component.simpleDataService.simpleTrueFalse))
      });

      it('should patch the redeemer_item control to the selected event value', () => {
        searchselect.triggerEventHandler('selected', {id: 'mockId'});
        expect(component.influenceForm.controls.redeemer_item.value).toEqual({option: 'mockId'});
      });
    });


    describe('Hunter Influence searchselect', () => {
      let inputwrapper: DebugElement[];
      let searchselect: DebugElement;

      beforeEach(async () => {
        component.influenceForm.enable();
        component.influenceForm.controls.influenceForm_disabled.patchValue(false);
        await expansionHarness.toggle();
        inputwrapper = fixture.debugElement.queryAll(By.css('itemForm-inputwrapper'));
        searchselect = inputwrapper[4].query(By.css('app-searchselect'));
      });

      it('should set the inputs correctly', async () => {
        let searchSelectComp =  searchselect.componentInstance as SearchSelectStubComponent
        let autocomplethost = inputwrapper[4].injector.get(MatAutocompleteOrigin);

        expect(searchSelectComp.values).toEqual(simpleDataService.simpleTrueFalse);
        expect(searchSelectComp.disabled).toEqual(component.influenceForm.disabled);
        expect(searchSelectComp.autoCompleteHost).toEqual(autocomplethost);
        expect(searchSelectComp.filterBy).toEqual(simpleDataService.filterSimpleData);
        expect(searchSelectComp.displayBy).toEqual(simpleDataService.displayByText);
        expect(searchSelectComp.setValue).toEqual(simpleDataService.getSelectedValue(component.influenceForm.get('hunter_item.option').value, component.simpleDataService.simpleTrueFalse))
      });

      it('should patch the hunter_item control to the selected event value', () => {
        searchselect.triggerEventHandler('selected', {id: 'mockId'});
        expect(component.influenceForm.controls.hunter_item.value).toEqual({option: 'mockId'});
      });
    });

    describe('Warlord Influence searchselect', () => {
      let inputwrapper: DebugElement[];
      let searchselect: DebugElement;

      beforeEach(async () => {
        component.influenceForm.enable();
        component.influenceForm.controls.influenceForm_disabled.patchValue(false);
        await expansionHarness.toggle();
        inputwrapper = fixture.debugElement.queryAll(By.css('itemForm-inputwrapper'));
        searchselect = inputwrapper[5].query(By.css('app-searchselect'));
      });

      it('should set the inputs correctly', async () => {
        let searchSelectComp =  searchselect.componentInstance as SearchSelectStubComponent
        let autocomplethost = inputwrapper[5].injector.get(MatAutocompleteOrigin);

        expect(searchSelectComp.values).toEqual(simpleDataService.simpleTrueFalse);
        expect(searchSelectComp.disabled).toEqual(component.influenceForm.disabled);
        expect(searchSelectComp.autoCompleteHost).toEqual(autocomplethost);
        expect(searchSelectComp.filterBy).toEqual(simpleDataService.filterSimpleData);
        expect(searchSelectComp.displayBy).toEqual(simpleDataService.displayByText);
        expect(searchSelectComp.setValue).toEqual(simpleDataService.getSelectedValue(component.influenceForm.get('warlord_item.option').value, component.simpleDataService.simpleTrueFalse))
      });

      it('should patch the warlord_item control to the selected event value', () => {
        searchselect.triggerEventHandler('selected', {id: 'mockId'});
        expect(component.influenceForm.controls.warlord_item.value).toEqual({option: 'mockId'});
      });
    });

    describe('Fractured searchselect', () => {
      let inputwrapper: DebugElement[];
      let searchselect: DebugElement;

      beforeEach(async () => {
        component.influenceForm.enable();
        component.influenceForm.controls.influenceForm_disabled.patchValue(false);
        await expansionHarness.toggle();
        inputwrapper = fixture.debugElement.queryAll(By.css('itemForm-inputwrapper'));
        searchselect = inputwrapper[6].query(By.css('app-searchselect'));
      });

      it('should set the inputs correctly', async () => {
        let searchSelectComp =  searchselect.componentInstance as SearchSelectStubComponent
        let autocomplethost = inputwrapper[6].injector.get(MatAutocompleteOrigin);

        expect(searchSelectComp.values).toEqual(simpleDataService.simpleTrueFalse);
        expect(searchSelectComp.disabled).toEqual(component.influenceForm.disabled);
        expect(searchSelectComp.autoCompleteHost).toEqual(autocomplethost);
        expect(searchSelectComp.filterBy).toEqual(simpleDataService.filterSimpleData);
        expect(searchSelectComp.displayBy).toEqual(simpleDataService.displayByText);
        expect(searchSelectComp.setValue).toEqual(simpleDataService.getSelectedValue(component.influenceForm.get('fractured_item.option').value, component.simpleDataService.simpleTrueFalse))
      });

      it('should patch the fractured_item control to the selected event value', () => {
        searchselect.triggerEventHandler('selected', {id: 'mockId'});
        expect(component.influenceForm.controls.fractured_item.value).toEqual({option: 'mockId'});
      });
    });

    describe('Synthesised searchselect', () => {
      let inputwrapper: DebugElement[];
      let searchselect: DebugElement;

      beforeEach(async () => {
        component.influenceForm.enable();
        component.influenceForm.controls.influenceForm_disabled.patchValue(false);
        await expansionHarness.toggle();
        inputwrapper = fixture.debugElement.queryAll(By.css('itemForm-inputwrapper'));
        searchselect = inputwrapper[7].query(By.css('app-searchselect'));
      });

      it('should set the inputs correctly', async () => {
        let searchSelectComp =  searchselect.componentInstance as SearchSelectStubComponent
        let autocomplethost = inputwrapper[7].injector.get(MatAutocompleteOrigin);

        expect(searchSelectComp.values).toEqual(simpleDataService.simpleTrueFalse);
        expect(searchSelectComp.disabled).toEqual(component.influenceForm.disabled);
        expect(searchSelectComp.autoCompleteHost).toEqual(autocomplethost);
        expect(searchSelectComp.filterBy).toEqual(simpleDataService.filterSimpleData);
        expect(searchSelectComp.displayBy).toEqual(simpleDataService.displayByText);
        expect(searchSelectComp.setValue).toEqual(simpleDataService.getSelectedValue(component.influenceForm.get('synthesised_item.option').value, component.simpleDataService.simpleTrueFalse))
      });

      it('should patch the synthesised_item control to the selected event value', () => {
        searchselect.triggerEventHandler('selected', {id: 'mockId'});
        expect(component.influenceForm.controls.synthesised_item.value).toEqual({option: 'mockId'});
      });
    });
  });

  describe('class functions', () => {

    describe('ngAfterContentChecked', () => {

      it('should disable the influenceForm if the disable control is true and the for is already enabled', () => {
        component.influenceForm.enable();
        component.influenceForm.controls.influenceForm_disabled.patchValue(true, {emitEvent: false, onlySelf: true});

        component.ngAfterContentChecked();
        expect(component.influenceForm.disabled).toBeTrue();
      });
    });

    describe('control value changes', () => {
      it('should call checkIfDirty', () => {
        spyOn(component, 'checkIfDirty');
        component.influenceForm.get('fractured_item.option').patchValue('mockvalue');
        expect(component.checkIfDirty).toHaveBeenCalled();
      });
    });

    describe('checkIfDirty', () => {
      it('should set the form to dirty if a control is dirty', () => {
        component.influenceForm.markAsPristine();
        component.influenceForm.get('fractured_item.option').markAsDirty();
        component.checkIfDirty();
        expect(component.influenceForm.dirty).toBeTrue();
      });

      it('should set the form to pristine if all the controls are pristine', () => {
        for (let control in component.influenceForm.controls) {
          component.influenceForm.controls[control].markAsPristine();
        }

        component.influenceForm.markAsDirty();
        component.checkIfDirty();
        expect(component.influenceForm.pristine).toBeTrue();
      });
    });

    describe('disable control value change', () => {
      it('should enable the form if the value is false and the form is disabled', () => {
        component.influenceForm.disable({emitEvent: false});
        component.influenceForm.controls.influenceForm_disabled.patchValue(false);
        expect(component.influenceForm.enabled).toBeTrue();
      });
    });
  });
});
