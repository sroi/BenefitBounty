import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowProjectDetailComponent } from './workflow-project-detail.component';

describe('WorkflowProjectDetailComponent', () => {
  let component: WorkflowProjectDetailComponent;
  let fixture: ComponentFixture<WorkflowProjectDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowProjectDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowProjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
