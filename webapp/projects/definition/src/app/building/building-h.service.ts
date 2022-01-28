import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BuildingService } from './building.service';
import { BuildingData } from './buildings';
import { AHierarchy } from '../globalService/ahierarchy';
import { SiteHService } from '../site/site-h.service';

@Injectable({
  providedIn: 'root'
})
export class BuildingHService extends AHierarchy {
  data$: Observable<BuildingData> = this.dataSubject.asObservable();

  constructor(
    protected buildingService: BuildingService,
    private siteHservice: SiteHService
  ) {
    super();
    this.service = buildingService;
    this.init();
    this.parentService = siteHservice;
    this.parentField = 'site_id';
  }


}
