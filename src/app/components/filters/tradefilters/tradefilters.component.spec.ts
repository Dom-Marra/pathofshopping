import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, DebugElement, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteOrigin } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatExpansionPanelHarness } from '@angular/material/expansion/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputModule } from '@angular/material/input';
import { MatInputHarness } from '@angular/material/input/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Defaultvaluecontrol } from 'src/app/classes/defaultvaluecontrol';
import { simpleData } from 'src/app/models/simpleData';
import { SimpleDataService } from 'src/app/services/simpledata.service';
import { TradefiltersComponent } from './tradefilters.component';


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

describe('TradefiltersComponent', () => {
  const mockTradeForm = new FormGroup({
    disabled: new FormControl({ value: false, disabled: true }),
    filters: new FormGroup({
        price: new FormGroup({
            min: new Defaultvaluecontrol(''),
            max: new Defaultvaluecontrol(''),
            option: new Defaultvaluecontrol('', ''),
        }),
        account: new FormGroup({
            input: new Defaultvaluecontrol('', ''),
        }),
        sale_type: new FormGroup({
            option: new Defaultvaluecontrol('', ''),
        }),
        indexed: new FormGroup({
            option: new Defaultvaluecontrol('', ''),
        })
    })
  });

  let component: TradefiltersComponent;
  let fixture: ComponentFixture<TradefiltersComponent>;
  let simpleDataService: SimpleDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradefiltersComponent, InputWrapperStub, SearchSelectStubComponent, MinMaxInputStub, FilterActionButtonsStub ],
      imports:  [ MatExpansionModule, NoopAnimationsModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule ],
      providers: [
        {provide: SimpleDataService, useClass: SimpleDataServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradefiltersComponent);
    component = fixture.componentInstance;
    component.tradeForm = mockTradeForm;
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
        component.tradeForm.controls.disabled.patchValue(true);
        component.tradeForm.disable();
        expect(await expansionHarness.isDisabled()).toBeTrue();
      });
    });

    describe('FilterActionButtons', () => {

      it('should have the formGroup input set as the tradeForm', () => {
        let tradeFormComp = fixture.debugElement.query(By.css('app-filteractionbuttons')).componentInstance as FilterActionButtonsStub;
        expect(tradeFormComp.formGroup).toBe(component.tradeForm);
      });

      it('should close the expansion panel if the tradeForm is disabled on disableChange', async () => {
        let tradeFormComp = fixture.debugElement.query(By.css('app-filteractionbuttons'));
        component.tradeForm.controls.disabled.patchValue(true);
        component.tradeForm.disable();

        await expansionHarness.toggle();
        tradeFormComp.triggerEventHandler('disableChange', {});
        expect(await expansionHarness.isExpanded()).toBeFalse();
      });

      it('should update the disable control value to false if the tradeForm is enabled on disableChange', async () => {
        component.tradeForm.enable();
        component.tradeForm.controls.disabled.patchValue(true, {emitEvent: false, onlySelf: true});
        let tradeFormComp = fixture.debugElement.query(By.css('app-filteractionbuttons'));

        tradeFormComp.triggerEventHandler('disableChange', {});
        expect(component.tradeForm.controls.disabled.value).toBeFalse();
      });
    });

    describe('MinMaxInputs', () => {
      
      it('should set the inputs correctly', async () => {
        component.tradeForm.enable();
        component.tradeForm.controls.disabled.patchValue(false);
        await expansionHarness.expand();
        let inputwrapper = fixture.debugElement.queryAll(By.css('app-inputwrapper'));

        let price = inputwrapper[4].query(By.css('app-minmaxinput')).componentInstance as MinMaxInputStub;

        expect(price.group).toEqual(component.tradeForm.get('filters.price') as FormGroup);
      });
    });

    describe('Account Name FormField', () => {
      let matFormFieldHarness: MatFormFieldHarness;

      beforeEach(async() => {
        component.tradeForm.enable();
        component.tradeForm.controls.disabled.patchValue(false);
        await expansionHarness.expand();
        matFormFieldHarness = await loader.getHarness(MatFormFieldHarness);
      });

      it('should have a label with text \'Account Name\'', async () => {
        expect(await matFormFieldHarness.getLabel()).toEqual('Account Name');
      });

      it('should have the account control as the formcontrol', async () => {
        await (await matFormFieldHarness.getControl() as MatInputHarness).setValue('Mock Value');
        expect(component.tradeForm.get('filters.account').value.input).toEqual('Mock Value');
      })
    })

    describe('Listed searchselect', () => {
      let inputwrapper: DebugElement[];
      let searchselect: DebugElement;

      beforeEach(async () => {
        component.tradeForm.enable();
        component.tradeForm.controls.disabled.patchValue(false);
        await expansionHarness.expand();
        inputwrapper = fixture.debugElement.queryAll(By.css('app-inputwrapper'));
        searchselect = inputwrapper[1].query(By.css('app-searchselect'));
      });

      it('should set the inputs correctly', async () => {
        let searchSelectComp =  searchselect.componentInstance as SearchSelectStubComponent
        let autocomplethost = inputwrapper[1].injector.get(MatAutocompleteOrigin);

        expect(searchSelectComp.values).toEqual(component.listedOptions);
        expect(searchSelectComp.autoCompleteHost).toEqual(autocomplethost);
        expect(searchSelectComp.filterBy).toEqual(simpleDataService.filterSimpleData);
        expect(searchSelectComp.displayBy).toEqual(simpleDataService.displayByText);
        expect(searchSelectComp.setValue).toEqual(simpleDataService.getSelectedValue(component.tradeForm.get('filters.indexed.option').value, component.listedOptions))
      });

      it('should patch the indexed control to the selected event value', () => {
        searchselect.triggerEventHandler('selected', {id: 'mockId'});
        expect(component.tradeForm.get('filters.indexed').value).toEqual({option: 'mockId'});
      });
    });

    describe('Sale Type searchselect', () => {
      let inputwrapper: DebugElement[];
      let searchselect: DebugElement;

      beforeEach(async () => {
        component.tradeForm.enable();
        component.tradeForm.controls.disabled.patchValue(false);
        await expansionHarness.expand();
        inputwrapper = fixture.debugElement.queryAll(By.css('app-inputwrapper'));
        searchselect = inputwrapper[2].query(By.css('app-searchselect'));
      });

      it('should set the inputs correctly', async () => {
        let searchSelectComp =  searchselect.componentInstance as SearchSelectStubComponent
        let autocomplethost = inputwrapper[2].injector.get(MatAutocompleteOrigin);

        expect(searchSelectComp.values).toEqual(component.saleTypes);
        expect(searchSelectComp.autoCompleteHost).toEqual(autocomplethost);
        expect(searchSelectComp.filterBy).toEqual(simpleDataService.filterSimpleData);
        expect(searchSelectComp.displayBy).toEqual(simpleDataService.displayByText);
        expect(searchSelectComp.setValue).toEqual(simpleDataService.getSelectedValue(component.tradeForm.get('filters.sale_type.option').value, component.saleTypes))
      });

      it('should patch the sale_type control to the selected event value', () => {
        searchselect.triggerEventHandler('selected', {id: 'mockId'});
        expect(component.tradeForm.get('filters.sale_type').value).toEqual({option: 'mockId'});
      });
    });

    describe('Buyout Currency searchselect', () => {
      let inputwrapper: DebugElement[];
      let searchselect: DebugElement;

      beforeEach(async () => {
        component.tradeForm.enable();
        component.tradeForm.controls.disabled.patchValue(false);
        await expansionHarness.expand();
        inputwrapper = fixture.debugElement.queryAll(By.css('app-inputwrapper'));
        searchselect = inputwrapper[3].query(By.css('app-searchselect'));
      });

      it('should set the inputs correctly', async () => {
        let searchSelectComp =  searchselect.componentInstance as SearchSelectStubComponent
        let autocomplethost = inputwrapper[3].injector.get(MatAutocompleteOrigin);

        expect(searchSelectComp.values).toEqual(component.buyOutOptons);
        expect(searchSelectComp.autoCompleteHost).toEqual(autocomplethost);
        expect(searchSelectComp.filterBy).toEqual(simpleDataService.filterSimpleData);
        expect(searchSelectComp.displayBy).toEqual(simpleDataService.displayByText);
        expect(searchSelectComp.setValue).toEqual(simpleDataService.getSelectedValue(component.tradeForm.get('filters.price.option').value, component.buyOutOptons))
      });

      it('should patch the price control to the selected event value', () => {
        searchselect.triggerEventHandler('selected', {id: 'mockId'});
        expect(component.tradeForm.get('filters.price').value.option).toEqual('mockId');
      });
    });
  });

  describe('class functions', () => {

    describe('ngAfterContentChecked', () => {

      it('should disable the tradeForm if the disable control is true and the for is already enabled', () => {
        component.tradeForm.enable();
        component.tradeForm.controls.disabled.patchValue(true, {emitEvent: false, onlySelf: true});

        component.ngAfterContentChecked();
        expect(component.tradeForm.disabled).toBeTrue();
      });
    });

    describe('disable control value change', () => {
      it('should enable the form if the value is false and the form is disabled', () => {
        component.tradeForm.disable({emitEvent: false});
        component.tradeForm.controls.disabled.patchValue(false);
        expect(component.tradeForm.enabled).toBeTrue();
      });
    });
  });
});
