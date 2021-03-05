import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { currentSortProperties } from 'src/app/models/currentSortProperties';
import { parsedPropData } from 'src/app/models/parsedPropData';
import { CurrentsortService } from 'src/app/services/currentsort.service';

import { PropertiesComponent } from './properties.component';

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
  transform(props: any): Array<parsedPropData> { 
    return [
      {
        values: [
          {
            text: "Mock Prop 1 Value 1",
            display: "mock-prop-1"
          },
          {
            text: ", "
          },
          {
            text: "Mock Prop 1 Value 2",
            display: "mock-prop-1"
          }
        ],
        type: 1
      },
      {
        values: [
          {
            text: "Mock Prop 2 Value 1",
            display: "mock-prop-2"
          }
        ]
      }
    ]
  }
}

describe('PropertiesComponent', () => {
  let component: PropertiesComponent;
  let fixture: ComponentFixture<PropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertiesComponent, ParsePropsPipePipeStub, SortArrowStub ],
      providers: [
        {provide: CurrentsortService, useClass: CurrentsortServiceStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesComponent);
    component = fixture.componentInstance;
    component.item = {
      properties: [],
      utilityMods: ["Utility 1", "Utility 2"]
    }
    fixture.detectChanges();
  });

  describe('Component HTML', () => {

    describe('Item properties', () => {
      
      it('should have the sortable class if the parsedPropData as a type', () => {
        let sortableProps = fixture.debugElement.queryAll(By.css('.sortable'));
        expect(sortableProps.length).toEqual(1);
      });

      it('calls next on click with proper parameters on the currentValue behaviorSubject if the prop.type exists in the PROP_VALUES', () => {
        spyOn(component.currentSort.currentSort, 'next');
        let props = fixture.debugElement.queryAll(By.css('div'));

        props[1].triggerEventHandler('click', {});
        //map_tier is the related prop value to the type in the clickable prop
        expect(component.currentSort.currentSort.next).toHaveBeenCalledWith({sortKey: 'map_tier'});
      });   

      it('does not call next on click on the currentValue behaviorSubject if the prop.type does not exist in the property', () => {
        spyOn(component.currentSort.currentSort, 'next');
        let props = fixture.debugElement.queryAll(By.css('div'));

        props[2].triggerEventHandler('click', {});
        expect(component.currentSort.currentSort.next).not.toHaveBeenCalled();
      })

      it('has the display value of each value as the class of the value span pefixed with \'display-\'', () => {
        let mockProp1Spans = fixture.debugElement.queryAll(By.css('.display-mock-prop-1'));
        let mockProp2Spans = fixture.debugElement.queryAll(By.css('.display-mock-prop-2'));

        expect(mockProp1Spans.length).toEqual(2);
        expect(mockProp2Spans.length).toEqual(1);
      });

      it('displays the correct text content', () => {
        let props = fixture.debugElement.queryAll(By.css('div'));

        expect(props[1].nativeElement.textContent).toContain('Mock Prop 1 Value 1, Mock Prop 1 Value 2');
        expect(props[2].nativeElement.textContent).toContain('Mock Prop 2 Value 1');
      });

      it('should contain the sortarrow component if the currentSort sortKey = props associated type', () => {
        component.currentSort.currentSort.next({sortKey: 'map_tier', sortValue: 'asc'});
        fixture.detectChanges();
        let prop = fixture.debugElement.query(By.css('.sortable'));
        let sortArrowComp = prop.query(By.css('app-sortarrow'));

        expect(sortArrowComp).toBeTruthy();
      });

      it('should not contain a sortarrow component if the currentSort sortKey does not = the propertys associated type', () => {
        component.currentSort.currentSort.next({sortKey: 'randomkey', sortValue: 'asc'});
        fixture.detectChanges();
        let divs = fixture.debugElement.queryAll(By.css('div'));
        let sortArrowComp = divs[2].query(By.css('app-sortarrow'));

        expect(sortArrowComp).toBeFalsy();
      });

      it('should set the sortValue input to the currentSort sortValue', () => {
        component.currentSort.currentSort.next({sortKey: 'map_tier', sortValue: 'asc'});
        fixture.detectChanges();
        let prop = fixture.debugElement.query(By.css('.sortable'));
        let sortArrowComp = prop.query(By.css('app-sortarrow')).componentInstance as SortArrowStub;

        expect(sortArrowComp.sortValue).toEqual('asc');
      });
    });

    describe('utility mods', () => {
      
      it('should contain mods equal to the number of utility mods', () => {
        let utilMods = fixture.debugElement.queryAll(By.css('.last'));
        expect(utilMods.length).toEqual(2);
      });

      it('has the value of the mod as the content for each utility mod div', () => {
        let utilMods = fixture.debugElement.queryAll(By.css('.last'));
        let utilModOne = utilMods[0];
        let utilModTwo = utilMods[1];

        expect(utilModOne.nativeElement.textContent).toEqual('Utility 1');
        expect(utilModTwo.nativeElement.textContent).toEqual('Utility 2');
      });
    })
  });
});
