import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { VedMetaToastr } from '../interceptors/toastr/ved-meta-toastr';
import { VedMetaLoader } from '../interceptors/Loader/ved-meta-loader';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  loginCheck(): Observable<any> {
    const toastrParams = new VedMetaToastr();
    toastrParams.params.exclude = [401, 404, 422, 200];

    const loaderParams = new VedMetaLoader();
    loaderParams.params.exclude = true;
    // loaderParams.params.debounce = 400;

    const headers = new HttpHeaders()
      .set(toastrParams.headKey, JSON.stringify(toastrParams.params))
      .set(loaderParams.headKey, JSON.stringify(loaderParams.params));

    return this.http.get('/api/session/', { headers });
  }
}
