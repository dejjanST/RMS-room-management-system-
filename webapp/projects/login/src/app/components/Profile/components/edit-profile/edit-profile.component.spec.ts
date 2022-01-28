import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { of, throwError } from 'rxjs';
import { EditProfileComponent } from './edit-profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { EditProfileService } from '../../services/edit-profile.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LogoutComponent } from '../../../logout/logout.component';
import { LoginComponent } from '../../../login/login.component';
import { ForgotPasswordComponent } from '../../../forgot-password/forgot-password.component';
import { PasswordResetComponent } from '../../../password-reset/password-reset.component';
import { LanguagesModule } from 'projects/shared/src/app/languages/languages.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

const user = {
  data: {
    first_name: 'Dejan',
    last_name: 'Mark'
  }
};

describe('EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;
  let editProfileService: any;
  let router: any;
  let el: DebugElement;
  let editProfServiceSpy: any;


  beforeEach(async(() => {
    editProfServiceSpy = jasmine.createSpyObj('EditProfileService', ['editProfile', 'updateProfile']);

    TestBed.configureTestingModule({
      declarations: [EditProfileComponent,
        LogoutComponent,
        LoginComponent,
        PasswordResetComponent,
        ForgotPasswordComponent]
      ,
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        HttpClientModule,
        HttpClientTestingModule,
        MatDividerModule,
        LanguagesModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        { provide: EditProfileService, useValue: editProfServiceSpy },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    editProfileService = TestBed.get(EditProfileService);
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('editProfile method to be called', () => {
    editProfServiceSpy.editProfile.and.returnValue(of(user));
    fixture.detectChanges();

    expect(editProfileService.editProfile).toHaveBeenCalled();
  });


  it('Test if use is not logged in, should redirect to /', () => {
    editProfServiceSpy.editProfile.and.returnValue(throwError({ status: 400 }));

    expect(router.url).toEqual('/');
  });


  it('Test if user is logged in', () => {
    editProfServiceSpy.editProfile.and.returnValue(of(user));
    fixture.detectChanges();

    el = fixture.debugElement;

    const inputs: Array<DebugElement> = el.queryAll(By.css('input'));
    expect(inputs.length).toEqual(5, 'unexpected number of inputs');

    const buttonSubmit: Array<DebugElement> = el.queryAll(By.css('.mat-raised-button'));
    expect(buttonSubmit.length).toEqual(1, 'unexpected number of Submit Buttons');
  });


  it('Test if First Name and Last Name are filled in', () => {
    editProfServiceSpy.editProfile.and.returnValue(of(user));
    fixture.detectChanges();

    const fname = component.form.controls.firstName;
    expect(fname.valid).toBeTruthy();

    const lname = component.form.controls.lastName;
    expect(lname.valid).toBeTruthy();

    const submitEL: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'));
    fixture.detectChanges();

    expect(submitEL.nativeElement.disabled).toBe(false);
  });


  it('Test if First Name and Last Name are empty', () => {
    editProfServiceSpy.editProfile.and.returnValue(of(user));
    fixture.detectChanges();

    const fname = component.form.controls.firstName;
    expect(fname.valid).toBeTruthy();

    const lname = component.form.controls.lastName;
    expect(lname.valid).toBeTruthy();

    fname.setValue('');
    expect(fname.valid).toBeFalsy();
    expect(fname.hasError('required')).toBeTruthy();

    lname.setValue('');
    expect(lname.valid).toBeFalsy();
    expect(lname.hasError('required')).toBeTruthy();

    const submitEL: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'));
    fixture.detectChanges();

    expect(submitEL.nativeElement.disabled).toBe(true);
  });


  it('Test to change the password - Valid form', () => {
    editProfServiceSpy.editProfile.and.returnValue(of(user));
    fixture.detectChanges();

    const fname = component.form.controls.firstName;
    expect(fname.valid).toBeTruthy();

    const lname = component.form.controls.lastName;
    expect(lname.valid).toBeTruthy();

    const oldPass = component.form.controls.oldPassword;
    oldPass.setValue('1212');
    expect(oldPass.valid).toBeTruthy();

    const newPass = component.form.controls.newPassword;
    newPass.setValue('1234');
    expect(newPass.valid).toBeTruthy();

    const confPass = component.form.controls.confirmPassword;
    confPass.setValue('1234');
    expect(confPass.valid).toBeTruthy();

    const submitEL1: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'));
    fixture.detectChanges();

    expect(submitEL1.nativeElement.disabled).toBe(false);
  });


  it('password validation', () => {
    editProfServiceSpy.editProfile.and.returnValue(of(user));
    fixture.detectChanges();

    const fname = component.form.controls.firstName;
    expect(fname.valid).toBeTruthy();

    const lname = component.form.controls.lastName;
    expect(lname.valid).toBeTruthy();

    const oldPass = component.form.controls.oldPassword;
    oldPass.setValue('1212');
    expect(oldPass.valid).toBeTruthy();

    const newPass = component.form.controls.newPassword;
    newPass.setValue('1234');
    expect(newPass.valid).toBeTruthy();

    const confPass = component.form.controls.confirmPassword;
    confPass.setValue('1111');
    expect(confPass.valid).toBeFalsy();

    const submitEL1: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'));
    fixture.detectChanges();

    expect(submitEL1.nativeElement.disabled).toBe(true);

    // New pass and Retype are equal, current pass is empty

    newPass.setValue('1111');
    expect(newPass.valid).toBeTruthy();

    confPass.setValue('1111');
    expect(confPass.valid).toBeTruthy();

    oldPass.setValue('');

    expect(submitEL1.nativeElement.disabled).toBe(true);
  });


  it('should call the update function', () => {
    editProfServiceSpy.editProfile.and.returnValue(of(user));
    fixture.detectChanges();
    spyOn(component, 'update');
    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', fakeEvent);
    fixture.detectChanges();

    expect(component.update).toHaveBeenCalled();
  });
});

