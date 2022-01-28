import { Injectable } from '@angular/core';
import { IEntity } from 'projects/shared/src/app/IEntity';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { API } from '../../constants';
import { VerificationReport } from './verification-report.model';
import { VerificatinReportMock } from './verification.mock';
import { VedMetaToastr, VedMetaToastrParams } from 'projects/shared/src/app/interceptors/toastr/ved-meta-toastr';


@Injectable({
  providedIn: 'root'
})
export class VerificationService implements IEntity {
  constructor(private http: HttpClient) { }
  updated$: Observable<any>;


  getList(buildingId: number, queryString?: any): Observable<VerificationReport> {

    const toastrParams = new VedMetaToastr();
    toastrParams.params.exclude = [200, 404];

    // const loaderParams = new VedMetaLoader();
    // loaderParams.params.exclude = true;
    // loaderParams.params.debounce = 400;

    const headers = new HttpHeaders()
      .set(toastrParams.headKey, JSON.stringify(toastrParams.params));
    // .set(loaderParams.headKey, JSON.stringify(loaderParams.params));

    let params = new HttpParams();
    if (queryString) {
      for (const [key, value] of Object.entries(queryString)) {
        if (String(value) !== '' && String(value) !== 'null') {
          params = params.append(key, String(value));
        }
      }
    }

    return this.http.get<VerificationReport>(`${API}/reports/verification/` + buildingId, { params, headers })
      .pipe(
        catchError(() => {
          return of(new VerificationReport());
        }));
  }

  get(siteId: number, queryString?: any) { }

  update(item: any, id: number) { }

  create(item: any) { }

  delete(id: number) { }

  search() { }
}
