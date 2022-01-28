import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { GlobalService } from 'projects/definition/src/app/globalService/global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(public globalService: GlobalService, private login: LoginService) {
  }

  canActivate(): Observable<boolean> {
    return this.login.loginCheck().pipe(
      map(res => {
        this.globalService.user$.next(res.data);
        return true;
      }),
      catchError(() => {
        window.location.href = '/';
        return of(false);
      })
    );
  }
}
