import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigrationStepsComponent } from './configration-steps.component';

describe('ConfigrationStepsComponent', () => {
  let component: ConfigrationStepsComponent;
  let fixture: ComponentFixture<ConfigrationStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigrationStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigrationStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
