import { FormArray, FormGroup } from '@angular/forms';
import { itemSaveData } from 'src/app/core/models/itemSaveData';
import { PoeAPISearchProperties } from '../models/poeapisearchproperties.model';
import { ItemForm } from './itemform';
import { StatFilterForm } from './stat-filter-form';

describe('Item', () => {
  let item: ItemForm;

  beforeEach(() => {
    item = new ItemForm();
  });

  describe('construction', () => {
    it('should call loadSaveData if saveData is provided', () => {
      spyOn(ItemForm.prototype, 'loadSaveData');
      new ItemForm({itemName: 'Name', queryForm: null});
      expect(ItemForm.prototype.loadSaveData).toHaveBeenCalled();
    })
  })

  describe('clear', () => {

    it('patches the itemName to \'New Item\'', () => {
      expect(item.itemForm.controls.itemName.value).toEqual('New Item');
    });

    it('should set results to null', () => {
      item.clear();
      expect(item.results).toEqual(null);
    });

    it('should reset on the itemForm', () => {
      spyOn(item.itemForm, 'reset');
      item.clear();
      expect(item.itemForm.reset).toHaveBeenCalledWith('');
    });

    it('should call clear stats FormArray', () => {
      spyOn((item.itemForm.get('queryForm.query.stats') as FormArray), 'clear');
      item.clear();
      expect((item.itemForm.get('queryForm.query.stats') as FormArray).clear).toHaveBeenCalled();
    });
  });

  describe('loadSaveData', () => {
    const mockSaveData: itemSaveData = {
      itemName: '',
      queryForm: {
        query: {
          name: '',
          term: '',
          type: '',
          stats: [
            {
              type: '',
              disabled: false,
              filters: [
                {id: '', disabled: false, selectedStatOption: {} as any, selectedStat: {} as any},
                {id: '', disabled: false, selectedStatOption: {} as any, selectedStat: {} as any}
              ]
            },
            {
              type: '',
              disabled: false,
              filters: [
                {id: '', disabled: false, selectedStatOption: {} as any, selectedStat: {} as any}
              ]
            }
          ],
          status: {} as any
        }
      }
    };

    it('should add StatFilterForms to the stats FormArray equal to the amount in the saveData', () => {
      item.savedItemData = mockSaveData;
      item.loadSaveData();
      expect((item.itemForm.get('queryForm.query.stats') as FormArray).length).toEqual(2);
    });

    it('should add statForms to each stat FormArray as associated in the saveData', () => {
      item.savedItemData = mockSaveData;
      item.loadSaveData();
      let statOne = (item.itemForm.get('queryForm.query.stats') as FormArray).controls[0] as FormGroup;
      let statTwo = (item.itemForm.get('queryForm.query.stats') as FormArray).controls[1] as FormGroup;

      expect((statOne.controls.filters as FormArray).length).toEqual(2);
      expect((statTwo.controls.filters as FormArray).length).toEqual(1);
    });

    it('should call patchValue on the item form with the savedata', () => {
      spyOn(item.itemForm, 'patchValue');
      item.savedItemData = mockSaveData;
      item.loadSaveData();

      expect(item.itemForm.patchValue).toHaveBeenCalledWith(mockSaveData);
    });
  });

  describe('addStatFilterForm', () => {
    it('should add a new statfilterform to the query form stats', () => {
      item.addStatFilterForm();
      expect((item.itemForm.get('queryForm.query.stats') as FormArray).length).toEqual(1);
    });
  });

  describe('removeStatFilterForm', () => {
    it('should remove the specified statfilter', () => {
      item.addStatFilterForm();
      item.addStatFilterForm();

      let statFilterToRemove = (item.itemForm.get('queryForm.query.stats') as FormArray).controls[0];
      item.removeStatFilterForm(statFilterToRemove as StatFilterForm);

      expect((item.itemForm.get('queryForm.query.stats') as FormArray).length).toBe(1);
      expect((item.itemForm.get('queryForm.query.stats') as FormArray).controls.indexOf(statFilterToRemove)).toBe(-1);
    });
  });

  describe('getQueryData', () => {
    it('returns proper data', () => {
      const expectedData: PoeAPISearchProperties = {
        query: {
          name: 'Mock',
          status: {
            option: 'Mock'
          }
        },
        sort: {
          price: 'asc'
        }
      };

      item.itemForm.get('queryForm.query.name').patchValue('Mock');
      item.itemForm.get('queryForm.query.status.option').patchValue('Mock');
      item.itemForm.get('queryForm.query.filters.type_filters.filters.rarity.option').patchValue('all');
      expect(item.getDataForQuery()).toEqual(expectedData);
    });
  });

  describe('setSortBy', () => {
    let item: ItemForm;

    beforeEach(() => {
      item = new ItemForm();
    })

    it('sets the sort key to the key provided if it does not equal the current one', () => {
      item.setSortBy('mock');
      expect(item.getDataForQuery().sort.mock).toBeTruthy();
    });

    it('sets the sort value to the provided value', () => {
      item.setSortBy('mock', 'desc');
      expect(item.getDataForQuery().sort.mock).toEqual('desc');
    });

    it('switches the sort value if the sort key is the same but the value was not provided', () => {
      item.setSortBy('mock', 'desc');
      item.setSortBy('mock');
      expect(item.getDataForQuery().sort.mock).toEqual('asc');
    });

    it('sets the sort value to \'desc\' if the sort value was not provided and the key is different than the current', () => {
      item.setSortBy('mock', 'asc');
      item.setSortBy('mock2');
      expect(item.getDataForQuery().sort.mock2).toEqual('desc');
    });

    it('returns the newly set value if the value was not provided', () => {
      item.setSortBy('mock', 'desc');
      expect(item.setSortBy('mock')).toEqual('asc');
      expect(item.setSortBy('mock2')).toEqual('desc');
    });
  });
});
