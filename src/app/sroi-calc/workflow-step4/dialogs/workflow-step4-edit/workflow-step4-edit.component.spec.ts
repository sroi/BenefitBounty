import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowStep4EditComponent } from './workflow-step4-edit.component';

describe('WorkflowStep4EditComponent', () => {
  let component: WorkflowStep4EditComponent;
  let fixture: ComponentFixture<WorkflowStep4EditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowStep4EditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowStep4EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
