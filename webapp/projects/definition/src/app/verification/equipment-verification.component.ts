import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Equipment } from './equipment-verification.model';
import { EquipmentVerificationService } from './equipment-verification.service';
import { GlobalService } from '../globalService/global.service';

@Component({
  selector: 'app-equipment-verification',
  templateUrl: './equipment-verification.component.html',
  styleUrls: ['./equipment-verification.component.css']
})
export class EquipmentVerificationComponent implements OnInit {
  unitId: number;
  siteId: number;
  unitDetails: any = {};
  equipmentList: Array<Equipment> = [];

  constructor(
    public equipmentVerificationService: EquipmentVerificationService,
    private route: ActivatedRoute,
    private globalService: GlobalService
  ) { }

  ngOnInit(): void {
    this.unitId = +this.route.snapshot.paramMap.get('unitId');
    this.globalService.unit.set(this.unitId);


    // this is only for Unit name
    this.globalService.unit.data$.subscribe(res => {
      this.unitDetails = res;
    });

    this.globalService.site.data$.subscribe(res => {
      this.siteId = res.id;
    });


    this.equipmentVerificationService.getEqptsByUnit(this.unitId).subscribe(res => {
      this.equipmentList = res.data;
    });
  }

}
