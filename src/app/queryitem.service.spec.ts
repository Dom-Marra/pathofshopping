import { TestBed } from '@angular/core/testing';

import { QueryitemService } from './queryitem.service';

describe('QueryitemService', () => {
  let service: QueryitemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryitemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
