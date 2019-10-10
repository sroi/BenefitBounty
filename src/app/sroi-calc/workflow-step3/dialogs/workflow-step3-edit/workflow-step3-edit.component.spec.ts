import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowStep3EditComponent } from './workflow-step3-edit.component';

describe('WorkflowStep3EditComponent', () => {
  let component: WorkflowStep3EditComponent;
  let fixture: ComponentFixture<WorkflowStep3EditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowStep3EditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowStep3EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
