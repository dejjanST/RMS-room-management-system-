import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MailerSettingsComponent } from './mailer-settings.component';
import { mailerSettingsMock } from './mailer-settings.mock';
import { MailerSettingsService } from './mailer-settings.service';


describe('MailerSettingsComponent', () => {
  let component: MailerSettingsComponent;
  let fixture: ComponentFixture<MailerSettingsComponent>;
  let mailerSettingsService: any;

  beforeEach(async(() => {
    const mailerSettingsServiceSpy = jasmine.createSpyObj('MailerSettingsService', ['get', 'test', 'create']);
    TestBed.configureTestingModule({
      declarations: [MailerSettingsComponent],
      imports: [
        BrowserAnimationsModule,
        MatCardModule,
        MatToolbarModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatIconModule
      ],
      providers: [
        { provide: MailerSettingsService, useValue: mailerSettingsServiceSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    mailerSettingsService = TestBed.inject(MailerSettingsService);
    mailerSettingsService.get.and.returnValue(of(mailerSettingsMock));
    mailerSettingsService.create.and.returnValue(of({ msg: 'succes' }));
    mailerSettingsService.test.and.returnValue(of({ msg: 'succes' }));

    fixture = TestBed.createComponent(MailerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('testMail() should call mailerSettingsService.test() and set testSuccess on true after succes response ', () => {
    const submitBtn = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(submitBtn.nativeElement.disabled).toBeTruthy();

    component.testEmail();
    expect(mailerSettingsService.test).toHaveBeenCalledTimes(1);
    expect(component.testSucces).toBeTrue();
    // after success test SAVE button should be enabled
    fixture.detectChanges();
    expect(submitBtn.nativeElement.disabled).toBeFalsy();

    // after succes test, if change anything in form, SAVE button should be disabled and need to test mail again.
    component.form.get('email').patchValue('test@test.com');
    fixture.detectChanges();
    expect(submitBtn.nativeElement.disabled).toBeTruthy();

  });

  it('create method should call mailerSettingsService.create()', () => {
    component.submit();
    expect(mailerSettingsService.create).toHaveBeenCalledTimes(1);
  });



});
