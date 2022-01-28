import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { FloorService } from '../floor.service';
import { FloorUnit, ResponseFloor } from '../floor';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { Unit, FloorLayout, FloorLayoutsBySideList } from '../../floorLayout/floor-layout.model';
import { FloorLayoutService } from '../../floorLayout/floor-layout.service';
import { VedValidators } from 'projects/shared/src/app/Validators/ved-validators';

@Component({
  selector: 'app-create-floor',
  templateUrl: './create-floor.component.html',
  styleUrls: ['./create-floor.component.css']
})
export class CreateFloorComponent implements OnInit {

  floorId: number;
  form: FormGroup;
  floorImage$: Observable<string>;
  editUnits: FloorUnit[];
  @Input() floorLayoutList: FloorLayoutsBySideList;
  floorLayoutUnits: Unit[];
  floor: ResponseFloor = new ResponseFloor();
  buildingId: number;

  constructor(
    private fb: FormBuilder,
    private floorService: FloorService,
    private route: ActivatedRoute,
    private router: Router,
    private floorLayoutService: FloorLayoutService
  ) { }

  ngOnInit(): void {
    this.initForm();

    // Edit mode for selected floorId
    this.floorId = +this.route.snapshot.paramMap.get('floorId');
    if (this.floorId > 0) {
      this.floorService.get(this.floorId).subscribe(res => {
        this.form.get('floorLayout').setValue(res.data.floor_layout_id);
        this.form.get('floorName').setValue(res.data.name);
        this.form.get('floorNumber').setValue(res.data.floor_no);
        this.floorImage$ = of('/files/' + res.data.floor_layout_fileid);

        this.editUnits = res.data.units;
        this.editUnits.forEach(item => {
          this.addEditedUnit(item);
        });
      }
      );
    }
  }

  initForm() {
    this.form = this.fb.group({
      floorLayout: ['', [Validators.required]],
      floorName: ['', [Validators.required, VedValidators.minLength(2)]],
      floorNumber: ['', [Validators.required, Validators.pattern('^-?[0-9]+(?:\.[0-9]+)?$')]],
      units: this.fb.array([])
    });
  }

  addEditedUnit(unit: FloorUnit) {
    this.unitsFormArray.push(this.createEditedUnit(unit));
  }

  get f() {
    return this.form.controls;
  }

  get unitsFormArray() {
    return this.form.get('units') as FormArray;
  }

  createEditedUnit(unit: FloorUnit) {
    return this.fb.group({
      id: [unit.id, [Validators.required]],
      pos: [unit.pos],
      unit_type_name: [unit.unit_type_name],
      name: [unit.name, [Validators.required]],
      unit_no: [unit.unit_no]
    });
  }

  addUnit(unit: Unit) {
    this.unitsFormArray.push(this.createUnit(unit));
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

  floorSelected(fll) {
    this.unitsFormArray.clear();

    const selectedFL = this.floorLayoutList.data.filter(item => item.id === fll.value);

    this.floorImage$ = of('/files/' + selectedFL[0].file_id);

    this.floorLayoutService.getFloorLayout(fll.value).subscribe(
      res => {
        this.floorLayoutUnits = res.data.units;
        this.floorLayoutUnits.forEach(item => {
          this.addUnit(item);
        });
      }
    );
  }

  save() {
    this.floor.data.name = this.form.get('floorName').value;
    this.floor.data.floor_no = +this.form.get('floorNumber').value;
    this.floor.data.building_id = +this.route.snapshot.paramMap.get('buildingId');
    this.floor.data.floor_layout_id = +this.form.get('floorLayout').value;

    if (this.floorId > 0) {
      this.unitsFormArray.value.forEach(unit => {
        const unitEdited = new FloorUnit();
        unitEdited.id = unit.id;
        unitEdited.name = unit.name;
        this.floor.data.units.push(unitEdited);
      });

      this.floorService.update(this.floor, this.floorId).subscribe(
        res => {
          this.router.navigate(['buildings', this.floor.data.building_id.toString(), 'floors']);
        }
      );
    }
    else {
      this.unitsFormArray.value.forEach(unit => {
        this.floor.data.units.push(unit);
      });

      this.floorService.create(this.floor).subscribe(
        res => {
          this.router.navigate(['buildings', this.floor.data.building_id.toString(), 'floors']);
        }
      );
    }
  }
}
