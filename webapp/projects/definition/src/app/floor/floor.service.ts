import { Injectable } from '@angular/core';
import { ResponseFloorList, FloorSearch, RequestBulkData, ResponseFloor } from './floor';
import { tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IEntity } from 'projects/shared/src/app/IEntity';
import { API, FLOORS, BULK } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class FloorService implements IEntity {
  private updatedSubject: Subject<number> = new Subject<number>();
  updated$ = this.updatedSubject.asObservable();

  constructor(private http: HttpClient) { }

  get(id: number): Observable<ResponseFloor> {
    return this.http.get<ResponseFloor>(`${API}${FLOORS}/` + id);
  }


  create(floor: ResponseFloor): Observable<any> {
    return this.http.post<any>(`${API}${FLOORS}/`, floor.data);
  }

  update(floor: ResponseFloor, id: number): Observable<any> {

    return this.http.put<any>(`${API}${FLOORS}/` + id, floor.data)
      .pipe(
        tap(() => this.updatedSubject.next(Date.now())),
      );
  }


  getList(query: FloorSearch = null): Observable<ResponseFloorList> {
    let params = new HttpParams();

    if (query.building_id) {
      params = params.set('building_id', query.building_id.toString());
    }
    if (query.name) {
      params = params.set('name', query.name);
    }

    return this.http.get<ResponseFloorList>(`${API}${FLOORS}/`, { params });
  }


  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${API}${FLOORS}/` + id);
  }

  public createBulk(bulk: RequestBulkData): Observable<any> {
    return this.http.post(`${API}${FLOORS}${BULK}/`, bulk.data);
  }

  search() {
    throw new Error('Method not implemented.');
  }
}
