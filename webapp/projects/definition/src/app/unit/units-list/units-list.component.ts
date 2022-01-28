import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../globalService/global.service';
import { UnitSearch, ResponseUnitLst } from '../unit';
import { UnitService } from '../unit-service.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';
import { Equipment, Equipments } from '../../unitType/models/equipment.Model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-units-list',
  templateUrl: './units-list.component.html',
  styleUrls: ['./units-list.component.css']
})
export class UnitsListComponent implements OnInit {

  units: ResponseUnitLst = new ResponseUnitLst();
  unitSearch: UnitSearch = new UnitSearch();
  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  stages = [{ key: 1, value: 'Non Commissioned' }, { key: 2, value: 'Assocation' }, { key: 3, value: 'Verification' }, { key: 4, value: 'Malfunction' }, { key: 5, value: 'Verified' }, { key: 6, value: 'Controller Malfunction' }];
  equipmentList: Array<Equipment> = [];
  formGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    public globalService: GlobalService,
    private unitService: UnitService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // document.body.requestFullscreen();
    this.unitSearch.building_id = +this.route.snapshot.paramMap.get('buildingId');
    this.globalService.building.set(this.unitSearch.building_id);

    this.formGroup = this.formBuilder.group({
      unit_name: [''],
      unit_number: [''],
      floor_name: [''],
      floor_number: [''],
      stage: [''],
      model: ['']
    });

    // default value of paginator
    this.unitSearch.per_page = 10;

    this.unitService.getEquipmentList().subscribe(
      (eqList: Equipments) => {
        this.equipmentList = eqList.data;
      }
    );

    this.formGroup.valueChanges
      .pipe(
        debounceTime(333),
        startWith({}),
      )
      .subscribe(res => {
        this.unitSearch.u_name = res.unit_name;
        this.unitSearch.u_number = res.unit_number;
        this.unitSearch.f_name = res.floor_name;
        this.unitSearch.f_number = res.floor_number;
        this.unitSearch.stage = res.stage;
        this.unitSearch.model = res.model;
        this.unitService.getList(this.unitSearch).subscribe(
          response => {
            this.units = response;
          }
        );
      });
  }


  getStage(key: number): string {
    if (this.stages.find(item => item.key === key)) {
      return this.stages.find(item => item.key === key).value;
    }
  }

  // change value of paginator
  pageEvent(event: PageEvent) {
    this.unitSearch.page = event.pageIndex + 1;
    this.unitSearch.per_page = event.pageSize;

    this.unitService.getList(this.unitSearch).subscribe(
      res => {
        this.units = res;
      }
    );
  }

}
