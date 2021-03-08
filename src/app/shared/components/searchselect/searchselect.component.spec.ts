import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatAutocompleteHarness } from '@angular/material/autocomplete/testing';
import { MatIconHarness } from '@angular/material/icon/testing';
import { MatButtonHarness } from '@angular/material/button/testing';

import { SearchSelectComponent } from './searchselect.component';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { SimpleChange, SimpleChanges } from '@angular/core';

describe('SearchSelectComponent', () => {
  let component: SearchSelectComponent;
  let fixture: ComponentFixture<SearchSelectComponent>;
  let loader: HarnessLoader;
  let matInput: MatInputHarness;
  let matAutocomplete: MatAutocompleteHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchSelectComponent ],
      imports: [ MatAutocompleteModule, MatInputModule, MatFormFieldModule, NoopAnimationsModule, ReactiveFormsModule, MatIconModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchSelectComponent);
    component = fixture.componentInstance;

    //Placeholder filterfunction
    component.filterBy = (text: string, values: any) => {
      return ['Placeholder filter function']
    };

    fixture.detectChanges();

    loader = TestbedHarnessEnvironment.loader(fixture);

    matInput = await loader.getHarness(MatInputHarness);
    matAutocomplete = await loader.getHarness(MatAutocompleteHarness);
  });

  describe('class functions', () => {
    it('should call selectValue with the updated set value on change', () => {
      spyOn(component, 'selectValue');
  
      component.setValue = 'Changed Mock';
  
      let change: SimpleChanges = {setValue: new SimpleChange('Mock 1', component.setValue, true)};
      component.ngOnChanges(change);
  
      expect(component.selectValue).toHaveBeenCalledWith(component.setValue);
    });

    it('should call selectValue ngAfterContentInit if the selectValue is not null', () => {
      spyOn(component, 'selectValue');
  
      component.setValue = 'Changed Mock';

      component.ngAfterContentInit();
  
      expect(component.selectValue).toHaveBeenCalledWith(component.setValue);
    });

    it('should call the filterBy function when the search value changes', () => {
      spyOn(component, 'filterBy');

      component.search.patchValue('test');

      expect(component.filterBy).toHaveBeenCalledWith('test', component.values);
    });

    describe('selectValue', () => {

      it('should set the selectedValue to passed value', () => {
        component.selectValue('Mock Value');
        expect(component.selectedValue).toEqual('Mock Value');
      });
      
      it('should patch the search value to the displayBy value', () => {
        component.displayBy = (value: any) => { return value.text };
        
        component.selectValue({id: 'Mock Id', text: 'Mock Text'});

        expect(component.search.value).toEqual('Mock Text');
      });

      it('should patch the search value to value if no display by is provided', () => {
        component.selectValue('Mock Text');

        expect(component.search.value).toEqual('Mock Text');
      });

      it('should emit a selected event with the selected value if provided to', () => {
        spyOn(component.selected, 'emit');

        component.selectValue('Mock Text', true);

        expect(component.selected.emit).toHaveBeenCalledWith('Mock Text');
      });
    });

    describe('getPlaceholder', () => {

      it('should return the placeholder input as a default option', () => {
        component.placeholder = 'Mock Placeholder';

        expect(component.getPlaceholder()).toEqual('Mock Placeholder');
      });

      it('should return the input name if provide and clearable is true', () => {
        component.inputName = 'Mock Input';
        component.clearable = true;

        expect(component.getPlaceholder()).toEqual('Mock Input');
      });

      it('should return the current selectedValue using displayBy if clearable is false', () => {
        component.selectedValue = {text: 'Mock Value'};
        component.displayBy = (value: any) => { return value.text};

        expect(component.getPlaceholder()).toEqual('Mock Value');
      });

      it('should return the current selected value unparsed if displayBy is not provided and clearable is false', () => {
        component.selectedValue = 'Mock Value';

        expect(component.getPlaceholder()).toEqual('Mock Value');
      });
    });

    describe('clear', () => {
      it('should patch the search value to \'\'', () => {
        component.clear();
        expect(component.search.value).toEqual('');
      });

      it('should emit a clear event', () => {
        spyOn(component.cleared, 'emit');
        component.clear();
        expect(component.cleared.emit).toHaveBeenCalled();
      });
    })
  });

  describe('Component HTML', () => {

    describe('Label', () => {
      let formField: MatFormFieldHarness;
  
      beforeEach(async () => {
        formField = await loader.getHarness(MatFormFieldHarness);
      });
  
      it('should not have a floating label when no inputName is provided and the selected value is null', async () => {
        expect(await formField.isLabelFloating()).toBeFalse();
      });
  
      it('should have a label equal to the inputName', async () => {
        const mockLabel = 'Mock Input';
        component.inputName = mockLabel;
    
        expect(await formField.getLabel()).toEqual(mockLabel);
      });
    
      it('should have a floating label when there is a selected value and the inputName is provided', async () => {
        const mockLabel = 'Mock Input';
        const mockSelectedValue = 'Mock Value';
  
        component.selectValue(mockSelectedValue);
        component.inputName = mockLabel;
  
        expect(await formField.isLabelFloating()).toBeTrue();
      });
  
      it('should not have a floating label when there is a selected value and the inputName is not provided', async () => {
        const mockSelectedValue = 'Mock Value';
  
        component.selectValue(mockSelectedValue);
  
        expect(await formField.isLabelFloating()).toBeFalse();
      });
  
      it('should have the placeholder equal to the getPlaceholder value', async () => {
        spyOn(component, 'getPlaceholder').and.returnValue('Mock Placeholder');
  
        expect(await formField.getLabel()).toEqual('Mock Placeholder');
      });
    });

    describe('Input Blur', () => {
      const mockSelectedValue = 'Mock Value';
  
      beforeEach(() => {
        component.selectValue(mockSelectedValue);
      });
  
      it('should patch search the value to the selectedValue not selectingOption', async () => {
        await matInput.setValue('Test Input');
        await matInput.blur();
  
        expect(component.search.value).toEqual(mockSelectedValue);
      });
  
      it('should keep search the current input value when selectingOption is true', async () => {
        component.selectingOption = true;
  
        await matInput.setValue('Test Input');
        await matInput.blur();
  
        expect(component.search.value).toEqual('Test Input');
      });
  
      it('should call clear() when clearable is true and the search value is empty', async () => {
        spyOn(component, 'clear');
  
        component.clearable = true;
  
        await matInput.setValue('');
        await matInput.blur();
  
        expect(component.clear).toHaveBeenCalled();
      });
  
      it('should patch search to the displayBy value when one is provided', async () => {
        component.displayBy = (value: any) => {return value.text};
        component.selectValue({text: 'Mock Value w/ displayBy'});
  
        await matInput.setValue('Test Input');
        await matInput.blur();
  
        expect(component.search.value).toEqual('Mock Value w/ displayBy');
      });
    });
  
    describe('Input Focus', () => {
  
      it('clears the search control if the selectingOption value is false and the clearOnFocus value is true', async () => {
        component.clearOnFocus = true;
        component.selectingOption = false;
        component.search.patchValue('Mock Value');
  
        await matInput.focus();
        expect(component.search.value).toEqual('');
      });
  
      it('does nothing if the the selectingOption value is true', async () => {
        component.clearOnFocus = true;
        component.selectingOption = true;
        component.search.patchValue('Mock Value');
  
        await matInput.focus();
        expect(component.search.value).toEqual('Mock Value');
      });
  
      it('patches the search control to the displayBy value if the the clearOnFocus value is false', async () => {
        spyOn(component, 'displayBy').and.returnValue('Mock displayBy');
        component.clearOnFocus = false;
        component.selectingOption = false;
        component.search.patchValue('Mock Value');
  
        await matInput.focus();
        expect(component.search.value).toEqual('Mock displayBy');
      });
    });
  
    describe('Dropdown icon', () => {
      let matIcon: MatIconHarness;
  
      beforeEach(async () => {
        matIcon = await loader.getHarness(MatIconHarness);
      });
  
      it('should have \'arrow_drop_down\' as the text', async () => {
        expect(await matIcon.getName()).toEqual('arrow_drop_down');
      });
  
      it('should have the rotate class when the autocomplete is open', async () => {
        let matIconHost = await matIcon.host();
  
        await matAutocomplete.enterText('Test');
  
        expect(await matIconHost.hasClass('rotate')).toBeTrue();
      });
  
      it('should not have have the rotate class when the autocomplete is closed', async () => {
        let matIconHost = await matIcon.host();
  
        expect(await matIconHost.hasClass('rotate')).toBeFalse();
      });
    })
  
    describe('Clear button', () => { 
      
      it('should exist when clearable is true and the search has a value', async () =>{
        component.clearable = true;
        
        await matInput.setValue('test');
  
        let matButton = await loader.getHarness(MatButtonHarness);
  
        expect(matButton).toBeTruthy();
        expect(await matButton.getText()).toEqual('clear');
      });
  
      it('should call clear() when clicked', async () => {
        spyOn(component, 'clear');
        component.clearable = true;
  
        await matInput.setValue('test');
  
        let matButton = await loader.getHarness(MatButtonHarness);
        await matButton.click();
  
        expect(component.clear).toHaveBeenCalled();
      });
  
      it('should not exist when there is no search value', async () => {
        component.clearable = true;
  
        await expectAsync(loader.getHarness(MatButtonHarness)).toBeRejected();
      });
  
      it('should not exist when clearable is false', async () => {
        component.clearable = false;
  
        await expectAsync(loader.getHarness(MatButtonHarness)).toBeRejected();
      });
    });
  
    describe('Autocomplete', () => {
  
      const mockValues = ['Mock 1', 'Mock 2', 'Mock 3'];
      const mockGroupedValues = [
        {
          groupName: 'Mock Group 1',
          values: [{id: 'MG1V1', text: 'Mock Group 1 Value 1'}, {id: 'MGV2', text: 'Mock Group 1 Value 2'}]
        },
        {
          groupName: 'Mock Group 2',
          values: [{id: 'MG2V2', text: 'Mock Group 2 Value 2'}, {id: 'MGV2', text: 'Mock Group 2 Value 2'}]
        }
      ];
    
      const mockFilter = (text: string, values: Array<any>) => { 
        if (!text) return values;
    
        return values.filter(val => val.indexOf(text) != -1)
      };
      
      const mockGroupFilter = (text: string, values: typeof mockGroupedValues) => {
        if (!text) return values;
    
        return values.map(val => ({
          groupName: val.groupName,
          values: val.values.filter(val => val.text.indexOf(text) != -1)
        }));
      };
    
      const displayBy = (value: any) => { return value?.text};
      const groupOptions = {
        groupedBy: 'groupName',
        groupedInto: 'values'
      };
  
      it('should call selectValue on optionSelected event with the selected value and true', async () => {
        component.values = mockValues;
        component.filterBy = mockFilter;
        spyOn(component, 'selectValue');
  
        await matAutocomplete.enterText('M');
        await matAutocomplete.selectOption({text: 'Mock 1'});
  
        expect(component.selectValue).toHaveBeenCalledWith('Mock 1', true);
      });
  
      describe('groupOptions provided', () => {
  
        beforeEach(() => {
          component.values = mockGroupedValues;
          component.filterBy = mockGroupFilter;
          component.displayBy = displayBy;
          component.groupOptions = groupOptions;
        })
  
        it('should have group options', async () => {
          await matAutocomplete.enterText(' ');
    
          expect((await matAutocomplete.getOptionGroups()).length).toBeGreaterThan(0);
        });
  
        it('should have option text equal to the value when no displayBy function is provided', async () => {
          component.values = [{group: 'G1', values: ['G1 Mock 1', 'G1 Mock 2']}, {group: 'G2', values: ['G2 Mock 1']}];
          component.filterBy = (text: string, values: any) => { return values };
          component.displayBy = null;
  
          await matAutocomplete.enterText(' ');
          let option = await matAutocomplete.getOptions({text: /G1 Mock 1/});
          expect(option.length).toEqual(1);
        });
  
        it('should have option text equal to the displayBy value', async () => {
          await matAutocomplete.enterText(' ');
    
          let option = await matAutocomplete.getOptions({text: /Mock Group 1 Value 1/});
          expect(option.length).toEqual(1);
        });
  
        it('should have group option label equal to group property', async () => {
          await matAutocomplete.enterText(' ');
    
          let option = await matAutocomplete.getOptionGroups({labelText: /Mock Group 1/});
          expect(option.length).toEqual(1);
        });
  
        it('should set selectingOption true on option mousedown', async () => {
          await matAutocomplete.enterText(' ');
          let matOption = fixture.debugElement.query(By.css('.mat-option'));
    
          matOption.triggerEventHandler('mousedown', {});
    
          expect(component.selectingOption).toBeTrue();
        });
    
        it('should set selectionOption false on option mouseup', async () => {
          component.selectingOption = true;
  
          await matAutocomplete.enterText(' ');
          let matOption = fixture.debugElement.query(By.css('.mat-option'));
          matOption.triggerEventHandler('mouseup', {});
    
          expect(component.selectingOption).toBeFalse();
        });
    
        it('should set selectionOption false on option blur', async () => {
          component.selectingOption = true;
  
          await matAutocomplete.enterText(' ');
          let matOption = fixture.debugElement.query(By.css('.mat-option'));
          matOption.triggerEventHandler('blur', {});
    
          expect(component.selectingOption).toBeFalse();
        });
  
        it('should have class \'mat-selected\' when the option is selected', async () => {
          await matAutocomplete.enterText(' ');
          let option = (await matAutocomplete.getOptions({text: /Mock Group 1 Value 1/}))[0];
  
          await option.click();
  
          expect(await (await option.host()).hasClass('mat-selected')).toBeTrue();
        });
      });
  
      describe('no groupOptions', () => {
  
        beforeEach(() => {
          component.values = mockValues;
          component.filterBy = mockFilter;
        });
    
        it('should have options', async () => {
          await matAutocomplete.enterText(' ');
    
          expect((await matAutocomplete.getOptions()).length).toBeGreaterThan(0);
        });
    
        it('should have option text equal to the value when no displayBy function is provided', async () => {
          await matAutocomplete.enterText(' ');
    
          let option = await matAutocomplete.getOptions({text: /Mock 1/});
          expect(option.length).toEqual(1);
        });
  
        it('should have option text equal to the displayBy value', async () => {
          component.values = [{id: 'M1', text: 'Mock 1'}, {id: 'M2', text: 'Mock 2'}];
          component.filterBy = (text: string, values: any) => { return values };
          component.displayBy = (value: any) => {return value?.text};
  
          await matAutocomplete.enterText(' ');
          let option = await matAutocomplete.getOptions({text: /Mock 1/});
          expect(option.length).toEqual(1);
        });
    
        it('should set selectingOption true on option mousedown', async () => {
          await matAutocomplete.enterText(' ');
          let matOption = fixture.debugElement.query(By.css('.mat-option'));
    
          matOption.triggerEventHandler('mousedown', {});
    
          expect(component.selectingOption).toBeTrue();
        });
    
        it('should set selectionOption false on option mouseup', async () => {
          component.selectingOption = true;
  
          await matAutocomplete.enterText(' ');
          let matOption = fixture.debugElement.query(By.css('.mat-option'));
          matOption.triggerEventHandler('mouseup', {});
    
          expect(component.selectingOption).toBeFalse();
        });
    
        it('should set selectionOption false on option blur', async () => {
          component.selectingOption = true;
  
          await matAutocomplete.enterText(' ');
          let matOption = fixture.debugElement.query(By.css('.mat-option'));
          matOption.triggerEventHandler('blur', {});
    
          expect(component.selectingOption).toBeFalse();
        });
  
        it('should have class \'mat-selected\' when the option is selected', async () => {
          await matAutocomplete.enterText(' ');
          let option = (await matAutocomplete.getOptions({text: /Mock 1/}))[0];
  
          await option.click();
  
          expect(await (await option.host()).hasClass('mat-selected')).toBeTrue();
        });
      });
    });
  });
});
