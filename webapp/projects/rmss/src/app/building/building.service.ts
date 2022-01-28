import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SSBuildingList } from './building-model';
import { API, BUILDINGS } from '../constants';
import { ASSEntity } from '../site-server-interface-entity';

@Injectable({
  providedIn: 'root'
})
export class BuildingService extends ASSEntity {

  constructor(private http: HttpClient) {
    super();
  }
  updated$: Observable<any>;
  params: HttpParams;


  getList(filter: any): Observable<SSBuildingList> {
    this.createFilterParams(filter);
    return this.http.get<SSBuildingList>(`${API}${BUILDINGS}/`);
  }


}
