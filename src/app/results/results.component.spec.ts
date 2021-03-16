import { Component, DebugElement, Input, KeyValueDiffers } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { PoeService } from 'src/app/core/services/poe.service';
import { MatPaginatorHarness } from '@angular/material/paginator/testing';
import { ResultsComponent } from './results.component';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Results } from '../core/classes/results';
import { FetchedProperties } from '../core/models/fetchedproperties.model';

class PoeServiceStub {
  public fetch(items: Array<string>, endingParams?: string) {
    return of([]);
  }
}

@Component({selector: 'pos-item', template: ''})
class ItemStubComponent {
  @Input() item: any;
  @Input() queryProps: FetchedProperties;
}

describe('ResultsComponent', () => {
  const mockFetchedResults: FetchedProperties = {
    pseudos: "MockPseudos",
    total: 1000,
    inexact: false,
    result: ["1", "2", "3", "4", "5", "6", "7", "8", "9",
          "10", "11", "12", "13", "14", "15", "16", "17", "18"],
    id: "MockID"
  };

  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;
  let results: Results;
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
    results = new Results(mockFetchedResults);

    component.results = results;
    fixture.detectChanges();
    poeService = TestBed.inject(PoeService);
  });

  describe('Class Functions', () => {

    describe('set results', () => {

      it('calls getItems and sets the _results variable', () => {
        spyOn(component, 'getItems');
        let results = new Results(mockFetchedResults);
        component.results = results;
        
        expect(component.getItems).toHaveBeenCalled();
        expect(component._results).toEqual(results);
      })
    });

    describe('ngAfterViewInit', () => {
      
      it('scrolls into view of the first paginator', () => {
        spyOn(component.itemsPaginatorsRef.first.nativeElement, "scrollIntoView");
        component.ngAfterViewInit();
        expect(component.itemsPaginatorsRef.first.nativeElement.scrollIntoView).toHaveBeenCalled();
      });
    });

    describe('getItems', () => {

      afterEach(() => {
        results.fetchedResults.result = ["1", "2", "3", "4", "5", "6", "7", "8", "9",
                                        "10", "11", "12", "13", "14", "15", "16", "17", "18"];
        results.retrievedItems = new Array<any>();
      });

      it('calls fetch on the PoeService with proper parameters', () => {
        spyOn(poeService, 'fetch').and.returnValue(of([]));
        results.fetchedResults.result = ["mock", "mock 2", "mock 3"];
        component.getItems();

        expect(poeService.fetch).toHaveBeenCalledWith(["mock", "mock 2", "mock 3"], "?query=MockID&MockPseudos");
      });

      it('calls addRetrievedItems with the items from the fetch on the results object', () => {
        spyOn(poeService, 'fetch').and.returnValue(of({
          result: ["fetched 1", "fetched 2", "fetched 3"]
        }));
        spyOn(results, 'addRetrievedItems');
        
        results.fetchedResults.result = ["fetched 1", "fetched 2", "fetched 3"];
        component.getItems();

        expect(results.addRetrievedItems).toHaveBeenCalledWith(["fetched 1", "fetched 2", "fetched 3"]);
      });

      it('does not call the fetch if the items have already been retrieved', () => {
        spyOn(poeService, 'fetch').and.returnValue(of([]));
        results.retrievedItems = [{id: "mock 1"} , {id: "mock 2"} , {id: "mock 3"}];
        results.fetchedResults.result = [ "mock 1" , "mock 2" , "mock 3"];
        component.getItems();

        expect(poeService.fetch).not.toHaveBeenCalled();
      });

      it('does not call the fetch if the results length is 0', () => {
        spyOn(poeService, 'fetch').and.returnValue(of([]));
        results.fetchedResults.result = [];
        component.getItems();

        expect(poeService.fetch).not.toHaveBeenCalled();
      });
    });

    describe('changeIndices', () => {
      const mockPageEvent = {pageIndex: 2, pageSize: null, previousPageIndex: null, length: null};

      afterEach(() => {
        results.setPageData(0);
      });

      it('calls setPageData with the pageEvent page index on the results object', () => {
        spyOn(results, 'setPageData');
        component.changeIndices(mockPageEvent);
        expect(results.setPageData).toHaveBeenCalledWith(mockPageEvent.pageIndex);
      });

      it('calls getItems', () => {
        spyOn(component, 'getItems');
        component.changeIndices(mockPageEvent);
        expect(component.getItems).toHaveBeenCalled();
      });
    });
  });

  describe('Component HTML', () => {

    describe('Main Container div', () => {

      afterEach(() => {
        component.inProgress = false;
      });

      it('does not exist if the inProgress is true', () => {
        component.inProgress = true;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.results-container'))).toBeFalsy();
      });

      it('exists when inProgres is false', () => {
        expect(fixture.debugElement.query(By.css('.results-container'))).toBeTruthy();
      });
    });

    describe('toolbar-text div', () => {
      let toolbar: DebugElement;

      afterEach(() => {
        results.fetchedResults.inexact = false;
      });

      beforeEach(() => {
        toolbar = fixture.debugElement.query(By.css('.toolbar-text'));
      });

      it('contains a span displaying the total amount of items found', () => {
        expect(toolbar.query(By.css('span')).nativeElement.textContent).toContain(results.fetchedResults.total);
      });

      it('does not contain the inexact span if the queryProps inexact value is false', () => {
        results.fetchedResults.inexact = false;
        fixture.detectChanges();
        expect(toolbar.query(By.css('.inexact'))).toBeFalsy();
      });

      it('contains the inexact span if the queryProps inexact value is true', () => {
        results.fetchedResults.inexact = true;
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

    describe('Item Component', () => {

      afterEach(() => {
        results.retrievedItems = new Array<any>();
        fixture.detectChanges();
      });

      it('has a total number of item components equal to the range of the resultData startIndex to endIndex', () => {
        results.retrievedItems = ["1", "2", "3", "4", "5", "6", "7", "8", "9",
                                    "10", "11", "12", "13", "14", "15", "16", "17", "18"];
         fixture.detectChanges();
        let itemComps = fixture.debugElement.queryAll(By.css('pos-item'));
        expect(itemComps.length).toEqual(10);
      });
      
      it('has inputs set properly', () => {
        results.retrievedItems = ["1", "2", "3", "4", "5", "6", "7", "8", "9",
                                    "10", "11", "12", "13", "14", "15", "16", "17", "18"];
         fixture.detectChanges();
        let itemComps = fixture.debugElement.queryAll(By.css('pos-item'));
        itemComps.forEach((itemComp, i) => {
          expect((itemComp.componentInstance as ItemStubComponent).item).toEqual(results.retrievedItems[i + results.pageData.startIndex]);
          expect((itemComp.componentInstance as ItemStubComponent).queryProps).toEqual(results.fetchedResults);
        })
      });
    });
  });
});
