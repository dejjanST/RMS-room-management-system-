import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseGlobalModel } from '../models/settings-models';

@Injectable({
    providedIn: 'root'
})
export class GlobalSettingsService {

    constructor(private http: HttpClient) { }


    get(): Observable<ResponseGlobalModel> {
        return this.http.get('/api/app_settings/api/setting/').pipe(
            map(item => {
                return new ResponseGlobalModel(item);
            })
        );
    }
}
