import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Unit, FloorLayoutsBySideList } from '../../floorLayout/floor-layout.model';
import { FloorLayoutService } from '../../floorLayout/floor-layout.service';
import { ResponseFloorList, ResponseFloor } from '../floor';
import { Building } from '../../building/buildings';
import { Observable, of } from 'rxjs';
import { GlobalService } from '../../globalService/global.service';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css']
})
export class FloorComponent implements OnInit {

  form: FormGroup;
  formBulk: FormGroup;
  buildingId: number;
  floorId: number;
  siteId: number;
  floorLayoutList: FloorLayoutsBySideList = new FloorLayoutsBySideList();
  floor: ResponseFloor = new ResponseFloor();
  building: Building = new Building();
  floors: ResponseFloorList = new ResponseFloorList();
  floorImage$: Observable<string>;
  floorLayoutUnits: Unit[];


  constructor(
    private route: ActivatedRoute,
    private floorLayoutService: FloorLayoutService,
    public globalService: GlobalService
  ) { }

  ngOnInit(): void {
    this.buildingId = +this.route.snapshot.paramMap.get('buildingId');
    this.floorId = +this.route.snapshot.paramMap.get('floorId');

    this.globalService.building.set(this.buildingId);

    // get building details
    this.globalService.building.data$.subscribe(
      res => {
        if (Object.keys(res).length) {
          this.building.data = res;
          this.siteId = res.site_id;

          // get layouts for mat select floor layout
          this.floorLayoutService.getFloorLayoutsBySiteList(this.siteId).subscribe(floorLayouts => {
            this.floorLayoutList = floorLayouts;
          });
        }
      }
    );
  }
}
