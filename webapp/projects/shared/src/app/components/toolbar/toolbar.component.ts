import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlatformLocation } from '@angular/common';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

    appRoot: string;

    constructor(
        private http: HttpClient,
        public platformLocation: PlatformLocation) {
        this.appRoot = platformLocation.getBaseHrefFromDOM() + '../';
    }

    ngOnInit() {

    }

    logout() {
        this.http.delete('/api/session/').subscribe(res => {
            if (res) {
                window.location.href = '/';
            }
        }
        );
    }
}
