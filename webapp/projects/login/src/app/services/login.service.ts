import { Injectable } from '@angular/core';
import { UserRequestModel } from '../models/user-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { VedMetaToastr } from 'projects/shared/src/app/interceptors/toastr/ved-meta-toastr';
import { VedMetaLoader } from 'projects/shared/src/app/interceptors/Loader/ved-meta-loader';
import { SESSION, API } from '../constants';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private http: HttpClient) { }


    login(user: UserRequestModel): Observable<any> {
        const toastrParams = new VedMetaToastr();
        toastrParams.params.exclude = [404, 422, 200];

        const loaderParams = new VedMetaLoader();
        loaderParams.params.exclude = true;
        // loaderParams.params.debounce = 400;

        const headers = new HttpHeaders()
            .set(toastrParams.headKey, JSON.stringify(toastrParams.params))
            .set(loaderParams.headKey, JSON.stringify(loaderParams.params));


        return this.http.put<UserRequestModel>(`${API}${SESSION}/`, user, { headers, observe: 'response' })
            .pipe(
                catchError(err => {
                    return throwError(err);
                })
            );
    }


    loginCheck(): Observable<any> {
        const toastrParams = new VedMetaToastr();
        toastrParams.params.exclude = [401, 404, 422, 200];

        const loaderParams = new VedMetaLoader();
        loaderParams.params.exclude = true;
        // loaderParams.params.debounce = 400;

        const headers = new HttpHeaders()
            .set(toastrParams.headKey, JSON.stringify(toastrParams.params))
            .set(loaderParams.headKey, JSON.stringify(loaderParams.params));

        return this.http.get(`${API}${SESSION}/`, { headers, observe: 'response' })
            .pipe(
                catchError(err => {
                    return throwError(err);
                })
            );
    }
}
