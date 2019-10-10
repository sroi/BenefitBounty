import { TestBed } from '@angular/core/testing';

import { WorkflowProjectDetailService } from './workflow-project-detail.service';

describe('WorkflowProjectDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkflowProjectDetailService = TestBed.get(WorkflowProjectDetailService);
    expect(service).toBeTruthy();
  });
});
