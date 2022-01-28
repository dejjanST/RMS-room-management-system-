import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API, FLOORS } from '../constants';
import { ASSEntity } from '../site-server-interface-entity';
import { SSFloorList } from './floor-model';

@Injectable({
  providedIn: 'root'
})
export class FloorService extends ASSEntity {

  constructor(private http: HttpClient) {
    super();
  }
  getList(filter: any): Observable<SSFloorList> {

    this.createFilterParams(filter);

    return this.http.get<SSFloorList>(`${API}${FLOORS}/`, { params: this.params });
  }


}
