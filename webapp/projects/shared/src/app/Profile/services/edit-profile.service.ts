import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { VedMetaToastr } from 'projects/shared/src/app/interceptors/toastr/ved-meta-toastr';
import { VedMetaLoader } from 'projects/shared/src/app/interceptors/Loader/ved-meta-loader';
import { ResponseProfile, PostProfile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class EditProfileService {

  constructor(private http: HttpClient) { }

  editProfile(): Observable<any> {
    return this.http.get<ResponseProfile>('/api/users/user')
      .pipe(
        catchError(err => {
          return throwError(err);
        })
      );
  }

  updateProfile(user: PostProfile): Observable<any> {
    return this.http.put('/api/users/user', user)
    .pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
