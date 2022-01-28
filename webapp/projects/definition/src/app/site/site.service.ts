import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ResponseSiteList, SiteSearch, Site } from './site';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IEntity } from 'projects/shared/src/app/IEntity';
import { API, SITES } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class SiteService implements IEntity {

  constructor(private http: HttpClient) { }

  private updatedSubject: Subject<number> = new Subject<number>();
  updated$ = this.updatedSubject.asObservable();

  getList(query: SiteSearch = null): Observable<ResponseSiteList> {
    let params = new HttpParams();

    if (query != null) {
      if (query.client) {
        params = params.set('client', query.client.toString());
      }
      if (query.name) {
        params = params.set('name', query.name);
      }
    }

    return this.http.get<ResponseSiteList>(`${API}${SITES}/`, { params });
  }

  create(site: Site): Observable<any> {
    return this.http.post<any>(`${API}${SITES}/`, site.data);
  }

  get(id: number): Observable<Site> {
    return this.http.get<Site>(`${API}${SITES}/` + id);
  }

  update(site: Site): Observable<any> {
    return this.http.put<any>(`${API}${SITES}/` + site.data.id, site.data)
      .pipe(
        tap(() => this.updatedSubject.next(Date.now())),
      );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${API}${SITES}/` + id);
  }
  search() {
    throw new Error('Method not implemented.');
  }
}
