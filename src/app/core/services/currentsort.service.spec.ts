import { TestBed } from '@angular/core/testing';

import { CurrentsortService } from './currentsort.service';

describe('CurrentsortService', () => {
  let service: CurrentsortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentsortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
