import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LanguagesModule } from 'projects/shared/src/app/languages/languages.module';
import { of } from 'rxjs';
import { key, keyTypesList } from '../../access-mock';
import { KeyService } from '../../key.service';
import { KeyComponent } from './key.component';


@Component({
  template: ''
})
class DummyComponent {
}

describe('KeyComponent create', () => {
  let component: KeyComponent;
  let fixture: ComponentFixture<KeyComponent>;
  let cardService: any;
  let router: any;

  beforeEach(async(() => {
    const cardServiceSpy = jasmine.createSpyObj('KeyService', ['create', 'getKeyTypes']);

    TestBed.configureTestingModule({
      declarations: [KeyComponent],
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
        MatNativeDateModule,
        MatDatepickerModule,
        MatInputModule,
        RouterTestingModule.withRoutes([
          { path: 'card', component: DummyComponent }
        ])
      ],
      providers: [
        { provide: KeyService, useValue: cardServiceSpy },
        // { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 0, }, }, }, },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    cardService = TestBed.inject(KeyService);
    cardService.getKeyTypes.and.returnValue(of(keyTypesList));
    cardService.create.and.returnValue(of({ msg: 'success' }));
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(KeyComponent);
    component = fixture.componentInstance;
    component.keyNumber = 0;
    component.keyId = null;
    component.editMode = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('show content of mat-card-title)', () => {
    const forms: DebugElement = fixture.debugElement.query(By.css('.mat-card'));
    expect(forms).toBeTruthy();
  });

  it('form is invalid, submit button should be disabled', () => {
    component.form.controls.desc.setValue('');
    component.form.controls.valid_from.setValue('');
    component.form.controls.valid_to.setValue('');
    component.form.controls.key_no.setValue('');
    component.form.controls.key_type.setValue('');

    const submitEL1: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(submitEL1.nativeElement.disabled).toBe(true);
  });
});


describe('KeyComponent update', () => {
  let component: KeyComponent;
  let fixture: ComponentFixture<KeyComponent>;
  let keyService: any;
  let router: any;

  beforeEach(async(() => {
    const keyServiceSpy = jasmine.createSpyObj('KeyService', ['get', 'update', 'getKeyTypes']);

    TestBed.configureTestingModule({
      declarations: [KeyComponent],
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
        MatNativeDateModule,
        MatDatepickerModule,
        MatInputModule,
        RouterTestingModule.withRoutes([
          { path: 'key', component: DummyComponent }
        ])
      ],
      providers: [
        { provide: KeyService, useValue: keyServiceSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 2, }, }, }, },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    keyService = TestBed.inject(KeyService);
    keyService.get.and.returnValue(of(JSON.parse(JSON.stringify(key))));
    keyService.getKeyTypes.and.returnValue(of(keyTypesList));
    keyService.update.and.returnValue(of({ msg: 'success' }));
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(KeyComponent);
    component = fixture.componentInstance;
    component.keyNumber = 2;
    component.keyId = 2;
    component.editMode = false;
    component.responseKey = {
      data:
      {
        description: 'desc',
        id: 2,
        key_no: '111',
        key_type: 2,
        valid_from: 1602540000,
        valid_to: null,
        groups: [{ id: 4 }],
        acl: []
      }
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Card description validation', () => {
    const desc = component.form.controls.desc;
    component.form.controls.desc.setValue('');

    expect(desc.hasError('required')).toBeTruthy();
    expect(desc.valid).toBeFalsy();

    desc.setValue('Key1');
    expect(desc.hasError('required')).toBeFalsy();
    expect(desc.valid).toBeTruthy();
  });

  it('Valid From - validation', () => {
    const valid_from = component.form.controls.valid_from;
    component.form.controls.valid_from.setValue('');

    expect(valid_from.hasError('required')).toBeTruthy();
    expect(valid_from.valid).toBeFalsy();

    // const x = new Date('Wed Sep 09 2020 00:00:00').getTime() / 100;
    valid_from.setValue('1599602400');

    const validFrom = fixture.debugElement.query(By.css('#validFrom'));
    validFrom.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(valid_from.hasError('required')).toBeFalsy();
    expect(valid_from.valid).toBeTruthy();
  });

  it('Valid To - validation', () => {
    const valid_to = component.form.controls.valid_to;
    component.form.controls.valid_to.setValue('');

    // const x = new Date('Wed Sep 10 2020 00:00:00').getTime() / 100;
    valid_to.setValue('1599688800');

    const validTo = fixture.debugElement.query(By.css('#validTo'));
    validTo.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(valid_to.hasError('required')).toBeFalsy();
    // expect(valid_to.valid).toBeTruthy();
  });

  it('Card number validation', () => {
    const cardNo = component.form.controls.key_no;
    cardNo.setValue('');
    expect(cardNo.hasError('required')).toBeTruthy();
    expect(cardNo.valid).toBeFalsy();

    // cardNo.setValue('u');
    // expect(cardNo.hasError('minlength')).toBeTruthy();
    // expect(cardNo.valid).toBeFalsy();

    cardNo.setValue('11adx2');
    // expect(cardNo.hasError('minlength')).toBeFalsy();
    expect(cardNo.valid).toBeTruthy();
  });

  it('Card type validation', () => {
    const cardType = component.form.controls.key_type;
    cardType.setValue('');
    expect(cardType.hasError('required')).toBeTruthy();
    expect(cardType.valid).toBeFalsy();

    cardType.setValue(1);
    expect(cardType.hasError('required')).toBeFalsy();
    expect(cardType.valid).toBeTruthy();
  });

  it('form is valid, submit button should be enabled and on click call update method', () => {
    component.keyId = 2;
    component.editMode = true;
    component.form.controls.key_no.setValue('11dd22');
    component.form.controls.desc.setValue('Key1');

    component.form.controls.valid_from.setValue('1599602400');
    const validFrom = fixture.debugElement.query(By.css('#validFrom'));
    validFrom.nativeElement.dispatchEvent(new Event('input'));

    component.form.controls.valid_to.setValue('1599688800');
    const validTo = fixture.debugElement.query(By.css('#validTo'));
    validTo.nativeElement.dispatchEvent(new Event('input'));

    component.form.controls.key_type.setValue(1);
    fixture.detectChanges();

    const submitEL1: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(submitEL1.nativeElement.disabled).toBe(false);
    submitEL1.nativeElement.click();

    expect(keyService.update).toHaveBeenCalledTimes(1);
  });
});
