import { TestBed, inject } from '@angular/core/testing';

import { RdcService } from './rdc.service';

describe('RdcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RdcService]
    });
  });

  it('should be created', inject([RdcService], (service: RdcService) => {
    expect(service).toBeTruthy();
  }));
});
