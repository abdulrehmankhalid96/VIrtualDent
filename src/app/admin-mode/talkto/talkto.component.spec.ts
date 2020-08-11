import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalktoComponent } from './talkto.component';

describe('TalktoComponent', () => {
  let component: TalktoComponent;
  let fixture: ComponentFixture<TalktoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalktoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalktoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
