import { Component, DebugElement, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Defaultvaluecontrol } from 'src/app/core/classes/defaultvaluecontrol';
import { poeCategorizedItems } from 'src/app/core/models/poeAPIItems';
import { simpleData } from 'src/app/core/models/simpleData';
import { PoeService } from 'src/app/core/services/poe.service';
import { SimpleDataService } from 'src/app/core/services/simpledata.service';
import { TypefiltersComponent } from './typefilters.component';

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
  @Input() clearOnFocus: boolean;
  @Input() clearable: boolean;
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();  
  @Output() cleared: EventEmitter<void> = new EventEmitter<void>();  
}

class SimpleDataServiceStub {
  public simpleTrueFalse = [{id: 'mockId', text: 'mock test'}];

  public filterSimpleData(searchText: string, values: Array<simpleData>) {}

  public displayByText(value: simpleData) {}

  public getSelectedValue(id: string, values: Array<simpleData>) {}
}

class MockPoeService {
  public items: Array<poeCategorizedItems> = [
    {
      label: 'Mock Category 1',
      entries: [
        {
          name: 'Mock Item 1',
          type: 'mock type 1',
          text: 'Mock ABC'
        },
        {
          name: 'Mock Item 2',
          type: 'mock type 1',
          text: 'Mock DEF'
        },
      ]
    },
    {
      label: 'Mock Category 2',
      entries: [
        {
          name: 'Mock Item 1',
          type: 'mock type 2',
          text: 'Mock GHI'
        },
        {
          name: 'Mock Item 2',
          type: 'mock type 2',
          text: 'Mock JKL'
        },
      ]
    }
  ];

  public getItems(): Array<poeCategorizedItems> {
    return this.items;
  }
}

