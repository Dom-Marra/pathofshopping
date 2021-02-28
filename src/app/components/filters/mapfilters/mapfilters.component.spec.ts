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
import { Defaultvaluecontrol } from 'src/app/classes/defaultvaluecontrol';
import { simpleData } from 'src/app/models/simpleData';
import { SimpleDataService } from 'src/app/services/simpledata.service';
import { MapfiltersComponent } from './mapfilters.component';

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
  public simpleTrueFalse = [{id: 'mockId', text: 'mock test'}];

  public filterSimpleData(searchText: string, values: Array<simpleData>) {}

  public displayByText(value: simpleData) {}

  public getSelectedValue(id: string, values: Array<simpleData>) {}
}


describe('MapfiltersComponent', () => {
  let mockMapForm = new FormGroup({
    disabled: new FormControl({ value: false, disabled: true }),
    filters: new FormGroup({
        map_region: new FormGroup(
            { option: new Defaultvaluecontrol('', '') }
        ),
        map_series: new FormGroup(
            { option: new Defaultvaluecontrol('', '') }
        ),
        map_shaped: new FormGroup(
            { option: new Defaultvaluecontrol('', '') }
        ),
        map_elder: new FormGroup(
            { option: new Defaultvaluecontrol('', '') }
        ),
        map_blighted: new FormGroup(
            { option: new Defaultvaluecontrol('', '') }
        ),
        map_tier: new FormGroup({
            min: new Defaultvaluecontrol('', ''),
            max: new Defaultvaluecontrol('', '')
        }),
        map_packsize: new FormGroup({
            min: new Defaultvaluecontrol('', ''),
            max: new Defaultvaluecontrol('', '')
        }),
        map_iiq: new FormGroup({
            min: new Defaultvaluecontrol('', ''),
            max: new Defaultvaluecontrol('', '')
        }),
        map_iir: new FormGroup({
            min: new Defaultvaluecontrol('', ''),
            max: new Defaultvaluecontrol('', '')
        })
    })
  });

  let component: MapfiltersComponent;
  let fixture: ComponentFixture<MapfiltersComponent>;
  let simpleDataService: SimpleDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapfiltersComponent, InputWrapperStub, SearchSelectStubComponent, MinMaxInputStub, FilterActionButtonsStub ],
      imports:  [ MatExpansionModule, NoopAnimationsModule, MatAutocompleteModule ],
      providers: [
        {provide: SimpleDataService, useClass: SimpleDataServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapfiltersComponent);
    component = fixture.componentInstance;
    component.mapForm = mockMapForm;
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
        component.mapForm.controls.disabled.patchValue(true);
        component.mapForm.disable();
        expect(await expansionHarness.isDisabled()).toBeTrue();
      });
    });

    describe('FilterActionButtons', () => {

      it('should have the formGroup input set as the mapForm', () => {
        let mapFormComp = fixture.debugElement.query(By.css('app-filteractionbuttons')).componentInstance as FilterActionButtonsStub;
        expect(mapFormComp.formGroup).toBe(component.mapForm);
      });

      it('should close the expansion panel if the mapForm is disabled on disableChange', async () => {
        let mapFormComp = fixture.debugElement.query(By.css('app-filteractionbuttons'));
        component.mapForm.controls.disabled.patchValue(true);
        component.mapForm.disable();

        await expansionHarness.toggle();
        mapFormComp.triggerEventHandler('disableChange', {});
        expect(await expansionHarness.isExpanded()).toBeFalse();
      });

      it('should update the disable control value to false if the mapForm is enabled on disableChange', async () => {
        component.mapForm.enable();
        component.mapForm.controls.disabled.patchValue(true, {emitEvent: false, onlySelf: true});
        let mapFormComp = fixture.debugElement.query(By.css('app-filteractionbuttons'));

        mapFormComp.triggerEventHandler('disableChange', {});
        expect(component.mapForm.controls.disabled.value).toBeFalse();
      });
    });

    describe('MinMaxInputs', () => {
      
      it('should set the inputs correctly', async () => {
        component.mapForm.enable();
        component.mapForm.controls.disabled.patchValue(false);
        await expansionHarness.toggle();
        let inputwrapper = fixture.debugElement.queryAll(By.css('app-inputwrapper'));

        let tier = inputwrapper[5].query(By.css('app-minmaxinput')).componentInstance as MinMaxInputStub;
        let packsize = inputwrapper[6].query(By.css('app-minmaxinput')).componentInstance as MinMaxInputStub;
        let iiq = inputwrapper[7].query(By.css('app-minmaxinput')).componentInstance as MinMaxInputStub;
        let iir = inputwrapper[8].query(By.css('app-minmaxinput')).componentInstance as MinMaxInputStub;

        expect(tier.group).toEqual(component.mapForm.get('filters.map_tier') as FormGroup);
        expect(packsize.group).toEqual(component.mapForm.get('filters.map_packsize') as FormGroup);
        expect(iiq.group).toEqual(component.mapForm.get('filters.map_iiq') as FormGroup);
        expect(iir.group).toEqual(component.mapForm.get('filters.map_iir') as FormGroup);
      });
    });

    describe('map region searchselect', () => {
      let inputwrapper: DebugElement[];
      let searchselect: DebugElement;

      beforeEach(async () => {
        component.mapForm.enable();
        component.mapForm.controls.disabled.patchValue(false);
        await expansionHarness.toggle();
        inputwrapper = fixture.debugElement.queryAll(By.css('app-inputwrapper'));
        searchselect = inputwrapper[0].query(By.css('app-searchselect'));
      });

      it('should set the inputs correctly', async () => {
        let searchSelectComp =  searchselect.componentInstance as SearchSelectStubComponent
        let autocomplethost = inputwrapper[0].injector.get(MatAutocompleteOrigin);

        expect(searchSelectComp.values).toEqual(component.mapRegions);
        expect(searchSelectComp.autoCompleteHost).toEqual(autocomplethost);
        expect(searchSelectComp.filterBy).toEqual(simpleDataService.filterSimpleData);
        expect(searchSelectComp.displayBy).toEqual(simpleDataService.displayByText);
        expect(searchSelectComp.setValue).toEqual(simpleDataService.getSelectedValue(component.mapForm.get('filters.map_region.option').value, component.mapRegions))
      });

      it('should patch the map_region control to the selected event value', () => {
        searchselect.triggerEventHandler('selected', {id: 'mockId'});
        expect(component.mapForm.get('filters.map_region').value).toEqual({option: 'mockId'});
      });
    });

    describe('map series searchselect', () => {
      let inputwrapper: DebugElement[];
      let searchselect: DebugElement;

      beforeEach(async () => {
        component.mapForm.enable();
        component.mapForm.controls.disabled.patchValue(false);
        await expansionHarness.toggle();
        inputwrapper = fixture.debugElement.queryAll(By.css('app-inputwrapper'));
        searchselect = inputwrapper[1].query(By.css('app-searchselect'));
      });

      it('should set the inputs correctly', async () => {
        let searchSelectComp =  searchselect.componentInstance as SearchSelectStubComponent
        let autocomplethost = inputwrapper[1].injector.get(MatAutocompleteOrigin);

        expect(searchSelectComp.values).toEqual(component.mapSeries);
        expect(searchSelectComp.autoCompleteHost).toEqual(autocomplethost);
        expect(searchSelectComp.filterBy).toEqual(simpleDataService.filterSimpleData);
        expect(searchSelectComp.displayBy).toEqual(simpleDataService.displayByText);
        expect(searchSelectComp.setValue).toEqual(simpleDataService.getSelectedValue(component.mapForm.get('filters.map_series.option').value, component.mapSeries))
      });

      it('should patch the map_series control to the selected event value', () => {
        searchselect.triggerEventHandler('selected', {id: 'mockId'});
        expect(component.mapForm.get('filters.map_series').value).toEqual({option: 'mockId'});
      });
    });

    describe('map shaped searchselect', () => {
      let inputwrapper: DebugElement[];
      let searchselect: DebugElement;

      beforeEach(async () => {
        component.mapForm.enable();
        component.mapForm.controls.disabled.patchValue(false);
        await expansionHarness.toggle();
        inputwrapper = fixture.debugElement.queryAll(By.css('app-inputwrapper'));
        searchselect = inputwrapper[2].query(By.css('app-searchselect'));
      });

      it('should set the inputs correctly', async () => {
        let searchSelectComp =  searchselect.componentInstance as SearchSelectStubComponent
        let autocomplethost = inputwrapper[2].injector.get(MatAutocompleteOrigin);

        expect(searchSelectComp.values).toEqual(component.simpleDataService.simpleTrueFalse);
        expect(searchSelectComp.autoCompleteHost).toEqual(autocomplethost);
        expect(searchSelectComp.filterBy).toEqual(simpleDataService.filterSimpleData);
        expect(searchSelectComp.displayBy).toEqual(simpleDataService.displayByText);
        expect(searchSelectComp.setValue).toEqual(simpleDataService.getSelectedValue(component.mapForm.get('filters.map_shaped.option').value, component.mapSeries))
      });

      it('should patch the map_shaped control to the selected event value', () => {
        searchselect.triggerEventHandler('selected', {id: 'mockId'});
        expect(component.mapForm.get('filters.map_shaped').value).toEqual({option: 'mockId'});
      });
    });

    describe('map elder searchselect', () => {
      let inputwrapper: DebugElement[];
      let searchselect: DebugElement;

      beforeEach(async () => {
        component.mapForm.enable();
        component.mapForm.controls.disabled.patchValue(false);
        await expansionHarness.toggle();
        inputwrapper = fixture.debugElement.queryAll(By.css('app-inputwrapper'));
        searchselect = inputwrapper[3].query(By.css('app-searchselect'));
      });

      it('should set the inputs correctly', async () => {
        let searchSelectComp =  searchselect.componentInstance as SearchSelectStubComponent
        let autocomplethost = inputwrapper[3].injector.get(MatAutocompleteOrigin);

        expect(searchSelectComp.values).toEqual(component.simpleDataService.simpleTrueFalse);
        expect(searchSelectComp.autoCompleteHost).toEqual(autocomplethost);
        expect(searchSelectComp.filterBy).toEqual(simpleDataService.filterSimpleData);
        expect(searchSelectComp.displayBy).toEqual(simpleDataService.displayByText);
        expect(searchSelectComp.setValue).toEqual(simpleDataService.getSelectedValue(component.mapForm.get('filters.map_elder.option').value, component.mapSeries))
      });

      it('should patch the map_elder control to the selected event value', () => {
        searchselect.triggerEventHandler('selected', {id: 'mockId'});
        expect(component.mapForm.get('filters.map_elder').value).toEqual({option: 'mockId'});
      });
    });

    describe('map blighted searchselect', () => {
      let inputwrapper: DebugElement[];
      let searchselect: DebugElement;

      beforeEach(async () => {
        component.mapForm.enable();
        component.mapForm.controls.disabled.patchValue(false);
        await expansionHarness.toggle();
        inputwrapper = fixture.debugElement.queryAll(By.css('app-inputwrapper'));
        searchselect = inputwrapper[4].query(By.css('app-searchselect'));
      });

      it('should set the inputs correctly', async () => {
        let searchSelectComp =  searchselect.componentInstance as SearchSelectStubComponent
        let autocomplethost = inputwrapper[4].injector.get(MatAutocompleteOrigin);

        expect(searchSelectComp.values).toEqual(component.simpleDataService.simpleTrueFalse);
        expect(searchSelectComp.autoCompleteHost).toEqual(autocomplethost);
        expect(searchSelectComp.filterBy).toEqual(simpleDataService.filterSimpleData);
        expect(searchSelectComp.displayBy).toEqual(simpleDataService.displayByText);
        expect(searchSelectComp.setValue).toEqual(simpleDataService.getSelectedValue(component.mapForm.get('filters.map_blighted.option').value, component.mapSeries))
      });

      it('should patch the map_blighted control to the selected event value', () => {
        searchselect.triggerEventHandler('selected', {id: 'mockId'});
        expect(component.mapForm.get('filters.map_blighted').value).toEqual({option: 'mockId'});
      });
    });
  });

  describe('class functions', () => {

    describe('ngAfterContentChecked', () => {

      it('should disable the mapForm if the disable control is true and the for is already enabled', () => {
        component.mapForm.enable();
        component.mapForm.controls.disabled.patchValue(true, {emitEvent: false, onlySelf: true});

        component.ngAfterContentChecked();
        expect(component.mapForm.disabled).toBeTrue();
      });
    });

    describe('disable control value change', () => {
      it('should enable the form if the value is false and the form is disabled', () => {
        component.mapForm.disable({emitEvent: false});
        component.mapForm.controls.disabled.patchValue(false);
        expect(component.mapForm.enabled).toBeTrue();
      });
    });
  });
});
