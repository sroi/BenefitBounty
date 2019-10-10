import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowStep1AddComponent } from './workflow-step1-add.component';

describe('WorkflowStep1AddComponent', () => {
  let component: WorkflowStep1AddComponent;
  let fixture: ComponentFixture<WorkflowStep1AddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowStep1AddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowStep1AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
