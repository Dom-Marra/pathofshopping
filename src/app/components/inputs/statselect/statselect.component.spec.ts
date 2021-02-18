import { HarnessLoader } from '@angular/cdk/testing/component-harness';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, DebugElement, Directive, EventEmitter, Input, Output, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatAutocompleteHarness } from '@angular/material/autocomplete/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputModule } from '@angular/material/input';
import { MatInputHarness } from '@angular/material/input/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StatForm } from 'src/app/classes/formgroups/stat-form';
import { DigitsonlyDirective } from 'src/app/directives/digitsonly.directive';
import { poeCategorizedStats } from 'src/app/models/poeCategorizedStats';
import { PoeService } from 'src/app/services/poe.service';
import { FilteractionbuttonsComponent } from '../../filters/filteractionbuttons/filteractionbuttons.component';

import { StatselectComponent } from './statselect.component';

@Component({selector: 'app-filtergroupselect', template: ''})
class FiltergroupselectStubComponent {
  @Input() inputName: string;                               
  @Input() control: AbstractControl;        
  @Input() selectEnum: any;        
}

@Component({selector: 'app-minmaxinput', template: ''})
class MinMaxStubComponent {                          
  @Input() group: FormGroup;    
}

@Component({selector: 'app-filteractionbuttons', template: ''})
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
      category: 'Mock Category 1',
      stats: [
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
      category: 'Mock Category 2',
      stats: [
        {
          id: 'mock.mock_2_stat_1',
          text: 'Mock Stat Cat 2 Stat 1'
        },
        {
          id: 'mock.mock_2_stat_2',
          text: 'Mock Stat Cat 2 Stat 2',
          option: [
            {
              id: 'mock.mock_2_stat_2_option_1',
              text: 'Mock 2 Stat 2 Option_1'
            },
            {
              id: 'mock.mock_2_stat_2_option_2',
              text: 'Mock 2 Stat 2 Option_2'
            }
          ]
        },
      ]
    }
  ];

  public getStats(): Array<poeCategorizedStats> {
    return this.stats;
  }
}

