import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowStep2AddComponent } from './workflow-step2-add.component';

describe('WorkflowStep2AddComponent', () => {
  let component: WorkflowStep2AddComponent;
  let fixture: ComponentFixture<WorkflowStep2AddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowStep2AddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowStep2AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
