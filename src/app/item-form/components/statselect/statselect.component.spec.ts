import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, DebugElement, Directive, EventEmitter, Input, Output, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteOrigin } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputModule } from '@angular/material/input';
import { MatInputHarness } from '@angular/material/input/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StatForm } from 'src/app/core/classes/stat-form';
import { poeCategorizedStats, poeStat, poeStatOption } from 'src/app/core/models/poe-api-stat.model';
import { PoeService } from 'src/app/core/services/poe.service';
import { DigitsonlyDirective } from '../../directives/digitsonly.directive';
import { FilteractionbuttonsComponent } from '../filteractionbuttons/filteractionbuttons.component';

import { StatselectComponent } from './statselect.component';

@Component({selector: 'app-searchselect', template: ''})
class SearchSelectStubComponent {                                     
  @Input() values: any;                                             
  @Input() groupOptions: any;
  @Input() autoCompleteClass: string;    
  @Input() autoCompleteHost: any;                  
  @Input() setValue: any;                                    
  @Input() placeholder: string;                   
  @Input() filterBy: any;        
  @Input() displayBy: any;      
  @Input() disabled: any;        
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();  
}

@Component({selector: 'itemForm-minmaxinput', template: ''})
class MinMaxStubComponent {                          
  @Input() group: AbstractControl;    
}

@Component({selector: 'itemForm-filteractionbuttons', template: ''})
class FilteractionbuttonsStubComponent {       
  @Output() remove: EventEmitter<void> = new EventEmitter();  
  @Output() disableChange: EventEmitter<void> = new EventEmitter();  
  @Input() formGroup: FormGroup;       
  @Input() disableClear: boolean;       
  @Input() disableDisable: boolean;    
  @Input() includeDelete: boolean;     
}

@Directive({
  selector: '[digitsonly]'
})
export class DigitsonlyStubDirective { }

class MockPoeService {
  public stats: Array<poeCategorizedStats> = [
    {
      label: 'Mock Category 1',
      entries: [
        {
          id: 'mock.mock_1_stat_1',
          text: 'Mock Stat Cat 1 Stat 1'
        },
        {
          id: 'mock.mock_1_stat_2',
          text: 'Mock Stat Cat 1 Stat 2'
        },
      ]
    },
    {
      label: 'Mock Category 2',
      entries: [
        {
          id: 'mock.mock_2_stat_1',
          text: 'Mock Stat Cat 2 Stat 1'
        },
        {
          id: 'mock.mock_2_stat_2',
          text: 'Mock Stat Cat 2 Stat 2',
          option: {
            options: [
              {
                id: 'mock.mock_2_stat_2_option_1',
                text: 'Mock 2 Stat 2 Option_1'
              },
              {
                id: 'mock.mock_2_stat_2_option_2',
                text: 'Mock 2 Stat 2 Option_2'
              }
            ]
          }
        },
      ]
    }
  ];

  public getStats(): Array<poeCategorizedStats> {
    return this.stats;
  }
}

