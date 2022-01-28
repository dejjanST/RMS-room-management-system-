import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SiteComponent } from './site.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientService } from '../../client/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteService } from '../site.service';
import { DebugElement, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguagesModule } from 'projects/shared/src/app/languages/languages.module';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { GlobalService } from '../../globalService/global.service';
import { ClipboardModule, CdkCopyToClipboard } from '@angular/cdk/clipboard';

const client = {
  data: {
    id: 1,
    name: 'Dejan',
    client_id: 111,
    country: 'Macedonia',
    city: 'Skopje',
    address: 'Filip Vtori',
    bank_account: '1212as12',
    bank_name: 'Halk',
    bank_country: 'Macedonia',
    active: 1
  }
};

const site = {
  data: {
    id: 1,
    name: 'siteName',
    client_id: 1,
    site_id: '1232',
    country: 'Macedonia',
    city: 'Skopje',
    address: 'Filip Vtori'
  }
};

const user = {
  company: {
    id: 123,
    name: 'User1'
  }
};

@Component({
  template: ''
})
class DummyComponent {
}

class GlobalServiceMock {
  client = {
    set() { },
    data$: of(client.data)
  };
  site = {
    set() { },
    data$: of(site.data)
  };
  user$ = of(user);
}

describe('Create Site', () => {
  let component: SiteComponent;
  let fixture: ComponentFixture<SiteComponent>;
  let siteService: any;
  let router: any;

  beforeEach(async(() => {
    const siteServiceSpy = jasmine.createSpyObj('SiteService', ['get', 'update', 'create']);

    TestBed.configureTestingModule({
      declarations: [SiteComponent],
      imports: [
        FormsModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatAutocompleteModule,
        MatButtonModule,
        HttpClientModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule,
        MatTableModule,
        MatSidenavModule,
        CommonModule,
        BrowserAnimationsModule,
        LanguagesModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatDialogModule,
        MatTabsModule,
        MatRadioModule,
        MatCheckboxModule,
        DragDropModule,
        MatExpansionModule,
        MatChipsModule,
        MatIconModule,
        ClipboardModule,
        RouterTestingModule.withRoutes([
          { path: 'clients/:id/sites', component: DummyComponent }
        ])
      ],
      providers: [
        { provide: SiteService, useValue: siteServiceSpy },
        { provide: GlobalService, useClass: GlobalServiceMock },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 0, }, }, }, },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    siteService = TestBed.inject(SiteService);
    siteService.get.and.returnValue(of(site));
    siteService.create.and.returnValue(of({ msg: 'success' }));
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(SiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Site name validation', () => {
    const siteName = component.form.controls.name;
    siteName.setValue('');
    expect(siteName.hasError('required')).toBeTruthy();
    expect(siteName.valid).toBeFalsy();

    siteName.setValue('aa');
    expect(siteName.hasError('minlength')).toBeTruthy();
    expect(siteName.valid).toBeFalsy();

    siteName.setValue('Marriott');
    expect(siteName.hasError('minlength')).toBeFalsy();
    expect(siteName.valid).toBeTruthy();
  });


  it('Site id validation', () => {
    const site_id = component.form.controls.site_id;
    site_id.setValue('');
    expect(site_id.hasError('required')).toBeTruthy();
    expect(site_id.valid).toBeFalsy();

    site_id.setValue('1212');
    expect(site_id.hasError('required')).toBeFalsy();
    expect(site_id.valid).toBeTruthy();
  });


  it('form is invalid, submit button is disabled', () => {
    component.form.controls.name.setValue('');
    component.form.controls.site_id.setValue('');
    component.form.controls.country.setValue('mkd');
    component.form.controls.city.setValue('asd');
    component.form.controls.address.setValue('asdsa');
    fixture.detectChanges();
    const submitBtn: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(submitBtn.nativeElement.disabled).toBe(true);
  });

  it('form is valid, submit button is enabled and on click call create method', () => {
    component.form.controls.name.setValue('username');
    component.form.controls.site_id.setValue('123');
    component.form.controls.country.setValue('mkd');
    component.form.controls.city.setValue('asd');
    component.form.controls.address.setValue('asdsa');
    fixture.detectChanges();
    const submitBtn: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(submitBtn.nativeElement.disabled).toBe(false);
    submitBtn.nativeElement.click();

    expect(siteService.create).toHaveBeenCalledTimes(1);
  });

  it('address, city and country field should get values from client', () => {
    const address = component.form.get('address').value;
    const country = component.form.get('country').value;
    const city = component.form.get('city').value;

    expect(address).toEqual('Filip Vtori');
    expect(country).toEqual('Macedonia');
    expect(city).toEqual('Skopje');
  });

  it('should call the save method', () => {
    spyOn(component, 'save');
    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', fakeEvent);
    expect(component.save).toHaveBeenCalled();
  });
});


describe('Edit Site', () => {
  let component: SiteComponent;
  let fixture: ComponentFixture<SiteComponent>;
  let siteService: any;
  let globalService: any;
  let router: any;

  beforeEach(async(() => {
    const clientServiceSpy = jasmine.createSpyObj('ClientService', ['get']);
    const siteServiceSpy = jasmine.createSpyObj('SiteService', ['get', 'update', 'create']);

    TestBed.configureTestingModule({
      declarations: [SiteComponent],
      imports: [
        FormsModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatAutocompleteModule,
        MatButtonModule,
        HttpClientModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule,
        MatTableModule,
        MatSidenavModule,
        CommonModule,
        BrowserAnimationsModule,
        LanguagesModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatDialogModule,
        MatTabsModule,
        MatRadioModule,
        MatCheckboxModule,
        DragDropModule,
        MatExpansionModule,
        MatChipsModule,
        MatIconModule,
        ClipboardModule,
        RouterTestingModule.withRoutes([
          { path: 'clients/:id/sites', component: DummyComponent }
        ])
      ],
      providers: [
        { provide: ClientService, useValue: clientServiceSpy },
        { provide: GlobalService, useClass: GlobalServiceMock },
        { provide: SiteService, useValue: siteServiceSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 1, }, }, }, },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    siteService = TestBed.inject(SiteService);
    globalService = TestBed.inject(GlobalService);
    siteService.get.and.returnValue(of(site));
    globalService.user$ = of(user);
    siteService.update.and.returnValue(of({ msg: 'success' }));
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(SiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Initially form is not empty, submit button is enabled', () => {
    const submitBtn: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(submitBtn.nativeElement.disabled).toBe(false);
  });


  it('form is valid, submit button is enabled and on click call update method', () => {
    component.form.controls.name.setValue('username');
    component.form.controls.site_id.setValue('123');
    component.form.controls.country.setValue('mkd');
    component.form.controls.city.setValue('asd');
    component.form.controls.address.setValue('asdsa');
    fixture.detectChanges();
    const submitBtn: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(submitBtn.nativeElement.disabled).toBe(false);
    submitBtn.nativeElement.click();

    expect(siteService.update).toHaveBeenCalledTimes(1);
  });
});
