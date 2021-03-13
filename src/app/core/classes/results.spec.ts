import { FetchedProperties } from '../models/fetchedproperties.model';
import { Results } from './results';

describe('Resultdata', () => {
  let mockFetchedResults: FetchedProperties = {
    pseudos: 'Mock Pseudo',
    result: ['Mock Res'],
    total: 1,
    inexact: false,
    id: 'Mock ID',
  };

  const results = new Results(mockFetchedResults);

  describe('Creation', () => {

    it('calls setPageData with 0', () => {
      spyOn(Results.prototype, 'setPageData');
      new Results(mockFetchedResults);
      expect(Results.prototype.setPageData).toHaveBeenCalledWith(0);
    });
  });

  describe('setPageData', () => {

    it('properly sets the pageData properties', () => {
      results.setPageData(5);
      expect(results.pageData).toEqual({
        pageIndex: 5,
        startIndex: 50,
        endIndex: 60
      })
    });
  });

  describe('addRetrievedItems', () => {
    it('appends items to the retrivedItems array', () => {
      results.retrievedItems = ['Mock Value'];
      results.addRetrievedItems(['Mock Value 2']);
      expect(results.retrievedItems).toEqual(['Mock Value', 'Mock Value 2']);
    });
  });
});
