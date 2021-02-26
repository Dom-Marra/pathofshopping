import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatIconHarness } from '@angular/material/icon/testing';
import { MatInputModule } from '@angular/material/input';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerHarness} from '@angular/material/progress-spinner/testing';

import { SavedialogComponent } from './savedialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

class MatDialogRefStub {
  public close() { }
  public addPanelClass(className: string) { };
}

fdescribe('SavedialogComponent', () => {
  let component: SavedialogComponent;
  let fixture: ComponentFixture<SavedialogComponent>;
  let matDialogDataPromise: Promise<any> = new Promise((resolve, reject) => {});
  let matRef: MatDialogRef<any, any>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedialogComponent ],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: matDialogDataPromise},
        {provide: MatDialogRef, useClass: MatDialogRefStub}
      ],
      imports: [ MatFormFieldModule, NoopAnimationsModule, MatIconModule, MatInputModule, MatProgressBarModule, MatProgressSpinnerModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    matRef = TestBed.inject(MatDialogRef);
  });

  describe('component HTML', () => {
    let matFormFieldHarness: MatFormFieldHarness;
    let matIconHarness: MatIconHarness;
    let matButtonHarness: MatButtonHarness;
    let loader: HarnessLoader;

    beforeEach(() => {
      loader = TestbedHarnessEnvironment.loader(fixture);
    });

    describe('header', () => {

      let headerEl: DebugElement;

      beforeEach(() => {
        headerEl = fixture.debugElement.query(By.css('.title-text'));
        component.header = 'Mock Header';
        fixture.detectChanges();
      });

      it('should have the text equal to the header value', () => {
        expect(headerEl.nativeElement.textContent).toEqual('Mock Header');
      });
    });

    describe('close button', () => {

      it('should call close on click', async () => {
        matButtonHarness = await loader.getHarness(MatButtonHarness);
        spyOn(component, 'close');
        await matButtonHarness.click();

        expect(component.close).toHaveBeenCalled();
      });
  
      it('should use the close mat icon', async () => {
        matIconHarness = await loader.getHarness(MatIconHarness);
        
        expect(await matIconHarness.getName()).toEqual('close');
      });
    });

    describe('url container', () => {

      it('should not exist if there is no url set', () => {
        component.url = null;
        expect(fixture.debugElement.query(By.css('.url-container'))).toBeFalsy();
      });

      it('should exist if there is a url set', () => {
        component.url = 'Mock Url';
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.url-container'))).toBeTruthy();
      });
    });

    describe('url formfield', () => {
      const mockUrl = 'Mock Url';

      beforeEach(async () => {
        component.url = mockUrl;
        
        matFormFieldHarness = await loader.getHarness(MatFormFieldHarness);
        matIconHarness = (await loader.getAllHarnesses(MatIconHarness))[1];
      });

      it('should have a value eqaul to the set url', async () => {
        let value = await (await matFormFieldHarness.getControl() as MatInputHarness).getValue();
        expect(value).toEqual(mockUrl);
      });

      it('should set copy to true when cdkCopyToClipboardCopied event fires', () => {
        let buttonEl = fixture.debugElement.queryAll(By.css('button'))[1];
        buttonEl.triggerEventHandler('cdkCopyToClipboardCopied', {});
        expect(component.copied).toBeTrue();
      });

      it('should have the content_copy mat icon in the button', async () => {
        expect(await matIconHarness.getName()).toEqual('content_copy');
      });

      it('should have mat hint with message \'Copied!\' when copied is true', async () => {
        component.copied = true;

        let mathint = (await matFormFieldHarness.getTextHints())[0];
        expect(mathint).toEqual('Copied!');
      });
    });

    describe('err-message-container', () => {

      it('should not exist if there is not errMessage', () => {
        component.errMessage = null;
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('.err-message-container'))).toBeFalsy();
      });

      it('should exist with the error message when the errMessage value is set', () => {
        component.errMessage = 'Mock Error';
        fixture.detectChanges();
        let errMsgCont = fixture.debugElement.query(By.css('.err-message-container'))

        expect(errMsgCont).toBeTruthy();
        expect(errMsgCont.nativeElement.textContent).toEqual('Mock Error');
      });
    });

    describe('mat-spinner', () => {

      it('should exist if the url and error message are not set', async () => {
        component.url = null;
        component.errMessage = null;

        expect(await loader.getHarness(MatProgressSpinnerHarness)).toBeTruthy();
      });

      it('should not exist if the error message is set', async () => {
        component.url = null;
        component.errMessage = 'Mock Error';

        await expectAsync(loader.getHarness(MatProgressSpinnerHarness)).toBeRejected();
      });

      it('should not exist if the url is set', async () => {
        component.url = 'Mock Url';
        component.errMessage = null;

        await expectAsync(loader.getHarness(MatProgressSpinnerHarness)).toBeRejected();
      });

      it('should have mode equal to \'indeterminate\'', async () => {
        let matSpinner =await loader.getHarness(MatProgressSpinnerHarness);

        expect(await matSpinner.getMode()).toBe('indeterminate');
      });
    });
  });

  describe('class', () => {

    describe('data promise', () => {

      it('should set the url and header when resolved', fakeAsync(() => {
        const mockDoc = {id: 'mockId'};

        let resolvedPromise: Promise<any> = new Promise((resolve) => {
          resolve(mockDoc);
        });

        component = new SavedialogComponent(resolvedPromise, matRef);

        flushMicrotasks();

        expect(component.header).toBe('List Saved');
        expect(component.url).toBe('www.pathofshopping.com/shoppinglist?list=mockId')
      }));

      it('should set the header, errMessage and add error panel class when rejected', fakeAsync(() => {
        spyOn(component.dialogRef, 'addPanelClass');
        let resolvedPromise: Promise<any> = new Promise((reject) => {
          reject(null);
        });

        component = new SavedialogComponent(resolvedPromise, matRef);

        flushMicrotasks();

        expect(component.header).toBe('Error!');
        expect(component.errMessage).toBe('An error occurred while saving the data, please try again.');
        expect(component.dialogRef.addPanelClass).toHaveBeenCalledWith('error');
      }));
    });

    describe('close', () => {

      it('should call close on the dialogRef', () => {
        spyOn(component.dialogRef, 'close');
        component.close();

        expect(component.dialogRef.close).toHaveBeenCalled();
      })
    });
  });
});
