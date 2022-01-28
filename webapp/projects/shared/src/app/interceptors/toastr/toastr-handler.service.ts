import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpResponse, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { VedMetaToastrParams, VedMetaToastr } from './ved-meta-toastr';

export class ServerResponseModel {
  msg: string;
  data: any;
  meta: any;

}

@Injectable({
  providedIn: 'root'
})

export class ToastrHandlerService {

  readonly module = 'toastr';
  // readonly headerKey = 'X-VedMeta-toastr';
  params: VedMetaToastrParams;

  private responseSubject = new Subject<VedMetaToastr>();

  successResponses$ = this.responseSubject.asObservable()
    .pipe(
      map(vedMeta => {
        return (vedMeta.params.exclude.indexOf(vedMeta.res.status) === -1) ? vedMeta.res : false;
      }),
      filter(res => res instanceof HttpResponse),
      filter(res =>
        // success response
        (Math.floor(res.status / 100) === 2)
      )
    )
    .subscribe((res: HttpResponse<ServerResponseModel>) => {
      if (res.body !== null) {
        if (res.body.msg !== undefined) {
          this.toastr.success(res.body.msg);
        }
      }


    });

  errorResponses$ = this.responseSubject.asObservable()
    .pipe(
      map(vedMeta => {
        return (vedMeta.params.exclude.indexOf(vedMeta.res.status) === -1) ? vedMeta.res : false;
      }),
      filter(res => res instanceof HttpErrorResponse),
      filter(res =>
        // error response
        (Math.floor(res.status / 100) === 4)
      )
    )
    .subscribe((res: HttpErrorResponse) => {
      if (res.error.msg !== undefined) {
        this.toastr.error(res.error.msg + '<small>' + res.error.code + '<small>', '', { enableHtml: true });
      }
    });

  serverErrorResponses$ = this.responseSubject.asObservable()
    .pipe(
      map(vedMeta => {
        return (vedMeta.params.exclude.indexOf(vedMeta.res.status) === -1) ? vedMeta.res : false;
      }),
      filter(res => res instanceof HttpErrorResponse),
      filter(res =>
        // redirect response
        (Math.floor(res.status / 100) === 5)
      )
    )
    .subscribe((res: HttpErrorResponse) => {
      this.toastr.error(res.statusText, 'Server Error');
    });

  constructor(private toastr: ToastrService) { }

  addResponse(vedMetaToastr: VedMetaToastr): void {
    vedMetaToastr.params = new VedMetaToastrParams(JSON.parse(vedMetaToastr.req.headers.get(vedMetaToastr.headKey)));
    this.responseSubject.next(vedMetaToastr);
  }
}
