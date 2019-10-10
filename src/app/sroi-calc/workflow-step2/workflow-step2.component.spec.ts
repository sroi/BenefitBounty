import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowStep2Component } from './workflow-step2.component';

describe('WorkflowStep2Component', () => {
  let component: WorkflowStep2Component;
  let fixture: ComponentFixture<WorkflowStep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowStep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
