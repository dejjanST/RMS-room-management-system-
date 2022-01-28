import { Component, OnInit } from '@angular/core';
import { UnitTypeService } from '../../unitType/unit-type.service';
import { Observable, of } from 'rxjs';
import { ResponseUnitType, ResponseUnitTypeList, UnitDetails } from '../../unitType/models/unit-type.Model';
import { FileUploadService } from 'projects/shared/src/app/services/file-upload.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { RequestFloorLayout, Unit, ResponseFloorLayout } from '../floor-layout.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FloorLayoutService } from '../floor-layout.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { VedValidators } from 'projects/shared/src/app/Validators/ved-validators';

@Component({
  selector: 'app-floor-layout',
  templateUrl: './floor-layout.component.html',
  styleUrls: ['./floor-layout.component.css']
})
export class FloorLayoutComponent implements OnInit {
  unitTypeList: ResponseUnitType[] = [];
  form: FormGroup;
  unitTypes: FormArray;
  requestFloorLayout: RequestFloorLayout = new RequestFloorLayout();
  floorImgUrl$: Observable<string> = of(this.imgUrl());
  floorLayoutId: number;
  RCReservedIndexes: Array<number> = [];
  CCACReservedIndexes: Array<number> = [];
  responseFloorLayout: ResponseFloorLayout = new ResponseFloorLayout();

  constructor(
    private unitTypeService: UnitTypeService,
    private fileUploadService: FileUploadService,
    private floorLayoutService: FloorLayoutService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.requestFloorLayout.site_id = +this.route.snapshot.paramMap.get('siteId');
    this.floorLayoutId = +this.route.snapshot.paramMap.get('floorLayoutId');

    this.form = this.formBuilder.group({
      name: [, [Validators.required, VedValidators.minLength(3)]],
      fileId: [, [Validators.required]],
      RCUnitTypes: this.formBuilder.array([]),
      CCACUnitTypes: this.formBuilder.array([])
    });

    this.form.markAllAsTouched();

    // get all created unitTypes
    this.unitTypeService.getListAcceptedBySite(this.requestFloorLayout.site_id)
      .subscribe((utList: ResponseUnitTypeList) => {
        this.unitTypeList = utList.data;

        // for edit form
        if (this.floorLayoutId) {
          this.floorLayoutService.getFloorLayout(this.floorLayoutId).subscribe(res => {
            this.responseFloorLayout = res;

            this.floorImgUrl$ = of(this.imgUrl(res.data.file_id.toString()));
            this.form.get('fileId').setValue(res.data.file_id.toString());
            this.form.get('name').setValue(res.data.name);

            // map positions
            res.data.units.forEach(responseUnits => {

              this.unitTypeList.forEach(unitType => {
                if (responseUnits.unit_type === unitType.id) {
                  let ut = new ResponseUnitType();
                  ut = Object.assign({}, unitType);
                  ut.unitDetails = new UnitDetails();
                  ut.unitDetails.initialPosX = responseUnits.pos.x;
                  ut.unitDetails.positionX = ut.unitDetails.initialPosX;
                  ut.unitDetails.initialPosY = responseUnits.pos.y;
                  ut.unitDetails.positionY = ut.unitDetails.initialPosY;
                  ut.unit_no = responseUnits.unit_no;
                  this.addUnitType(ut);
                }
              });
            });
          });
        }
      });


    // after index change of RC widged, changing in RC indexes Array
    this.RCUnitTypesFormArray.valueChanges.subscribe((data: Array<any>) => {
      this.RCReservedIndexes = [];
      data.forEach(element => {
        this.RCReservedIndexes.push(element.index);
      });
    });

    // after index change of CC or AC widged, changing in CCAC indexes Array
    this.CCACUnitTypesFormArray.valueChanges.subscribe((data: Array<any>) => {
      this.CCACReservedIndexes = [];
      data.forEach(element => {
        this.CCACReservedIndexes.push(element.index);
      });
    });
  }


  imgUrl(id: string = ''): string {
    return '/files/' + id;
  }

  fileBrowseHandler(event: any) {
    this.fileUploadService.upload(event.target.files[0], 'floor_layout').subscribe(res => {
      this.floorImgUrl$ = of(this.imgUrl(res.body.data.id));
      this.form.get('fileId').setValue(res.body.data.id);
    });
  }


