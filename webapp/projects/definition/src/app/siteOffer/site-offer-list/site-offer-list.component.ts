import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteOfferService } from '../site-offer.service';
import { ResponseSiteOffers, SiteOffer, OfferStatus } from '../site-offer.model';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from '../../globalService/global.service';
import { DeleteDialogComponent } from 'projects/shared/src/app/components/dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-site-offer-list',
  templateUrl: './site-offer-list.component.html',
  styleUrls: ['./site-offer-list.component.css']
})
export class SiteOfferListComponent implements OnInit {


  siteId: number;
  siteOffers: SiteOffer[] = [];
  offerStatus: OfferStatus[] = [
    { value: 1, viewValue: 'Open' },
    { value: 2, viewValue: 'Sent' },
    { value: 3, viewValue: 'Accepted' },
    { value: 4, viewValue: 'Declined' }
  ];

  constructor(
    public globalService: GlobalService,
    private siteOfferService: SiteOfferService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.siteId = +this.route.snapshot.paramMap.get('siteId');
    this.globalService.site.set(this.siteId);

    this.siteOfferService.getOffersBySite(this.siteId).subscribe((res: ResponseSiteOffers) => {
      this.siteOffers = res.data;
      // disable delete button if status is not Open
      this.siteOffers.forEach(item => {
        if (item.status !== 1) {
          item.disabled = true;
        }
      });
    });
  }

  getOfferViewValue(id: number) {
    return this.offerStatus.find(item => item.value === id).viewValue;
  }

  openDialog(siteOffer: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '320px',
      height: '280px',
      data: siteOffer
    });

    dialogRef.afterClosed().subscribe((id: number) => {
      if (id !== undefined) {
        this.siteOfferService.deleteSiteOffer(id).subscribe(res => {
          this.siteOffers = this.siteOffers.filter(item => {
            return item.id !== id;
          });
        });
      }
    });
  }
}

