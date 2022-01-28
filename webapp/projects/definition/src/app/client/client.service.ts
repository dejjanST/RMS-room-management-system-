import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ResponseClientsList, Client } from './client.model';
import { IEntity } from 'projects/shared/src/app/IEntity';
import { API, CLIENTS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ClientService implements IEntity {

  constructor(private http: HttpClient) { }

  private updatedSubject: Subject<number> = new Subject<number>();
  updated$ = this.updatedSubject.asObservable();

  getList(name: string = null): Observable<ResponseClientsList> {
    let params = new HttpParams();
    if (name) {
      params = params.set('name', name);
    }


    return this.http.get<ResponseClientsList>(`${API}${CLIENTS}/`, { params });
  }

  create(client: Client): Observable<any> {
    return this.http.post<any>(`${API}${CLIENTS}/`, client.data);
  }

  get(id: number): Observable<Client> {
    return this.http.get<Client>(`${API}${CLIENTS}/` + id);
  }

  update(client: Client): Observable<any> {
    return this.http.put<any>(`${API}${CLIENTS}/` + client.data.id, client.data)
      .pipe(
        tap(() => this.updatedSubject.next(Date.now())),
      );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${API}${CLIENTS}/` + id);
  }

  search() {
    throw new Error('Method not implemented.');
  }
}
