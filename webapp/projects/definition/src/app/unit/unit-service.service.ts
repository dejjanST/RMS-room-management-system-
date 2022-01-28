import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ResponseUnitLst, ResponseUnit } from './unit';
import { UNITS, API, EQUIPMENT } from '../constants';
import { IEntity } from 'projects/shared/src/app/IEntity';
import { Equipments } from '../unitType/models/equipment.Model';

@Injectable({
  providedIn: 'root'
})
export class UnitService implements IEntity {

  constructor(private http: HttpClient) { }

  private updatedSubject: Subject<number> = new Subject<number>();
  updated$ = this.updatedSubject.asObservable();

  getList(queryString: any): Observable<ResponseUnitLst> {
    let params = new HttpParams();

    for (const key in queryString) {
      if ((queryString[key] !== undefined) && (queryString[key] !== '')) {
        params = params.set(key, queryString[key].toString());
      }
    }

    return this.http.get<ResponseUnitLst>(`${API}${UNITS}/`, { params });
  }

  get(id: number): Observable<ResponseUnit> {
    return this.http.get<ResponseUnit>(`${API}${UNITS}/${id}`);
  }


  getEquipmentList(): Observable<Equipments> {
    return this.http.get<Equipments>(`${API}${EQUIPMENT}/`);
  }

  update(item: any, id: number) { }

  create(item: any) { }

  delete(id: number) { }

  search() { }
}
