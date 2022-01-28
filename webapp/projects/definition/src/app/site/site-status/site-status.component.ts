import { Component, OnInit, Input } from '@angular/core';
import { SiteData } from '../site';
import { SiteStatusService } from './site-status.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'site-status',
  templateUrl: './site-status.component.html',
  styleUrls: ['./site-status.component.css']
})
export class SiteStatusComponent implements OnInit {
  @Input() siteDetails: SiteData;
  
  loading= false;

  constructor(private siteStatus: SiteStatusService) { }

  ngOnInit(): void { }

  pushConfiguration() {
    this.loading = true;
    this.siteStatus.pushConfiguration(this.siteDetails.id).subscribe(
        response => {
          this.loading = false;
        },
        error => {
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
  }

}
