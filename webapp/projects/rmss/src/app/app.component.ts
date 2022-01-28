import { PlatformLocation } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LandingPageService } from './landing-page/landing-page.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rmss';
  showFiller = false;
  siteName: string;
  appRoot: string;

  constructor(
    public http: HttpClient,
    public platformLocation: PlatformLocation,
    private landingPageService: LandingPageService,
  ) {
    this.appRoot = platformLocation.getBaseHrefFromDOM() + '../';
  }

  logout() {
    this.http.delete('/api/session/').subscribe(res => {
      if (res) {
        window.location.href = '/';
      }
    }
    );
  }

  changeFiller() {
    if (this.showFiller) {
      this.showFiller = false;
    }
  }

  ngOnInit(): void {
    this.landingPageService.getSystemInfo().subscribe(
      res => {
        this.siteName = res.data.site_name;
      }
    );
  }
}
