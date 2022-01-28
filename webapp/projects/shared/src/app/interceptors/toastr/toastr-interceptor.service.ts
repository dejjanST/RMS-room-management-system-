import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrHandlerService } from './toastr-handler.service';
import { tap, catchError, filter } from 'rxjs/operators';
import { VedMetaToastr } from './ved-meta-toastr';

@Injectable({
  providedIn: 'root'
})

export class ToastrInterceptorService implements HttpInterceptor {

  constructor(private toastrHandlerService: ToastrHandlerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const vedMetaToastr = new VedMetaToastr();
    vedMetaToastr.req = req;
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        vedMetaToastr.res = err;
        this.toastrHandlerService.addResponse(vedMetaToastr);
        throw err;
      }),
      filter(item => item instanceof HttpResponse),
      tap((res: HttpResponse<any>) => {
        vedMetaToastr.res = res;
        this.toastrHandlerService.addResponse(vedMetaToastr);
      })
    );
  }

}
