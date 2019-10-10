import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowStep1DeleteComponent } from './workflow-step1-delete.component';

describe('WorkflowStep1DeleteComponent', () => {
  let component: WorkflowStep1DeleteComponent;
  let fixture: ComponentFixture<WorkflowStep1DeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowStep1DeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowStep1DeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