  dragEnd(event: any, dragedElement: ResponseUnitType) {
    const transform = event.source.element.nativeElement.style.transform;
    const regex = /translate3d\(\s?(?<x>[-]?\d*)px,\s?(?<y>[-]?\d*)px,\s?(?<z>[-]?\d*)px\)/;
    const values = regex.exec(transform);
    const offset = { x: values[1], y: values[2] };

    dragedElement.unitDetails.positionX = dragedElement.unitDetails.initialPosX + +offset.x;
    dragedElement.unitDetails.positionY = dragedElement.unitDetails.initialPosY + +offset.y;
  }


  // TODO: Manualy change position when changing the coordinates.
  onPositionChange(event: any, changeElement: ResponseUnitType, axis: string) {
    if (axis === 'x') {
      if (event.target.valueAsNumber >= 0 && event.target.valueAsNumber <= 1920) {
        changeElement.unitDetails.positionX = event.target.valueAsNumber;
      }
    }
    if (axis === 'y') {
      if (event.target.valueAsNumber >= 0 && event.target.valueAsNumber <= 1080) {
        changeElement.unitDetails.positionY = event.target.valueAsNumber;
      }
    }
  }


  // when click on unit type to add widget in Floor Layout
  addToLayout(ut: ResponseUnitType) {
    ut.unitDetails = new UnitDetails();
    this.addUnitType(Object.assign({}, ut));
  }

  get RCUnitTypesFormArray(): FormArray {
    return this.form.get('RCUnitTypes') as FormArray;
  }

  get CCACUnitTypesFormArray(): FormArray {
    return this.form.get('CCACUnitTypes') as FormArray;
  }

  // Create item for FormArray
  createUnitType(ut: ResponseUnitType, reserved: Array<number>, limit: number): FormGroup {
    let index: number;
    for (let i = 1; i <= limit; i++) {
      if (reserved.indexOf(i) === -1) {
        index = i;
        break;
      }
    }
    return this.formBuilder.group({
      unitType: [ut, [Validators.required]],
      index: [index, [Validators.required, Validators.min(1), Validators.max(limit), RxwebValidators.unique()]]
    });
  }

  // delete from FormArray
  deleteUnitType(utFormArray: FormArray, id: number) {
    utFormArray.removeAt(id);
  }


  // add in FormArray
  addUnitType(ut: ResponseUnitType): void {
    if (ut.master_controller_model === 'RC') {
      this.RCUnitTypesFormArray.push(this.createUnitType(ut, this.RCReservedIndexes, 999));
    }

    if (ut.master_controller_model === 'AC' || ut.master_controller_model === 'CC') {
      this.CCACUnitTypesFormArray.push(this.createUnitType(ut, this.CCACReservedIndexes, 99));
    }
  }

  submit() {
    this.requestFloorLayout.units = [];
    this.RCUnitTypesFormArray.value.forEach((element: any) => {
      const unit = new Unit();
      unit.unit_type = element.unitType.id;
      unit.pos.x = element.unitType.unitDetails.positionX;
      unit.pos.y = element.unitType.unitDetails.positionY;
      unit.unit_no = element.index;
      this.requestFloorLayout.units.push(unit);
    });

    this.CCACUnitTypesFormArray.value.forEach((element: any) => {
      const unit = new Unit();
      unit.unit_type = element.unitType.id;
      unit.pos.x = element.unitType.unitDetails.positionX;
      unit.pos.y = element.unitType.unitDetails.positionY;
      unit.unit_no = element.index;
      this.requestFloorLayout.units.push(unit);
    });

    this.requestFloorLayout.file_id = this.form.get('fileId').value;
    this.requestFloorLayout.name = this.form.get('name').value;
    if (this.floorLayoutId) {
      this.floorLayoutService.editFloorLayout(this.floorLayoutId, this.requestFloorLayout).subscribe();
    }
    else {
      this.floorLayoutService.createFloorLayout(this.requestFloorLayout).subscribe(res => {
        this.router.navigate(['sites/' + this.requestFloorLayout.site_id + '/fld/edit/' + res.data.id]);
      });
    }
  }


}
