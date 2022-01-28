import { Injectable } from '@angular/core';
import { SiteService } from '../site/site.service';
import { SiteData } from '../site/site';
import { Observable } from 'rxjs';
import { ClientHService } from '../client/client-h.service';
import { AHierarchy } from '../globalService/ahierarchy';

@Injectable({
  providedIn: 'root'
})
export class SiteHService extends AHierarchy {
  data$: Observable<SiteData> = this.dataSubject.asObservable();

  constructor(
    protected siteService: SiteService,
    private clientHService: ClientHService
  ) {
    super();
    this.service = siteService;
    this.init();
    this.parentService = clientHService;
    this.parentField = 'client_id';
  }


}
