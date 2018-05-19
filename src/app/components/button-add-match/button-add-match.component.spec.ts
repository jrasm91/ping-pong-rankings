import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAddMatchComponent } from './button-add-match.component';

describe('ButtonAddMatchComponent', () => {
  let component: ButtonAddMatchComponent;
  let fixture: ComponentFixture<ButtonAddMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonAddMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonAddMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
