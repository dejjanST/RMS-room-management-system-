import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { PasswordResetComponent } from './password-reset.component';
import { PasswordResetService } from '../../services/password-reset.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { fakeAsync, flush } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { LanguagesModule } from 'projects/shared/src/app/languages/languages.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

describe('PasswordResetComponent', () => {
  let component: PasswordResetComponent;
  let fixture: ComponentFixture<PasswordResetComponent>;
  let passwordResetService: any;
  let el: DebugElement;
  let passResetServiceSpy: any;
  let router: Router;

  beforeEach(async(() => {

    passResetServiceSpy = jasmine.createSpyObj('PasswordResetService', ['resetPass', 'loginCheck']);

    TestBed.configureTestingModule({
      declarations: [PasswordResetComponent],
      providers: [
        { provide: PasswordResetService, useValue: passResetServiceSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 123, }, }, }, },
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
        fixture = TestBed.createComponent(PasswordResetComponent);
        component = fixture.componentInstance;
        router = TestBed.get(Router);
        passwordResetService = TestBed.get(PasswordResetService);
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('If reset is successful form not to display', () => {
    passwordResetService.resetPass.and.returnValue(of('success'));

    component.reset();
    expect(component.showForm).toBeFalsy();
  });

  it('If reset is not successful form display', () => {
    passwordResetService.resetPass.and.returnValue(of('success'));

    expect(component.showForm).toBeTruthy();
  });


  it('Form rendered', fakeAsync(() => {
    passwordResetService.resetPass.and.returnValue(of('success'));
    el = fixture.debugElement;

    flush();

    const inputs: Array<DebugElement> = el.queryAll(By.css('input'));
    expect(inputs.length).toEqual(2, 'unexpected number of inputs');

    const buttonSubmit: Array<DebugElement> = el.queryAll(By.css('.mat-raised-button'));
    expect(buttonSubmit.length).toEqual(1, 'unexpected number of Submit Buttons');
  }));


  it('should check initial input', fakeAsync(() => {
    el = fixture.debugElement;

    const pass = el.query(By.css('.Password'));
    const confirm = el.query(By.css('.Confirm'));

    fixture.detectChanges();

    flush();

    fixture.detectChanges();
    const buttonSub = el.query(By.css('button[type="submit"]')).nativeElement.disabled;

    expect(buttonSub).toBeTruthy();

    expect(pass.nativeElement.value).toBe('');
    expect(confirm.nativeElement.value).toBe('');
  }));



  it('password field validity', () => {
    const pass = component.form.controls.password;
    expect(pass.valid).toBeFalsy();

    pass.setValue('');
    expect(pass.hasError('required')).toBeTruthy();

    pass.setValue('1234');
    expect(pass.hasError('required')).toBeFalsy();

    pass.setValue('123');
    expect(pass.valid).toBeFalsy();

    pass.setValue('1234');
    expect(pass.valid).toBeTruthy();
  });


  it('password confirm field validity', () => {
    const cpass = component.form.controls.confirm_password;
    expect(cpass.valid).toBeFalsy();

    cpass.setValue('');
    expect(cpass.hasError('required')).toBeTruthy();

    cpass.setValue('1234');
    expect(cpass.hasError('required')).toBeFalsy();
    expect(cpass.errors.required).toBeFalsy();

    cpass.setValue('123');
    expect(cpass.valid).toBeFalsy();
  });


  it('check if password is equal or not equal to confirm password', () => {
    const pass = component.form.controls.password;
    const cpass = component.form.controls.confirm_password;

    pass.setValue('1234');
    cpass.setValue('1234');
    expect(cpass.valid).toBeTruthy();

    pass.setValue('123');
    cpass.setValue('1234');
    expect(cpass.valid).toBeFalsy();

    pass.setValue('1234');
    cpass.setValue('123');
    expect(cpass.valid).toBeFalsy();

    pass.setValue('1234');
    cpass.setValue('123');
    expect(cpass.hasError('confirmedValidator')).toBeTruthy();
  });


  it('form should be invalid', () => {
    component.form.controls.password.setValue('');
    component.form.controls.confirm_password.setValue('');
    expect(component.form.valid).toBeFalsy();
  });


  it('form should be valid', () => {
    component.form.controls.password.setValue('1212');
    component.form.controls.confirm_password.setValue('1212');
    expect(component.form.valid).toBeTruthy();
  });


  it('should call the reset function', () => {
    spyOn(component, 'reset');
    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', fakeEvent);
    expect(component.reset).toHaveBeenCalled();
  });


  it('form is invalid button is disabled', () => {
    const submitEL: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(submitEL.nativeElement.disabled).toBe(true);
  });


  it('form is valid button is enabled', () => {
    component.form.controls.password.setValue('1212');
    component.form.controls.confirm_password.setValue('1212');
    const submitEL: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'));
    fixture.detectChanges();

    expect(submitEL.nativeElement.disabled).toBe(false);
  });

  it('If reset is successful form not to display', () => {
    passwordResetService.resetPass.and.returnValue(of('success'));

    component.reset();
    expect(component.submitted).toBeTruthy();
    expect(passwordResetService.resetPass).toHaveBeenCalled();
  });
});
