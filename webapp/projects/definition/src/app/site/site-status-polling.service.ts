import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, startWith, switchMap } from 'rxjs/operators';
import { throwError, interval, Observable, empty, of } from 'rxjs';
import { SITES, API, INFO } from '../constants';
import { SitePolling } from './site';

@Injectable({
  providedIn: 'root'
})
export class SiteStatusPollingService {

  constructor(private http: HttpClient) { }

  get(siteIds: Array<number>): Observable<SitePolling> {
    let params = new HttpParams();

    siteIds.forEach(siteId => {
      params = params.append('sites_ids', siteId.toString());

    });

    return this.http.get<SitePolling>(`${API}${SITES}${INFO}/`, { params })
      .pipe(
        catchError(err => throwError(err))
      );
  }

  getSiteStatusPoling(siteIds: Array<number>): Observable<SitePolling> {
    return interval(15000)
      .pipe(
        startWith(0),
        switchMap(() => {
          return this.get(siteIds)
            .pipe(
              catchError(err => {
                return of(new SitePolling());
              })
            );
        }),
      );

  }

}
