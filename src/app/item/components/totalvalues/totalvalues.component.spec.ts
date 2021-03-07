import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { currentSortProperties } from 'src/app/models/currentSortProperties';
import { CurrentsortService } from 'src/app/services/currentsort.service';

import { TotalvaluesComponent } from './totalvalues.component';

class CurrentsortServiceStub {
  public currentSort: BehaviorSubject<currentSortProperties> = new BehaviorSubject<currentSortProperties>({sortKey: '', sortValue: 'asc'});
}

@Component({selector: 'item-sortarrow'})
class SortArrowStub {
  @Input() sortValue: 'asc' | 'desc';
}

describe('TotalvaluesComponent', () => {
  let component: TotalvaluesComponent;
  let fixture: ComponentFixture<TotalvaluesComponent>;
  let currentsortService: CurrentsortService;
  let mockExtended = { };
  const mockedValue = "Mock Value";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalvaluesComponent, SortArrowStub ],
      providers: [
        {provide: CurrentsortService, useClass: CurrentsortServiceStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalvaluesComponent);
    component = fixture.componentInstance;
    component.extended = mockExtended;
    fixture.detectChanges();

    currentsortService = TestBed.inject(CurrentsortService);
  });

  describe('Component HTML', () => {

    describe('dps total value', () => {
      
      afterEach(() => {
        mockExtended['dps'] = null;
        mockExtended['dps_aug'] = null;
        fixture.detectChanges();
      });

      it('should not exist if extended.dps is null', () => {
        let dpsTotalEl = fixture.debugElement.query(By.css('.total-value'));

        expect(dpsTotalEl).toBeFalsy();
      });

      it('should auged class on the value span child if the dps_aug value is true', () => {
        mockExtended['dps'] = mockedValue;
        mockExtended['dps_aug'] = true;
        fixture.detectChanges();
        let dpsTotalEl = fixture.debugElement.query(By.css('.total-value'));
        let childValueSpan = dpsTotalEl.query(By.css('.auged'));

        expect(childValueSpan).toBeTruthy();
      });

      it('should contain the extended.dps value as text content', () => {
        mockExtended['dps'] = mockedValue;
        fixture.detectChanges();
        let dpsTotalEl = fixture.debugElement.query(By.css('.total-value'));

        expect(dpsTotalEl.nativeElement.textContent).toContain(mockedValue);
      });

      it('should call next on the currentValue behavior subject from the currentValue service with {sortKey: \'dps\'}', () => {
        mockExtended['dps'] = mockedValue;
        fixture.detectChanges();
        let dpsTotalEl = fixture.debugElement.query(By.css('.total-value'));
        spyOn(component.currentSort.currentSort, 'next');
        dpsTotalEl.triggerEventHandler('click', {});

        expect(component.currentSort.currentSort.next).toHaveBeenCalledWith({sortKey: 'dps'});
      });

      it('should not contain the sort arrow component if the currentSort serive currentSort.sortKey != \'dps\'',  () => {
        mockExtended['dps'] = mockedValue;
        component.currentSort.currentSort.next({sortKey: mockedValue, sortValue: 'asc'});
        fixture.detectChanges();
        let sortArrow = fixture.debugElement.query(By.css('item-sortarrow'));
        expect(sortArrow).toBeFalsy();
      });

      it('should set the sortValue of the sort arrow component to the currentSort.sortValue', async () => {
        mockExtended['dps'] = mockedValue;
        component.currentSort.currentSort.next({sortKey: 'dps', sortValue: 'asc'});
        fixture.detectChanges();
        let sortArrow = fixture.debugElement.query(By.css('item-sortarrow')).componentInstance as SortArrowStub;

        expect(sortArrow.sortValue).toEqual('asc');
      });
    });

    describe('edps total value', () => {
      
      afterEach(() => {
        mockExtended['edps'] = null;
        mockExtended['edps_aug'] = null;
        fixture.detectChanges();
      });

      it('should not exist if extended.edps is null', () => {
        let edpsTotalEl = fixture.debugElement.query(By.css('.total-value'));

        expect(edpsTotalEl).toBeFalsy();
      });

      it('should auged class on the value span child if the edps_aug value is true', () => {
        mockExtended['edps'] = mockedValue;
        mockExtended['edps_aug'] = true;
        fixture.detectChanges();
        let edpsTotalEl = fixture.debugElement.query(By.css('.total-value'));
        let childValueSpan = edpsTotalEl.query(By.css('.auged'));

        expect(childValueSpan).toBeTruthy();
      });

      it('should contain the extended.edps value as text content', () => {
        mockExtended['edps'] = mockedValue;
        fixture.detectChanges();
        let edpsTotalEl = fixture.debugElement.query(By.css('.total-value'));

        expect(edpsTotalEl.nativeElement.textContent).toContain(mockedValue);
      });

      it('should call next on the currentValue behavior subject from the currentValue service with {sortKey: \'edps\'}', () => {
        mockExtended['edps'] = mockedValue;
        fixture.detectChanges();
        let edpsTotalEl = fixture.debugElement.query(By.css('.total-value'));
        spyOn(component.currentSort.currentSort, 'next');
        edpsTotalEl.triggerEventHandler('click', {});

        expect(component.currentSort.currentSort.next).toHaveBeenCalledWith({sortKey: 'edps'});
      });

      it('should not contain the sort arrow component if the currentSort serive currentSort.sortKey != \'edps\'',  () => {
        mockExtended['edps'] = mockedValue;
        component.currentSort.currentSort.next({sortKey: mockedValue, sortValue: 'asc'});
        fixture.detectChanges();
        let sortArrow = fixture.debugElement.query(By.css('item-sortarrow'));
        expect(sortArrow).toBeFalsy();
      });

      it('should set the sortValue of the sort arrow component to the currentSort.sortValue', async () => {
        mockExtended['edps'] = mockedValue;
        component.currentSort.currentSort.next({sortKey: 'edps', sortValue: 'asc'});
        fixture.detectChanges();
        let sortArrow = fixture.debugElement.query(By.css('item-sortarrow')).componentInstance as SortArrowStub;

        expect(sortArrow.sortValue).toEqual('asc');
      });
    });

    describe('pdps total value', () => {
      
      afterEach(() => {
        mockExtended['pdps'] = null;
        mockExtended['pdps_aug'] = null;
        fixture.detectChanges();
      });

      it('should not exist if extended.pdps is null', () => {
        let pdpsTotalEl = fixture.debugElement.query(By.css('.total-value'));

        expect(pdpsTotalEl).toBeFalsy();
      });

      it('should auged class on the value span child if the pdps_aug value is true', () => {
        mockExtended['pdps'] = mockedValue;
        mockExtended['pdps_aug'] = true;
        fixture.detectChanges();
        let pdpsTotalEl = fixture.debugElement.query(By.css('.total-value'));
        let childValueSpan = pdpsTotalEl.query(By.css('.auged'));

        expect(childValueSpan).toBeTruthy();
      });

      it('should contain the extended.pdps value as text content', () => {
        mockExtended['pdps'] = mockedValue;
        fixture.detectChanges();
        let pdpsTotalEl = fixture.debugElement.query(By.css('.total-value'));

        expect(pdpsTotalEl.nativeElement.textContent).toContain(mockedValue);
      });

      it('should call next on the currentValue behavior subject from the currentValue service with {sortKey: \'pdps\'}', () => {
        mockExtended['pdps'] = mockedValue;
        fixture.detectChanges();
        let pdpsTotalEl = fixture.debugElement.query(By.css('.total-value'));
        spyOn(component.currentSort.currentSort, 'next');
        pdpsTotalEl.triggerEventHandler('click', {});

        expect(component.currentSort.currentSort.next).toHaveBeenCalledWith({sortKey: 'pdps'});
      });

      it('should not contain the sort arrow component if the currentSort serive currentSort.sortKey != \'pdps\'',  () => {
        mockExtended['pdps'] = mockedValue;
        component.currentSort.currentSort.next({sortKey: mockedValue, sortValue: 'asc'});
        fixture.detectChanges();
        let sortArrow = fixture.debugElement.query(By.css('item-sortarrow'));
        expect(sortArrow).toBeFalsy();
      });

      it('should set the sortValue of the sort arrow component to the currentSort.sortValue', async () => {
        mockExtended['pdps'] = mockedValue;
        component.currentSort.currentSort.next({sortKey: 'pdps', sortValue: 'asc'});
        fixture.detectChanges();
        let sortArrow = fixture.debugElement.query(By.css('item-sortarrow')).componentInstance as SortArrowStub;

        expect(sortArrow.sortValue).toEqual('asc');
      });
    });

    describe('ev total value', () => {
      
      afterEach(() => {
        mockExtended['ev'] = null;
        mockExtended['ev_aug'] = null;
        fixture.detectChanges();
      });

      it('should not exist if extended.ev is null', () => {
        let evTotalEl = fixture.debugElement.query(By.css('.total-value'));

        expect(evTotalEl).toBeFalsy();
      });

      it('should auged class on the value span child if the ev_aug value is true', () => {
        mockExtended['ev'] = mockedValue;
        mockExtended['ev_aug'] = true;
        fixture.detectChanges();
        let evTotalEl = fixture.debugElement.query(By.css('.total-value'));
        let childValueSpan = evTotalEl.query(By.css('.auged'));

        expect(childValueSpan).toBeTruthy();
      });

      it('should contain the extended.ev value as text content', () => {
        mockExtended['ev'] = mockedValue;
        fixture.detectChanges();
        let evTotalEl = fixture.debugElement.query(By.css('.total-value'));

        expect(evTotalEl.nativeElement.textContent).toContain(mockedValue);
      });

      it('should call next on the currentValue behavior subject from the currentValue service with {sortKey: \'ev\'}', () => {
        mockExtended['ev'] = mockedValue;
        fixture.detectChanges();
        let evTotalEl = fixture.debugElement.query(By.css('.total-value'));
        spyOn(component.currentSort.currentSort, 'next');
        evTotalEl.triggerEventHandler('click', {});

        expect(component.currentSort.currentSort.next).toHaveBeenCalledWith({sortKey: 'ev'});
      });

      it('should not contain the sort arrow component if the currentSort serive currentSort.sortKey != \'ev\'',  () => {
        mockExtended['ev'] = mockedValue;
        component.currentSort.currentSort.next({sortKey: mockedValue, sortValue: 'asc'});
        fixture.detectChanges();
        let sortArrow = fixture.debugElement.query(By.css('item-sortarrow'));
        expect(sortArrow).toBeFalsy();
      });

      it('should set the sortValue of the sort arrow component to the currentSort.sortValue', async () => {
        mockExtended['ev'] = mockedValue;
        component.currentSort.currentSort.next({sortKey: 'ev', sortValue: 'asc'});
        fixture.detectChanges();
        let sortArrow = fixture.debugElement.query(By.css('item-sortarrow')).componentInstance as SortArrowStub;

        expect(sortArrow.sortValue).toEqual('asc');
      });
    });

    describe('ar total value', () => {
      
      afterEach(() => {
        mockExtended['ar'] = null;
        mockExtended['ar_aug'] = null;
        fixture.detectChanges();
      });

      it('should not exist if extended.ar is null', () => {
        let arTotalEl = fixture.debugElement.query(By.css('.total-value'));

        expect(arTotalEl).toBeFalsy();
      });

      it('should auged class on the value span child if the ar_aug value is true', () => {
        mockExtended['ar'] = mockedValue;
        mockExtended['ar_aug'] = true;
        fixture.detectChanges();
        let arTotalEl = fixture.debugElement.query(By.css('.total-value'));
        let childValueSpan = arTotalEl.query(By.css('.auged'));

        expect(childValueSpan).toBeTruthy();
      });

      it('should contain the extended.ar value as text content', () => {
        mockExtended['ar'] = mockedValue;
        fixture.detectChanges();
        let arTotalEl = fixture.debugElement.query(By.css('.total-value'));

        expect(arTotalEl.nativeElement.textContent).toContain(mockedValue);
      });

      it('should call next on the currentValue behavior subject from the currentValue service with {sortKey: \'ar\'}', () => {
        mockExtended['ar'] = mockedValue;
        fixture.detectChanges();
        let arTotalEl = fixture.debugElement.query(By.css('.total-value'));
        spyOn(component.currentSort.currentSort, 'next');
        arTotalEl.triggerEventHandler('click', {});

        expect(component.currentSort.currentSort.next).toHaveBeenCalledWith({sortKey: 'ar'});
      });

      it('should not contain the sort arrow component if the currentSort serive currentSort.sortKey != \'ar\'',  () => {
        mockExtended['ar'] = mockedValue;
        component.currentSort.currentSort.next({sortKey: mockedValue, sortValue: 'asc'});
        fixture.detectChanges();
        let sortArrow = fixture.debugElement.query(By.css('item-sortarrow'));
        expect(sortArrow).toBeFalsy();
      });

      it('should set the sortValue of the sort arrow component to the currentSort.sortValue', async () => {
        mockExtended['ar'] = mockedValue;
        component.currentSort.currentSort.next({sortKey: 'ar', sortValue: 'asc'});
        fixture.detectChanges();
        let sortArrow = fixture.debugElement.query(By.css('item-sortarrow')).componentInstance as SortArrowStub;

        expect(sortArrow.sortValue).toEqual('asc');
      });
    });

    describe('es total value', () => {
      
      afterEach(() => {
        mockExtended['es'] = null;
        mockExtended['es_aug'] = null;
        fixture.detectChanges();
      });

      it('should not exist if extended.es is null', () => {
        let esTotalEl = fixture.debugElement.query(By.css('.total-value'));

        expect(esTotalEl).toBeFalsy();
      });

      it('should auged class on the value span child if the es_aug value is true', () => {
        mockExtended['es'] = mockedValue;
        mockExtended['es_aug'] = true;
        fixture.detectChanges();
        let esTotalEl = fixture.debugElement.query(By.css('.total-value'));
        let childValueSpan = esTotalEl.query(By.css('.auged'));

        expect(childValueSpan).toBeTruthy();
      });

      it('should contain the extended.es value as text content', () => {
        mockExtended['es'] = mockedValue;
        fixture.detectChanges();
        let esTotalEl = fixture.debugElement.query(By.css('.total-value'));

        expect(esTotalEl.nativeElement.textContent).toContain(mockedValue);
      });

      it('should call next on the currentValue behavior subject from the currentValue service with {sortKey: \'es\'}', () => {
        mockExtended['es'] = mockedValue;
        fixture.detectChanges();
        let esTotalEl = fixture.debugElement.query(By.css('.total-value'));
        spyOn(component.currentSort.currentSort, 'next');
        esTotalEl.triggerEventHandler('click', {});

        expect(component.currentSort.currentSort.next).toHaveBeenCalledWith({sortKey: 'es'});
      });

      it('should not contain the sort arrow component if the currentSort serive currentSort.sortKey != \'es\'',  () => {
        mockExtended['es'] = mockedValue;
        component.currentSort.currentSort.next({sortKey: mockedValue, sortValue: 'asc'});
        fixture.detectChanges();
        let sortArrow = fixture.debugElement.query(By.css('item-sortarrow'));
        expect(sortArrow).toBeFalsy();
      });

      it('should set the sortValue of the sort arrow component to the currentSort.sortValue', async () => {
        mockExtended['es'] = mockedValue;
        component.currentSort.currentSort.next({sortKey: 'es', sortValue: 'asc'});
        fixture.detectChanges();
        let sortArrow = fixture.debugElement.query(By.css('item-sortarrow')).componentInstance as SortArrowStub;

        expect(sortArrow.sortValue).toEqual('asc');
      });
    });
  });
});
