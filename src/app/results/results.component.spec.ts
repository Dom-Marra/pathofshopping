import { Component, DebugElement, Input, KeyValueDiffers } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Resultdata } from 'src/app/classes/resultdata/resultdata';
import { PoeService } from 'src/app/services/poe.service';
import { MatPaginatorHarness } from '@angular/material/paginator/testing';
import { ResultsComponent } from './results.component';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

class PoeServiceStub {
  public fetch(items: Array<string>, endingParams?: string) {
    return of({});
  }
}

@Component({selector: 'item-item', template: ''})
class ItemStubComponent {
  @Input() item: any;
}

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;
  let mockResultData: Resultdata = new Resultdata();
  let poeService: PoeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsComponent, ItemStubComponent ],
      providers: [
        {provide: PoeService, useClass: PoeServiceStub},
        KeyValueDiffers
      ],
      imports: [ MatProgressBarModule, MatPaginatorModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    mockResultData.endIndex = 10;
    mockResultData.startIndex = 0;
    mockResultData.queryProps = {
      psuedos: "MockPseudos",
      total: 1000,
      inexact: false,
      res: ["1", "2", "3", "4", "5", "6", "7", "8", "9",
            "10", "11", "12", "13", "14", "15", "16", "17", "18"],
      id: "MockID"
    };

    component.resultData = mockResultData;
    fixture.detectChanges();
    poeService = TestBed.inject(PoeService);
  });

  describe('Class Functions', () => {

    describe('ngOnInit', () => {

      it('calls getItems if the resultData retrievedItems length is 0 and it has results in the queryProps', () => {
        spyOn(component, 'getItems');
        mockResultData.retrievedItems = [];
        fixture.detectChanges();
        component.ngOnInit();
        expect(component.getItems).toHaveBeenCalled();
      });
    });

    describe('ngAfterViewInit', () => {
      
      it('scrolls into view of the first paginator', () => {
        spyOn(component.itemsPaginatorsRef.first.nativeElement, "scrollIntoView");
        component.ngAfterViewInit();
        expect(component.itemsPaginatorsRef.first.nativeElement.scrollIntoView).toHaveBeenCalled();
      });
    });

    describe('ngDoCheck', () => {

      afterEach(() => {
        mockResultData.queryProps.res = ["1", "2", "3", "4", "5", "6", "7", "8", "9",
                                        "10", "11", "12", "13", "14", "15", "16", "17", "18"]
      });

      it('resets resultData queryData when the queryProps res value changes', () => {
        spyOn(component, 'getItems');
        mockResultData.queryData = ["MockValue"];
        mockResultData.queryProps.res = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
        fixture.detectChanges();
        component.ngDoCheck();
        expect(mockResultData.queryData).toEqual([]);
      });

      it('resets resultData retrievedItems when the queryProps res value changes', () => {
        spyOn(component, 'getItems');
        mockResultData.retrievedItems = ["MockValue"];
        mockResultData.queryProps.res = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
        fixture.detectChanges();
        component.ngDoCheck();
        expect(mockResultData.retrievedItems).toEqual([]);
      });

      it('calls firstPage on the paginators when the queryProps res value changes', () => {
        spyOn(component.itemsPaginators.first, 'firstPage');
        spyOn(component.itemsPaginators.last, 'firstPage');
        mockResultData.queryProps.res = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
        fixture.detectChanges();
        component.ngDoCheck();
        expect(component.itemsPaginators.first.firstPage).toHaveBeenCalled();
        expect(component.itemsPaginators.last.firstPage).toHaveBeenCalled();
      });

      it('calls getItems when the queryProps res value changes', () => {
        spyOn(component, 'getItems');
        mockResultData.queryProps.res = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
        fixture.detectChanges();
        component.ngDoCheck();

        expect(component.getItems).toHaveBeenCalled();
      });
    }); 

    describe('getItems', () => {

      afterEach(() => {
        mockResultData.queryProps.res = ["1", "2", "3", "4", "5", "6", "7", "8", "9",
                                        "10", "11", "12", "13", "14", "15", "16", "17", "18"];
        mockResultData.retrievedItems = [];
        mockResultData.queryData = [];
      });

      it('calls fetch on the PoeService with proper parameters', () => {
        spyOn(poeService, 'fetch').and.returnValue(of({}));
        mockResultData.queryProps.res = ["mock", "mock 2", "mock 3"];
        component.getItems();

        expect(poeService.fetch).toHaveBeenCalledWith(["mock", "mock 2", "mock 3"], "?query=MockID&MockPseudos");
      });

      it('adds the results of the fetch to the resultData queryData', () => {
        spyOn(poeService, 'fetch').and.returnValue(of({
          result: ["mock 1", "mock 2", "mock 3"]
        }));
        mockResultData.queryData = [];
        mockResultData.queryProps.res = ["mock 1", "mock 2", "mock 3"];
        component.getItems();

        expect(component.resultData.queryData).toEqual(["mock 1", "mock 2", "mock 3"]);
      });

      it('adds the item IDs passed to the fetch into the resultData retrieved items', () => {
        spyOn(poeService, 'fetch').and.returnValue(of({}));
        mockResultData.retrievedItems = [];
        mockResultData.queryProps.res = ["mock", "mock 2", "mock 3"];
        component.getItems();

        expect(component.resultData.retrievedItems).toEqual(["mock", "mock 2", "mock 3"]);
      });

      it('does not call the fetch if the items have already been retrieved', () => {
        spyOn(poeService, 'fetch').and.returnValue(of({}));
        mockResultData.retrievedItems = ["mock", "mock 2", "mock 3"];
        mockResultData.queryProps.res = ["mock", "mock 2", "mock 3"];
        component.getItems();

        expect(poeService.fetch).not.toHaveBeenCalled();
      });

      it('does not call the fetch if the results length is 0', () => {
        spyOn(poeService, 'fetch').and.returnValue(of({}));
        mockResultData.queryProps.res = [];
        component.getItems();

        expect(poeService.fetch).not.toHaveBeenCalled();
      });
    });

    describe('changeIndices', () => {

      afterEach(() => {
        mockResultData.endIndex = 10;
        mockResultData.startIndex = 0;
        mockResultData.pageIndex = 0;
      });

      it('properly updates resultData startIndex, endIndex, and pageIndex', () => {
        component.changeIndices({pageIndex: 2});
        expect(component.resultData.pageIndex).toEqual(2);
        expect(component.resultData.startIndex).toEqual(20);
        expect(component.resultData.endIndex).toEqual(30);
      });

      it('calls getItems', () => {
        spyOn(component, 'getItems');
        component.changeIndices({pageIndex: 0});
        expect(component.getItems).toHaveBeenCalled();
      });
    });
  });

  describe('Component HTML', () => {

    describe('Main Container div', () => {

      afterEach(() => {
        component.inProgress = false;
        mockResultData.queryProps = {
          psuedos: "MockPseudos",
          total: 1000,
          inexact: false,
          res: ["1", "2", "3", "4", "5", "6", "7", "8", "9",
                "10", "11", "12", "13", "14", "15", "16", "17", "18"],
          id: "MockID"
        };
      });

      it('does not exist if the inProgress is true', () => {
        component.inProgress = true;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.results-container'))).toBeFalsy();
      });

      it('does not exist if the queryProps is null', () => {
        mockResultData.queryProps = null;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.results-container'))).toBeFalsy();
      });

      it('exists when both inProgres is false and there are queryProps', () => {
        expect(fixture.debugElement.query(By.css('.results-container'))).toBeTruthy();
      });
    });

    describe('toolbar-text div', () => {
      let toolbar: DebugElement;

      beforeEach(() => {
        toolbar = fixture.debugElement.query(By.css('.toolbar-text'));
      });

      it('contains a span displaying the total amount of items found', () => {
        expect(toolbar.query(By.css('span')).nativeElement.textContent).toContain(mockResultData.queryProps.total);
      });

      it('does not contain the inexact span if the queryProps inexact value is false', () => {
        mockResultData.queryProps.inexact = false;
        fixture.detectChanges();
        expect(toolbar.query(By.css('.inexact'))).toBeFalsy();
      });

      it('contains the inexact span if the queryProps inexact value is true', () => {
        mockResultData.queryProps.inexact = true;
        fixture.detectChanges();
        expect(toolbar.query(By.css('.inexact'))).toBeTruthy();
      });
    });

    describe('Mat Paginators', () => {
      let paginator: Array<MatPaginatorHarness>;

      beforeEach(async () => {
        let loader = TestbedHarnessEnvironment.loader(fixture);
        paginator = await loader.getAllHarnesses(MatPaginatorHarness);
      });

      it('on page change should call changeIndices', async () => {
        spyOn(component, 'changeIndices');

        await paginator[0].goToNextPage();
        expect(component.changeIndices).toHaveBeenCalled();
        await paginator[1].goToNextPage();
        expect(component.changeIndices).toHaveBeenCalled();
      });
    });
  });
});
