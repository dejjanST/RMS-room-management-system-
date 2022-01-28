import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API, UNITS } from '../constants';
import { ASSEntity } from '../site-server-interface-entity';
import { SSUnitList } from './unit-model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UnitService extends ASSEntity {

  constructor(private http: HttpClient) {
    super();
  }
  getList(filter: any): Observable<SSUnitList> {

    this.createFilterParams(filter);

    return this.http.get<SSUnitList>(`${API}${UNITS}/`, { params: this.params });
  }


}
