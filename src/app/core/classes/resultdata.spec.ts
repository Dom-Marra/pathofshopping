import { Resultdata } from './resultdata';

describe('Resultdata', () => {
  const resultData = new Resultdata();

  beforeEach(() => {
    resultData.endIndex = 5;
    resultData.startIndex = 0;
    resultData.pageIndex = 3;
    resultData.queryData = ['Mock Query Data'];
    resultData.queryProps = {
      psuedos: 'Mock Pseudo',
      res: ['Mock Res'],
      total: 1,
      inexact: false,
      id: 'Mock ID',
    };
    resultData.retrievedItems = ['Mock Retrived Items'];
  })

  describe('reset', () => {
    it('should reset the resultData properties correctly', () => {
      resultData.reset();
      expect(resultData.endIndex).toEqual(10);
      expect(resultData.startIndex).toEqual(0);
      expect(resultData.pageIndex).toEqual(0);
      expect(resultData.queryData).toEqual([]);
      expect(resultData.queryProps).toEqual(null);
      expect(resultData.retrievedItems).toEqual([]);
    })
  })
});
