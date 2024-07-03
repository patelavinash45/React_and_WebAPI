import { TestBed } from '@angular/core/testing';

import { ShowToasterService } from './show-toaster.service';

describe('ShowToasterService', () => {
  let service: ShowToasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowToasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
