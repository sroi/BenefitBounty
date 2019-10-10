import { TestBed } from '@angular/core/testing';

import { WorkflowStep3Service } from './workflow-step3.service';

describe('WorkflowStep3Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkflowStep3Service = TestBed.get(WorkflowStep3Service);
    expect(service).toBeTruthy();
  });
});
