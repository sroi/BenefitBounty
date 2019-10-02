import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskList1Component } from './task-list.component';

describe('TaskList1Component', () => {
  let component: TaskList1Component;
  let fixture: ComponentFixture<TaskList1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskList1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskList1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
