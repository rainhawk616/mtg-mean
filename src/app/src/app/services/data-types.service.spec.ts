import { TestBed } from '@angular/core/testing';

import { DataTypesService } from './data-types.service';

describe('DataTypesService', () => {
  let service: DataTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
