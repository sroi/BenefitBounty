import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPrComponent } from './admin-pr.component';

describe('AdminPrComponent', () => {
  let component: AdminPrComponent;
  let fixture: ComponentFixture<AdminPrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
