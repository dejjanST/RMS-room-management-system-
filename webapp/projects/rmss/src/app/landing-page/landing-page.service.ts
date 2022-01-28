import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SystemInfo } from './system-info';
import { API, SYSTEM_INFO, SITES } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {

  constructor(private http: HttpClient) { }

  getSystemInfo(): Observable<SystemInfo> {
    return this.http.get<SystemInfo>(`${API}${SYSTEM_INFO}/`);
  }

  create(systemInfo: SystemInfo): Observable<any> {
    return this.http.post<any>(`${API}${SITES}/`, systemInfo.data);
  }
}
