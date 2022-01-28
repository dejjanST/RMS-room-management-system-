import { Injectable } from '@angular/core';
import { AHierarchy } from '../globalService/ahierarchy';
import { UnitService } from './unit-service.service';
import { UnitDetails } from '../unitType/models/unit-type.Model';
import { Observable } from 'rxjs';
import { FloorHService } from '../floor/floor-h.service';
import { UnitData } from './unit';

@Injectable({
  providedIn: 'root'
})
export class UnitHService extends AHierarchy {
  data$: Observable<UnitData> = this.dataSubject.asObservable();

  constructor(
    protected unitService: UnitService,
    private floorHService: FloorHService
  ) {
    super();
    this.service = unitService;
    this.init();
    this.parentService = floorHService;
    this.parentField = 'floor_id';
  }
}
