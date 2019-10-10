import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowStep5DeleteComponent } from './workflow-step5-delete.component';

describe('WorkflowStep5DeleteComponent', () => {
  let component: WorkflowStep5DeleteComponent;
  let fixture: ComponentFixture<WorkflowStep5DeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowStep5DeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowStep5DeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
