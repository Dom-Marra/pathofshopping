import { TestBed } from '@angular/core/testing';

import { StatsearchService } from './statsearch.service';

describe('StatsearchService', () => {
  let service: StatsearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatsearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
