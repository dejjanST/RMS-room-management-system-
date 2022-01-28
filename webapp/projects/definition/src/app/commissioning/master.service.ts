import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestController, ResponseControllers } from './master';
import { Observable } from 'rxjs';
import { CONTROLLER, API, ASSOCIATED } from '../constants';
import { VedMetaToastr } from 'projects/shared/src/app/interceptors/toastr/ved-meta-toastr';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  getAllControllers(id: number): Observable<ResponseControllers> {
    return this.http.get<ResponseControllers>(`${API}${CONTROLLER}/` + id);
  }

  getAssociatedControllers(id: number): Observable<ResponseControllers> {
    return this.http.get<ResponseControllers>(`${API}${CONTROLLER}${ASSOCIATED}/` + id);
  }

  setMasterController(masterController: RequestController): Observable<any> {
    const toastrParams = new VedMetaToastr();
    toastrParams.params.exclude = [200];

    // const loaderParams = new VedMetaLoader();
    // loaderParams.params.exclude = true;
    // loaderParams.params.debounce = 400;

    const headers = new HttpHeaders()
      .set(toastrParams.headKey, JSON.stringify(toastrParams.params));
    // .set(loaderParams.headKey, JSON.stringify(loaderParams.params));

    return this.http.post<any>(`${API}${CONTROLLER}/`, masterController, { headers });
  }
}


