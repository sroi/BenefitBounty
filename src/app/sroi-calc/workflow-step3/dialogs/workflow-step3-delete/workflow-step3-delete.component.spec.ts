import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowStep3DeleteComponent } from './workflow-step3-delete.component';

describe('WorkflowStep3DeleteComponent', () => {
  let component: WorkflowStep3DeleteComponent;
  let fixture: ComponentFixture<WorkflowStep3DeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowStep3DeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowStep3DeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
