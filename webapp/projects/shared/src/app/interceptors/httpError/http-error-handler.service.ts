import { Subject } from 'rxjs';
import { HttpErrorLogModel, VedMetaError, VedMetaErrorsParams } from './http-error-log-model';
import { Injectable } from '@angular/core';
import { map, filter, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService {

  httpErrorLogModel: HttpErrorLogModel = new HttpErrorLogModel();
  er: Array<HttpErrorLogModel> = [];
  size = 100;
  lsKey = 'HttpErrors';
  private responseSubject = new Subject<VedMetaError>();

  errorResponses$ = this.responseSubject.asObservable()
    .pipe(
      map(vedMeta => {
        return (vedMeta.params.exclude.indexOf(vedMeta.res.status) === -1) ? vedMeta.res : false;
      }),
      filter(res => res instanceof HttpErrorResponse)
    )
    .subscribe((res: HttpErrorResponse) => {
      this.httpErrorLogModel.status = res.status;
      this.httpErrorLogModel.url = res.url;
      this.httpErrorLogModel.message = res.message;
      this.httpErrorLogModel.clientTime = new Date();
      this.httpErrorLogModel.serverTime = res.headers.get('date');

      this.load();
      this.er.unshift(this.httpErrorLogModel);
      this.er.splice(this.size, this.er.length - this.size);

      localStorage.setItem(this.lsKey, JSON.stringify(this.er));
    });


  constructor() { }

  add(vedMetaError: VedMetaError): void {
    vedMetaError.params = new VedMetaErrorsParams(JSON.parse(vedMetaError.req.headers.get(vedMetaError.headKey)));
    this.responseSubject.next(vedMetaError);
  }


  load(): void {
    const lsError = localStorage.getItem(this.lsKey);
    if (lsError !== null) {
      this.er = JSON.parse(lsError);
    }
  }




}
