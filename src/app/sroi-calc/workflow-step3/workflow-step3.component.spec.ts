import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowStep3Component } from './workflow-step3.component';

describe('WorkflowStep3Component', () => {
  let component: WorkflowStep3Component;
  let fixture: ComponentFixture<WorkflowStep3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowStep3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
