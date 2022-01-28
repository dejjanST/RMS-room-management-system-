import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showFiller = false;
  title = 'definition';
  appRoot: string;

  constructor(
    public http: HttpClient,
    public platformLocation: PlatformLocation) {
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
}
