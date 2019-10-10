import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowStep4AddComponent } from './workflow-step4-add.component';

describe('WorkflowStep4AddComponent', () => {
  let component: WorkflowStep4AddComponent;
  let fixture: ComponentFixture<WorkflowStep4AddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowStep4AddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowStep4AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
