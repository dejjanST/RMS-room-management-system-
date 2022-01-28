import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { of, throwError } from 'rxjs';
import { EditProfileComponent } from './edit-profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { EditProfileService } from '../../services/edit-profile.service';
import { PostProfile, ResponseProfile } from '../../models/profile';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import { fakeAsync, flush } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

const USER_OBJECT: ResponseProfile = new ResponseProfile();
USER_OBJECT.first_name = 'John';
USER_OBJECT.last_name = 'Doe';
USER_OBJECT.active = true;
USER_OBJECT.id = 1;
USER_OBJECT.email = 'demo@demo.com';

describe('EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;
  let editProfileService: any;
  let router: Router;
  let el: DebugElement;

  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const editProfServiceSpy = jasmine.createSpyObj('EditProfileService', ['editProfile', 'updateProfile']);

    TestBed.configureTestingModule({
      declarations: [EditProfileComponent],
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
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        { provide: EditProfileService, useValue: editProfServiceSpy },
        { provide: Router, useValue: routerSpy },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    editProfileService = TestBed.get(EditProfileService);
    router = TestBed.get(Router);
  });

  it('should create', () => {
    editProfileService.editProfile.and.returnValue(of(USER_OBJECT));
    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('editProfile method to be called', () => {
    editProfileService.editProfile.and.returnValue(of(USER_OBJECT));
    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(editProfileService.editProfile).toHaveBeenCalled();
  });


  it('get user from api', () => {
    editProfileService.editProfile.and.returnValue(of(USER_OBJECT));
    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.user).toEqual(USER_OBJECT);
  });


  it('should not redirect', () => {
    editProfileService.editProfile.and.returnValue(throwError({ status: 500 }));
    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(router.navigate).not.toHaveBeenCalledWith(['/']);

  });


  it('should redirect', () => {
    editProfileService.editProfile.and.returnValue(throwError({ status: 400 }));
    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });


  it('Form should render', fakeAsync(() => {
    editProfileService.editProfile.and.returnValue(throwError({ status: 400 }));
    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    el = fixture.debugElement;

    flush();

    const inputs: Array<DebugElement> = el.queryAll(By.css('input'));
    expect(inputs.length).toEqual(5, 'unexpected number of inputs');

    const buttonSubmit: Array<DebugElement> = el.queryAll(By.css('.mat-raised-button'));
    expect(buttonSubmit.length).toEqual(1, 'unexpected number of Submit Buttons');
  }));


  it('should check initial input', fakeAsync(() => {
    editProfileService.editProfile.and.returnValue(throwError({ status: 400 }));
    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    fixture.detectChanges();

    flush();

    fixture.detectChanges();
    const buttonSub = el.query(By.css('button[type="submit"]')).nativeElement.disabled;

    expect(buttonSub).toBeTruthy();
  }));


  it('should check initial input', fakeAsync(() => {

    editProfileService.editProfile.and.returnValue(throwError({ status: 400 }));

    editProfileService.updateProfile.and.returnValue(of('success'));
    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;


    fixture.detectChanges();
    flush();

    component.update();

    expect(editProfileService.updateProfile).toHaveBeenCalled();
  }));
});
