import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowStep3AddComponent } from './workflow-step3-add.component';

describe('WorkflowStep3AddComponent', () => {
  let component: WorkflowStep3AddComponent;
  let fixture: ComponentFixture<WorkflowStep3AddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowStep3AddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowStep3AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
