import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VedMetaToastr } from 'projects/shared/src/app/interceptors/toastr/ved-meta-toastr';
import { Observable } from 'rxjs';
import { API, GROUPS } from '../constants';
import { AccessListData, RequestAccessGroup, ResponseAccessList, ResponseGroupList } from './access.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  getList(name?: string): Observable<ResponseGroupList> {
    let params = new HttpParams();
    if (name) {
      params = params.set('name', name);
    }

    return this.http.get<ResponseGroupList>(`${API}${GROUPS}/`, { params });
  }

  getAccess(id: number): Observable<ResponseAccessList> {
    return this.http.get<ResponseAccessList>(`${API}/groups/${id}`);
  }

  create(group: RequestAccessGroup): Observable<any> {

    return this.http.post(`${API}${GROUPS}/`, group);
  }

  update(groupId: number, group: RequestAccessGroup): Observable<any> {
    return this.http.put<any>(`${API}${GROUPS}/` + groupId, group);
  }

  delete(group: AccessListData): Observable<any> {
    const toastrParams = new VedMetaToastr();
    toastrParams.params.exclude = [400];

    const headers = new HttpHeaders()
    .set(toastrParams.headKey, JSON.stringify(toastrParams.params));

    let params = new HttpParams();
    params = params.set('force', group.force.toString());

    return this.http.delete<any>(`${API}${GROUPS}/` + group.id, { params, headers });
  }
}
