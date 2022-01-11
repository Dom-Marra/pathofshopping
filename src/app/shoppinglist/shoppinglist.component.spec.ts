import { ChangeDetectorRef, Component, DebugElement, EventEmitter, Input, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogActions } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SavedialogComponent } from 'src/app/shoppinglist/components/savedialog/savedialog.component';
import { itemSaveData } from 'src/app/core/models/item-save-data.model';
import { shoppingListSaveData } from 'src/app/core/models/shopping-list-save-data';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { PoeService } from 'src/app/core/services/poe.service';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatTabGroupHarness } from '@angular/material/tabs/testing';
import { ShoppinglistComponent } from './shoppinglist.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { simpleData } from 'src/app/core/models/simpleData';
import { SimpleDataService } from 'src/app/core/services/simpledata.service';
import { ItemForm } from 'src/app/core/classes/itemform';

class MockPoeService {
    public loaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public leagues: Array<simpleData> = [{ id: 'Ritual', text: 'Ritual' }];

    public getLeagues(): Array<simpleData> {
        return this.leagues;
    }
}

class MockSimpleDataService {
    public filterSimpleData(searchText: string, values: Array<simpleData>): Array<simpleData> {
        return []
    }

    public displayByText(value: simpleData): simpleData {
        return null;
    }

    public getSelectedValue(id: string, values: Array<simpleData>): simpleData {
        return null;
    }
}

class MockMatDialog {
    public open(component: Component, option: MatDialogActions) { }
}

class MockSnackBar {
    public open(msg: string, action: string, options: MatSnackBarConfig) { }
}

@Component({ selector: 'app-searchselect', template: '' })
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

@Component({ selector: 'pos-itemForm', template: '' })
class ItemFormStubComponent {
    @Input() itemForm: ItemForm;
    @Input() league: string;
    @Output() deleteItem: EventEmitter<ItemForm> = new EventEmitter<ItemForm>();
}

