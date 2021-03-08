import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatIconModule } from '@angular/material/icon';
import { FilteractionbuttonsComponent } from './filteractionbuttons.component';

describe('FilteractionbuttonsComponent', () => {
  const mockFormGroup = new FormGroup({
    mockControl: new FormControl('')
  });

  let component: FilteractionbuttonsComponent;
  let fixture: ComponentFixture<FilteractionbuttonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilteractionbuttonsComponent ],
      imports: [ MatIconModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteractionbuttonsComponent);
    component = fixture.componentInstance;
    component.formGroup = mockFormGroup;
    fixture.detectChanges();
  });

  describe('component HTML', () => {
    let loader: HarnessLoader;

    beforeEach(() => {
      loader = TestbedHarnessEnvironment.loader(fixture);  
    });

    describe('delete button', () => {

      it('should exist if the formGroup is present and includeDelete is true', async () => {
        component.includeDelete = true;
        component.formGroup = mockFormGroup;
        await expectAsync(loader.getHarness(MatButtonHarness.with({text: 'delete'}))).toBeResolved();
      });

      it('should not exist if includeDelete is false', async () => {
        component.includeDelete = false;
        await expectAsync(loader.getHarness(MatButtonHarness.with({text: 'delete'}))).toBeRejected();
      });

      it('should not exist if formGroup is not present', async () => {
        component.formGroup = null;
        await expectAsync(loader.getHarness(MatButtonHarness.with({text: 'delete'}))).toBeRejected();
      });

      it('should call remove.emit on click', async () => {
        component.includeDelete = true;
        component.formGroup = mockFormGroup;
        let deleteButton = await loader.getHarness(MatButtonHarness.with({text: 'delete'}));
        spyOn(component.remove, 'emit');
        await deleteButton.click();
        expect(component.remove.emit).toHaveBeenCalled();
      });
    });

    describe('clear button', () => {

      it('should exist if the formGroup is present and disableClear is false and the form is dirty', async () => {
        component.disableClear = false;
        component.formGroup = mockFormGroup;
        component.formGroup.markAsDirty();
        await expectAsync(loader.getHarness(MatButtonHarness.with({text: 'clear'}))).toBeResolved();
      });

      it('should not exist if disableClear is true', async () => {
        component.disableClear = true;
        await expectAsync(loader.getHarness(MatButtonHarness.with({text: 'clear'}))).toBeRejected();
      });

      it('should not exist if formGroup is not present', async () => {
        component.formGroup = null;
        await expectAsync(loader.getHarness(MatButtonHarness.with({text: 'clear'}))).toBeRejected();
      });

      it('should call reset on click', async () => {
        component.disableClear = false;
        component.formGroup = mockFormGroup;
        component.formGroup.markAsDirty();
        let clearButton = await loader.getHarness(MatButtonHarness.with({text: 'clear'}));
        spyOn(component, 'reset');
        await clearButton.click();
        expect(component.reset).toHaveBeenCalled();
      });
    });

    describe('disable button', () => {

      it('should exist if the formGroup is present and disableDisable is false', async () => {
        component.disableDisable = false;
        component.formGroup = mockFormGroup;
        await expectAsync(loader.getHarness(MatButtonHarness.with({text: 'block'}))).toBeResolved();
      });

      it('should not exist if disableClear is true', async () => {
        component.disableDisable = true;
        await expectAsync(loader.getHarness(MatButtonHarness.with({text: 'block'}))).toBeRejected();
      });

      it('should not exist if formGroup is not present', async () => {
        component.formGroup = null;
        await expectAsync(loader.getHarness(MatButtonHarness.with({text: 'block'}))).toBeRejected();
      });

      it('should emit disableChange event on click', async () => {
        component.disableDisable = false;
        component.formGroup = mockFormGroup;
        let clearButton = await loader.getHarness(MatButtonHarness.with({text: 'block'}));
        spyOn(component.disableChange, 'emit');
        await clearButton.click();
        expect(component.disableChange.emit).toHaveBeenCalled();
      });

      it('should enable the form on click if it was disabled previously', async () => {
        component.disableDisable = false;
        component.formGroup = mockFormGroup;
        component.formGroup.disable({emitEvent: false});
        let clearButton = await loader.getHarness(MatButtonHarness.with({text: 'block'}));
        await clearButton.click();
        expect(component.formGroup.enabled).toBeTrue();
      });

      it('should disable the form on click if it was enabled previously', async () => {
        component.disableDisable = false;
        component.formGroup = mockFormGroup;
        component.formGroup.enable({emitEvent: false});
        let clearButton = await loader.getHarness(MatButtonHarness.with({text: 'block'}));
        await clearButton.click();
        expect(component.formGroup.disabled).toBeTrue();
      });
    });
  });

  describe('class functions', () => {

    describe('emitRemove', () => {
      it('should call emit on remove', () => {
        spyOn(component.remove, 'emit');
        component.emitRemove();
        expect(component.remove.emit).toHaveBeenCalled();
      });
    });

    describe('reset', () => {
      it('should call reset on the form', () => {
        spyOn(component.formGroup, 'reset');
        component.reset();
        expect(component.formGroup.reset).toHaveBeenCalled();
      });
    });
  });
});
