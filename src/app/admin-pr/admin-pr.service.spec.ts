import { TestBed } from '@angular/core/testing';

import { AdminPrService } from './admin-pr.service';

describe('AdminPrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminPrService = TestBed.get(AdminPrService);
    expect(service).toBeTruthy();
  });
});
