import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAppointComponent } from './admin-appoint.component';

describe('AdminAppointComponent', () => {
  let component: AdminAppointComponent;
  let fixture: ComponentFixture<AdminAppointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAppointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAppointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
