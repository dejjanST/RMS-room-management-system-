import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { API, CONF } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class SiteStatusService {

  constructor(private http: HttpClient) { }

  pushConfiguration(siteId: number): Observable<any> {
    return this.http.post<any>(`${API}${CONF}/` + siteId, {});
  }

}
