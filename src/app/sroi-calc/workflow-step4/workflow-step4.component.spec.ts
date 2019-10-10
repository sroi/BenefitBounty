import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowStep4Component } from './workflow-step4.component';

describe('WorkflowStep4Component', () => {
  let component: WorkflowStep4Component;
  let fixture: ComponentFixture<WorkflowStep4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowStep4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowStep4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