describe('ShoppinglistComponent', () => {
    let component: ShoppinglistComponent;
    let poeService: PoeService;
    let activeRoute: ActivatedRoute;
    let fireService: FirebaseService;
    let snackBar: MatSnackBar;
    let matDialog: MatDialog;
    let fixture: ComponentFixture<ShoppinglistComponent>;
    let stubSimpleDataService: SimpleDataService;

    const firebaseServiceSpy = jasmine.createSpyObj('FirebaseService', ['getShoppingList', 'addShoppingList']);

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ShoppinglistComponent, ItemFormStubComponent, SearchSelectStubComponent],
            providers: [
                ShoppinglistComponent,
                { provide: PoeService, useClass: MockPoeService },
                ChangeDetectorRef,
                { provide: FirebaseService, useValue: firebaseServiceSpy },
                { provide: MatDialog, useClass: MockMatDialog },
                { provide: MatSnackBar, useClass: MockSnackBar },
                { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap: convertToParamMap(null) } } },
                { provide: SimpleDataService, useClass: MockSimpleDataService }
            ],
            imports: [ReactiveFormsModule, MatTabsModule, NoopAnimationsModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ShoppinglistComponent);
        component = fixture.componentInstance;
        poeService = TestBed.inject(PoeService);
        fireService = TestBed.inject(FirebaseService);
        snackBar = TestBed.inject(MatSnackBar);
        activeRoute = TestBed.inject(ActivatedRoute);
        matDialog = TestBed.inject(MatDialog);
        stubSimpleDataService = TestBed.inject(SimpleDataService);
        fixture.detectChanges();
    });

    describe('Class Functions', () => {

        describe('PoeService loaded currently false', () => {
            it('should have poeLoading true while PoeService is not loaded', () => {
                expect(component.poeLoading).toEqual(true);
            });
        });

        describe('PoeService loaded throws an error', () => {
            const mockErrorMsg = 'Mock Error';

            beforeEach(() => {
                poeService.loaded.error(mockErrorMsg);
                fixture.detectChanges();
            });

            it('should set errMsg', () => {
                expect(component.errMsg).toEqual(mockErrorMsg);
            });
        })


        describe('PoeService loaded value becomes true', () => {

            it('should set poeLoading to false', () => {
                poeService.loaded.next(true);
                expect(component.poeLoading).toEqual(false);
            });

            it('should set leagues', () => {
                poeService.loaded.next(true);
                expect(component.leagues).toEqual(poeService.getLeagues());
            });

            it('should patch the league control value to the first league id if the value is empty', () => {
                let leagueControl = component.shoppingList.controls.league;
                const firstLeague = poeService.getLeagues()[0].id;

                leagueControl.patchValue(null);

                poeService.loaded.next(true);
                expect(leagueControl.value).toEqual(firstLeague);
            });
        });

        describe('No Query Params Provided', () => {
            it('should call addItem', () => {
                spyOn(ShoppinglistComponent.prototype, 'addItem');
                let component = new ShoppinglistComponent(TestBed.inject(ChangeDetectorRef),
                    TestBed.inject(PoeService),
                    TestBed.inject(FirebaseService),
                    TestBed.inject(ActivatedRoute),
                    TestBed.inject(MatDialog),
                    TestBed.inject(MatSnackBar),
                    TestBed.inject(SimpleDataService));
                expect(component.addItem).toHaveBeenCalled();
            });
        });

        describe('When Query Params are provided', () => {
            const mockListID = 'mockList';

            beforeEach(() => {
                activeRoute.snapshot = {
                    url: null,
                    params: null,
                    queryParams: null,
                    fragment: null,
                    data: null,
                    outlet: null,
                    component: null,
                    routeConfig: null,
                    root: null,
                    parent: null,
                    firstChild: null,
                    children: null,
                    pathFromRoot: null,
                    paramMap: null,
                    queryParamMap: convertToParamMap({ list: mockListID })
                };
            });

            it('should call the load method', () => {
                spyOn(ShoppinglistComponent.prototype, 'load');
                let component = new ShoppinglistComponent(TestBed.inject(ChangeDetectorRef),
                    TestBed.inject(PoeService),
                    TestBed.inject(FirebaseService),
                    TestBed.inject(ActivatedRoute),
                    TestBed.inject(MatDialog),
                    TestBed.inject(MatSnackBar),
                    TestBed.inject(SimpleDataService));
                expect(component.load).toHaveBeenCalledWith(mockListID);
            });
        });

        describe('load method', () => {

            const mockListID = 'mockList';
            const mockList: shoppingListSaveData = {
                league: 'Ritual',
                name: 'Mock List',
                savedItems: [
                    {
                        itemName: 'Mock Item',
                        queryForm: {
                            query: {
                                name: '',
                                term: '',
                                type: '',
                                status: {
                                    option: 'online'
                                }
                            }
                        }
                    }
                ]
            };

            it('should properly load returned data from firebase service', fakeAsync(() => {
                firebaseServiceSpy.getShoppingList.and.returnValue(new Promise(resolve => resolve({
                    exists: true,
                    data: () => {
                        return mockList;
                    }
                })));
                spyOn(component, 'addItem');
                component.load(mockListID);

                flushMicrotasks();
                expect(component.shoppingList.value.league).toEqual(mockList.league);
                expect(component.shoppingList.value.name).toEqual(mockList.name);
                expect(component.addItem).toHaveBeenCalledWith(mockList.savedItems[0]);
            }));

            it('should request the proper document ID', () => {
                firebaseServiceSpy.getShoppingList.and.returnValue(new Promise(reject => reject(null)));
                component.load(mockListID);

                expect(fireService.getShoppingList).toHaveBeenCalledWith(mockListID);
            });

            it('should set listLoading to true at the start of load', () => {
                firebaseServiceSpy.getShoppingList.and.returnValue(new Promise(reject => reject(null)));
                component.load(mockListID);

                expect(component.listLoading).toEqual(true);
            });

            it('should set listLoading to false after the load completes successfully', fakeAsync(() => {
                firebaseServiceSpy.getShoppingList.and.returnValue(new Promise(resolve => resolve({
                    exists: true,
                    data: () => {
                        return mockList;
                    }
                })));
                component.load(mockListID);

                flushMicrotasks();
                expect(component.listLoading).toEqual(false);
            }));

            it('should set listLoading to false after the load completes with an error', fakeAsync(() => {
                firebaseServiceSpy.getShoppingList.and.returnValue(new Promise((reject) => reject(null)));
                component.load(mockListID);

                flushMicrotasks();
                expect(component.listLoading).toEqual(false);;
            }));

            it('should call displayErrorSnackBar with "Error: Could not load the list" when loading fails', fakeAsync(() => {
                firebaseServiceSpy.getShoppingList.and.returnValue(new Promise((reject) => reject(null)));
                spyOn(component, 'displayErrorSnackBar');
                component.load(mockListID);

                flushMicrotasks();
                expect(component.displayErrorSnackBar).toHaveBeenCalledWith("Error: Could not load the list");
            }));

            it('should call displayErrorSnackBar with "Error: No such list exists!" when doc does not exist', fakeAsync(() => {
                firebaseServiceSpy.getShoppingList.and.returnValue(new Promise((resolve) => resolve({
                    exists: false
                })));
                spyOn(component, 'displayErrorSnackBar');
                component.load(mockListID);

                flushMicrotasks();
                expect(component.displayErrorSnackBar).toHaveBeenCalledWith("Error: No such list exists!");
            }));

            it('should call addItem when doc does not exist', fakeAsync(() => {
                firebaseServiceSpy.getShoppingList.and.returnValue(new Promise((resolve) => resolve({
                    exists: false
                })));
                spyOn(component, 'addItem');
                component.load(mockListID);

                flushMicrotasks();
                expect(component.addItem).toHaveBeenCalledWith();
            }));

            it('should call addItem when list fails to load', fakeAsync(() => {
                firebaseServiceSpy.getShoppingList.and.returnValue(new Promise((reject) => reject(null)));
                spyOn(component, 'addItem');
                component.load(mockListID);

                flushMicrotasks();
                expect(component.addItem).toHaveBeenCalledWith();
            }));
        });

        describe('save Method', () => {
            let mockFirePromise;
            let mockParams;

            beforeEach(() => {
                mockFirePromise = new Promise((resolve) => resolve({ id: 'mockID' }));
                mockParams = {
                    panelClass: 'save-dialog',
                    disableClose: true,
                    data: mockFirePromise
                }

                firebaseServiceSpy.addShoppingList.and.returnValue(mockFirePromise)
            });

            it('should call to open a material dialog with the correct params', () => {
                spyOn(matDialog, 'open');

                component.save();

                expect(matDialog.open).toHaveBeenCalledWith(SavedialogComponent, mockParams);
            });

            it('should call firebase service addShoppingListMethod', () => {
                component.save();
                expect(fireService.addShoppingList).toHaveBeenCalledWith(component.configureShoppingListData());
            })
        });

        describe('configureShoppingListData method', () => {
            it('should properly configure shopping list save data', () => {
                component.items = [
                    new ItemForm({
                        itemName: 'Mock Item',
                        queryForm: {
                            query: {
                                name: '',
                                term: '',
                                type: '',
                                status: {
                                    option: 'online'
                                }
                            }
                        }
                    })
                ];

                component.shoppingList.controls.name.patchValue('Mock List');
                component.shoppingList.controls.league.patchValue('Ritual');

                expect(component.configureShoppingListData()).toEqual(jasmine.objectContaining({
                    league: 'Ritual',
                    name: 'Mock List',
                    savedItems: jasmine.arrayContaining([
                        jasmine.objectContaining({
                            itemName: 'Mock Item',
                            queryForm: jasmine.objectContaining({
                                query: jasmine.objectContaining({
                                    status: {
                                        option: 'online'
                                    }
                                })
                            })
                        })
                    ])
                }));

                expect(component.configureShoppingListData().savedItems.length).toEqual(1);
            });
        });


        describe('addItem Method', () => {

            let mockItemData: itemSaveData = {
                itemName: 'Mock Item',
                queryForm: {
                    query: {
                        name: '',
                        term: '',
                        type: '',
                        status: {
                            option: 'online'
                        }
                    }
                }
            }

            beforeEach(() => {
                component.items = [];
            })

            it('should add a blank item with no save params provided', () => {
                component.addItem();
                expect(component.items.length).toEqual(1);
                expect(component.items[0].savedItemData).toBeUndefined();
            });

            it('should add an item with save data when params are provided', () => {
                component.addItem(mockItemData);
                expect(component.items.length).toEqual(1);
                expect(component.items[0].savedItemData).toEqual(mockItemData);
            });
        });

        describe('delete method', () => {

            beforeEach(() => {
                component.addItem();
                component.addItem();
            });

            it('should delete the correct item', () => {
                let itemToDelete = component.items[1];
                component.deleteItem(itemToDelete);
                expect(component.items.indexOf(itemToDelete)).toEqual(-1);
            });

            it('should delete only one item', () => {
                let itemToDelete = component.items[0];
                component.deleteItem(itemToDelete);
                expect(component.items.length).toEqual(2);
            })
        });

        describe('displayErrorSnackBar Method', () => {
            let errorSnackBarData = {
                panelClass: 'error-snack-bar',
                duration: 3000
            };
            let mockErrMsg = 'Mock Error';
            let mockAction = 'close';

            it('should call to open a snackbar with proper params', () => {
                spyOn(snackBar, 'open');
                component.displayErrorSnackBar(mockErrMsg);

                expect(snackBar.open).toHaveBeenCalledWith(mockErrMsg, mockAction, errorSnackBarData);
            });
        });
    })

    describe('Component HTML', () => {
        describe('#shoppinglist-contents-container element', () => {

            it('should be displayed when listLoading, poeLoading are false and errMsg is null', () => {
                component.listLoading = false;
                component.poeLoading = false;
                component.errMsg = null;

                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('#shoppinglist-contents-container'))).toBeTruthy();
            });

            it('should not be displayed when listLoading is true', () => {
                component.listLoading = true;
                component.poeLoading = false;
                component.errMsg = null;

                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('#shoppinglist-contents-container'))).not.toBeTruthy();
            });

            it('should not be displayed when poeLoading is true', () => {
                component.listLoading = false;
                component.poeLoading = true;
                component.errMsg = null;

                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('#shoppinglist-contents-container'))).not.toBeTruthy();
            });

            it('should not be displayed when errMsg is not null', () => {
                component.listLoading = false;
                component.poeLoading = false;
                component.errMsg = 'null';

                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('#shoppinglist-contents-container'))).not.toBeTruthy();
            });
        });

        describe('#loading-panel element', () => {

            it('should be displayed when listLoading is true, poeLoading is false, and errMsg is null', () => {
                component.listLoading = true;
                component.poeLoading = false;
                component.errMsg = null;

                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('#loading-panel'))).toBeTruthy();
            });

            it('should be displayed when listLoading is false, poeLoading is true, and errMsg is null', () => {
                component.listLoading = false;
                component.poeLoading = true;
                component.errMsg = null;

                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('#loading-panel'))).toBeTruthy();
            });

            it('should be not displayed when errMsg is not null', () => {
                component.listLoading = true;
                component.poeLoading = true;
                component.errMsg = 'null';

                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('#loading-panel'))).not.toBeTruthy();
            });

            it('should be not displayed when listLoading is false, poeLoading is false, and errMsg is null', () => {
                component.listLoading = false;
                component.poeLoading = false;
                component.errMsg = '';

                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('#loading-panel'))).not.toBeTruthy();
            });
        });

        describe('#error-panel element', () => {

            it('should be displayed with error message when errMsg is not null', () => {
                component.errMsg = 'Mock Error';

                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('#error-panel'))).toBeTruthy();
                expect(fixture.debugElement.query(By.css('#error-panel')).nativeElement.textContent).toContain('Mock Error');
            });

            it('should not be disaplayed when the errMsg is empty', () => {
                component.errMsg = '';

                fixture.detectChanges();
                expect(fixture.debugElement.query(By.css('#error-panel'))).not.toBeTruthy();
            })
        });

        describe('#shoppinglist-contents-container Element Contents', () => {

            beforeEach(() => {
                component.listLoading = false;
                component.poeLoading = false;
                component.errMsg = null;
                fixture.detectChanges();
            });

            describe('The Shopping List Name', () => {
                let nameOutputWrapper: DebugElement;
                let editButton: DebugElement;

                beforeEach(() => {
                    nameOutputWrapper = fixture.debugElement.query(By.css('#shoppinglist-name-output-wrapper'));
                    editButton = nameOutputWrapper.query(By.css('button'));
                })

                it('should set editShoppingListName to true on edit button click', () => {
                    (editButton.nativeElement as HTMLButtonElement).click();
                    fixture.detectChanges();

                    expect(component.editShoppingListName).toBe(true);
                });

                it('should hide #shoppinglist-name-output-wrapper when the editShoppingListName is true', () => {
                    component.editShoppingListName = true;
                    fixture.detectChanges();

                    nameOutputWrapper = fixture.debugElement.query(By.css('#shoppinglist-name-output-wrapper'));

                    expect(nameOutputWrapper).not.toBeTruthy();
                });

                it('should show .shopping-list-name-input when the editShoppingListName is true', () => {
                    component.editShoppingListName = true;
                    fixture.detectChanges();

                    let shoppingListNameInput = fixture.debugElement.query(By.css('.shopping-list-name-input'));

                    expect(shoppingListNameInput).toBeTruthy();
                });

                it('should focus the list name input when when the editShoppingListName becomes true', () => {
                    component.editShoppingListName = true;
                    fixture.detectChanges();

                    let listNameInput = component.shoppingListNameInput.first.nativeElement as HTMLInputElement;

                    expect(document.activeElement).toEqual(listNameInput);
                });

                it('should change the shopping list name when its input changes', () => {
                    const mockName = 'Mock Name';

                    component.editShoppingListName = true;
                    fixture.detectChanges();

                    let listNameInput = component.shoppingListNameInput.first.nativeElement;

                    listNameInput.value = mockName;

                    listNameInput.dispatchEvent(new InputEvent('input'));
                    fixture.detectChanges();

                    expect(component.shoppingList.controls.name.value).toEqual(mockName);
                });

                it('should show the value of the shoppinglist name form control as the shopping list name', () => {
                    const mockName = 'Mock Name';
                    let nameOutput = nameOutputWrapper.query(By.css('#shoppinglist-name-output')).nativeElement;

                    component.shoppingList.controls.name.patchValue(mockName);
                    fixture.detectChanges();

                    expect(nameOutput.textContent).toContain(mockName);
                });

                it('should show "Your Shopping List" as the shopping list name when the shopping list name form control is empty', () => {
                    let nameOutput = nameOutputWrapper.query(By.css('#shoppinglist-name-output')).nativeElement;

                    component.shoppingList.controls.name.patchValue(null);
                    fixture.detectChanges();

                    expect(nameOutput.textContent).toContain("Your Shopping List");
                });

                it('should set editShoppingListName to false when the shopping list name input is blurred', () => {
                    component.editShoppingListName = true;
                    fixture.detectChanges();

                    let listNameInput = component.shoppingListNameInput.first.nativeElement as HTMLInputElement;

                    listNameInput.dispatchEvent(new Event('blur'));
                    fixture.detectChanges();

                    expect(component.editShoppingListName).toEqual(false);
                });

                it('should blur the shopping list name input when enter key is pressed on it', () => {
                    component.editShoppingListName = true;
                    fixture.detectChanges();

                    let listNameInput = component.shoppingListNameInput.first.nativeElement as HTMLInputElement;
                    spyOn(listNameInput, 'blur');

                    listNameInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
                    fixture.detectChanges();

                    expect(listNameInput.blur).toHaveBeenCalled();
                });
            });

            describe('Action Buttons', () => {
                let buttons: Array<DebugElement>;

                beforeEach(() => {
                    buttons = fixture.debugElement.queryAll(By.css('.action-button'));
                });

                it('should call save when the save button is clicked', () => {
                    spyOn(component, 'save');

                    buttons[1].triggerEventHandler('click', {});
                    expect(component.save).toHaveBeenCalled();
                });

                it('should call addItem when the add item button is clicked', () => {
                    spyOn(component, 'addItem');

                    buttons[0].triggerEventHandler('click', {});
                    expect(component.addItem).toHaveBeenCalled();
                });
            });

            describe('Mat Tabs', () => {
                let loader: HarnessLoader;
                let tabGroup: MatTabGroupHarness;

                beforeEach(async () => {
                    loader = TestbedHarnessEnvironment.loader(fixture);
                    tabGroup = await loader.getHarness(MatTabGroupHarness);
                });

                it('should use the item name as the mat tab labels', async () => {
                    expect(await (await tabGroup.getTabs())[0].getLabel()).toEqual(component.items[0].itemForm.controls.itemName.value);
                });

                it('should use "New Item" as the label when the item name is empty', async () => {
                    component.items[0].itemForm.controls.itemName.patchValue('');
                    fixture.detectChanges();

                    expect(await (await tabGroup.getTabs())[0].getLabel()).toEqual('New Item');
                });

                it('should have the number of tabs equal to how many items there are', async () => {
                    component.items = [new ItemForm(), new ItemForm(), new ItemForm()];
                    fixture.detectChanges();

                    expect(await (await (tabGroup.getTabs())).length).toEqual(3);
                });
            });

            describe('Item component', () => {
                let items: Array<DebugElement>;

                beforeEach(() => {
                    component.shoppingList.controls.league.patchValue('Mock League');
                    fixture.detectChanges();

                    items = fixture.debugElement.queryAll(By.css('pos-itemForm'));
                });

                it('should call deleteItem when its deleteItem event fires', () => {
                    spyOn(component, 'deleteItem');

                    items[0].triggerEventHandler('deleteItem', {});
                    expect(component.deleteItem).toHaveBeenCalled();
                });

                it('should use correct item as input', () => {
                    let itemComp = (items[0].componentInstance as ItemFormStubComponent);

                    expect(itemComp.itemForm).toEqual(component.items[0]);
                });

                it('should have the same league as the shoppinglist', () => {
                    let itemComp = (items[0].componentInstance as ItemFormStubComponent);

                    expect(itemComp.league).toEqual(component.shoppingList.controls.league.value);
                });
            });

            describe('league searchSelect component', () => {
                let leagueSelector: DebugElement;

                beforeEach(() => {
                    leagueSelector = fixture.debugElement.query(By.css('app-searchselect'));
                });

                it('should update the league control value to the emitted selected value', () => {
                    leagueSelector.triggerEventHandler('selected', { id: 'MockLeague', text: 'Mock Legaue' });
                    fixture.detectChanges();

                    expect(component.shoppingList.controls.league.value).toEqual('MockLeague');
                });

                it('should set the right inputs on the component', () => {
                    let leagueSelectorComp = leagueSelector.componentInstance as SearchSelectStubComponent;

                    expect(leagueSelectorComp.autoCompleteClass).toEqual('autocomplete-panel-400');
                    expect(leagueSelectorComp.values).toEqual(component.leagues);
                    expect(leagueSelectorComp.filterBy).toEqual(stubSimpleDataService.filterSimpleData);
                    expect(leagueSelectorComp.displayBy).toEqual(stubSimpleDataService.displayByText);
                    expect(leagueSelectorComp.inputName).toEqual('League');
                    expect(leagueSelectorComp.setValue).toEqual(stubSimpleDataService.getSelectedValue(component.shoppingList.controls.league.value, component.leagues));
                });
            });
        });
    });
});
