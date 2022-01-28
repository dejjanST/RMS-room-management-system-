import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FloorLayoutsBySideList, FloorLayout, RequestFloorLayout, ResponseFloorLayout } from './floor-layout.model';
import { FLOORS, API, LAYOUT } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class FloorLayoutService {

  constructor(private http: HttpClient) { }

  getFloorLayouts(): Observable<FloorLayout> {
    return this.http.get<FloorLayout>(`${API}${FLOORS}${LAYOUT}/`);
  }

  getFloorLayoutsBySiteList(siteId: number): Observable<FloorLayoutsBySideList> {
    const params = new HttpParams()
      .set('site_id', siteId.toString());

    return this.http.get<FloorLayoutsBySideList>(`${API}${FLOORS}${LAYOUT}/`, { params });
  }

  deleteFloorLayout(floorLayoutId: number): Observable<any> {
    return this.http.delete(`${API}${FLOORS}${LAYOUT}/` + floorLayoutId);
  }

  createFloorLayout(requestFloorLayout: RequestFloorLayout): Observable<any> {
    return this.http.post(`${API}${FLOORS}${LAYOUT}/`, requestFloorLayout);
  }

  getFloorLayout(id: number): Observable<ResponseFloorLayout> {
    return this.http.get<ResponseFloorLayout>(`${API}${FLOORS}${LAYOUT}/` + id);
  }

  editFloorLayout(id: number, requestFloorLayout: RequestFloorLayout) {
    return this.http.put(`${API}${FLOORS}${LAYOUT}/` + id, requestFloorLayout);
  }

}
