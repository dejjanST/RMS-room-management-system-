import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseUserModel } from '../models/settings-models';

@Injectable({
    providedIn: 'root'
})
export class UserSettingsService {

    constructor(private http: HttpClient) { }


    get(): Observable<ResponseUserModel> {

        return this.http.get('/api/sessions/api/session/0/').pipe(
            map(res => {
                return new ResponseUserModel(res);
            })
        );
    }

}
