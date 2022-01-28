import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { fakeAsync, tick, flush } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { BrowserModule } from '@angular/platform-browser';
import { LogoutComponent } from './logout.component';
import { AppRoutingModule } from '../../app-routing.module';
import { LoginComponent } from '../login/login.component';
import { PasswordResetComponent } from '../password-reset/password-reset.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { throwError, of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { EditProfileComponent } from '../Profile/components/edit-profile/edit-profile.component';
import { LanguagesModule } from 'projects/shared/src/app/languages/languages.module';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let el: DebugElement;
  let loginService: any;
  let router: any;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    const loginServiceSpy = jasmine.createSpyObj('LoginService', ['loginCheck']);

    TestBed.configureTestingModule({
      declarations: [
        LogoutComponent,
        LoginComponent,
        PasswordResetComponent,
        ForgotPasswordComponent,
        EditProfileComponent
      ],
      imports: [
        ReactiveFormsModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        HttpClientModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule,
        CommonModule,
        BrowserAnimationsModule,
        LanguagesModule,
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule
      ],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
      ]
    })
      .compileComponents()
      .then(() => {
        loginService = TestBed.get(LoginService);
        router = TestBed.get(Router);
        httpMock = TestBed.get(HttpTestingController);
      });
  }));


  afterEach(() => {
    httpMock.verify();
  });



  it('should create', fakeAsync(() => {
    loginService.loginCheck.and.returnValue(throwError({ status: 400 }));
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    flush();

    expect(component).toBeTruthy();
  }));


  it('form rendered', () => {
    loginService.loginCheck.and.returnValue(throwError({ status: 400 }));
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    el = fixture.debugElement;
    const buttonSubmit: Array<DebugElement> = el.queryAll(By.css('.submitButton'));

    expect(router.url).toEqual('/');
    expect(buttonSubmit.length).toEqual(1, 'unexpected number of Submit Buttons');
  });


  it('should redirect to /loggedin if you are logged in', fakeAsync(() => {
    loginService.loginCheck.and.returnValue(of('success'));
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    flush();

    expect(router.url).toEqual('/loggedin');
  }));


  it('should logout after click Log Out button', fakeAsync(() => {
    loginService.loginCheck.and.returnValue(throwError({ status: 400 }));
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    const buttonSubmit: DebugElement = el.query(By.css('.submitButton'));
    buttonSubmit.nativeElement.click();
    fixture.detectChanges();

    flush();

    const mockReq = httpMock.expectOne(req => req.url === '/api/session/' && req.method === 'DELETE');
    mockReq.flush('coockie deleted');

    expect(router.url).toEqual('/');
  }));

});
