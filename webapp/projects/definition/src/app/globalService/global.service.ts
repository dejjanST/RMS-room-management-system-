import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserRequestModel } from 'projects/login/src/app/models/user-model';
import { BuildingHService } from '../building/building-h.service';
import { ClientHService } from '../client/client-h.service';
import { FloorHService } from '../floor/floor-h.service';
import { UnitHService } from '../unit/unit-h.service';
import { SiteHService } from '../site/site-h.service';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public user$: BehaviorSubject<UserRequestModel> = new BehaviorSubject<UserRequestModel>(new UserRequestModel());

  constructor(
    public unit: UnitHService,
    public floor: FloorHService,
    public building: BuildingHService,
    public site: SiteHService,
    public client: ClientHService
  ) { }






}
