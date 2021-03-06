import { HarnessLoader, TestKey } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ChangeDetectorRef, Component, DebugElement, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatIconHarness } from '@angular/material/icon/testing';
import { MatInputModule } from '@angular/material/input';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { currentSortProperties } from 'src/app/core/models/currentSortProperties';
import { simpleData } from 'src/app/core/models/simpleData';
import { CurrentsortService } from 'src/app/core/services/currentsort.service';
import { PoeService } from 'src/app/core/services/poe.service';
import { SimpleDataService } from 'src/app/core/services/simpledata.service';
import { ItemForm } from '../core/classes/itemform';
import { Results } from '../core/classes/results';
import { StatFilterForm } from '../core/classes/stat-filter-form';

import { ItemFormComponent } from './itemForm.component';

class SnackBarStub {
  public open(msg: string, action: string, options: MatSnackBarConfig) {}
}

class PoeServiceStub {
  public search(data: any, league: string) {
    return of({});
  }

  public getStatByID() { }
}

class CurrentsortServiceStub {
  public currentSort: BehaviorSubject<currentSortProperties> = new BehaviorSubject<currentSortProperties>(null);
}

class SimpleDataServiceStub {
  public filterSimpleData(searchText: string, values: Array<simpleData>) {}

  public displayByText(value: simpleData) {}

  public getSelectedValue(id: string, values: Array<simpleData>) {}
}

@Component({selector: 'app-searchselect', template: ''})
class SearchSelectStubComponent {                                     
  @Input() values: any;                                             
  @Input() groupOptions: any;
  @Input() autoCompleteClass: string;                  
  @Input() setValue: any;                                    
  @Input() placeholder: string;                   
  @Input() filterBy: any;        
  @Input() displayBy: any;      
  @Input() inputName: any;        
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();  
}

@Component({selector: 'pos-results', template: ''})
class ResultsComponent {
  @Input() results: any;
}

@Component({selector: 'itemForm-typefilters'})
class TypeFilterStub { @Input() queryForm: FormGroup; }

@Component({selector: 'itemForm-weaponfilters'})
class WeaponFiltersStub { @Input() weaponForm: FormGroup; }

@Component({selector: 'itemForm-armourfilters'})
class ArmourFiltersStub { @Input() armourForm: FormGroup; }

@Component({selector: 'itemForm-socketfilters'})
class SocketFiltersStub { @Input() socketForm: FormGroup; }

@Component({selector: 'itemForm-requirements'})
class RequiremntsStub { @Input() requirementsForm: FormGroup; }

@Component({selector: 'itemForm-mapfilters'})
class MapFiltersStub { @Input() mapForm: FormGroup; }

@Component({selector: 'itemForm-specialbases'})
class SpecialBasesStub { @Input() influenceForm: FormGroup; }

@Component({selector: 'itemForm-gemfilters'})
class GemFiltersStub { @Input() gemForm: FormGroup; }

@Component({selector: 'itemForm-otherfilters'})
class OtherFiltersStub { @Input() otherForm: FormGroup; }

@Component({selector: 'itemForm-tradefilters'})
class TradeFiltersStub { @Input() tradeForm: FormGroup; }

@Component({selector: 'itemForm-statfilters'})
class StatFiltersStub { 
  @Input() statFilter: FormGroup; 
  @Output() filterRemoved: EventEmitter<any> = new EventEmitter<any>();
}

