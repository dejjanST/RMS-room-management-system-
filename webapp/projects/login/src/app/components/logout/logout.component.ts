import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private loginService: LoginService
    , private http: HttpClient
    , private router: Router
    , private ngZone: NgZone
  ) {

    this.loginCheck();

  }

  ngOnInit() {
  }

  loggout() {
    this.http.delete('/api/session/').subscribe(
      res => {
        this.ngZone.run(() => this.router.navigate(['/']));
      }
    );
  }

  loginCheck(): void {
    this.loginService.loginCheck().subscribe(
      res => {
        // window.location.href = '/vendor'; // res.redirect;
        this.router.navigate(['/loggedin']);
      },
      err => {
        this.ngZone.run(() => this.router.navigate(['/']));
      }
    );
  }

  navigateTo(url) {
    this.router.navigate([url]);
  }

}
