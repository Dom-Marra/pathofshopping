import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatIconHarness } from '@angular/material/icon/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { currentSortProperties } from 'src/app/core/models/currentSortProperties';
import { poeCategorizedStatic } from 'src/app/core/models/poeCategorizedStatic';
import { CurrentsortService } from 'src/app/core/services/currentsort.service';
import { PoeService } from 'src/app/core/services/poe.service';

import { ListinginfoComponent } from './listinginfo.component';

class PoeServiceStub {
  public static: Array<poeCategorizedStatic> = [ ];

  public getPoeStatic(): Array<poeCategorizedStatic> {
    return this.static;
  }
}

class CurrentsortServiceStub {
  public currentSort: BehaviorSubject<currentSortProperties> = new BehaviorSubject<currentSortProperties>({sortKey: '', sortValue: 'asc'});
}

@Component({selector: 'item-sortarrow'})
class SortArrowStub {
  @Input() sortValue: 'asc' | 'desc';
}

fdescribe('ListinginfoComponent', () => {
  let component: ListinginfoComponent;
  let fixture: ComponentFixture<ListinginfoComponent>;
  let poeAPI: PoeService;
  let mockListing = {
    account: {
      lastCharacterName: "Mock Name"
    },
    price: null,
    indexed: "2021-01-17T00:40:26Z",
    whisper: "Mock Whisper"
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListinginfoComponent, SortArrowStub, CdkCopyToClipboard ],
      providers: [
        {provide: CurrentsortService, useClass: CurrentsortServiceStub},
        {provide: PoeService, useClass: PoeServiceStub}
      ],
      imports: [ MatIconModule, MatButtonModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListinginfoComponent);
    component = fixture.componentInstance;
    component.listing = mockListing;
    fixture.detectChanges();
    poeAPI = TestBed.inject(PoeService);
  });

  describe('Class Functions', () => {

    describe('subtractDate', () => {

      it('returns in days if the provided date is one or more days longer than the current date', () => {
        let date = new Date();
        date.setDate(date.getDate() + 3);
        expect(component.subtractDate(date)).toEqual('3 Days ago');
      });

      it('returns in hours if the provided date is one or more hours longer than the current date but less than a day', () => {
        let date = new Date();
        date.setHours(date.getHours() + 3);
        expect(component.subtractDate(date)).toEqual('3 Hours ago');
      });

      it('returns in minutes if the provided date is one or more minutes longer than the current date but less than an hour', () => {
        let date = new Date();
        date.setMinutes(date.getMinutes() + 3);
        expect(component.subtractDate(date)).toEqual('3 Minutes ago');
      });

      it('returns in seconds if the provided date is one or more seconds longer than the current date but less than a minute', () => {
        let date = new Date();
        date.setSeconds(date.getSeconds() + 3);
        expect(component.subtractDate(date)).toEqual('3 Seconds ago');
      });
    });

    describe('getCurrencyImage', () => {

      it('should return null if an empty string or null object was provided', () => {
        expect(component.getCurrencyImage(null)).toEqual(null);
        expect(component.getCurrencyImage('')).toEqual(null);
      });

      it('returns the image url associated with the provided currency ID', () => {
        spyOn(poeAPI, 'getPoeStatic').and.returnValue([
          {
            label: 'Currency',
            id: 'Currency',
            entries: [
              {
                id: 'mock',
                text: 'mock currency',
                image: '/mock_image_url'
              }
            ]
          }
        ]);

        expect(component.getCurrencyImage('mock')).toEqual('http://pathofexile.com/mock_image_url');
      });
    });
  });

  describe('Component HTML', () => {
    let loader: HarnessLoader;

    beforeEach(() => {
      loader = TestbedHarnessEnvironment.loader(fixture);
    });

    describe('online status element', () => {

      afterEach(() => {
        mockListing.account['online'] = null;
      });

      it('has person mat icon if the online property isn\'t null', async () => {
        mockListing.account['online'] = {};
        await expectAsync(loader.getHarness(MatIconHarness.with({name: 'person'}))).toBeResolved();
      });

      it('has person_off mat icon if the online property isn\'t null', async () => {
        await expectAsync(loader.getHarness(MatIconHarness.with({name: 'person_off'}))).toBeResolved();
      });

      it('has online status value as a class on the mat icon if it exists', async () => {
        mockListing.account['online'] = {
          status: 'mockStatus'
        };

        let matIcon = loader.getHarness(MatIconHarness.with({name: 'person'}));
        expect(await (await (await matIcon).host()).hasClass('mockStatus')).toBeTrue();
      });

      it('has \'offline\' as a class on the mat icon if it does not exists', async () => {
        let matIcon = loader.getHarness(MatIconHarness.with({name: 'person_off'}));
        expect(await (await (await matIcon).host()).hasClass('offline')).toBeTrue();
      });

      it('has the lastCharacterName as text content', () => {
        let onlineStatusEl = fixture.debugElement.query(By.css('.listing-info'));
        expect(onlineStatusEl.nativeElement.textContent).toContain('Mock Name');
      });
    });

    describe('Currency Element', () => {

      afterEach(() => {
        mockListing.price = null;
        fixture.detectChanges();
      })
      
      it('should not be present if the price object is null', () => {
        let listingInfoEls = fixture.debugElement.queryAll(By.css('.listing-info'));
        expect(listingInfoEls.length).toEqual(3);
      });

      it('calls next with {sortKey: \'price\'} on click on the currentSort behaviorSubject', () => {
        spyOn(component.currentSort.currentSort, 'next');
        spyOn(poeAPI, 'getPoeStatic').and.returnValue([
          {
            label: 'Currency',
            id: 'Currency',
            entries: [
              {
                id: 'mock',
                text: 'mock currency',
                image: '/mock_image_url'
              }
            ]
          }
        ])
        mockListing.price = {
          currency: 'mock',
          amount: 1
        };
        fixture.detectChanges();
        let currencyEl = fixture.debugElement.queryAll(By.css('.listing-info'))[1];

        currencyEl.triggerEventHandler('click', {});
        expect(component.currentSort.currentSort.next).toHaveBeenCalledWith({sortKey: 'price'});
      });

      it('contains the price amount as text content', () => {
        spyOn(poeAPI, 'getPoeStatic').and.returnValue([
          {
            label: 'Currency',
            id: 'Currency',
            entries: [
              {
                id: 'mock',
                text: 'mock currency',
                image: '/mock_image_url'
              }
            ]
          }
        ])
        mockListing.price = {
          currency: 'mock',
          amount: 1
        };
        fixture.detectChanges();

        let currencyEl = fixture.debugElement.queryAll(By.css('.listing-info'))[1];
        expect(currencyEl.nativeElement.textContent).toContain('x1');
      });

      it('does not contain the sortarrow component if the currentSort sortKey != \'price\'', () => {
        spyOn(poeAPI, 'getPoeStatic').and.returnValue([
          {
            label: 'Currency',
            id: 'Currency',
            entries: [
              {
                id: 'mock',
                text: 'mock currency',
                image: '/mock_image_url'
              }
            ]
          }
        ]);
        mockListing.price = {
          currency: 'mock',
          amount: 1
        };
        component.currentSort.currentSort.next({sortKey: '', sortValue: 'asc'});
        fixture.detectChanges();

        let currencyEl = fixture.debugElement.queryAll(By.css('.listing-info'))[1];
        let sortArrow = currencyEl.query(By.css('item-sortarrow'));
        expect(sortArrow).toBeFalsy();
      });

      it('should set the sortarrow sortValue to the currentValue sortValue', () => {
        spyOn(poeAPI, 'getPoeStatic').and.returnValue([
          {
            label: 'Currency',
            id: 'Currency',
            entries: [
              {
                id: 'mock',
                text: 'mock currency',
                image: '/mock_image_url'
              }
            ]
          }
        ]);
        mockListing.price = {
          currency: 'mock',
          amount: 1
        };
        component.currentSort.currentSort.next({sortKey: 'price', sortValue: 'asc'});
        fixture.detectChanges();

        let currencyEl = fixture.debugElement.queryAll(By.css('.listing-info'))[1];
        let sortArrow = currencyEl.query(By.css('item-sortarrow')).componentInstance as SortArrowStub;
        expect(sortArrow.sortValue).toEqual('asc');
      });
    });

    describe('indexed element', () => {

      afterEach(() => {
        mockListing.indexed = "2021-01-17T00:40:26Z";
        fixture.detectChanges();
      });

      it('calls next with {sortKey: \'indexed\'} on click on the currentSort behaviorSubject', async () => {
        spyOn(component.currentSort.currentSort, 'next');
        let indexedEl = fixture.debugElement.queryAll(By.css('.listing-info'))[1];
        indexedEl.triggerEventHandler('click', {});

        expect(component.currentSort.currentSort.next).toHaveBeenCalledWith({sortKey: 'indexed'});
      });

      it('contains the value of subtractDate as text content', () => {
        spyOn(component, 'subtractDate').and.returnValue('Mock Return Value');
        mockListing.indexed = "Mock Index";
        fixture.detectChanges();
        let indexedEl = fixture.debugElement.queryAll(By.css('.listing-info'))[1];
        expect(indexedEl.nativeElement.textContent).toContain('Mock Return Value');
      });

      it('does not contain the sortarrow component if the currentSort sortKey != \'indexed\'', () => {
        component.currentSort.currentSort.next({sortKey: '', sortValue: 'asc'});
        fixture.detectChanges();
        let indexedEl = fixture.debugElement.queryAll(By.css('.listing-info'))[1];
        expect(indexedEl.query(By.css('item-sortarrow'))).toBeFalsy();
      });

      it('should set the sortarrow component sortValue to the currentSort sortValue', () => {
        component.currentSort.currentSort.next({sortKey: 'indexed', sortValue: 'asc'});
        fixture.detectChanges();
        let indexedEl = fixture.debugElement.queryAll(By.css('.listing-info'))[1];
        let sortArrow = indexedEl.query(By.css('item-sortarrow')).componentInstance as SortArrowStub;
        expect(sortArrow.sortValue).toEqual('asc');
      });
    });

    describe('whisper button', () => {
      let matButton: MatButtonHarness;

      afterEach(() => {
        mockListing['copied'] = null;
        fixture.detectChanges();
      });

      beforeEach(async () => {
        matButton = await loader.getHarness(MatButtonHarness);
      });

      it('should contain the listing whisper as the copy message', () => {
        let copyButton = fixture.debugElement.query(By.css('button'));
        let copyMessage = copyButton.injector.get(CdkCopyToClipboard);
        expect(copyMessage.text).toEqual("Mock Whisper");
      });

      it('sets the listing copied property true on click', async () => {
        await matButton.click();
        expect(mockListing['copied']).toBeTrue();
      });

      it('has \'copied\' class when the copied property is true', async () => {
        mockListing['copied'] = true;
        expect(await (await matButton.host()).hasClass('copied')).toBeTrue();
      })
    });

    describe('Whisper Button Icon', () => {
      afterEach(() => {
        mockListing['copied'] = null;
        fixture.detectChanges();
      });

      it('has icon \'message\' when the copied property is false/null', async () => {
        await expectAsync(loader.getHarness(MatIconHarness.with({name: 'message'}))).toBeResolved();
      });

      it('has icon \'check_circle\' when the copied property is true', async () => {
        mockListing['copied'] = true;
        await expectAsync(loader.getHarness(MatIconHarness.with({name: 'check_circle'}))).toBeResolved();
      });
    });
  });
});