describe('ItemFormComponent', () => {
  const mockLeague = 'Mock League';

  let component: ItemFormComponent;
  let fixture: ComponentFixture<ItemFormComponent>;
  let snackBar: MatSnackBar;
  let poeService: PoeService;
  let simpleDataService: SimpleDataService;
  let currentsortService: CurrentsortService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemFormComponent, SearchSelectStubComponent,
                      TypeFilterStub, WeaponFiltersStub, ArmourFiltersStub,
                      SocketFiltersStub, RequiremntsStub, MapFiltersStub,
                      SpecialBasesStub, GemFiltersStub, OtherFiltersStub,
                      TradeFiltersStub, StatFiltersStub, ResultsComponent 
                    ],
      providers: [
        {provide: MatSnackBar, useClass: SnackBarStub},
        {provide: PoeService, useClass: PoeServiceStub},
        {provide: SimpleDataService, useClass: SimpleDataServiceStub},
        {provide: CurrentsortService, useclass: CurrentsortServiceStub}
      ],
      imports: [ ReactiveFormsModule, MatFormFieldModule, NoopAnimationsModule, FormsModule, MatIconModule, MatInputModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemFormComponent);
    component = fixture.componentInstance;

    snackBar = TestBed.inject(MatSnackBar);
    poeService = TestBed.inject(PoeService);
    simpleDataService = TestBed.inject(SimpleDataService);
    currentsortService = TestBed.inject(CurrentsortService);

    component.league = mockLeague;
    component.itemForm = new ItemForm();

    fixture.detectChanges();
  });

  describe('Class Functions', () => {

    describe('itemNameInput value changes', () => {

      beforeEach(() => {
        component.editName = true;
      });

      it('should focus the inputName when editName becomes true', () => {
        const nativeElementSpy = jasmine.createSpyObj('nativeElement', ['focus']);
        const firstSpy = jasmine.createSpyObj('first', [], {nativeElement: nativeElementSpy});
        const spy = jasmine.createSpyObj('itemNameInput', [], {first: firstSpy});

        component.itemNameInput = spy;

        fixture.detectChanges();

        expect(nativeElementSpy.focus).toHaveBeenCalled();
      });

      it('should call change detections when editName becomes true', async () => {
        const cd = fixture.debugElement.injector.get(ChangeDetectorRef);
        spyOn(cd.constructor.prototype, 'detectChanges').and.callThrough();

        fixture.detectChanges();
        
        expect(cd.detectChanges).toHaveBeenCalled();
      });
    });

    describe('Currentsort service currentSort value change', () => {

      it('should call set setSortBy on the item', () => {
        spyOn(component.itemForm, 'setSortBy');
        currentsortService.currentSort.next({sortKey: 'key'});

        expect(component.itemForm.setSortBy).toHaveBeenCalledWith('key', undefined);
      });

      it('should set the sortValue of the current sort to the returned value of the setSortBy if its not null', () => {
        spyOn(component.itemForm, 'setSortBy').and.returnValue('asc');
        currentsortService.currentSort.next({sortKey: 'key', sortValue: 'desc'});

        expect(currentsortService.currentSort.value.sortValue).toEqual('asc');
      });
      
      it('should call queryIDs', () => {
        spyOn(component, 'queryIDs');
        currentsortService.currentSort.next({sortKey: 'key'});

        expect(component.queryIDs).toHaveBeenCalled();
      })
    });

    describe('queryIDs', () => {

      it('should use the PoeService search method', () => {
        spyOn(poeService, 'search').and.returnValue(of({}));
        component.queryIDs();

        expect(poeService.search).toHaveBeenCalled();
      });

      it('instantiates a new results object if the results of the search is valid', () => {
        component.itemForm.results = null;
        (component.itemForm.itemForm.get('queryForm.query.stats') as FormArray).push(new FormGroup({
          filters: new FormArray([ 
            new FormGroup({
              id: new FormControl('pseudo.stat')
            })
          ])
        }));

        const fetch = {
          result: [
            'Mock Res'
          ],
          total: 1,
          inexact: false,
          id: 'Mock'
        };

        spyOn(poeService, 'getStatByID').and.returnValue({type: 'pseudo', id: '', text: ''});
        spyOn(poeService, 'search').and.returnValue(of(fetch));
        component.queryIDs();

        expect(component.itemForm.results.fetchedResults).toEqual({
          pseudos: 'pseudos[]=pseudo.stat',
          result: fetch.result,
          total: fetch.total,
          inexact: fetch.inexact,
          id: fetch.id
        });
      });

      it('should set show results if the results of the search is valid', () => {
        const fetch = {
          result: [
            'Mock Res'
          ],
          total: 1,
          inexact: false,
          id: 'Mock'
        };

        spyOn(poeService, 'search').and.returnValue(of(fetch));
        component.queryIDs();

        expect(component.showResults).toBeTrue();
      });

      it('should open an error snackbar when the results are empty', () =>{
        const snackbarOptions = {
          panelClass: 'error-snack-bar',
          duration: 3000
        };

        const err = 'No results found. Please widen parameters';

        spyOn(poeService, 'search').and.returnValue(of({}));
        spyOn(snackBar, 'open');
        component.queryIDs();

        expect(snackBar.open).toHaveBeenCalledWith(err, 'close', snackbarOptions);
      });

      it('should open an error snackbar when there is an error with the search', () => {
        const snackbarOptions = {
          panelClass: 'error-snack-bar',
          duration: 3000
        };

        const err = 'Mock Error';

        spyOn(poeService, 'search').and.returnValue(throwError(err));
        spyOn(snackBar, 'open');
        component.queryIDs();

        expect(snackBar.open).toHaveBeenCalledWith(err, 'close', snackbarOptions);
      });
    })

    describe('addStatGroup method', () => {
      it('calls addStatFilterForm on the itemForm', () => {
        spyOn(component.itemForm, 'addStatFilterForm');
        component.addStatGroup();
        expect(component.itemForm.addStatFilterForm).toHaveBeenCalled();
      });
    });

    describe('removeStatFilter', () => {
      it('calls removeStatFilterForm on the itemForm', () => {
        spyOn(component.itemForm, 'removeStatFilterForm');
        component.removeStatFilter(new StatFilterForm());
        expect(component.itemForm.removeStatFilterForm).toHaveBeenCalled();
      });
    });

    describe('clear', () => {

      it('should call clear on the itemForm', () => {
        spyOn(component.itemForm, 'clear');
        component.clear();
        expect(component.itemForm.clear).toHaveBeenCalled();
      });

      it('should set the showResults to false', () => {
        component.clear();
        expect(component.showResults).toBe(false);
      });
    });

    describe('remove', () => {
      it('should emit remove event with the item data', () => {
        spyOn(component.deleteItem, 'emit');
        component.remove();
        expect(component.deleteItem.emit).toHaveBeenCalledWith(component.itemForm);
      });
    });
  });

  describe('Component HTML', () => {
    let matFormFieldHarness: MatFormFieldHarness;
    let matIconHarness: MatIconHarness;
    let matButtonHarness: MatButtonHarness;
    let loader: HarnessLoader;

    beforeEach(() => {
      loader = TestbedHarnessEnvironment.loader(fixture);
    });

    describe('delete button', () => {
      beforeEach(async () => {
        matButtonHarness = await loader.getHarness(MatButtonHarness);
        matIconHarness = await loader.getHarness(MatIconHarness);
      });

      it('should call remove on click', async () => {
        spyOn(component, 'remove');
        await matButtonHarness.click();

        expect(component.remove).toHaveBeenCalled();
      });

      it('should have the delete mat icon', async () => {
        let iconText = await matIconHarness.getName();

        expect(iconText).toEqual('delete');
      });
    });

    describe('Item Name', () => {

      it('should have the name header text to be the text of the itemname control if it has a value', () => {
        const name = 'Mock Name';
        component.itemForm.itemForm.controls.itemName.patchValue(name);
        fixture.detectChanges();
        let header = fixture.debugElement.query(By.css('.item-name')).query(By.css('h4'));
        let text = header.nativeElement.textContent;

        expect(text).toEqual(name);
      });

      it('should have the name header text to be \'Item Name\' if the itemname controls is empty', () => {
        const name = 'Item Name';
        component.itemForm.itemForm.controls.itemName.patchValue('');
        fixture.detectChanges();
        let header = fixture.debugElement.query(By.css('.item-name')).query(By.css('h4'));
        let text = header.nativeElement.textContent;

        expect(text).toEqual(name);
      });

      it('should not have the item-name element present if editName is true', () => {
        component.editName = true;
        fixture.detectChanges();
        let itemNameEl = fixture.debugElement.query(By.css('.item-name'));
        expect(itemNameEl).toBeFalsy();
      });

      
      it('should set editName to true on edit button click', async () => {
        matButtonHarness = (await loader.getAllHarnesses(MatButtonHarness))[1];
        await matButtonHarness.click();

        expect(component.editName).toBeTrue();
      });

      it('should have the edit icon in the edit button', async () => {
        matIconHarness = (await loader.getAllHarnesses(MatIconHarness))[1];
        expect(await matIconHarness.getName()).toEqual('edit');
      });

      it('should have the item-name-input element present if editName is true', () => {
        component.editName = true;
        fixture.detectChanges();
        let itemNameInpEl = fixture.debugElement.query(By.css('.item-name-input'));
        expect(itemNameInpEl).toBeTruthy();
      });

      it('should change the item name control value when the item name input changes', async () => {
        const name = 'Mock Name';
        component.editName = true;
        matFormFieldHarness = await loader.getHarness(MatFormFieldHarness);

        let input = await matFormFieldHarness.getControl() as MatInputHarness;
        await input.setValue(name);
        await input.blur();

        expect(component.itemForm.itemForm.value.itemName).toEqual(name);
      });

      it('should blur the name input on enter', async () => {
        component.editName = true;
        matFormFieldHarness = await loader.getHarness(MatFormFieldHarness);
        await (await (await matFormFieldHarness.getControl() as MatInputHarness).host()).sendKeys(TestKey.ENTER);

        expect(await (await matFormFieldHarness.getControl()).isFocused()).toBeFalse();
      }); 

      it('should set the editName to false on name input blur', async () => {
        component.editName = true;
        matFormFieldHarness = await loader.getHarness(MatFormFieldHarness);
        await (await matFormFieldHarness.getControl() as MatInputHarness).blur();

        expect(component.editName).toBeFalse();
      });

      it('should not have the item-name-input element present if the edit name value is false', () => {
        component.editName = false;
        fixture.detectChanges();
        let itemNameInputEl = fixture.debugElement.query(By.css('.item-name-input'));

        expect(itemNameInputEl).toBeFalsy();
      });
    });

    describe('filters', () => {
      let queryForm: FormGroup;
      let filterGroup: FormGroup;

      beforeEach(() => {
        queryForm = component.itemForm.itemForm.controls.queryForm as FormGroup;
        filterGroup = queryForm.get('query.filters') as FormGroup;
      });

      it('should use the query group as the queryForm input on the typefilters', () => {
        let typeFilterComp = fixture.debugElement.query(By.css('itemForm-typefilters')).componentInstance as TypeFilterStub;
        expect(typeFilterComp.queryForm).toEqual(queryForm.controls.query as FormGroup);
      });

      it('should use the weapon_filters form group as the weaponForm input on the weaponfilters', () => {
        let weaponFilterComp = fixture.debugElement.query(By.css('itemForm-weaponfilters')).componentInstance as WeaponFiltersStub;
        expect(weaponFilterComp.weaponForm).toEqual(filterGroup.controls.weapon_filters as FormGroup);
      });

      it('should use the socket_filters form group as the socketForm input on the socketFilters', () => {
        let socketFiltersComp = fixture.debugElement.query(By.css('itemForm-socketfilters')).componentInstance as SocketFiltersStub;
        expect(socketFiltersComp.socketForm).toEqual(filterGroup.controls.socket_filters as FormGroup);
      });

      it('should use the req_filters form group as the requirementsForm input on the requirements filter', () => {
        let reqComp = fixture.debugElement.query(By.css('itemForm-requirements')).componentInstance as RequiremntsStub;
        expect(reqComp.requirementsForm).toEqual(filterGroup.controls.req_filters as FormGroup);
      });

      it('should use the map_filters form group as the mapForm input on the mapfilters', () => {
        let mapFilterComp = fixture.debugElement.query(By.css('itemForm-mapfilters')).componentInstance as MapFiltersStub;
        expect(mapFilterComp.mapForm).toEqual(filterGroup.controls.map_filters as FormGroup);
      });

      it('should use the influenceForm group from the misc_filters as the influenceForm input on the specialbases component', () => {
        let specialbasesComp = fixture.debugElement.query(By.css('itemForm-specialbases')).componentInstance as SpecialBasesStub;
        expect(specialbasesComp.influenceForm).toEqual(component.itemForm.influenceForm);
      });

      it('should use the gemForm group from the misc_filters as the gemForm input on the gemfilters', () =>{
        let gemFiltersComp = fixture.debugElement.query(By.css('itemForm-gemfilters')).componentInstance as GemFiltersStub;
        expect(gemFiltersComp.gemForm).toEqual(component.itemForm.gemForm);
      });

      it('should use the otherFrom group from the misc_filters as the otherForm input on the otherFilters', () =>{
        let otherFiltersComp = fixture.debugElement.query(By.css('itemForm-otherfilters')).componentInstance as OtherFiltersStub;
        expect(otherFiltersComp.otherForm).toEqual(component.itemForm.otherForm);
      });

      it('should use the trade_filters form group as the tradeForm input on tradefilters', () => {
        let tradeFiltersComp = fixture.debugElement.query(By.css('itemForm-tradefilters')).componentInstance as TradeFiltersStub;
        expect(tradeFiltersComp.tradeForm).toEqual(filterGroup.controls.trade_filters as FormGroup);
      });

      it('should use a statfilter from stats from array as the statFilter input on the statfilters', () => {
        (queryForm.get('query.stats') as FormArray).push(new FormGroup({}));
        fixture.detectChanges();
        let statFilterComp = fixture.debugElement.query(By.css('itemForm-statfilters')).componentInstance as StatFiltersStub;
        expect(statFilterComp.statFilter).toEqual((queryForm.get('query.stats') as FormArray).controls[0] as FormGroup);
      });

      it('should call removeStatFilter when filterRemoved event is emitted from the statfilters comp', () => {
        spyOn(component, 'removeStatFilter');
        (queryForm.get('query.stats') as FormArray).push(new FormGroup({}));
        fixture.detectChanges();
        let statFilterComp = fixture.debugElement.query(By.css('itemForm-statfilters'));
        statFilterComp.triggerEventHandler('filterRemoved', (queryForm.get('query.stats') as FormArray).controls[0]);

        expect(component.removeStatFilter).toHaveBeenCalledWith((queryForm.get('query.stats') as FormArray).controls[0] as FormGroup);
      });
    });

    describe('add statgroup button', () => {

      beforeEach(async () => {
        matButtonHarness = (await loader.getAllHarnesses(MatButtonHarness))[2];
        matIconHarness = (await loader.getAllHarnesses(MatIconHarness))[2];
      });

      it('should call addStatGroup() on click', async () => {
        spyOn(component, 'addStatGroup');
        await matButtonHarness.click();
        expect(component.addStatGroup).toHaveBeenCalled();
      });

      it('should contain the library_add mat icon', async () => {
        expect(await matIconHarness.getName()).toEqual('library_add');
      });
    });

    describe('search button', () => {

      beforeEach(async () => {
        matButtonHarness = (await loader.getAllHarnesses(MatButtonHarness))[3];
        matIconHarness = (await loader.getAllHarnesses(MatIconHarness))[3];
      });

      it('should set the currentSort value with {sortKey: \'price\', sortValue: \'asc\'}', async () => {
        spyOn(currentsortService.currentSort, 'next');
        await matButtonHarness.click();

        expect(currentsortService.currentSort.next).toHaveBeenCalledWith({sortKey: 'price', sortValue: 'asc'});
      });

      it('should contain the search mat icon', async () => {
        expect(await matIconHarness.getName()).toEqual('search');
      });
    });

    describe('clear button', () => {

      beforeEach(async () => {
        matButtonHarness = (await loader.getAllHarnesses(MatButtonHarness))[4];
        matIconHarness = (await loader.getAllHarnesses(MatIconHarness))[4];
      });

      it('should call clear() on click', async () => {
        spyOn(component, 'clear');
        await matButtonHarness.click();

        expect(component.clear).toHaveBeenCalled();
      });

      it('should contian the clear mat icon', async () => {
        expect(await matIconHarness.getName()).toEqual('clear');
      });
    });

    describe('result show/hide button', () => {
      const mockFetchedData = {pseudos: 'Mock Value', result: ['Mock Res'], total: 1, inexact: true, id: 'MockId'};

      it('should not exist if showResult is false and the itemForm results is null', async () =>{
        component.showResults = false;
        component.itemForm.results = null;
        await expectAsync(loader.getHarness(MatButtonHarness.with({text: 'expand_less' + ('Show Results' || 'Hide Results')}))).toBeRejectedWithError();
      });

      it('should be present with text \'Hide Results\' if showResult istrue', async () => {
        component.showResults = true;
        component.itemForm.results = null;
        expect(await loader.getHarness(MatButtonHarness.with({text: 'expand_less' + 'Hide Results'}))).toBeTruthy();
      });

      it('should be present with text \'Show Results\' if showResult is false but the results is present', async () => {
        component.showResults = false;
        component.itemForm.results = new Results(mockFetchedData);
        expect(await loader.getHarness(MatButtonHarness.with({text: 'expand_less' + 'Show Results'}))).toBeTruthy();
      });

      it('should have the rotate class on the on the mat icon when showResult is false and the results is present', async () => {
        component.showResults = false;
        component.itemForm.results = new Results(mockFetchedData);
        let iconHost = await (await loader.getHarness(MatIconHarness.with({name: 'expand_less'}))).host();
        expect(await iconHost.hasClass('rotate')).toBeTrue();
      });

      it('should not have the rotate class on the mat icon when showResults is true', async () => {
        component.showResults = true;
        let iconHost = await (await loader.getHarness(MatIconHarness.with({name: 'expand_less'}))).host();
        expect(await iconHost.hasClass('rotate')).toBeFalse();
      });
    });

    describe('status search select', () => {

      it('should set the inputs correctly', () => {
        let searchSelectComp = fixture.debugElement.query(By.css('app-searchselect')).componentInstance as SearchSelectStubComponent;
        expect(searchSelectComp.autoCompleteClass).toEqual('autocomplete-panel-300');
        expect(searchSelectComp.inputName).toEqual('Status');
        expect(searchSelectComp.values).toEqual(component.statusOptions);
        expect(searchSelectComp.filterBy).toEqual(simpleDataService.filterSimpleData);
        expect(searchSelectComp.displayBy).toEqual(simpleDataService.displayByText);
        expect(searchSelectComp.setValue).toEqual(simpleDataService.getSelectedValue(component.itemForm.itemForm['controls'].queryForm['controls'].query['controls'].status['controls'].option.value, component.statusOptions));
      });

      it('should patch the status control to the value of the seleced event', () => {
        fixture.debugElement.query(By.css('app-searchselect')).triggerEventHandler('selected', {id: 'Mock Value'});
        fixture.detectChanges();
        expect(component.itemForm.itemForm.get('queryForm.query.status.option').value).toEqual('Mock Value');
      });
    });

    describe('results component', () => {

      it('should not exist if showResults is false', () => {
        component.showResults = false;
        fixture.detectChanges();
        let resultsDebEl = fixture.debugElement.query(By.css('pos-results'));
        expect(resultsDebEl).toBeFalsy();
      });

      it('should exist if showResults is true', () => {
        component.showResults = true;
        fixture.detectChanges();
        let resultsDebEl = fixture.debugElement.query(By.css('pos-results'));
        expect(resultsDebEl).toBeTruthy();
      });

      it('should set the correct values for the inputs', () => {
        component.showResults = true;
        fixture.detectChanges();
        let resultsComp = fixture.debugElement.query(By.css('pos-results')).componentInstance as ResultsComponent;

        expect(resultsComp.results).toEqual(component.itemForm.results);
      });
    });
  });
});
