import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowStep2EditComponent } from './workflow-step2-edit.component';

describe('WorkflowStep2EditComponent', () => {
  let component: WorkflowStep2EditComponent;
  let fixture: ComponentFixture<WorkflowStep2EditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowStep2EditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowStep2EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
