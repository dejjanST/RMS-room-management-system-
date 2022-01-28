import { async, ComponentFixture, TestBed, flush } from '@angular/core/testing';
import { of } from 'rxjs';
import { ClientComponent } from './client.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientService } from '../client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DebugElement, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { fakeAsync } from '@angular/core/testing';
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

const client = {
  data: {
    id: 1,
    name: 'Dejan',
    client_id: 111,
    country: 'mkd',
    city: 'grad',
    address: 'asdas',
    bank_account: 'asdasd',
    bank_name: 'halk',
    bank_country: 'asdsd',
    phone: '1133322',
    email: 'user@example.com',
    active: 1
  }
};

const user = {
  company: {
    id: 123,
    name: 'User1'
  }
};

class GlobalServiceMock {
  client = {
    data$: of(client.data),
    set() { },
    service: {
      updated$: of()
    }
  };

  user$ = of(user);
}

@Component({
  template: ''
})
class DummyComponent {
}

describe('ClientComponent', () => {
  let component: ClientComponent;
  let fixture: ComponentFixture<ClientComponent>;
  let clientService: any;
  let router: any;

  beforeEach(async(() => {
    const clientServiceSpy = jasmine.createSpyObj('ClientService', ['update', 'create']);

    TestBed.configureTestingModule({
      declarations: [ClientComponent],
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
        RouterTestingModule.withRoutes([
          { path: 'clients', component: DummyComponent }
        ])
      ],
      providers: [
        { provide: ClientService, useValue: clientServiceSpy },
        { provide: GlobalService, useClass: GlobalServiceMock },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 0, }, }, }, },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    clientService = TestBed.inject(ClientService);
    clientService.create.and.returnValue(of({ msg: 'success' }));
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('show content of mat-card-title)', () => {
    const forms: DebugElement = fixture.debugElement.query(By.css('.mat-card'));
    expect(forms).toBeTruthy();

    const paragraphDe: DebugElement = fixture.debugElement.query(By.css('.mat-card-title'));
    expect(paragraphDe).toBeTruthy();
  });


  it('form is invalid, submit button should be disabled', () => {
    component.form.controls.name.setValue('');
    component.form.controls.client_id.setValue('');
    component.form.controls.country.setValue('');
    component.form.controls.city.setValue('');
    component.form.controls.address.setValue('');
    component.form.controls.bank_account.setValue('');
    component.form.controls.bank_name.setValue('');
    component.form.controls.bank_country.setValue('');
    component.form.controls.phone.setValue('');
    component.form.controls.email.setValue('');
    component.form.controls.status.setValue('');

    const submitEL1: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(submitEL1.nativeElement.disabled).toBe(true);
  });


  it('Client status validation', () => {
    const status = component.form.controls.status;
    component.form.controls.status.setValue('');

    expect(status.hasError('required')).toBeTruthy();
    expect(status.valid).toBeFalsy();

    status.setValue(111);
    expect(status.hasError('required')).toBeFalsy();
    expect(status.valid).toBeTruthy();
  });


  it('Client name validation', () => {
    const clientName = component.form.controls.name;
    clientName.setValue('');
    expect(clientName.hasError('required')).toBeTruthy();
    expect(clientName.valid).toBeFalsy();

    clientName.setValue('u');
    expect(clientName.hasError('minlength')).toBeTruthy();
    expect(clientName.valid).toBeFalsy();

    clientName.setValue('username');
    expect(clientName.hasError('minlength')).toBeFalsy();
    expect(clientName.valid).toBeTruthy();
  });


  it('Client id validation', () => {
    const client_id = component.form.controls.client_id;
    client_id.setValue('');
    expect(client_id.hasError('required')).toBeTruthy();
    expect(client_id.valid).toBeFalsy();

    client_id.setValue(111);
    expect(client_id.hasError('required')).toBeFalsy();
    expect(client_id.valid).toBeTruthy();
  });


  it('Email validation', () => {
    const email = component.form.controls.email;
    email.setValue('user');
    expect(email.hasError('email')).toBeTruthy();
    expect(email.valid).toBeFalsy();

    email.setValue('user@example.com');
    expect(email.hasError('required')).toBeFalsy();
    expect(email.valid).toBeTruthy();
  });

  it('Status select validation', () => {
    const status = component.form.controls.status;
    status.setValue('1');
    expect(status.hasError('required')).toBeFalsy();
    expect(status.valid).toBeTruthy();
  });

  it('form is valid, submit button should be enabled and on click call create method', fakeAsync(() => {

    const submitEL: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(submitEL.nativeElement.disabled).toBe(true);

    component.form.controls.name.setValue('username');
    component.form.controls.client_id.setValue(111);
    component.form.controls.country.setValue('mkd');
    component.form.controls.city.setValue('asd');
    component.form.controls.address.setValue('asdsa');
    component.form.controls.bank_account.setValue('1232');
    component.form.controls.bank_name.setValue('halk');
    component.form.controls.bank_country.setValue('mkd');
    component.form.controls.phone.setValue('111222333');
    component.form.controls.email.setValue('user@example.com');
    component.form.controls.status.setValue(1);
    fixture.detectChanges();
    const submitEL1: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(submitEL1.nativeElement.disabled).toBe(false);
    submitEL1.nativeElement.click();
    fixture.detectChanges();

    flush();

    expect(clientService.create).toHaveBeenCalledTimes(1);
  }));
});


describe('Update Client', () => {
  let component: ClientComponent;
  let fixture: ComponentFixture<ClientComponent>;
  let clientService: any;
  let router: any;


  beforeEach(async(() => {
    const clientServiceSpy = jasmine.createSpyObj('ClientService', ['update', 'create']);

    TestBed.configureTestingModule({
      declarations: [ClientComponent],
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
        RouterTestingModule.withRoutes([
          { path: 'clients', component: DummyComponent }
        ])
      ],
      providers: [
        { provide: ClientService, useValue: clientServiceSpy },
        { provide: GlobalService, useClass: GlobalServiceMock },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 1, }, }, }, },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    clientService = TestBed.inject(ClientService);
    clientService.update.and.returnValue(of({ msg: 'success' }));

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('form is valid, submit button shuld be enabled and on click call update method', fakeAsync(() => {

    const submitEL: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(submitEL.nativeElement.disabled).toBe(true);

    component.form.controls.name.setValue('username');
    component.form.controls.client_id.setValue(111);
    component.form.controls.country.setValue('mkd');
    component.form.controls.city.setValue('asd');
    component.form.controls.address.setValue('asdsa');
    component.form.controls.bank_account.setValue('1232');
    component.form.controls.bank_name.setValue('halk');
    component.form.controls.bank_country.setValue('mkd');
    component.form.controls.phone.setValue('111222333');
    component.form.controls.email.setValue('user@example.com');
    component.form.controls.status.setValue(1);
    fixture.detectChanges();

    expect(submitEL.nativeElement.disabled).toBe(false);
    submitEL.nativeElement.click();
    fixture.detectChanges();

    flush();

    expect(clientService.update).toHaveBeenCalledTimes(1);
  }));
});
