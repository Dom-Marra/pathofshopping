import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { currentSortProperties } from 'src/app/models/currentSortProperties';
import { parsedPropData } from 'src/app/models/parsedPropData';
import { CurrentsortService } from 'src/app/services/currentsort.service';

import { ItemRequirementsComponent } from './itemrequirements.component';

class CurrentsortServiceStub {
  public currentSort: BehaviorSubject<currentSortProperties> = new BehaviorSubject<currentSortProperties>({sortKey: '', sortValue: 'asc'});
}

@Component({selector: 'app-sortarrow'})
class SortArrowStub {
  @Input() sortValue: 'asc' | 'desc';
}

@Pipe({
  name: 'parseProps',
  pure: true
})
export class ParsePropsPipePipeStub implements PipeTransform {
  transform(props: any): Array<parsedPropData> { return [] }
}

describe('ItemRequirementsComponent', () => {
  let component: ItemRequirementsComponent;
  let fixture: ComponentFixture<ItemRequirementsComponent>;
  let mockItem ={ }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemRequirementsComponent, SortArrowStub, ParsePropsPipePipeStub ],
      providers: [
        {provide: CurrentsortService, useClass: CurrentsortServiceStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemRequirementsComponent);
    component = fixture.componentInstance;
    component.item = mockItem;
    fixture.detectChanges();
  });

  describe('Component HTML', () => {

    describe('Talisman Tier Element', () => {

      afterEach(() => {
        mockItem['talismanTier'] = null;
        fixture.detectChanges();
      });

      it('should not exist if the mockItem talismanTier is null', () => {
        let sortableDivs = fixture.debugElement.queryAll(By.css('.sortable'));
        expect(sortableDivs.length).toEqual(0);
      });

      it('should contain the talisman tier as text content', () => {
        mockItem['talismanTier'] = "Mock Value";
        fixture.detectChanges();
        let talismanTierDiv = fixture.debugElement.queryAll(By.css('.sortable'))[0];
        expect(talismanTierDiv.nativeElement.textContent).toContain("Mock Value");
      });

      it('should on click call next on the currentSort behaviorSubject with {sortKey: \'talisman_tier\'}', () => {
        spyOn(component.currentSort.currentSort, 'next');
        mockItem['talismanTier'] = "Mock Value";
        fixture.detectChanges();
        let talismanTierDiv = fixture.debugElement.queryAll(By.css('.sortable'))[0];
        talismanTierDiv.triggerEventHandler('click', {});
        expect(component.currentSort.currentSort.next).toHaveBeenCalledWith({sortKey: 'talisman_tier'});
      });

      it('should not have the sortarrow component if the currentSort sortKey != \'talisman_tier\'', () => {
        component.currentSort.currentSort.next({sortKey: '', sortValue: 'asc'});
        mockItem['talismanTier'] = "Mock Value";
        fixture.detectChanges();
        let talismanTierDiv = fixture.debugElement.queryAll(By.css('.sortable'))[0];
        expect(talismanTierDiv.query(By.css('app-sortarrow'))).toBeFalsy();
      });

      it('should set the sortarrow component sort value to the currentSort sortValue', () => {
        component.currentSort.currentSort.next({sortKey: 'talisman_tier', sortValue: 'asc'});
        mockItem['talismanTier'] = "Mock Value";
        fixture.detectChanges();
        let talismanTierDiv = fixture.debugElement.queryAll(By.css('.sortable'))[0];
        let sortarrow = talismanTierDiv.query(By.css('app-sortarrow')).componentInstance as SortArrowStub;
        expect(sortarrow.sortValue).toEqual('asc');
      });
    });

    describe('Item Level Element', () => {

      afterEach(() => {
        mockItem['ilvl'] = null;
        fixture.detectChanges();
      });

      it('should not exist if the mockItem ilvl is null', () => {
        let sortableDivs = fixture.debugElement.queryAll(By.css('.sortable'));
        expect(sortableDivs.length).toEqual(0);
      });

      it('should contain the ilvl as text content', () => {
        mockItem['ilvl'] = "Mock Value";
        fixture.detectChanges();
        let ilvlDiv = fixture.debugElement.queryAll(By.css('.sortable'))[0];
        expect(ilvlDiv.nativeElement.textContent).toContain("Mock Value");
      });

      it('should on click call next on the currentSort behaviorSubject with {sortKey: \'ilvl\'}', () => {
        spyOn(component.currentSort.currentSort, 'next');
        mockItem['ilvl'] = "Mock Value";
        fixture.detectChanges();
        let ilvlDiv = fixture.debugElement.queryAll(By.css('.sortable'))[0];
        ilvlDiv.triggerEventHandler('click', {});
        expect(component.currentSort.currentSort.next).toHaveBeenCalledWith({sortKey: 'ilvl'});
      });

      it('should not have the sortarrow component if the currentSort sortKey != \'ilvl\'', () => {
        component.currentSort.currentSort.next({sortKey: '', sortValue: 'asc'});
        mockItem['ilvl'] = "Mock Value";
        fixture.detectChanges();
        let ilvlDiv = fixture.debugElement.queryAll(By.css('.sortable'))[0];
        expect(ilvlDiv.query(By.css('app-sortarrow'))).toBeFalsy();
      });

      it('should set the sortarrow component sort value to the currentSort sortValue', () => {
        component.currentSort.currentSort.next({sortKey: 'ilvl', sortValue: 'asc'});
        mockItem['ilvl'] = "Mock Value";
        fixture.detectChanges();
        let ilvlDiv = fixture.debugElement.queryAll(By.css('.sortable'))[0];
        let sortarrow = ilvlDiv.query(By.css('app-sortarrow')).componentInstance as SortArrowStub;
        expect(sortarrow.sortValue).toEqual('asc');
      });
    });

    describe('Requirements Container', () => {
      const mockReq = ["Mock 1", "Mock 2", "Mock 3"];   //data is arbitrary

      afterEach(() => {
        mockItem['requirements'] = null;
        fixture.detectChanges();
      });

      beforeEach(() => {
        spyOn(ParsePropsPipePipeStub.prototype, 'transform').and.returnValue([
          {
            values: [
              {
                text: "Value 1",
                display: "value-1-display"
              }
            ],
            type: 1,
          },
          {
            values: [
              {
                text: "Value 2"
              }
            ]
          }
        ]);
      })

      it('does not exist if the item requirements are null', () => {
        expect(fixture.debugElement.query(By.css('.item-parsed-nested-list'))).toBeFalsy();
      });

      it('contains property divs with class \'sortable\' if the properties type is valid in PROP_VALUES', () => {
        mockItem['requirements'] = mockReq;
        fixture.detectChanges();
        let reqContainer = fixture.debugElement.query(By.css('.item-parsed-nested-list'));
        let props = reqContainer.queryAll(By.css('div'));

        expect(props[0].classes).toEqual(jasmine.objectContaining({'sortable': true}));
        expect(props[1].classes).not.toEqual(jasmine.objectContaining({'sortable': true}));
      });

      it('on property div click call next on the currentSort behaviorSubject with proper params if the property type is valid in PROP_VALUES', () => {
        spyOn(component.currentSort.currentSort, 'next');
        mockItem['requirements'] = mockReq;
        fixture.detectChanges();
        let reqContainer = fixture.debugElement.query(By.css('.item-parsed-nested-list'));
        let props = reqContainer.queryAll(By.css('div'));
        props[0].triggerEventHandler('click', {});

        expect(component.currentSort.currentSort.next).toHaveBeenCalledWith({sortKey: 'map_tier'});
      });

      it('on property div click call next on the currentSort behaviorSubject if the property type is not valid in PROP_VALUES', () => {
        spyOn(component.currentSort.currentSort, 'next');
        mockItem['requirements'] = mockReq;
        fixture.detectChanges();
        let reqContainer = fixture.debugElement.query(By.css('.item-parsed-nested-list'));
        let props = reqContainer.queryAll(By.css('div'));
        props[1].triggerEventHandler('click', {});

        expect(component.currentSort.currentSort.next).not.toHaveBeenCalled();
      });

      it('should contain value spans with the value display property prefixed with \'display-\'as a class', () => {
        mockItem['requirements'] = mockReq;
        fixture.detectChanges();
        let reqContainer = fixture.debugElement.query(By.css('.item-parsed-nested-list'));
        expect(reqContainer.queryAll(By.css('.display-value-1-display')).length).toEqual(1);
      });

      it('should contain proper text content for each property div', () => {
        mockItem['requirements'] = mockReq;
        fixture.detectChanges();
        let reqContainer = fixture.debugElement.query(By.css('.item-parsed-nested-list'));
        let props = reqContainer.queryAll(By.css('div'));

        expect(props[0].nativeElement.textContent).toContain("Value 1");
        expect(props[1].nativeElement.textContent).toContain("Value 2");
      });

      it('should not contain the sortarrow component in property divs where the currentSort sortKey does not equal its associated property value in PROP_VALUES', () => {
        component.currentSort.currentSort.next({sortKey: '', sortValue: 'asc'});
        mockItem['requirements'] = mockReq;
        fixture.detectChanges();
        let reqContainer = fixture.debugElement.query(By.css('.item-parsed-nested-list'));
        let props = reqContainer.queryAll(By.css('div'));

        expect(props[0].query(By.css('app-sortarrow'))).toBeFalsy();
        expect(props[1].query(By.css('app-sortarrow'))).toBeFalsy();
      });

      it('should set the sortarrow components sortValue to the currentSort sortValue', () => {
        component.currentSort.currentSort.next({sortKey: 'map_tier', sortValue: 'asc'});
        mockItem['requirements'] = mockReq;
        fixture.detectChanges();
        let reqContainer = fixture.debugElement.query(By.css('.item-parsed-nested-list'));
        let props = reqContainer.queryAll(By.css('div'));
        let sortarrow = props[0].query(By.css('app-sortarrow')).componentInstance as SortArrowStub;
        expect(sortarrow.sortValue).toEqual('asc');
      });
    });
  });
});
