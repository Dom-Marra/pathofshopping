import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, DebugElement, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteOrigin } from '@angular/material/autocomplete';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatExpansionPanelHarness } from '@angular/material/expansion/testing';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { simpleData } from 'src/app/models/simpleData';
import { SimpleDataService } from 'src/app/services/simpledata.service';
import { StatfiltersComponent } from './statfilters.component';

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
  @Input() disabled: boolean; 
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();  
}

@Component({selector: 'app-statselect', template: ''})
class StatSelectStubComponent {      
  @Output() statRemoved: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();  
  @Input() isWeight: boolean = false; 
  @Input() statGroup: FormGroup;
}

class SimpleDataServiceStub {
  public simpleTrueFalse = [{id: 'mockId', text: 'mock test'}];

  public filterSimpleData(searchText: string, values: Array<simpleData>) {}

  public displayByText(value: simpleData) {}

  public getSelectedValue(id: string, values: Array<simpleData>) {}
}

describe('StatfiltersComponent', () => {
  let component: StatfiltersComponent;
  let fixture: ComponentFixture<StatfiltersComponent>;
  let simpleDataService: SimpleDataService;

  const mockStatFilter = new FormGroup({
    type: new FormControl('and'),
    disabled: new FormControl({value: false, disabled: true}),
    filters: new FormArray([]),
    value: new FormGroup({
      min: new FormControl(),
      max: new FormControl()
    })
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatfiltersComponent, SearchSelectStubComponent, MinMaxInputStub, FilterActionButtonsStub, StatSelectStubComponent ],
      imports:  [ MatExpansionModule, NoopAnimationsModule, MatAutocompleteModule, MatIconModule ],
      providers: [
        {provide: SimpleDataService, useClass: SimpleDataServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatfiltersComponent);
    component = fixture.componentInstance;
    component.statFilter = mockStatFilter;
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

      it('should be disabled when the armour form is disabled', async () => {
        component.statFilter.controls.disabled.patchValue(true);
        component.statFilter.disable();
        expect(await expansionHarness.isDisabled()).toBeTrue();
      });
    });

    describe('FilterActionButtons', () => {

      it('should have the formGroup input set as the statFilter', () => {
        let statFilterComp = fixture.debugElement.query(By.css('app-filteractionbuttons')).componentInstance as FilterActionButtonsStub;
        expect(statFilterComp.formGroup).toBe(component.statFilter);
      });

      it('should close the expansion panel if the statFilter is disabled on disableChange', async () => {
        let statFilterComp = fixture.debugElement.query(By.css('app-filteractionbuttons'));
        component.statFilter.controls.disabled.patchValue(true);
        component.statFilter.disable();

        await expansionHarness.toggle();
        statFilterComp.triggerEventHandler('disableChange', {});
        expect(await expansionHarness.isExpanded()).toBeFalse();
      });

      it('should update the disable control value to false if the statFilter is enabled on disableChange', async () => {
        component.statFilter.enable();
        component.statFilter.controls.disabled.patchValue(true, {emitEvent: false, onlySelf: true});
        let statFilterComp = fixture.debugElement.query(By.css('app-filteractionbuttons'));

        statFilterComp.triggerEventHandler('disableChange', {});
        expect(component.statFilter.controls.disabled.value).toBeFalse();
      });
    });

    describe('Filter Type searchselector', () => {
      let searchselect: DebugElement;

      beforeEach(async () => {
        component.statFilter.enable();
        component.statFilter.controls.disabled.patchValue(false);
        await expansionHarness.toggle();
        searchselect = fixture.debugElement.query(By.css('app-searchselect'));
      });

      it('should set the inputs correctly', async () => {
        let searchSelectComp =  searchselect.componentInstance as SearchSelectStubComponent

        expect(searchSelectComp.values).toEqual(component.filterTypes);
        expect(searchSelectComp.disabled).toEqual(component.statFilter.disabled);
        expect(searchSelectComp.filterBy).toEqual(simpleDataService.filterSimpleData);
        expect(searchSelectComp.displayBy).toEqual(simpleDataService.displayByText);
        expect(searchSelectComp.setValue).toEqual(simpleDataService.getSelectedValue(component.statFilter.get('type').value, component.filterTypes));
        expect(searchSelectComp.inputName).toEqual('Filter Type');
        expect(searchSelectComp.autoCompleteClass).toEqual('autocomplete-panel-300');
      });

      it('should patch the map_series control to the selected event value', () => {
        searchselect.triggerEventHandler('selected', {id: 'mockId'});
        expect(component.statFilter.get('type').value).toEqual('mockId');
      });
    });

    describe('MinMaxInput', () => {

      beforeEach(async () => {
        component.statFilter.enable();
        component.statFilter.controls.disabled.patchValue(false);
        await expansionHarness.expand();
      })
      
      it('should exist if the value of the type control is \'count\'', () => {
        component.statFilter.controls.type.patchValue('count');
        fixture.detectChanges();
        let inputwrapper = fixture.debugElement.query(By.css('app-minmaxinput'));
        expect(inputwrapper).toBeTruthy();
      });

      it('should exist if the value of the type control is \'weight\'', () => {
        component.statFilter.controls.type.patchValue('weight');
        fixture.detectChanges();
        let inputwrapper = fixture.debugElement.query(By.css('app-minmaxinput'));
        expect(inputwrapper).toBeTruthy();
      });

      it('should set the group input correctly', () => {
        component.statFilter.controls.type.patchValue('weight');
        fixture.detectChanges();
        let inputwrapper = fixture.debugElement.query(By.css('app-minmaxinput')).componentInstance as MinMaxInputStub;

        expect(inputwrapper.group).toBe(component.statFilter.controls.value as FormGroup);
      });

      it('should not exist if the value of the type control is not \'count\' or \'weight\'', () => {
        component.statFilter.controls.type.patchValue('Mock Value');
        fixture.detectChanges();
        let inputwrapper = fixture.debugElement.query(By.css('app-minmaxinput'));
        expect(inputwrapper).toBeFalsy();
      });
    });

    describe('statselect', () => {
      let statSelect: DebugElement;

      beforeEach(async () => {
        component.statFilter.enable();
        component.statFilter.controls.disabled.patchValue(false);
        await expansionHarness.expand();
        (component.statFilter.controls.filters as FormArray).clear();
        component.addStatFilter();
        fixture.detectChanges();
        statSelect = fixture.debugElement.query(By.css('app-statselect'));
      });

      it('should set the statGroup input correctly', () => {
        let expectedStatGroup = (component.statFilter.controls.filters as FormArray).controls[0];

        expect((statSelect.componentInstance as StatSelectStubComponent).statGroup).toEqual(expectedStatGroup as FormGroup);
      });

      it('should set the isWeight input correctly', () => {
        component.statFilter.controls.type.patchValue('weight');
        fixture.detectChanges();
        expect((statSelect.componentInstance as StatSelectStubComponent).isWeight).toBeTrue();

        component.statFilter.controls.type.patchValue('and');
        fixture.detectChanges();
        expect((statSelect.componentInstance as StatSelectStubComponent).isWeight).toBeFalse();
      });

      it('should call removeStat on statRemoved event', () => {
        const mockFormGroup = new FormGroup({});
        spyOn(component, 'removeStat');
        statSelect.triggerEventHandler('statRemoved', mockFormGroup);

        expect(component.removeStat).toHaveBeenCalledWith(mockFormGroup);
      });
    });

    describe('add stat filter button', () => {
      let button: MatButtonHarness;

      beforeEach(async () => {
        component.statFilter.enable();
        component.statFilter.controls.disabled.patchValue(false);
        await expansionHarness.expand();

        button = await loader.getHarness(MatButtonHarness.with({text: 'add_box Stat'}));
      });

      it('should call addStatFilter on click', async () => {
        spyOn(component, 'addStatFilter');
        await button.click();
        expect(component.addStatFilter).toHaveBeenCalled();
      });

      it('should be disabled when the statFilte FormGroup is disabled', async () => {
        component.statFilter.disable();

        expect(await button.isDisabled()).toBeTrue();
      });
    });
  });

  describe('class functions', () => {

    describe('ngAfterContentChecked', () => {

      it('should disable the statFilter if the disable control is true and the for is already enabled', () => {
        component.statFilter.enable();
        component.statFilter.controls.disabled.patchValue(true, {emitEvent: false, onlySelf: true});

        component.ngAfterContentChecked();
        expect(component.statFilter.disabled).toBeTrue();
      });
    });

    describe('addStatFilter', () => {

      it('should add a new statform to the filters formArray', () => {
        (component.statFilter.controls.filters as FormArray).clear();
        component.addStatFilter();
        expect((component.statFilter.controls.filters as FormArray).length).toEqual(1);
      });
    });

    describe('removeStat', () => {

      it('should remove the specified statForm from the filters FormArray', () => {
        (component.statFilter.controls.filters as FormArray).clear();
        component.addStatFilter();

        let statForm = (component.statFilter.controls.filters as FormArray).controls[0];
        component.removeStat(statForm as FormGroup);
        expect((component.statFilter.controls.filters as FormArray).length).toEqual(0);
      });
    });

    describe('remove', () => {
      it('should call emit on the filterRemove event emitter', () => {
        spyOn(component.filterRemoved, 'emit');
        component.remove();
        expect(component.filterRemoved.emit).toHaveBeenCalled();
      })
    })
  });
});
