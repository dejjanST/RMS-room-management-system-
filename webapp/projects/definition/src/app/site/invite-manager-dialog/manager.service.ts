import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RequestManager } from './manager';
import { API, SITE } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http: HttpClient) { }

  create(siteId: number, manager: RequestManager): Observable<any> {
    return this.http.post<any>(`${API}${SITE}/account/${siteId}`, manager);
  }
}
