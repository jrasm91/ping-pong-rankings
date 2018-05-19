import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAddPlayerComponent } from './button-add-player.component';

describe('ButtonAddPlayerComponent', () => {
  let component: ButtonAddPlayerComponent;
  let fixture: ComponentFixture<ButtonAddPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonAddPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonAddPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
