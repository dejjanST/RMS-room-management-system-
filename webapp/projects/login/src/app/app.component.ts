import { Component, OnInit } from '@angular/core';
import { RouteTitleService } from 'projects/shared/src/app/services/route-title.service';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'LoginApp';

    constructor(
        private routeTitleService: RouteTitleService,
    ) { }

    ngOnInit() {
        this.routeTitleService.boot();
    }

}
