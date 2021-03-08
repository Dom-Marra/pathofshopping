import { TestBed } from '@angular/core/testing';

import { SimpleDataService } from './simpledata.service';

describe('FiltersService', () => {
  const mockSimpleData = [
    {id: '1', text: 'A 1'},
    {id: '2', text: 'A 2'},
    {id: '3', text: 'B 1'},
    {id: '4', text: 'B 2'},
    {id: '5', text: 'C 1'},
    {id: '6', text: 'C 2'}
  ];

  let service: SimpleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimpleDataService);
  });

  describe('filterSimpleData', () => {

    it('should properly filter simpledata', () => {
      

      expect(service.filterSimpleData('A', mockSimpleData)).toEqual([{id: '1', text: 'A 1'}, {id: '2', text: 'A 2'}]);
    });
  });

  describe('displayByText', () => {

    it('should return the text of simpledata', () => {
      expect(service.displayByText(mockSimpleData[5])).toEqual('C 2');
    });
  });

  describe('getSelectedValue', () => {
    it('should return the simpledata object associate with the given id', () => {
      expect(service.getSelectedValue('3', mockSimpleData)).toEqual(mockSimpleData[2]);
    });
  });
});
