import { Component, OnInit, Input } from '@angular/core';
import { FloorLayout, Unit, FloorLayoutsBySideList } from '../../floorLayout/floor-layout.model';
import { Validators, FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { FloorLayoutService } from '../../floorLayout/floor-layout.service';
import { RequestBulkData } from '../floor';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FloorService } from '../floor.service';

@Component({
  selector: 'app-bulk-floor',
  templateUrl: './bulk-floor.component.html',
  styleUrls: ['./bulk-floor.component.css']
})
export class BulkFloorComponent implements OnInit {

  @Input() floorLayoutList: FloorLayoutsBySideList;
  formBulk: FormGroup;
  floorImage$: Observable<string>;
  floorLayoutUnits: Unit[];
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private floorLayoutService: FloorLayoutService,
    private route: ActivatedRoute,
    private router: Router,
    private floorService: FloorService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formBulk = this.fb.group({
      fromNumber: ['', [Validators.required, , Validators.pattern('^[0-9]*$')]],
      floorLayout: ['', [Validators.required]],
      toNumber: ['', [Validators.required, , Validators.pattern('^[0-9]*$')]],
      prefix: ['', [Validators.required]],
      units: this.fb.array([])
    });
  }

  floorSelected(fll) {
    this.bulkUnitsFormArray.clear();

    const selectedFL = this.floorLayoutList.data.filter(item => item.id === fll.value);

    this.floorImage$ = of('/files/' + selectedFL[0].file_id);

    this.floorLayoutService.getFloorLayout(fll.value).subscribe(
      res => {
        this.floorLayoutUnits = res.data.units;
        this.floorLayoutUnits.forEach(item => {
          this.addBulkUnit(item);
        });
      }
    );
  }

  get fbulk() {
    return this.formBulk.controls;
  }

  get bulkUnitsFormArray() {
    return this.formBulk.get('units') as FormArray;
  }

  addBulkUnit(unit: Unit) {
    this.bulkUnitsFormArray.push(this.createUnit(unit));
  }

  createUnit(unit: Unit) {
    return this.fb.group({
      id: [unit.id, [Validators.required]],
      pos: [unit.pos],
      unit_type_name: [unit.unit_type_name],
      unit_type: [unit.unit_type],
      name: [unit.unit_no.toString(), [Validators.required]],
      unit_no: [unit.unit_no]
    });
  }

  get f() {
    return this.form.controls;
  }

  createBulk() {
    const bulkData = new RequestBulkData();
    bulkData.data.floor_from = +this.formBulk.get('fromNumber').value;
    bulkData.data.floor_to = +this.formBulk.get('toNumber').value;
    bulkData.data.floor_layout_id = +this.formBulk.get('floorLayout').value;
    bulkData.data.building_id = +this.route.snapshot.paramMap.get('buildingId');
    bulkData.data.prefix = this.formBulk.get('prefix').value;

    this.floorService.createBulk(bulkData).subscribe(
      (res: HttpResponse<any>) => {
        this.router.navigate(['buildings', bulkData.data.building_id.toString(), 'floors']);
      },
      (err: HttpErrorResponse) => {
        throw err;
      });
  }
}
