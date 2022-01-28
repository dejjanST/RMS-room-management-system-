import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotesService } from '../notes.service';
import { RequestNote, Note, ResponseNotes } from '../notes.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { VedValidators } from 'projects/shared/src/app/Validators/ved-validators';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  @Input() offerId: number;
  form: FormGroup;
  notes$: BehaviorSubject<Array<Note>> = new BehaviorSubject(Array<Note>());

  constructor(
    private fb: FormBuilder,
    private notesService: NotesService
  ) { }

  ngOnInit(): void {
    // creating form group
    this.form = this.fb.group({
      note: ['', [VedValidators.minLength(3)]]
    });
    this.refreshNotes();

    // validation in real time
    this.form.get('note').valueChanges.subscribe((noteText: string) => {
      this.form.get('note').markAsTouched();
    });
  }

  // get latest notes sorted by timestamp, latest first
  refreshNotes() {
    this.notesService.getNotesForOffer(this.offerId)
      .pipe(
        map((notes: ResponseNotes) => {
          notes.data.sort((a, b) => a.created_at < b.created_at ? 1 : -1);
          return notes;
        })
      )
      .subscribe(res => {
        this.notes$.next(res.data);
      });
  }

  submit() {
    const req = new RequestNote();
    req.offer_id = this.offerId;
    req.note = this.form.get('note').value;
    this.notesService.createNote(req).subscribe(() => {
      this.refreshNotes();

      // reset notes form after submit
      this.form.reset();
    });
  }

}