describe('TypefiltersComponent', () => {
  const mockQueryForm = new FormGroup({
    name: new FormControl(''),
    term: new FormControl(''),
    type: new FormControl(''),
    filters: new FormGroup({
      type_filters: new FormGroup({
        filters: new FormGroup({
            category: new FormGroup({
              option: new Defaultvaluecontrol('', '')
            }),
            rarity: new FormGroup({
              option: new Defaultvaluecontrol('', '')
            }),
        })
      })
    })
  });

  let component: TypefiltersComponent;
  let fixture: ComponentFixture<TypefiltersComponent>;
  let simpleDataService: SimpleDataService;
  let poeService: PoeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypefiltersComponent, SearchSelectStubComponent ],
      imports:  [ NoopAnimationsModule, MatAutocompleteModule, ReactiveFormsModule, FormsModule ],
      providers: [
        {provide: SimpleDataService, useClass: SimpleDataServiceStub },
        {provide: PoeService, useClass: MockPoeService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypefiltersComponent);
    component = fixture.componentInstance;
    component.queryForm = mockQueryForm;
    fixture.detectChanges();
    simpleDataService = TestBed.inject(SimpleDataService);
    poeService = TestBed.inject(PoeService);
  });

  describe('Component HTML', () => {

    describe('Search Items searchselect', () => {
      let searchselect: DebugElement;

      beforeEach(() => {
        searchselect = fixture.debugElement.queryAll(By.css('app-searchselect'))[0];
      });

      it('should set inputs correctly', () => {
        let searchSelectComp = searchselect.componentInstance as SearchSelectStubComponent;

        expect(searchSelectComp.values).toEqual(component.itemsToSearch);
        expect(searchSelectComp.filterBy.toString()).toEqual(component.filterGroups.bind(component).toString());
        expect(searchSelectComp.displayBy).toEqual(component.displayItemBy);
        expect(searchSelectComp.setValue).toEqual({
          name:  component.queryForm.controls.name.value,
          type:  component.queryForm.controls.type.value,
          text:  component.queryForm.controls.term.value ? component.queryForm.controls.term.value : 
                (component.queryForm.controls.name.value ? component.queryForm.controls.name.value + ' ' : '') + 
                (component.queryForm.controls.type.value ? component.queryForm.controls.type.value : '')
        });
        expect(searchSelectComp.inputName).toEqual('Search Items');
        expect(searchSelectComp.clearable).toEqual(true);
        expect(searchSelectComp.clearOnFocus).toEqual(false);
        expect(searchSelectComp.groupOptions).toEqual({groupedBy: 'label', groupedInto: 'entries'});
      });

      it('should call setNTT with correct paramaters on selected event', () => {
        spyOn(component, 'setNTT');
        searchselect.triggerEventHandler('selected', {name: 'Mock Select', text: 'Mock Text', type: 'Mock Type'});

        expect(component.setNTT).toHaveBeenCalledWith('Mock Select', 'Mock Type', 'Mock Text');
      });

      it('should call setNTT with empty strings on cleared event', () => {
        spyOn(component, 'setNTT');
        searchselect.triggerEventHandler('cleared', {});

        expect(component.setNTT).toHaveBeenCalledWith('', '', '');
      });
    });

    describe('Item Rarity searchselect', () => {
      let searchselect: DebugElement;

      beforeEach(() => {
        searchselect = fixture.debugElement.queryAll(By.css('app-searchselect'))[1];
      });

      it('should set inputs correctly', () => {
        let searchSelectComp = searchselect.componentInstance as SearchSelectStubComponent;

        expect(searchSelectComp.values).toEqual(component.itemRarities);
        expect(searchSelectComp.filterBy).toEqual(simpleDataService.filterSimpleData);
        expect(searchSelectComp.displayBy).toEqual(simpleDataService.displayByText);
        expect(searchSelectComp.setValue).toEqual(simpleDataService.getSelectedValue(component.queryForm.get('filters.type_filters.filters.rarity.option').value, component.itemRarities));
        expect(searchSelectComp.inputName).toEqual('Item Rarity');
      });

      it('should patch the rarities option control on selected', () => {
        searchselect.triggerEventHandler('selected', {id: 'Mock Id'});

        expect(component.queryForm.get('filters.type_filters.filters.rarity.option').value).toEqual('Mock Id');
      });
    });

    describe('Item Type searchselect', () => {
      let searchselect: DebugElement;

      beforeEach(() => {
        searchselect = fixture.debugElement.queryAll(By.css('app-searchselect'))[2];
      });

      it('should set inputs correctly', () => {
        let searchSelectComp = searchselect.componentInstance as SearchSelectStubComponent;

        expect(searchSelectComp.values).toEqual(component.itemTypes);
        expect(searchSelectComp.filterBy).toEqual(simpleDataService.filterSimpleData);
        expect(searchSelectComp.displayBy).toEqual(simpleDataService.displayByText);
        expect(searchSelectComp.setValue).toEqual(simpleDataService.getSelectedValue(component.queryForm.get('filters.type_filters.filters.category.option').value, component.itemTypes));
        expect(searchSelectComp.inputName).toEqual('Item Type');
      });

      it('should patch the rarities option control on selected', () => {
        searchselect.triggerEventHandler('selected', {id: 'Mock Id'});

        expect(component.queryForm.get('filters.type_filters.filters.category.option').value).toEqual('Mock Id');
      });
    });

    describe('class functions', () => {

      describe('construction', () => {
        it('should call getItems on the PoeService', () => {
          spyOn(poeService, 'getItems');
          component = new TypefiltersComponent(TestBed.inject(PoeService), TestBed.inject(SimpleDataService));
          expect(poeService.getItems).toHaveBeenCalled();
        });
      });

      describe('displayItemBy', () => {
        it('should return the item text', () => {
          expect(component.displayItemBy({name: '', type: '', text: 'Mock Text'})).toEqual('Mock Text');
        });
      });

      describe('setNTT', () => {

        it('should set the term control to \'\' if the type is included as paramaters', () => {
          component.setNTT('', 'Mock Type', 'Mock Text');

          expect(component.queryForm.controls.term.value).toEqual('');
        });

        it('should set the term control to \'\' if the name is included as paramaters', () => {
          component.setNTT('Mock Name', '', 'Mock Text');

          expect(component.queryForm.controls.term.value).toEqual('');
        });

        it('should set the term control to the text parameter if the type and name is not included', () => {
          component.setNTT('', '', 'Mock Text');

          expect(component.queryForm.controls.term.value).toEqual('Mock Text');
        });

        it('should set the type and name controls to the name and type values provided', () => {
          component.setNTT('Mock Name', 'Mock Type', '');

          expect(component.queryForm.controls.name.value).toEqual('Mock Name');
          expect(component.queryForm.controls.type.value).toEqual('Mock Type');
        })
      });

      describe('filterGroups', () => {

        it('should return all values back on empty search', () => {
          expect(component.filterGroups('', poeService.getItems())).toEqual(poeService.getItems());
        });

        it('should properly filter items', () => {
          const expectedResults: Array<poeCategorizedItems> = [
            {
              label: 'Mock Category 1',
              entries: [
                {
                  name: 'Mock Item 1',
                  type: 'mock type 1',
                  text: 'Mock ABC'
                }
              ]
            }
          ];

          expect(component.filterGroups('Mock ABC', poeService.getItems())).toEqual(expectedResults);
        });

        it('should set the customItemSearch item text to the searchText', () => {
          component.filterGroups('Mock Text', poeService.getItems());
          expect(component.customItemSearch.entries[0].text).toEqual('Mock Text');
        });

        it('should include the customItemSearch when an exact match is not found', () => {
          expect(component.filterGroups('Mock', poeService.getItems())).toEqual(jasmine.arrayContaining([component.customItemSearch]));
        });

        it('should not include the customItemSearch when an exact match is found', () => {
          expect(component.filterGroups('Mock ABC', poeService.getItems())).not.toEqual(jasmine.arrayContaining([component.customItemSearch]));
        })
      });
    });
  });
});
