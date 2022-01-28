import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Equipments } from './models/equipment.Model';
import { RequestUnitType, ResponseUnitTypeList, ResponseUnitType, ResponseGetUnitType } from './models/unit-type.Model';
import { API, UTD, ACCEPTED, EQUIPMENT } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class UnitTypeService {

  constructor(private http: HttpClient) { }

  getEquipmentList(): Observable<Equipments> {
    return this.http.get<Equipments>(`${API}${EQUIPMENT}/`).pipe(
      map((equimpemts: Equipments) => {
        equimpemts.data.map(item => {
          item.tidi = item.ti + item.di;
          item.disabled = false;
          item.quantity = 0;
          item.selected = false;
          return item;
        });
        return equimpemts;
      }),
    );
  }

  listUnitTypes(): Observable<ResponseUnitTypeList> {
    return this.http.get<ResponseUnitTypeList>(`${API}${UTD}/`);
  }

  createUnitType(unitType: RequestUnitType): Observable<any> {
    return this.http.post(`${API}${UTD}/`, unitType);
  }

  getUnitType(id: number): Observable<ResponseGetUnitType> {
    return this.http.get<ResponseGetUnitType>(`${API}${UTD}/` + id);
  }

  editUnitType(id: number, unitType: RequestUnitType): Observable<any> {
    return this.http.put(`${API}${UTD}/` + id, unitType);
  }

  deleteUnitType(id: number): Observable<any> {
    return this.http.delete(`${API}${UTD}/` + id);
  }

  getListAcceptedBySite(siteId: number): Observable<ResponseUnitTypeList> {
    return this.http.get<ResponseUnitTypeList>(`${API}${UTD}${ACCEPTED}/${siteId}`);
  }

}
