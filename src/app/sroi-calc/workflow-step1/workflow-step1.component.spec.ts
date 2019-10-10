import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowStep1Component } from './workflow-step1.component';

describe('WorkflowStep1Component', () => {
  let component: WorkflowStep1Component;
  let fixture: ComponentFixture<WorkflowStep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowStep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
