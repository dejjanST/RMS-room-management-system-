import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { VedMetaToastr } from 'projects/shared/src/app/interceptors/toastr/ved-meta-toastr';
import { ResponseProfile, PostProfile } from '../models/profile';
import { API, SESSION } from '../../../constants';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  constructor(private http: HttpClient) { }

  editProfile(): Observable<any> {
    const toastr = new VedMetaToastr();
    toastr.params.exclude = [200];
    const headers = toastr.toHeader();

    return this.http.get<ResponseProfile>(`${API}${SESSION}/`, { headers })
      .pipe(
        catchError(err => {
          return throwError(err);
        })
      );
  }

  updateProfile(user: PostProfile): Observable<any> {
    return this.http.put(`${API}${SESSION}/`, user)
    .pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
