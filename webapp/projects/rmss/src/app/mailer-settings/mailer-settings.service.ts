import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEntity } from 'projects/shared/src/app/IEntity';
import { VedMetaToastr } from 'projects/shared/src/app/interceptors/toastr/ved-meta-toastr';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API } from '../constants';
import { mailerSettingsMock } from './mailer-settings.mock';
import { MailerSettingsData, ResponseMailerSettings } from './mailer-settings.model';

@Injectable({
  providedIn: 'root'
})
export class MailerSettingsService implements IEntity {
  updated$: Observable<any>;

  constructor(private http: HttpClient) { }

  delete(id: number) { }

  search() { }

  getList(queryString?: any) { }

  get(): Observable<ResponseMailerSettings> {
    const toastrParams = new VedMetaToastr();
    toastrParams.params.exclude = [409];

    // const loaderParams = new VedMetaLoader();
    // loaderParams.params.exclude = true;
    // loaderParams.params.debounce = 400;

    const headers = new HttpHeaders()
      .set(toastrParams.headKey, JSON.stringify(toastrParams.params));
    // .set(loaderParams.headKey, JSON.stringify(loaderParams.params));

    return this.http.get<ResponseMailerSettings>(`${API}/settings/mailer/`, { headers })
      .pipe(
        catchError(() => {
          return of(new ResponseMailerSettings());
        })
      );
  }

  update(item: any, id: number) { }

  create(item: MailerSettingsData): Observable<any> {
    return this.http.post(`${API}/settings/mailer/`, item);
  }


  test(item: MailerSettingsData): Observable<any> {
    return this.http.post(`${API}/settings/mailer/test/`, item);
  }

}
