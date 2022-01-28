import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SendMailDialogComponent } from './send-mail-dialog.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from 'projects/shared/src/app/modules/loader/loader.module';
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
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';

describe('SendMailDialogComponent', () => {
  let component: SendMailDialogComponent;
  let fixture: ComponentFixture<SendMailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SendMailDialogComponent],
      imports: [
        BrowserModule,
        FormsModule,
        LoaderModule,
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
      ],
      providers: [
        {
          provide: MatDialogRef, useValue: { close: (dialogResult: any) => { } }
        },
        {
          provide: MAT_DIALOG_DATA, useValue: {
            data:
            {
              id: 14, name: 'Test', status: 1, file_id: 23, site_id: 1, client_id: 1, site_name: 'kumanovo', client_name: 'boirs',
              client_code: 1, site_code: 0, created_at: 1594630013, number_of_buildings: 2, number_of_receptions: 1,
              items: {
                ut: [{ utd_id: 1, utd_name: 'Ednosoben apartman', quantity: 100 }],
                additional: [
                  { equipment_id: 76, model: 'WS - AI', description: 'Windows Additional Item', quantity: 200 },
                  { equipment_id: 85, model: 'EMDL', description: 'Electromechanical door lock', quantity: 100 }
                ]
              }
            }
          }
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(SendMailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('testing form validation', () => {
    expect(component.form.valid).toBeFalsy();
    // all fields are required

    // email field
    const email = component.form.get('email');
    expect(email.hasError('required')).toBeTruthy();

    email.setValue('test');

    expect(email.hasError('required')).toBeFalsy();
    expect(email.hasError('email')).toBeTruthy();

    email.setValue('test@ved.mk');
    expect(email.hasError('required')).toBeFalsy();
    expect(email.hasError('email')).toBeFalsy();


    // subject field
    expect(component.form.valid).toBeFalsy();
    const subject = component.form.get('subject');

    subject.setValue('t');
    expect(subject.hasError('minlength')).toBeTruthy();

    subject.setValue('test');
    expect(subject.hasError('minlength')).toBeFalsy();


    // message field
    expect(component.form.valid).toBeFalsy();
    const message = component.form.get('message');

    message.setValue('t');
    expect(message.hasError('minlength')).toBeTruthy();

    message.setValue('test');
    expect(message.hasError('minlength')).toBeFalsy();

    // after valid form submit button should be enabled
    fixture.detectChanges();
    const submitBtn = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(submitBtn.nativeElement.disabled).toBeFalsy();
  });


});
