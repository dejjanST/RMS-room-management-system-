import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { NotesComponent } from './notes.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from 'projects/shared/src/app/modules/loader/loader.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
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
import { NotesService } from '../notes.service';
import { of } from 'rxjs';
import { RequestNote } from '../notes.model';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;
  let notesService: any;

  beforeEach(async(() => {
    const notesServiceSpy = jasmine.createSpyObj('NotesService', ['getNotesForOffer', 'createNote']);
    TestBed.configureTestingModule({
      declarations: [NotesComponent],
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
        { provide: NotesService, useValue: notesServiceSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    notesService = TestBed.inject(NotesService);
    notesService.getNotesForOffer.and.returnValue(of({
      data: [
        {
          id: 40, created_at: 1594638025, created_by_user: 'Admin Admin', note: 'The offer has been created',
          offer_id: 14, offer_name: 'Test', site_id: 1, site_code: '0', site_name: 'Site 1',
          client_id: 1, client_code: '1', client_name: 'Mario'
        },
        {
          id: 41, created_at: 1594638100, created_by_user: 'Admin Admin', note: 'The offer has been updated',
          offer_id: 14, offer_name: 'Test', site_id: 1, site_code: '0', site_name: 'Site 1',
          client_id: 1, client_code: '1', client_name: 'Mario'
        },
        {
          id: 42, created_at: 1594638200, created_by_user: 'Admin Admin', note: 'Test',
          offer_id: 14, offer_name: 'Test', site_id: 1, site_code: '0', site_name: 'Site 1',
          client_id: 1, client_code: '1', client_name: 'Mario'
        }]
    }));
    notesService.createNote.and.returnValue(of({ msg: 'Succes' }));
    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    component.offerId = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(notesService.getNotesForOffer).toHaveBeenCalledTimes(1);
    expect(component).toBeTruthy();
  });

  it('test note list', fakeAsync(() => {
    // should have 3 notes
    const noteList = fixture.debugElement.queryAll(By.css('.note'));
    expect(noteList.length).toEqual(3);
  }));

  it('test form validation', fakeAsync(() => {
    expect(component.form.valid).toBeFalsy();

    expect(component.form.valid).toBeFalsy();
    const note = component.form.get('note');
    note.markAsDirty();

    note.setValue('t');
    expect(note.value).toEqual('t');
    expect(note.hasError('minlength')).toBeTruthy();

    note.setValue('test');
    expect(note.value).toEqual('test');
    expect(note.hasError('minlength')).toBeFalsy();

    // after valid form submit button should be enabled
    fixture.detectChanges();
    expect(component.form.valid).toBeTruthy();
    const submitBtn = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(submitBtn.nativeElement.disabled).toBeFalsy();

    // after submit form should call createOffer method
    submitBtn.nativeElement.click();

    expect(notesService.createNote).toHaveBeenCalledTimes(1);

    const reqNote = new RequestNote();
    reqNote.offer_id = 1;
    reqNote.note = 'test';
    expect(notesService.createNote).toHaveBeenCalledWith(reqNote);
    fixture.detectChanges();
    flush();

    // after success response of creating note, form should reset
    // resetting form control set value 'null'
    expect(note.value).toEqual(null);
    expect(submitBtn.nativeElement.disabled).toBeTruthy();

  }));
});
