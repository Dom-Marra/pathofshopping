import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressBarHarness } from '@angular/material/progress-bar/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { currentSortProperties } from 'src/app/models/currentSortProperties';
import { parsedPropData } from 'src/app/models/parsedPropData';
import { CurrentsortService } from 'src/app/services/currentsort.service';

import { AdditionalpropertiesComponent } from './additionalproperties.component';

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
class ParsePropsPipePipeStub implements PipeTransform {
  transform(props: any): Array<parsedPropData> { 
    return null;
  }
}

describe('AdditionalpropertiesComponent', () => {
  let component: AdditionalpropertiesComponent;
  let fixture: ComponentFixture<AdditionalpropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalpropertiesComponent, SortArrowStub, ParsePropsPipePipeStub ],
      providers: [
        {provide: CurrentsortService, useClass: CurrentsortServiceStub}
      ],
      imports: [ MatProgressBarModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalpropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component HTML', () => {

    describe('Property Div', () => {

      beforeEach(() => {
        spyOn(ParsePropsPipePipeStub.prototype, 'transform').and.returnValue([
          {
           values: [{text: "Mock Prop 1"}],
           type: 1,
          },
          {
            values: [{text: "Mock Prop 2"}]
          }
        ]);
        component.additionalProperties = ["1"];  //Value is arbitrary
        fixture.detectChanges();
      });

      afterEach(() => {
        component.additionalProperties = null;
        fixture.detectChanges();
      });

      it('has the sortable class if the prop type matches one in the PROP_VALUES', () => {
        let propDivs = fixture.debugElement.queryAll(By.css('div'));

        expect(propDivs[1].classes).toEqual(jasmine.objectContaining({'sortable': true}));
        expect(propDivs[2].classes).not.toEqual(jasmine.objectContaining({'sortable': true}));
      });

      it('on click call next on the currentValue with proper params if the prop type matches one in the PROP_VALUES', () => {
        spyOn(component.currentSort.currentSort, 'next');
        let propDivs = fixture.debugElement.queryAll(By.css('div'));
        propDivs[1].triggerEventHandler('click', {});

        expect(component.currentSort.currentSort.next).toHaveBeenCalledWith({sortKey: 'map_tier'});
      });

      it('on click does not call next on the currentValue if the prop type does not match in the PROP_VALUES', () => {
        spyOn(component.currentSort.currentSort, 'next');
        let propDivs = fixture.debugElement.queryAll(By.css('div'));
        propDivs[2].triggerEventHandler('click', {});

        expect(component.currentSort.currentSort.next).not.toHaveBeenCalled();
      });
    });

    describe('Property Value Spans', () => {

      beforeEach(() => {
        spyOn(ParsePropsPipePipeStub.prototype, 'transform').and.returnValue([
          {
           values: [{text: "Mock Value 1", display: "mock-value"}, {text: "Mock Value 2"}]
          }
        ]);
        component.additionalProperties = ["1"];  //Value is arbitrary
        fixture.detectChanges();
      });

      afterEach(() => {
        component.additionalProperties = null;
        fixture.detectChanges();
      });

      it('displays the value text property value', () => {
        let valueSpans = fixture.debugElement.queryAll(By.css('span'));

        expect(valueSpans[0].nativeElement.textContent).toContain("Mock Value 1");
        expect(valueSpans[1].nativeElement.textContent).toContain("Mock Value 2");
      });

      it('has the value display property prefixed with \'display-\' as a class', () => {
        let valueSpans = fixture.debugElement.queryAll(By.css('span'));

        expect(valueSpans[0].classes).toEqual(jasmine.objectContaining({'display-mock-value': true}));
      });
    });

    describe('Property sortarrow Component', () => {

      beforeEach(() => {
        spyOn(ParsePropsPipePipeStub.prototype, 'transform').and.returnValue([
          {
           values: [{text: ""}],
           type: 1
          },
          {
            values: [],
          }
        ]);
        component.additionalProperties = ["1"];  //Value is arbitrary
        fixture.detectChanges();
      });

      afterEach(() => {
        component.additionalProperties = null;
        fixture.detectChanges();
      });

      it('does not exist when the property types PROP_VALUE is not equal to the currentSort sortKey', () => {
        let sortArrowComps = fixture.debugElement.queryAll(By.css('app-sortarrow'));

        expect(sortArrowComps.length).toEqual(0);
      });

      it('has sortValue equal to the currentValue sortValue', () => {
        component.currentSort.currentSort.next({sortKey: 'map_tier', sortValue: 'asc'});
        fixture.detectChanges();
        let sortArrowComps = fixture.debugElement.query(By.css('app-sortarrow')).componentInstance as SortArrowStub;

        expect(sortArrowComps.sortValue).toEqual('asc');
      });
    });

    describe('Property Div progress bar', () => {
      let progressBar: Array<MatProgressBarHarness>;

      beforeEach(async () => {
        spyOn(ParsePropsPipePipeStub.prototype, 'transform').and.returnValue([
          {
           values: [{text: ""}],
           progress: 0.5
          },
          {
            values: [],
          }
        ]);

        component.additionalProperties = ["1"];                             //Value is arbitrary
        let loader = TestbedHarnessEnvironment.loader(fixture);
        progressBar = await loader.getAllHarnesses(MatProgressBarHarness);

        fixture.detectChanges();
      });

      afterEach(() => {
        component.additionalProperties = null;
        fixture.detectChanges();
      });

      it('does not exist when the property progress is null', () => {
        expect(progressBar.length).toEqual(1);
      });

      it('has value equal to the property progress * 100', async () => {
        expect(await progressBar[0].getValue()).toEqual(50);
      });
    });
  });
});
