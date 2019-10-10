import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowStep6Component } from './workflow-step6.component';

describe('WorkflowStep6Component', () => {
  let component: WorkflowStep6Component;
  let fixture: ComponentFixture<WorkflowStep6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowStep6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowStep6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
