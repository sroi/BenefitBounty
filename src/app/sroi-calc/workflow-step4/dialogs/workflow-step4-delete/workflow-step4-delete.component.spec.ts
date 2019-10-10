import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowStep4DeleteComponent } from './workflow-step4-delete.component';

describe('WorkflowStep4DeleteComponent', () => {
  let component: WorkflowStep4DeleteComponent;
  let fixture: ComponentFixture<WorkflowStep4DeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowStep4DeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowStep4DeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
