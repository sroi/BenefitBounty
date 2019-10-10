import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowStep5AddComponent } from './workflow-step5-add.component';

describe('WorkflowStep5AddComponent', () => {
  let component: WorkflowStep5AddComponent;
  let fixture: ComponentFixture<WorkflowStep5AddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowStep5AddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowStep5AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
