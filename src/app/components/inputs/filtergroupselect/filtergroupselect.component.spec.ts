import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatAutocompleteHarness } from '@angular/material/autocomplete/testing';

import { FiltergroupselectComponent } from './filtergroupselect.component';
import { By } from '@angular/platform-browser';

describe('FiltergroupselectComponent', () => {
  let component: FiltergroupselectComponent;
  let fixture: ComponentFixture<FiltergroupselectComponent>;
  let loader: HarnessLoader;
  let mockControl: FormControl;
  let mockEnum: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltergroupselectComponent ],
      imports: [ MatAutocompleteModule, MatInputModule, MatFormFieldModule, NoopAnimationsModule, ReactiveFormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltergroupselectComponent);
    component = fixture.componentInstance;
    mockEnum = {
      mock1: 'Mock 1',
      mock2: 'Mock 2',
      mock3: 'Mock 3'
    };
    component.selectEnum = mockEnum;

    mockControl = new FormControl('');
    component.control = mockControl;
    fixture.detectChanges();

    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should properly filter object keys', () => {
    let filtered = component.filterEnums('3', component.selectEnum);
    expect(filtered.length).toEqual(1);
    expect(filtered[0]).toEqual('mock3');
  });
  
  it('should not have a label when the inputName input is empty', async () => {
    const formField = await loader.getHarness(MatFormFieldHarness);
    expect(await formField.getLabel()).toBeNull();
  });

  it('should have a label when the inputName input is provided', async () => {
    const mockLabel = 'Mock Input';
    component.inputName = mockLabel;

    const formField = await loader.getHarness(MatFormFieldHarness);
    expect(await formField.getLabel()).toEqual(mockLabel);
  });

  it("should have the mat form field inputs' placeholder equal to the selected value", async () => {
    component.control.patchValue('mock2');

    const formField = await loader.getHarness(MatFormFieldHarness);
    const control = await formField.getControl() as MatInputHarness;

    expect(await control.getPlaceholder()).toEqual(component.selectEnum.mock2);
  });

  it("should have the mat form field inputs' value equal to the selected value", async () => {
    component.control.patchValue('mock1');

    const formField = await loader.getHarness(MatFormFieldHarness);
    const control = await formField.getControl() as MatInputHarness;

    expect(await control.getValue()).toEqual(component.selectEnum.mock1);
  });

  it('should update the filter array when typing in the mat form field input', async () => {
    const formField = await loader.getHarness(MatFormFieldHarness);
    const control = await formField.getControl() as MatInputHarness;
    const mockSearch = '2';
    const mockResults = ['mock2'];

    spyOn(component, 'filterEnums').and.returnValue(mockResults);

    await control.setValue(mockSearch);

    expect(component.filterEnums).toHaveBeenCalledWith(mockSearch, component.selectEnum);
    expect(component.filter).toEqual(mockResults);
  });

  it('should set the mat form fields input value on focus to ""', async () => {
    component.control.patchValue('mock2');

    const formField = await loader.getHarness(MatFormFieldHarness);
    const control = await formField.getControl() as MatInputHarness;

    await control.focus();
    expect(await control.getValue()).toEqual('');
  });

  it('should call the filterEnum method with searchText "", and use that value to set the filter array when the mat form field input is focused', async () => {
    component.filter = ['mock1'];

    const returnValue = Object.keys(mockEnum);
    
    spyOn(component, 'filterEnums').and.returnValue(returnValue);

    const formField = await loader.getHarness(MatFormFieldHarness);
    const control = await formField.getControl() as MatInputHarness;

    await control.focus();

    expect(component.filterEnums).toHaveBeenCalledWith('', component.selectEnum);
    expect(component.filter).toEqual(returnValue);
  });

  it('should set the mat form fields input value to selected value on blur', async () => {
    const formField = await loader.getHarness(MatFormFieldHarness);
    const control = await formField.getControl() as MatInputHarness;
    const valueToSet = 'asdadasdasd';
    const controlValue = 'mock2';

    component.control.patchValue('mock2');

    await control.setValue(valueToSet);
    await control.blur();

    expect(await control.getValue()).toEqual(component.selectEnum[controlValue]);
  });

  it('should disable the mat form field input when the control is disabled', async () => {
    const formField = await loader.getHarness(MatFormFieldHarness);
    const control = await formField.getControl() as MatInputHarness;

    component.control.disable();
    expect(await control.isDisabled()).toEqual(true);
  });

  it('should have the mat form field input not disabled when the control is enabled', async () => {
    const formField = await loader.getHarness(MatFormFieldHarness);
    const control = await formField.getControl() as MatInputHarness;

    component.control.enable();
    expect(await control.isDisabled()).toEqual(false);
  });

  it('should display the results of the filter array in the mat auto complete', async () => {
    const autocomplete = await loader.getHarness(MatAutocompleteHarness);

    await autocomplete.enterText('random text'); //Need this for some reason
    await autocomplete.focus();

    expect((await autocomplete.getOptions()).length).toEqual(component.filter.length);
  });

  it('should patch the control with the selected value on auto complete select', async () => {
    const autocomplete = await loader.getHarness(MatAutocompleteHarness);
    const mockSelectName = 'mock1';
    const mockSelect = component.selectEnum[mockSelectName];

    spyOn(component.control, 'patchValue');

    await autocomplete.enterText('random text'); //Need this for some reason
    await autocomplete.focus();
    await autocomplete.selectOption({text: mockSelect});

    expect(component.control.patchValue).toHaveBeenCalledWith(mockSelectName);
  });

  it('should blur the input when an option is selected', async () => {
    const autocomplete = await loader.getHarness(MatAutocompleteHarness);
    const mockSelectName = 'mock1';
    const mockSelect = component.selectEnum[mockSelectName];

    await autocomplete.enterText('random text'); //Need this for some reason
    await autocomplete.focus();
    await autocomplete.selectOption({text: mockSelect});

    expect(await autocomplete.isFocused()).toEqual(false);
  });

  it('should add rotate class to the mat icon when the panel is open', async () => {
    const autocomplete = await loader.getHarness(MatAutocompleteHarness);
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

  it('should blur the input when the panel emits closed event', async () => {
    const autocomplete = await loader.getHarness(MatAutocompleteHarness);
    let autocompletepanel = fixture.debugElement.query(By.css('mat-autocomplete'));

    await autocomplete.focus();
    
    (autocompletepanel.componentInstance as MatAutocomplete).closed.emit();

    expect(await autocomplete.isFocused()).toEqual(false);
  });
});
