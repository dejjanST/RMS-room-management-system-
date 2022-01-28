import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ResponseBuildingList, BuildingSearch, Building } from './buildings';
import { IEntity } from 'projects/shared/src/app/IEntity';
import { BUILDINGS, API } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class BuildingService implements IEntity {
  private updatedSubject: Subject<number> = new Subject<number>();
  updated$ = this.updatedSubject.asObservable();

  constructor(private http: HttpClient) { }


  get(id: number): Observable<Building> {
    return this.http.get<Building>(`${API}${BUILDINGS}/` + id);
  }

  getList(query: BuildingSearch = null): Observable<ResponseBuildingList> {
    let params = new HttpParams();

    if (query) {
      params = params.set('site', query.site.toString());
    }

    return this.http.get<ResponseBuildingList>(`${API}${BUILDINGS}/`, { params });
  }

  update(editBuilding: Building): Observable<any> {
    return this.http.put<any>(`${API}${BUILDINGS}/` + editBuilding.data.id, editBuilding.data)
      .pipe(
        tap(() => this.updatedSubject.next(Date.now())),
      );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${API}${BUILDINGS}/` + id);
  }

  create(building): Observable<any> {
    return this.http.post<any>(`${API}${BUILDINGS}/`, building.data);
  }

  search() {
    throw new Error('Method not implemented.');
  }
}
