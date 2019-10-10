import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SroiWorkflowComponent } from './sroi-workflow.component';

describe('SroiWorkflowComponent', () => {
  let component: SroiWorkflowComponent;
  let fixture: ComponentFixture<SroiWorkflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SroiWorkflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SroiWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
