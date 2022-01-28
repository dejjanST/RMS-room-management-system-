import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit, OnDestroy {

  appRoot = '/';
  currentLanguage: string;
  currentUrl: string;
  routeSubscription: Subscription;

  private baseHref: string;

  constructor(
      private router: Router
    , private platformLocation: PlatformLocation
  ) {

    this.baseHref = this.platformLocation.getBaseHrefFromDOM();

    this.getAppRoot();
    this.routeChanges();
    this.currentUrl = (location.hash === '') ? this.router.url : '/' + location.hash;
    //  this.router.url;
    // console.log(this.currentUrl);

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

  getAppRoot() {
    const path = this.baseHref.match(/[^\/]+/g);

    this.setCurrentLanguage((path instanceof Array) ? path[0] : 'en');

    if (path !== null) {
      path.shift();
      this.appRoot += path.join('/');
    }

  }

  setLanguage(lang) {
    return '/' + lang + this.appRoot + this.currentUrl;
  }

  setCurrentLanguage(lang) {
    this.currentLanguage = lang;
  }

  routeChanges() {
    this.routeSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(val => {
      this.currentUrl = this.router.url;
    });
  }

}
