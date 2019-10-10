import { TestBed } from '@angular/core/testing';

import { WorkflowStep4Service } from './workflow-step4.service';

describe('WorkflowStep4Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkflowStep4Service = TestBed.get(WorkflowStep4Service);
    expect(service).toBeTruthy();
  });
});
