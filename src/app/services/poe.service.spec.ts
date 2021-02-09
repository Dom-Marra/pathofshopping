import { PoeService } from './poe.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('PoeService', () => {
  let service: PoeService;
  let httpTestingController: HttpTestingController;

  //Creation Test Request
  let getLeagueReq: TestRequest;
  let getItemsReq: TestRequest;
  let getStatsReq: TestRequest;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    service = TestBed.inject(PoeService);
    httpTestingController = TestBed.inject(HttpTestingController);

    //Leagues Service
    getLeagueReq = httpTestingController.expectOne('https://us-central1-pathofshopping.cloudfunctions.net/getPOELeagues');
    let leaguesRes = {result: [{id: 'testLeagueName', text: 'Test League Name To Print'}]};
    getLeagueReq.flush(leaguesRes);

    //Items Service
    getItemsReq = httpTestingController.expectOne('https://us-central1-pathofshopping.cloudfunctions.net/getPOEItems');
    let itemsRes = {"result":[{"label":"Accessories","entries":[{"name":"Ahkeli's Meadow","type":"Ruby Ring","text":"Ahkeli's Meadow Ruby Ring","flags":{"unique":true}}]}]};
    getItemsReq.flush(itemsRes);

    //Stats Service
    getStatsReq = httpTestingController.expectOne('https://us-central1-pathofshopping.cloudfunctions.net/getPOEStats');
    let statsRes = {"result":[{"label":"Pseudo","entries":[{"id":"pseudo.pseudo_total_cold_resistance","text":"+#% total to Cold Resistance","type":"pseudo"}]}]};
    getStatsReq.flush(statsRes);
  });

  it('should be created', () => { 
    expect(service).toBeTruthy();
  });

  describe('Setting Shared Variables', () => {

    it('should use GET method while retrieving POE Legaues', () => {
      expect(getLeagueReq.request.method).toBe('GET');
    });

    it('should properly set the poe leagues data', () => {
      expect(service.getLeagues()).toEqual({testLeagueName: 'Test League Name To Print'});
    });

    it('should use GET method while retrieving POE Items', () => {
      expect(getItemsReq.request.method).toBe('GET');
    });

    it('should properly set the poe items data', () => {
      expect(service.getItems()).toEqual([{category: 'Accessories', items: [{name: "Ahkeli's Meadow", text: "Ahkeli's Meadow Ruby Ring", type: "Ruby Ring"}]}]);
    });

    it('should use GET method while retrieving POE Stats', () => {
      expect(getStatsReq.request.method).toBe('GET');
    });

    it('should properly set the poe stats data', () => {
      expect(service.getStats()).toEqual([{category: "Pseudo", stats: [{id:"pseudo.pseudo_total_cold_resistance",text:"+#% total to Cold Resistance"}]}]);
    });

    it('should have set the loaded value to true', () => {
      expect(service.loaded.getValue()).toBe(true);
    });

    afterEach(() => {
      httpTestingController.verify();
    });
  });

  describe('Fetch Method', () => {
    let req: TestRequest;

    beforeEach(() => {
      service.fetch(['test'], 'params').subscribe();
      req = httpTestingController.expectOne('https://us-central1-pathofshopping.cloudfunctions.net/poeFetch');
    });

    it('should have used post method', () => {
      expect(req.request.method).toBe('POST');
    });

    it('should have used the right URL', () => {
      expect(req.request.url).toBe('https://us-central1-pathofshopping.cloudfunctions.net/poeFetch');
    });

    it('should have correct data in the body', () => {
      expect(req.request.body).toEqual({items: 'testparams'});
    });

    afterEach(() => {
      httpTestingController.verify();
    });
  });

  describe('Search Method', () => {
    let req: TestRequest;
    let mockQuery = {"query":{"status":{"option":"online"}},"sort":{"price":"asc"}};
    let mockLeague = "Ritual";

    beforeEach(() => {
      service.search(mockQuery, mockLeague).subscribe();
      req = httpTestingController.expectOne('https://us-central1-pathofshopping.cloudfunctions.net/poeSearch');
    });

    it('should have used the right URL', () => {
      expect(req.request.url).toBe('https://us-central1-pathofshopping.cloudfunctions.net/poeSearch');
    });

    it('should have used post method', () => {
      expect(req.request.method).toBe('POST');
    });

    it('should have correct data in the body', () => {
      expect(req.request.body).toEqual({
      data: {"query":{"status":{"option":"online"}},"sort":{"price":"asc"}},
      league: "Ritual"});
    });

    it('should throw an error on http error', () => {
      let error = "mock error";

      service.search(mockQuery, mockLeague).subscribe(
        data => fail('should have failed with mock error'),
        error => {
          expect(error).toBeInstanceOf(String);
        }
      );

      req = httpTestingController.expectOne('https://us-central1-pathofshopping.cloudfunctions.net/poeSearch');

      const mockError = new ErrorEvent('Network error');
      req.error(mockError);
    });

    afterEach(() => {
      httpTestingController.verify();
    });
  });
});
