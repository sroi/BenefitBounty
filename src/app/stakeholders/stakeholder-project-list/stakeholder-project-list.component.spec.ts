import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StakeholderProjectListComponent } from './stakeholder-project-list.component';

describe('StakeholderProjectListComponent', () => {
  let component: StakeholderProjectListComponent;
  let fixture: ComponentFixture<StakeholderProjectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StakeholderProjectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StakeholderProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
