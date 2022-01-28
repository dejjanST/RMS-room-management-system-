import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EquipmentsByUnit, RequestEquipment } from './equipment-verification.model';
import { API, UNITS, EQUIPMENT } from '../constants';
import { VedMetaToastr } from 'projects/shared/src/app/interceptors/toastr/ved-meta-toastr';

@Injectable({
  providedIn: 'root'
})
export class EquipmentVerificationService {

  constructor(private http: HttpClient) { }

  getEqptsByUnit(unitId: number): Observable<EquipmentsByUnit> {
    return this.http.get<EquipmentsByUnit>(`${API}${UNITS}${EQUIPMENT}/${unitId}`)
      .pipe(
        map(items => {
          items.data.map(item => {
            if (item.status == null) {
              item.status = 1;
            }
            return item;
          });
          return items;
        }),
      );
  }

  verifyEqpt(unitId: number, eqpt: RequestEquipment): Observable<any> {
    const toastrParams = new VedMetaToastr();
    toastrParams.params.exclude = [200];

    // const loaderParams = new VedMetaLoader();
    // loaderParams.params.exclude = true;
    // loaderParams.params.debounce = 400;

    const headers = new HttpHeaders()
      .set(toastrParams.headKey, JSON.stringify(toastrParams.params));
    // .set(loaderParams.headKey, JSON.stringify(loaderParams.params));

    return this.http.post(`${API}${UNITS}${EQUIPMENT}/${unitId}`, eqpt, { headers });
  }

}
