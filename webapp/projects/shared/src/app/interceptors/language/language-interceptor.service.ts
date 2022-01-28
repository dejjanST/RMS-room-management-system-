import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LanguageInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    req = req.clone({ headers: req.headers.set('Accept-Language', document.documentElement.lang) });

    return next.handle(req);
  }
}

