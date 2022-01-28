import { async, ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { DebugElement, ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { LoginService } from '../../services/login.service';
import { of, Observable, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { LanguagesModule } from 'projects/shared/src/app/languages/languages.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: DebugElement;
  let router: Router;
  let loginService: any;

  beforeEach(async(() => {

    const loginServiceSpy = jasmine.createSpyObj('LoginService', ['loginCheck', 'login']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy }
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatButtonModule,
        HttpClientModule,
        MatIconModule,
        MatMenuModule,
        LanguagesModule,
        RouterTestingModule.withRoutes([]),
      ],
    })
      .compileComponents()
      .then(() => {
        loginService = TestBed.inject(LoginService);
        loginService.loginCheck.and.returnValue(throwError({ status: 400 }));

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        router = TestBed.inject(Router);
        fixture.detectChanges();
      });
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('show content of mat-card-title)', () => {
    const paragraphDe: DebugElement[] = el.queryAll(By.css('.mat-card-title'));
    expect(paragraphDe.length).toEqual(1);
  });


  it('show form', () => {
    const forms: Array<DebugElement> = el.queryAll(By.css('mat-card'));
    expect(forms.length).toEqual(1, 'unexpected number of mat-cards');
  });


  it('input fields', () => {
    const inputs: Array<DebugElement> = el.queryAll(By.css('input'));
    expect(inputs.length).toEqual(3, 'unexpected number of inputs');

    const buttonSubmit: Array<DebugElement> = el.queryAll(By.css('.submitButton'));
    expect(buttonSubmit.length).toEqual(1, 'unexpected number of Submit Buttons');
  });


  it('should check initial input', () => {
    const userName = el.query(By.css('.userEmail'));
    const userPassword = el.query(By.css('.userPassword'));
    const userCaptcha = el.query(By.css('.userCaptcha'));

    const buttonSub = el.query(By.css('button[type="submit"]')).nativeElement.disabled;

    expect(buttonSub).toBeTruthy();

    expect(userName.nativeElement.value).toBe('');
    expect(userPassword.nativeElement.value).toBe('');
    expect(userCaptcha.nativeElement.value).toBe('');
  });


  it('email field validation', () => {
    const email = component.form.controls.email;

    expect(email.valid).toBeFalsy();

    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();
    expect(email.valid).toBeFalsy();

    email.setValue('user');
    expect(email.hasError('email')).toBeTruthy();
    expect(email.valid).toBeFalsy();

    email.setValue('user@example.com');
    expect(email.valid).toBeTruthy();
  });


  it('password validation', () => {
    const pass = component.form.controls.password;

    pass.setValue('');
    expect(pass.hasError('required')).toBeTruthy();
    expect(pass.valid).toBeFalsy();

    pass.setValue('12');
    expect(pass.hasError('minlength')).toBeTruthy();
    expect(pass.valid).toBeFalsy();

    pass.setValue('1234');
    expect(pass.hasError('minlength')).toBeFalsy();
    expect(pass.valid).toBeTruthy();
  });


  it('captcha validation', () => {
    const captcha = component.form.controls.captcha;

    captcha.setValue('');
    expect(captcha.hasError('required')).toBeTruthy();
    expect(captcha.valid).toBeFalsy();

    captcha.setValue('12');
    expect(captcha.hasError('minlength')).toBeTruthy();
    expect(captcha.valid).toBeFalsy();

    captcha.setValue('1234');
    expect(captcha.hasError('minlength')).toBeFalsy();
    expect(captcha.valid).toBeTruthy();
  });


  it('form should be valid', () => {
    const email = component.form.controls.email;
    const pass = component.form.controls.password;
    const captcha = component.form.controls.captcha;

    email.setValue('user@example.com');
    pass.setValue('12');
    captcha.setValue('1234');
    expect(component.form.valid).toBeFalsy();

    email.setValue('user');
    pass.setValue('1212');
    captcha.setValue('1234');
    expect(component.form.valid).toBeFalsy();

    email.setValue('user@example.com');
    pass.setValue('1212');
    captcha.setValue('12');
    expect(component.form.valid).toBeFalsy();

    email.setValue('user@example.com');
    pass.setValue('1212');
    captcha.setValue('1234');
    expect(component.form.valid).toBeTruthy();
  });


  it('form is invalid button is disabled', () => {
    const submitEL: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(submitEL.nativeElement.disabled).toBe(true);

    component.form.controls.email.setValue('user');
    component.form.controls.password.setValue('1234');
    component.form.controls.captcha.setValue('1212');
    const submitEL1: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(submitEL1.nativeElement.disabled).toBe(true);
  });


  it('form is valid button is enabled', () => {
    component.form.controls.email.setValue('user@example.com');
    component.form.controls.password.setValue('1234');
    component.form.controls.captcha.setValue('1212');
    const submitEL: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'));
    fixture.detectChanges();

    expect(submitEL.nativeElement.disabled).toBe(false);
  });


  it('after login redirect to loggedin', () => {
    loginService.login.and.returnValue(of('success'));
    component.login();

    expect(loginService.login).toHaveBeenCalled();
  });


  it('should call the login function', () => {
    spyOn(component, 'login');
    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', fakeEvent);
    expect(component.login).toHaveBeenCalled();
  });
});
