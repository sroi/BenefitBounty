import { TestBed } from '@angular/core/testing';

import { WorkflowStep1Service } from './workflow-step1.service';

describe('WorkflowSetp1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkflowStep1Service = TestBed.get(WorkflowStep1Service);
    expect(service).toBeTruthy();
  });
});
