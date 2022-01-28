import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Manager } from './manager';
import { API, MANAGER } from '../constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http: HttpClient) { }

  create(manager: Manager): Observable<any> {
    return this.http.post<any>(`${API}${MANAGER}/`, manager);
  }
}
