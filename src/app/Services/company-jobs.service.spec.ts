import { TestBed } from '@angular/core/testing';

import { CompanyJobsService } from './company-jobs.service';

describe('CompanyJobsService', () => {
  let service: CompanyJobsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyJobsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
