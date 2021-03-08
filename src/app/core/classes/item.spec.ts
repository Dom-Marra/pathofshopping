import { FormArray, FormGroup } from '@angular/forms';
import { itemSaveData } from 'src/app/core/models/itemSaveData';
import { Resultdata } from './resultdata';
import { Item } from './item';

describe('Item', () => {
  let item: Item;

  beforeEach(() => {
    item = new Item();
  });

  describe('construction', () => {
    it('should call loadSaveData if saveData is provided', () => {
      spyOn(Item.prototype, 'loadSaveData');
      new Item({itemName: 'Name', queryForm: null});
      expect(Item.prototype.loadSaveData).toHaveBeenCalled();
    })
  })

  describe('clear', () => {

    it('should set resultData as new ResultData', () => {
      item.clear();
      expect(item.resultData).toEqual(new Resultdata());
    });

    it('should reset on the itemForm', () => {
      spyOn(item.itemForm, 'reset');
      item.clear();
      expect(item.itemForm.reset).toHaveBeenCalledWith('');
    });

    it('should patch the itemName control on the itemForm to \'New Item\'', () => {
      item.clear();
      expect(item.itemForm.controls.itemName.value).toEqual('New Item');
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
        },
        sort: {} as any
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
});
