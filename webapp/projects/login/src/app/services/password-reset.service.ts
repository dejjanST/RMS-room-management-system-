import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ResetPass } from '../models/reset-pass';
import { VedMetaToastr } from 'projects/shared/src/app/interceptors/toastr/ved-meta-toastr';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Md5 } from 'ts-md5/dist/md5';
import { API, AUTH, RESET } from '../constants';

@Injectable({
    providedIn: 'root'
})
export class PasswordResetService {

    constructor(private http: HttpClient) { }

    resetPass(resetPass: ResetPass) {
        return this.http.put(`${API}${AUTH}${RESET}/`, resetPass)
        .pipe(
            catchError(err => {
              return throwError(err);
            })
          );
    }

    sendMail(email: string) {
        // const toastrParams = new VedMetaToastr();
        // toastrParams.params.exclude = [404];

        // const headers = new HttpHeaders()
        //     .set(toastrParams.headKey, JSON.stringify(toastrParams.params));

        const md5 = new Md5();

        const params = new HttpParams()
            .set('email', md5.appendStr(email).end().toString());

        return this.http.get(`${API}${AUTH}${RESET}`, { params })
        .pipe(
            catchError(err => {
              return throwError(err);
            })
          );
    }
}
