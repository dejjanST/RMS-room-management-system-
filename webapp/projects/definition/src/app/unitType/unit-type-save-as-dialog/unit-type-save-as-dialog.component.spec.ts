import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UnitTypeSaveAsDialogComponent } from './unit-type-save-as-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
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
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';

describe('UnitTypeSaveAsDialogComponent', () => {
  let component: UnitTypeSaveAsDialogComponent;
  let fixture: ComponentFixture<UnitTypeSaveAsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnitTypeSaveAsDialogComponent],
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
        MatIconModule
      ],
      providers: [
        {
          provide: MatDialogRef, useValue: { close: (dialogResult: any) => { } }
        },
        {
          provide: MAT_DIALOG_DATA, useValue: {
            data: { name: 'Unit Type 1' }
          }
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitTypeSaveAsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test form control validation', () => {
    expect(component.nameFormControl.valid).toBeTruthy();

    // reset form control, form should be invalid and save button should be disabled
    component.nameFormControl.reset();
    expect(component.nameFormControl.valid).toBeFalsy();
    const saveBtn = fixture.debugElement.query(By.css('#saveBtn'));

    fixture.detectChanges();
    expect(saveBtn.nativeElement.disabled).toBeTruthy();
    expect(component.nameFormControl.hasError('required')).toBeTruthy();

    component.nameFormControl.setValue('Ed');
    expect(component.nameFormControl.hasError('required')).toBeFalsy();
    expect(component.nameFormControl.hasError('minlength')).toBeTruthy();
    expect(component.nameFormControl.valid).toBeFalsy();

    component.nameFormControl.setValue('Ednosoben Aparman');
    expect(component.nameFormControl.hasError('required')).toBeFalsy();
    expect(component.nameFormControl.hasError('minlength')).toBeFalsy();
    expect(component.nameFormControl.valid).toBeTruthy();
    fixture.detectChanges();
    expect(saveBtn.nativeElement.disabled).toBeFalsy();

  });
});
