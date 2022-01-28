import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RequestNote, ResponseNotes } from './notes.model';
import { NOTES, API } from '../constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) { }


  createNote(note: RequestNote) {
    return this.http.post(`${API}${NOTES}/`, note);
  }

  getNotesForOffer(offerId: number): Observable<ResponseNotes> {
    const params = new HttpParams()
      .set('offer_id', offerId.toString());
    return this.http.get<ResponseNotes>(`${API}${NOTES}/`, { params });
  }

}
