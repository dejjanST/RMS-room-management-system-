import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotPasswordComponent } from './forgot-password.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { PasswordResetService } from '../../services/password-reset.service';
import { of, throwError } from 'rxjs';
import { DebugElement } from '@angular/core';
import { fakeAsync, flush } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from '../../services/login.service';
import { LanguagesModule } from 'projects/shared/src/app/languages/languages.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let passwordResetService: any;
  let el: DebugElement;
  let toastrResetSpy: any;
  let loginService: any;

  beforeEach(async(() => {
    const loginServiceSpy = jasmine.createSpyObj('LoginService', ['loginCheck']);

    const passResetServiceSpy = jasmine.createSpyObj('PasswordResetService', ['sendMail']);
    toastrResetSpy = jasmine.createSpyObj('ToastrService', ['error']);

    TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent],
      providers: [
        { provide: PasswordResetService, useValue: passResetServiceSpy },
        { provide: ToastrService, useValue: toastrResetSpy },
        { provide: LoginService, useValue: loginServiceSpy },

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
        passwordResetService = TestBed.inject(PasswordResetService);
        fixture = TestBed.createComponent(ForgotPasswordComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        fixture.detectChanges();
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('If send is not successful form display', () => {
    component.forgotPass.email = 'user@example.com';
    passwordResetService.sendMail.and.returnValue(of('success'));
    expect(component.showForm).toBeTruthy();
  });


  it('Form rendered', fakeAsync(() => {

    passwordResetService.sendMail.and.returnValue(of('success'));

    flush();

    const inputs: Array<DebugElement> = el.queryAll(By.css('input'));
    expect(inputs.length).toEqual(1, 'unexpected number of inputs');

    const buttonSubmit: Array<DebugElement> = el.queryAll(By.css('.mat-raised-button'));
    expect(buttonSubmit.length).toEqual(1, 'unexpected number of Submit Buttons');
  }));


  it('should check initial input', fakeAsync(() => {

    el = fixture.debugElement;
    const email = el.query(By.css('.Email'));
    fixture.detectChanges();
    flush();

    expect(email.nativeElement.value).toBe('');
  }));


  it('email field validation', () => {
    const email = component.form.controls.email;
    expect(email.valid).toBeFalsy();

    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();

    email.setValue('user');
    expect(email.valid).toBeFalsy();

    email.setValue('user@example.com');
    expect(email.valid).toBeTruthy();
  });


  it('should call the send function', () => {
    spyOn(component, 'send');
    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', fakeEvent);
    expect(component.send).toHaveBeenCalled();
  });


  it('at beginning form is empty button is disabled', () => {
    const submitEL: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(submitEL.nativeElement.disabled).toBe(true);
  });


  it('if form is invalid button is disabled', () => {
    component.form.controls.email.setValue('');
    const submitEL: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'));
    fixture.detectChanges();

    expect(submitEL.nativeElement.disabled).toBe(true);
  });


  it('form is valid button is enabled', () => {
    component.form.controls.email.setValue('user@example.com');
    const submitEL: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'));
    fixture.detectChanges();

    expect(submitEL.nativeElement.disabled).toBe(false);
  });


  it('If send is successful form not to display', () => {
    passwordResetService.sendMail.and.returnValue(of('success'));

    component.send();
    expect(component.showForm).toBeFalsy();
    expect(passwordResetService.sendMail).toHaveBeenCalled();
  });
});
