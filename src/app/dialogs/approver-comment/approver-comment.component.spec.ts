import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverCommentComponent } from './approver-comment.component';

describe('ApproverCommentComponent', () => {
  let component: ApproverCommentComponent;
  let fixture: ComponentFixture<ApproverCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproverCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproverCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
