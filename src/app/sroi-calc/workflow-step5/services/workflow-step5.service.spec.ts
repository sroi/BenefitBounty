import { TestBed } from '@angular/core/testing';

import { WorkflowStep5Service } from './workflow-step5.service';

describe('WorkflowStep5Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkflowStep5Service = TestBed.get(WorkflowStep5Service);
    expect(service).toBeTruthy();
  });
});
