import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowStep2DeleteComponent } from './workflow-step2-delete.component';

describe('WorkflowStep2DeleteComponent', () => {
  let component: WorkflowStep2DeleteComponent;
  let fixture: ComponentFixture<WorkflowStep2DeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowStep2DeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowStep2DeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
