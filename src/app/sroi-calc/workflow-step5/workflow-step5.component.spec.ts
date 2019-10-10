import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowStep5Component } from './workflow-step5.component';

describe('WorkflowStep5Component', () => {
  let component: WorkflowStep5Component;
  let fixture: ComponentFixture<WorkflowStep5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowStep5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowStep5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
