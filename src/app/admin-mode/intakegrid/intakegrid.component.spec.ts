import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakegridComponent } from './intakegrid.component';

describe('IntakegridComponent', () => {
  let component: IntakegridComponent;
  let fixture: ComponentFixture<IntakegridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntakegridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntakegridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
