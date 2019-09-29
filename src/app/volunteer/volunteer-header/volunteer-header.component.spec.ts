import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerHeaderComponent } from './volunteer-header.component';

describe('VolunteerHeaderComponent', () => {
  let component: VolunteerHeaderComponent;
  let fixture: ComponentFixture<VolunteerHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteerHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
