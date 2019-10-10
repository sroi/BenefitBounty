import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowStep5EditComponent } from './workflow-step5-edit.component';

describe('WorkflowStep5EditComponent', () => {
  let component: WorkflowStep5EditComponent;
  let fixture: ComponentFixture<WorkflowStep5EditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowStep5EditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowStep5EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
