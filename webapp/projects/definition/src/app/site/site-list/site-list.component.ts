import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SiteService } from '../site.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Client } from '../../client/client.model';
import { SiteSearch, ResponseSiteList, SiteData } from '../site';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../globalService/global.service';
import { SiteStatusPollingService } from '../site-status-polling.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { InviteManagerDialogComponent } from '../invite-manager-dialog/invite-manager-dialog.component';
import { DeleteDialogComponent } from 'projects/shared/src/app/components/dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent implements OnInit, OnDestroy {

  form: FormGroup;

  clientId: number;
  client: Client = new Client();
  sites: ResponseSiteList = new ResponseSiteList();
  siteSearch: SiteSearch = new SiteSearch();
  clientControl = new FormControl();
  siteStatusSubscription: Subscription;

  constructor(
    public dialog: MatDialog,
    public siteService: SiteService,
    public globalService: GlobalService,
    private route: ActivatedRoute,
    public siteStatusPollingService: SiteStatusPollingService
  ) { }


  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('clientId')) {
      this.siteSearch.client = +this.route.snapshot.paramMap.get('clientId');
      this.globalService.client.set(this.siteSearch.client);
      this.globalService.client.data$.subscribe(
        client => {
          this.client.data = client;
        }
      );
    }

    this.siteService.getList(this.siteSearch)
      .pipe(
        map(items => {
          items.data.map(item => {
            item.progress.definition.progressInPercent =
              this.calculatePercent(item.progress.definition.total, item.progress.definition.created);
            item.progress.commissioning.progressInPercent =
              this.calculatePercent(item.progress.commissioning.total, item.progress.commissioning.created);
            return item;
          });
          return items;
        }),

      )
      .subscribe(
        (res: ResponseSiteList) => {
          this.sites = res;
          this.sites.data.sort((a, b) => (a.id > b.id) ? 1 : -1);
          if (this.sites.data.length) {
            this.siteStatusSubscription = this.siteStatusPollingService.getSiteStatusPoling(this.sites.data.map(site => site.id))
              .subscribe(pollingData => {
                pollingData.data.forEach(item => {
                  const tmpSite = this.sites.data.find(site => site.id === item.site_id);
                  if (tmpSite) {
                    tmpSite.status = item.status;
                    tmpSite.mode = item.site_mode;
                    tmpSite.lastPush = item.last_push;
                    tmpSite.progress.definition.progressInPercent =
                      this.calculatePercent(item.progress.definition.total, item.progress.definition.created);
                    tmpSite.progress.commissioning.progressInPercent =
                      this.calculatePercent(item.progress.commissioning.total, item.progress.commissioning.created);
                  }

                });
              });
          }
        }
      );




  }

  ngOnDestroy(): void {
    if (this.siteStatusSubscription) {
      this.siteStatusSubscription.unsubscribe();
    }
  }

  calculatePercent(total: number, used: number): number {
    let result = 0;
    result = Number((used * 100 / total).toFixed(2)) ?
      Number((used * 100 / total).toFixed(2)) : 0;
    if (result > 100) {
      return 100;
    }
    else if (result >= 0 && result <= 100) {
      return result;
    }
  }


  openInviteManagerDialog(site: SiteData): void {
    const dialogRef = this.dialog.open(InviteManagerDialogComponent, {
      width: '600px',
      data: site,
    });
  }

  openDialog(site: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '320px',
      height: '280px',
      data: site
    });

    dialogRef.afterClosed().subscribe((id: number) => {
      if (id) {
        this.siteService.delete(id).subscribe(res => {
          this.sites.data = this.sites.data.filter(item => {
            return item.id !== id;
          });
        });
      }
    });
  }
}


