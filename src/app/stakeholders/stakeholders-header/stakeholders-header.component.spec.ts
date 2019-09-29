import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StakeholdersHeaderComponent } from './stakeholders-header.component';

describe('StakeholdersHeaderComponent', () => {
  let component: StakeholdersHeaderComponent;
  let fixture: ComponentFixture<StakeholdersHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StakeholdersHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StakeholdersHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
