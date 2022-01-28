import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AHierarchy } from '../globalService/ahierarchy';
import { FloorService } from './floor.service';
import { BuildingHService } from '../building/building-h.service';
import { FloorData } from './floor';

@Injectable({
  providedIn: 'root'
})
export class FloorHService extends AHierarchy {
  data$: Observable<FloorData> = this.dataSubject.asObservable();

  constructor(
    protected floorService: FloorService,
    private buildingHService: BuildingHService
  ) {
    super();
    this.service = floorService;
    this.init();
    this.parentService = buildingHService;
    this.parentField = 'building_id';
  }
}
