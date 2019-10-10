import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowStep1EditComponent } from './workflow-step1-edit.component';

describe('WorkflowStep1EditComponent', () => {
  let component: WorkflowStep1EditComponent;
  let fixture: ComponentFixture<WorkflowStep1EditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowStep1EditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowStep1EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
