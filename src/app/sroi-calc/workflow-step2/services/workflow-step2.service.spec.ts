import { TestBed } from '@angular/core/testing';

import { WorkflowStep2Service } from './workflow-step2.service';

describe('WorkflowStep2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkflowStep2Service = TestBed.get(WorkflowStep2Service);
    expect(service).toBeTruthy();
  });
});