fdescribe('StatselectComponent', () => {
  let component: StatselectComponent;
  let fixture: ComponentFixture<StatselectComponent>;
  let poeMockService: PoeService;
  let statForm: StatForm;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ //FIX
      declarations: [ StatselectComponent, FilteractionbuttonsStubComponent, MinMaxStubComponent, FiltergroupselectStubComponent ],
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

  it('should set the stats variables', () => {
    expect(component.filteredStats).toEqual(poeMockService.getStats());
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
      let returnedValue = component.filterStats('');

      expect(returnedValue).toEqual(poeMockService.getStats());
    });

    it('should properly filter stats based on search text', () => {
      let returnedValue = component.filterStats('Stat 2');
      let expectedResults: Array<poeCategorizedStats> = [
        {
          category: 'Mock Category 1',
          stats: [
            {
              id: 'mock.mock_1_stat_2',
              text: 'Mock Stat Cat 1 Stat 2'
            },
          ]
        },
        {
          category: 'Mock Category 2',
          stats: [
            {
              id: 'mock.mock_2_stat_1',
              text: 'Mock Stat Cat 2 Stat 1'
            },
            {
              id: 'mock.mock_2_stat_2',
              text: 'Mock Stat Cat 2 Stat 2',
              option: [
                {
                  id: 'mock.mock_2_stat_2_option_1',
                  text: 'Mock 2 Stat 2 Option_1'
                },
                {
                  id: 'mock.mock_2_stat_2_option_2',
                  text: 'Mock 2 Stat 2 Option_2'
                }
              ]
            },
          ]
        }
      ];

      expect(returnedValue).toEqual(expectedResults);
    });
  });

  it('should be able to properly filter stat options', () => {
    component.statGroup.controls.selectedStat.patchValue(poeMockService.getStats()[1].stats[1]);
    let returnedValue = component.filterStatOptions('Option_2');
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
    let statWithNoOptions: poeCategorizedStats['stats'][0];
    let statWithOptions: poeCategorizedStats['stats'][0];

    beforeEach(() => {
      statWithNoOptions = poeMockService.getStats()[0].stats[0];
      statWithOptions = poeMockService.getStats()[1].stats[1];
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
      component.statGroup.controls.selectedStatOption.patchValue(statWithOptions.option[1]);
      component.statGroup.get('value.option').patchValue(statWithOptions.option[1].id);

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
    let statOption: poeCategorizedStats['stats'][0]['option'][0];

    beforeEach(() => {
      statOption = poeMockService.getStats()[1].stats[1].option[0];
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
      actionButtons = fixture.debugElement.query(By.css('app-filteractionbuttons'));
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

  describe('stat selector auto complete', () => {
    let loader: HarnessLoader;
    let autocomplete: MatAutocompleteHarness;
    let formfield: MatFormFieldHarness;
    let control: MatInputHarness;

    beforeEach(async () => {
      loader = TestbedHarnessEnvironment.loader(fixture);

      autocomplete = (await loader.getAllHarnesses(MatAutocompleteHarness))[0];
      formfield = (await loader.getAllHarnesses(MatFormFieldHarness))[0];
      control = await formfield.getControl() as MatInputHarness;
    });

    it('should have the placeholder as "Add Stat Filter" when no stat is selected', async () => {
      let placeholder = await control.getPlaceholder();
      
      expect(placeholder).toEqual("Add Stat Filter");
    });

    it('should have the placeholder as the selected stat text', async () => {
      component.statGroup.controls.selectedStat.patchValue(poeMockService.getStats()[0].stats[0]);
      
      let placeholder = await control.getPlaceholder();

      expect(placeholder).toEqual(poeMockService.getStats()[0].stats[0].text);
    });

    it('should set the filterstats to the return value of filterStats method on input', async () => {
      const returnedValue: Array<poeCategorizedStats> = [
        {category: 'mock', stats: []}
      ];

      spyOn(component, 'filterStats').and.returnValue(returnedValue);

      await control.setValue('Mock');

      expect(component.filterStats).toHaveBeenCalledWith('Mock');
      expect(component.filteredStats).toEqual(returnedValue);
    });

    it('should have a value of "Add Stat Filter" when no is stat is selected', async () => {
      let value = await autocomplete.getValue();

      expect(value).toEqual("Add Stat Filter");
    });

    it('should have a value of the selected stat text', async () => {
      component.statGroup.controls.selectedStat.patchValue(poeMockService.getStats()[0].stats[0]);

      let value = await autocomplete.getValue();

      expect(value).toEqual(poeMockService.getStats()[0].stats[0].text);
    });

    it('should reset input value on focus', async () => {
      await control.focus();

      let value = await autocomplete.getValue();

      expect(value).toEqual('');
    });

    it('should set the filteredSats to return value of the filterStats with "" param on input focus', async () => {
      const returnedValue: Array<poeCategorizedStats> = [
        {category: 'mock', stats: []}
      ];

      spyOn(component, 'filterStats').and.returnValue(returnedValue);
      await control.focus();

      expect(component.filterStats).toHaveBeenCalledWith("");
      expect(component.filteredStats).toEqual(returnedValue);
    });

    it('should set the value of the input to the selected stat text on blur', async () => {
      component.statGroup.controls.selectedStat.patchValue(poeMockService.getStats()[0].stats[0]);

      await autocomplete.enterText('mock');
      await control.blur();

      expect(await autocomplete.getValue()).toEqual(poeMockService.getStats()[0].stats[0].text);
    });

    it('should set the value of the input to "Add Stat Filter" on blur when no stat is selected', async () => {
      await autocomplete.enterText('mock');
      await control.blur();

      expect(await autocomplete.getValue()).toEqual("Add Stat Filter");
    });

    it('should have the disable state of the input equal to the statgroups disable state', async () => {
      component.statGroup.disable();
      expect(await control.isDisabled()).toEqual(true);

      component.statGroup.enable();
      expect(await control.isDisabled()).toEqual(false);
    });

    it('should blur the input when the panel emits closed event', async () => {
      let autocompletepanel = fixture.debugElement.query(By.css('mat-autocomplete'));
  
      await autocomplete.focus();
      
      (autocompletepanel.componentInstance as MatAutocomplete).closed.emit();
  
      expect(await autocomplete.isFocused()).toEqual(false);
    });

    it('should call setStat with the selected value on auto complete select', async () => {
  
      spyOn(component, 'setStat');
      let text = poeMockService.getStats()[0].stats[0].text;
  
      await autocomplete.enterText('random text'); //Need this for some reason
      await autocomplete.focus();
      await autocomplete.selectOption({text: text});
  
      expect(component.setStat).toHaveBeenCalledWith(poeMockService.getStats()[0].stats[0]);
    });
  
    it('should blur the input when an option is selected', async () => {
      let text = poeMockService.getStats()[0].stats[0].text;
  
      await autocomplete.enterText('random text'); //Need this for some reason
      await autocomplete.focus();
      await autocomplete.selectOption({text: text});
  
      expect(await autocomplete.isFocused()).toEqual(false);
    });

    it('should add rotate class to the mat icon when the panel is open', async () => {
      let matIcon = fixture.debugElement.query(By.css('mat-icon'));
  
      await autocomplete.enterText('random text'); //Need this for some reason
      await autocomplete.focus();
      await autocomplete.isOpen();
  
      expect(matIcon.classes.rotate).toEqual(true);
    });
  
    it('should remove rotate class to the mat icon when the panel is closed', async () => {
      let matIcon = fixture.debugElement.query(By.css('mat-icon'));
  
      expect(matIcon.classes).not.toContain('rotate');
    });
  });

  describe('stat-inputs container', () => {

    it('should not create the stat-inputs container when no stat is selected', () => {
      component.statGroup.controls.selectedStat.reset();
      let statInputs = fixture.debugElement.query(By.css('.stat-inputs'));
  
      expect(statInputs).not.toBeTruthy();
    });

    it('should be created when a stat is selected', () => {
      component.statGroup.controls.selectedStat.patchValue(poeMockService.getStats()[0].stats[0]);
      fixture.detectChanges();
      
      let statInputs = fixture.debugElement.query(By.css('.stat-inputs'));
      expect(statInputs).toBeTruthy();
    });
  });

  describe('weight input', () => {

    beforeEach(() => {
      component.statGroup.controls.selectedStat.patchValue(poeMockService.getStats()[0].stats[0]);
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
      let formfield = (await loader.getAllHarnesses(MatFormFieldHarness))[1];
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
      let formfield = (await loader.getAllHarnesses(MatFormFieldHarness))[1];
      expect(await (await formfield.getControl() as MatInputHarness).getValue()).toEqual('1');
    });
  });

});
