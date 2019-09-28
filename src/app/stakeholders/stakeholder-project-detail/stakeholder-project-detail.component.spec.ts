import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StakeholderProjectDetailComponent } from './stakeholder-project-detail.component';

describe('StakeholderProjectDetailComponent', () => {
  let component: StakeholderProjectDetailComponent;
  let fixture: ComponentFixture<StakeholderProjectDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StakeholderProjectDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StakeholderProjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
