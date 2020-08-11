import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkToDentistComponent } from './talk-to-dentist.component';

describe('TalkToDentistComponent', () => {
  let component: TalkToDentistComponent;
  let fixture: ComponentFixture<TalkToDentistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalkToDentistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalkToDentistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
