import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { LandingPageComponent } from './landing-page.component';
import { LandingPageService } from './landing-page.service';
import { of, throwError, Observable } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimeAgoPipe } from 'projects/shared/src/app/pipes/time-ago.pipe';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

const mockSystemInfo = {
  data: {
    id_address: '172.21.0.4',
    uptime: 279860.25,
    partner_id: 1,
    serial_number: '2f96a925-369c-4239-a88c-875d6bda4180',
    site_name: 'Hilton Skopje',
    client_name: 'Hilton',
    last_modification: 12321321
  }
};

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let landingPageService: any;
  let fixture: ComponentFixture<LandingPageComponent>;
  let systemInfoSpy: any;

  beforeEach(async(() => {
    systemInfoSpy = jasmine.createSpyObj('LandingPageService', ['getSystemInfo', 'create']);

    TestBed.configureTestingModule({
      declarations: [LandingPageComponent, TimeAgoPipe],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatCardModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: LandingPageService, useValue: systemInfoSpy },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    landingPageService = TestBed.inject(LandingPageService);
  });

  it('should create', () => {
    systemInfoSpy.getSystemInfo.and.returnValue(of(mockSystemInfo));
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display system info', () => {
    systemInfoSpy.getSystemInfo.and.returnValue(of(mockSystemInfo));
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const systemInfo = fixture.nativeElement.querySelectorAll('mat-card-content li');
    expect(systemInfo.length).toBe(6);

    const siteName = fixture.debugElement.nativeElement.querySelector('#siteName p:last-child');
    expect(siteName.innerHTML).toContain('Hilton Skopje');
  });


  it('should display form', fakeAsync(() => {
    landingPageService.getSystemInfo.and.returnValue(throwError({ status: 404 }));
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    flush();

    expect(component.showForm).toBe(true);
  }));


  it('form is valid, submit button shuld be enabled and on click call create method', fakeAsync(() => {
    landingPageService.create.and.returnValue(of({ msg: 'success' }));
    landingPageService.getSystemInfo.and.returnValue(throwError({ status: 404 }));
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const submitEL: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(submitEL.nativeElement.disabled).toBe(true);

    component.form.controls.serialNumber.setValue('112231');
    component.form.controls.partnerId.setValue(111);

    fixture.detectChanges();
    const submitEL1: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(submitEL1.nativeElement.disabled).toBe(false);
    submitEL1.nativeElement.click();
    fixture.detectChanges();

    flush();

    expect(systemInfoSpy.create).toHaveBeenCalledTimes(1);
  }));
});
