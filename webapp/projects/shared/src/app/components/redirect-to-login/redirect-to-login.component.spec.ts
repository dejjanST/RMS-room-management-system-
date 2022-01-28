import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectToLoginComponent } from './redirect-to-login.component';

describe('RedirectToLoginComponent', () => {
  let component: RedirectToLoginComponent;
  let fixture: ComponentFixture<RedirectToLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectToLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectToLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
