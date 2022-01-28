import { Injectable } from '@angular/core';
import {
    HttpInterceptor, HttpRequest,
    HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, filter, last } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class ResponseInterceptorService implements HttpInterceptor {

    showToastr = true;

    constructor(
        private toastrService: ToastrService,
    ) { }

    // disableToastr() {
    //     this.showToastr = false;
    // }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // const vedMeta = this.vedMeta.parse(req.headers);
        // req = req.clone({ headers: this.vedMeta.detach(req.headers) });

        return next.handle(req)
            .pipe(
                last(),
                tap(res => {
                    // this.vedMeta.setHandler(vedMeta);
                    // req = req.clone({ headers: this.vedMeta.toHeaders() });
                }),
                // filter(res => res instanceof Array),
                // catchError(this.handleError)
                catchError((error: HttpErrorResponse) => {

                    // console.log(error);

                    // if (error.status === 401) {
                    //     if (this.showToastr) {
                    //         this.toastrService.error('bad credentials', 'Login Error', {
                    //             closeButton: true,
                    //             timeOut: 5000,
                    //         });
                    //     }
                    // }

                    return throwError(error);
                }),

                // filter(res => res instanceof HttpResponse),

                // uspeshan Toaster.... da se napravi dinamyc
                tap(res => {
                    // console.log(thiz.showToastr);
                    // if (this.showToastr) {
                    //     this.toastrService.success('Successful');
                    // }
                })
            );

    }
}
