import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestLoaderService } from './request-loader.service';
import { tap, filter, catchError } from 'rxjs/operators';
import { VedMetaLoader, VedMetaLoaderParams } from './ved-meta-loader';

@Injectable({
    providedIn: 'root'
})
export class RequestLoaderInterceptorService implements HttpInterceptor {

    constructor(private requestLoaderService: RequestLoaderService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const vedMetaLoader = new VedMetaLoader();
        vedMetaLoader.req = req;
        vedMetaLoader.params = new VedMetaLoaderParams(JSON.parse(req.headers.get(vedMetaLoader.headKey)));
        this.requestLoaderService.addRequest(vedMetaLoader);
        return next.handle(req)
            .pipe(
                catchError(err => {
                    vedMetaLoader.res = err;
                    this.requestLoaderService.removeRequest(vedMetaLoader);
                    throw err;
                }),
                filter(res => (res instanceof HttpResponse)),
                tap((res: HttpResponse<any>) => {
                    vedMetaLoader.res = res;
                    this.requestLoaderService.removeRequest(vedMetaLoader);
                }),

            );

    }
}