describe('StatselectComponent', () => {
  let component: StatselectComponent;
  let fixture: ComponentFixture<StatselectComponent>;
  let poeMockService: PoeService;
  let statForm: StatForm;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatselectComponent, FilteractionbuttonsStubComponent, MinMaxStubComponent, SearchSelectStubComponent ],
      providers: [
        {provide: PoeService, useClass: MockPoeService},
        {provide: DigitsonlyDirective, useClass: DigitsonlyStubDirective}
      ],
      imports: [ MatAutocompleteModule, MatFormFieldModule, NoopAnimationsModule, MatInputModule, ReactiveFormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatselectComponent);
    component = fixture.componentInstance;
    poeMockService = TestBed.inject(PoeService);

    statForm = new StatForm();
    component.statGroup = statForm;

    fixture.detectChanges();
  });

  it('should set the statsToSearch', () => {
    expect(component.statsToSearch).toEqual(poeMockService.getStats());
  });

  it('should initialize isWeight to false when no input is provided', () => {
    expect(component.isWeight).toEqual(false);
  });

  it('should call makeWeighted method when isWieght input is changed', () => {
    spyOn(component, 'makeWeighted');
    component.isWeight = true;
    component.ngOnChanges({isWeight: new SimpleChange(false, true, true)});
    fixture.detectChanges();

    expect(component.makeWeighted).toHaveBeenCalled();
  });

  it('should call to disable the statgroup if its disable control is true after the content is checked', () => {
    component.statGroup.controls.disabled.patchValue(true);
    fixture.detectChanges();
    component.ngAfterContentChecked();
    expect(component.statGroup.disabled).toBe(true);
  });

  describe('filterStats method', () => {

    it('should return all stats when the search text is false', () => {
      let returnedValue = component.filterStats('', component.statsToSearch);

      expect(returnedValue).toEqual(poeMockService.getStats());
    });

    it('should properly filter stats based on search text', () => {
      let returnedValue = component.filterStats('Stat 2', component.statsToSearch);
      let expectedResults: Array<poeCategorizedStats> = [
        {
          label: 'Mock Category 1',
          entries: [
            {
              id: 'mock.mock_1_stat_2',
              text: 'Mock Stat Cat 1 Stat 2'
            },
          ]
        },
        {
          label: 'Mock Category 2',
          entries: [
            {
              id: 'mock.mock_2_stat_1',
              text: 'Mock Stat Cat 2 Stat 1'
            },
            {
              id: 'mock.mock_2_stat_2',
              text: 'Mock Stat Cat 2 Stat 2',
              option: {
                options: [
                  {
                    id: 'mock.mock_2_stat_2_option_1',
                    text: 'Mock 2 Stat 2 Option_1'
                  },
                  {
                    id: 'mock.mock_2_stat_2_option_2',
                    text: 'Mock 2 Stat 2 Option_2'
                  }
                ]
              }
            },
          ]
        }
      ];

      expect(returnedValue).toEqual(expectedResults);
    });
  });

  it('should be able to properly filter stat options', () => {
    component.statGroup.controls.selectedStat.patchValue(poeMockService.getStats()[1].entries[1]);
    let returnedValue = component.filterStatOptions('Option_2', component.statGroup.controls.selectedStat.value.option.options);
    let expectedResults = [
      {
        id: 'mock.mock_2_stat_2_option_2',
        text: 'Mock 2 Stat 2 Option_2'
      }
    ];

    fixture.detectChanges();

    expect(returnedValue).toEqual(expectedResults);
  });

  describe('setStat Method', () => {
    let statWithNoOptions: poeStat;
    let statWithOptions: poeStat;

    beforeEach(() => {
      statWithNoOptions = poeMockService.getStats()[0].entries[0];
      statWithOptions = poeMockService.getStats()[1].entries[1];
    });

    it('should path the correct sat id', () => {
      component.setStat(statWithNoOptions);
      fixture.detectChanges();

      expect(component.statGroup.controls.id.value).toEqual(statWithNoOptions.id);
    });

    it('should patch the correct selected stat value', () => {
      component.setStat(statWithNoOptions);
      fixture.detectChanges();

      expect(component.statGroup.controls.selectedStat.value).toEqual(statWithNoOptions);
    });

    it('should reset the option values when the stat has no options', () => {
      component.statGroup.controls.selectedStatOption.patchValue(statWithOptions.option.options[1]);
      component.statGroup.get('value.option').patchValue(statWithOptions.option.options[1].id);

      spyOn(component.statGroup.controls.selectedStatOption, 'reset');
      spyOn(component.statGroup.get('value.option'), 'patchValue');

      fixture.detectChanges();
      component.setStat(statWithNoOptions);

      expect(component.statGroup.controls.selectedStatOption.reset).toHaveBeenCalled();
      expect(component.statGroup.get('value.option').patchValue).toHaveBeenCalledWith('');
    });

    it('should reset all value options when the stat has options', () => {
      spyOn(component.statGroup.get('value.min'), 'patchValue');
      spyOn(component.statGroup.get('value.max'), 'patchValue');
      spyOn(component.statGroup.get('value.option'), 'patchValue');

      fixture.detectChanges();
      component.setStat(statWithOptions);

      expect(component.statGroup.get('value.max').patchValue).toHaveBeenCalledWith('');
      expect(component.statGroup.get('value.min').patchValue).toHaveBeenCalledWith('');
      expect(component.statGroup.get('value.option').patchValue).toHaveBeenCalledWith('');
    });
  });

  describe('setStatOption method', () => {
    let statOption: poeStatOption;

    beforeEach(() => {
      statOption = poeMockService.getStats()[1].entries[1].option.options[0];
    });

    it('should patch the correct value for the selected stat option control', () => {
      component.setStatOption(statOption);
      fixture.detectChanges();
      expect(component.statGroup.controls.selectedStatOption.value).toEqual(statOption);
    });

    it('should patch the correct value for the selected stat option id', () => {
      component.setStatOption(statOption);
      fixture.detectChanges();
      
      expect(component.statGroup.get('value.option').value).toEqual(statOption.id);
    });
  });

  it('should emit the stat group when the deleteStatsFilter method is called', () => {
    spyOn(component.statRemoved, 'emit');

    component.deleteStatFilter();

    expect(component.statRemoved.emit).toHaveBeenCalledWith(component.statGroup);
  });


  describe('filteractionbuttons events', () => {

    let actionButtons: DebugElement;

    beforeEach(() => {
      actionButtons = fixture.debugElement.query(By.css('itemForm-filteractionbuttons'));
    });

    it('should call the deleteStatsFilter method when the remove event is fired', () => {
      spyOn(component, 'deleteStatFilter');
  
      actionButtons.componentInstance as FilteractionbuttonsComponent;
      actionButtons.triggerEventHandler('remove', {});
  
      expect(component.deleteStatFilter).toHaveBeenCalled();
    });

    it('should patch the the stat group disabled value to its disabled state when the disabledChange event fires', () => {

      component.statGroup.disable();
      component.statGroup.controls.disabled.patchValue(false);
      fixture.detectChanges();

      actionButtons.componentInstance as FilteractionbuttonsComponent;
      actionButtons.triggerEventHandler('disableChange', {});

      expect(component.statGroup.controls.disabled.value).toEqual(true);
    });
  });

  describe('stat searchSelect', () => {

    let statSearcher: DebugElement;

    beforeEach(() => {
      statSearcher = fixture.debugElement.query(By.css('app-searchselect'));
    })

    it('should call setStat when the stat selector selected event emits', () => {
      spyOn(component,'setStat');
      statSearcher.triggerEventHandler('selected', {id: 'MockValue', text: 'Mock Value'});

      expect(component.setStat).toHaveBeenCalledWith({id: 'MockValue', text: 'Mock Value'});
    });

    it('should set the right inputs on the component', () => {
      let statSearcherComp = statSearcher.componentInstance as SearchSelectStubComponent;
      let autoCompleteHost = fixture.debugElement.query(By.css('.stat-select')).injector.get(MatAutocompleteOrigin);

      expect(statSearcherComp.autoCompleteClass).toEqual('autocomplete-panel-300');
      expect(statSearcherComp.placeholder).toEqual('Add Stat');
      expect(statSearcherComp.values).toEqual(component.statsToSearch);
      expect(statSearcherComp.groupOptions).toEqual({groupedBy: 'label', groupedInto: 'entries'});
      expect(statSearcherComp.filterBy).toEqual(component.filterStats);
      expect(statSearcherComp.displayBy).toEqual(component.statDisplayBy);
      expect(statSearcherComp.disabled).toEqual(component.statGroup.disabled);
      expect(statSearcherComp.autoCompleteHost).toEqual(autoCompleteHost);
      expect(statSearcherComp.setValue).toEqual(component.statGroup.controls.selectedStat.value);
    });

  });

  describe('stat-inputs container', () => {

    it('should not create the stat-inputs container when no stat is selected', () => {
      component.statGroup.controls.selectedStat.reset();
      let statInputs = fixture.debugElement.query(By.css('.stat-inputs'));
  
      expect(statInputs).not.toBeTruthy();
    });

    it('should be created when a stat is selected', () => {
      component.statGroup.controls.selectedStat.patchValue(poeMockService.getStats()[0].entries[0]);
      fixture.detectChanges();
      
      let statInputs = fixture.debugElement.query(By.css('.stat-inputs'));
      expect(statInputs).toBeTruthy();
    });
  });

  describe('weight input', () => {

    beforeEach(() => {
      component.statGroup.controls.selectedStat.patchValue(poeMockService.getStats()[0].entries[0]);
    });

    it('should not be created when the isWeighted value is false', () => {
      component.isWeight = false;
      fixture.detectChanges();

      let weightInputContainer = fixture.debugElement.query(By.css('.stat-weight'));

      expect(weightInputContainer).not.toBeTruthy();
    });

    it('should created when the isWeighted value is true', () => {
      component.isWeight = true;
      component.ngOnChanges({isWeight: new SimpleChange(false, true, true)});
      fixture.detectChanges();
      
      let weightInputContainer = fixture.debugElement.query(By.css('.stat-weight'));

      expect(weightInputContainer).toBeTruthy();
    });

    it('should have a mat label value of "Weight"', async () => {
      component.isWeight = true;
      component.ngOnChanges({isWeight: new SimpleChange(false, true, false)});
      fixture.detectChanges();

      let loader = TestbedHarnessEnvironment.loader(fixture);
      let formfield = await loader.getHarness(MatFormFieldHarness);
      expect(await formfield.getLabel()).toEqual('Weight');
    });

    it('should use the digitsonly directive on the input', () => {
      component.isWeight = true;
      component.ngOnChanges({isWeight: new SimpleChange(false, true, false)});
      fixture.detectChanges();

      let weightInputContainer = fixture.debugElement.query(By.css('.stat-weight'));
      let input = weightInputContainer.query(By.css('input'));
      let digitsonly = input.injector.get(DigitsonlyDirective);

      expect(digitsonly).toBeTruthy();
    });

    it('should use the weight control on the input', async () => {
      component.isWeight = true;
      component.ngOnChanges({isWeight: new SimpleChange(false, true, false)});
      component.statGroup.get('value.weight').patchValue('1');
      fixture.detectChanges();

      let loader = TestbedHarnessEnvironment.loader(fixture);
      let formfield = await loader.getHarness(MatFormFieldHarness);
      expect(await (await formfield.getControl() as MatInputHarness).getValue()).toEqual('1');
    });
  });

  describe('minmaxinput component', () => {

    it('should not exist when the isWeight is true', () => {
      component.statGroup.controls.selectedStat.patchValue(poeMockService.getStats()[0].entries[0]);
      component.isWeight = true;
      component.ngOnChanges({isWeight: new SimpleChange(false, true, false)});
      fixture.detectChanges();

      let minmaxinput = fixture.debugElement.query(By.css('itemForm-minmaxinput'));

      expect(minmaxinput).not.toBeTruthy();
    });

    it('should not exist when the selectedStat has options', () => {
      component.statGroup.controls.selectedStat.patchValue(poeMockService.getStats()[1].entries[1]);
      fixture.detectChanges();

      let minmaxinput = fixture.debugElement.query(By.css('itemForm-minmaxinput'));

      expect(minmaxinput).not.toBeTruthy();
    });

    it('should exist when the selectedStat has no options', () => {
      component.statGroup.controls.selectedStat.patchValue(poeMockService.getStats()[0].entries[0]);
      fixture.detectChanges();

      let minmaxinput = fixture.debugElement.query(By.css('itemForm-minmaxinput'));

      expect(minmaxinput).toBeTruthy();
    });

    it('should use the statGroup value control as the group input', () => {
      component.statGroup.controls.selectedStat.patchValue(poeMockService.getStats()[0].entries[0]);
      fixture.detectChanges();

      let minmaxinput = fixture.debugElement.query(By.css('itemForm-minmaxinput')).componentInstance as MinMaxStubComponent;

      expect(minmaxinput.group).toEqual(component.statGroup.controls.value);
    });
  });

  describe('stat option searchSelect', () => {

    it('should not exist when the selectedStat has no options', () => {
      component.statGroup.controls.selectedStat.patchValue(poeMockService.getStats()[0].entries[0]);
      fixture.detectChanges();

      let optionSearcher = fixture.debugElement.queryAll(By.css('app-searchselect'))[1];

      expect(optionSearcher).not.toBeTruthy();
    });

    it('should call setStatOption when the option selector selected event emits', () => {
      spyOn(component,'setStatOption');
      
      component.statGroup.controls.selectedStat.patchValue(poeMockService.getStats()[1].entries[1]);
      fixture.detectChanges();

      let optionSearcher = fixture.debugElement.queryAll(By.css('app-searchselect'))[1];
      optionSearcher.triggerEventHandler('selected', {id: 'MockValue', text: 'Mock Value'});

      expect(component.setStatOption).toHaveBeenCalledWith({id: 'MockValue', text: 'Mock Value'});
    });

    it('should set the right inputs on the component', () => {
      component.statGroup.controls.selectedStat.patchValue(poeMockService.getStats()[1].entries[1]);
      fixture.detectChanges();

      let optionSearcher = fixture.debugElement.queryAll(By.css('app-searchselect'))[1].componentInstance as SearchSelectStubComponent;
      let autoCompleteHost = fixture.debugElement.query(By.css('.stat-select')).injector.get(MatAutocompleteOrigin);

      expect(optionSearcher.autoCompleteClass).toEqual('autocomplete-panel-300');
      expect(optionSearcher.placeholder).toEqual('Add Option');
      expect(optionSearcher.values).toEqual(component.statGroup.controls.selectedStat.value.option.options);
      expect(optionSearcher.filterBy).toEqual(component.filterStatOptions);
      expect(optionSearcher.displayBy).toEqual(component.optionDisplayBy);
      expect(optionSearcher.disabled).toEqual(component.statGroup.disabled);
      expect(optionSearcher.autoCompleteHost).toEqual(autoCompleteHost);
      expect(optionSearcher.setValue).toEqual(component.statGroup.controls.selectedStatOption.value);
    });
  });
});
