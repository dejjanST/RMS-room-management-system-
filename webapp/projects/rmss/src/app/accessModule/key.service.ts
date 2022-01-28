import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { ACCESS, API, KEYS, KEY_TYPES } from '../constants';
import { catchError } from 'rxjs/operators';
import { IEntity } from 'projects/shared/src/app/IEntity';
import { Key, RequestKeyAccess, ResponseKeyList, ResponseKeyTypes } from './access-key/key';


@Injectable({
  providedIn: 'root'
})
export class KeyService implements IEntity {

  constructor(private http: HttpClient) { }


  private updatedSubject: Subject<number> = new Subject<number>();
  updated$ = this.updatedSubject.asObservable();

  getList(search: string = null): Observable<ResponseKeyList> {
    let params = new HttpParams();
    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<ResponseKeyList>(`${API}${KEYS}/`, { params })
      .pipe(
        catchError(err => {
          return of(new ResponseKeyList());
        })
      );
  }

  get(id: number): Observable<Key> {
    return this.http.get<Key>(`${API}${KEYS}/` + id);
  }

  getKeyTypes(): Observable<ResponseKeyTypes> {
    return this.http.get<ResponseKeyTypes>(`${API}${KEY_TYPES}/`);
  }

  create(key: Key): Observable<any> {
    return this.http.post<any>(`${API}${KEYS}/`, key.data);
  }

  update(key: Key): Observable<any> {
    return this.http.put<any>(`${API}${KEYS}/` + key.data.id, key.data);
  }


  assignAccess(keyAccess: RequestKeyAccess): Observable<any> {
    return this.http.put(`${API}${KEYS}${ACCESS}/`, keyAccess);
  }

  delete(id: number) {
  }

  search() { }
}


