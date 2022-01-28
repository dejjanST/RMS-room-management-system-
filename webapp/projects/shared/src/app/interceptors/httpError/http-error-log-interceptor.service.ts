import { Injectable } from '@angular/core';
import {
    HttpInterceptor, HttpRequest,
    HttpHandler, HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { VedMetaError } from './http-error-log-model';
import { HttpErrorHandlerService } from './http-error-handler.service';

@Injectable({
    providedIn: 'root'
})
export class HttpErrorLogInterceptorService implements HttpInterceptor {

    constructor(private httpErrorHander: HttpErrorHandlerService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const vedMetaError = new VedMetaError();
        vedMetaError.req = req;
        return next.handle(req).pipe(
            // onError
            catchError((error: HttpErrorResponse) => {
                vedMetaError.res = error;
                this.httpErrorHander.add(vedMetaError);

                return throwError(error);
            })
        );
    }

}
