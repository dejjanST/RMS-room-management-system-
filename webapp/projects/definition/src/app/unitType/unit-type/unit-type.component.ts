import { Component, OnInit, OnDestroy } from '@angular/core';
import { UnitTypeService } from '../unit-type.service';
import { RequestUnitType, FilterFCU, FilterWS, SelectedEquipment } from '../models/unit-type.Model';
import { Observable, BehaviorSubject } from 'rxjs';
import { Equipment, Equipments } from '../models/equipment.Model';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ByKeyValuePipe } from 'projects/shared/src/app/pipes/by-key-value.pipe';
import { SumByKeyPipe } from 'projects/shared/src/app/pipes/sum-by-key.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UnitTypeSaveAsDialogComponent } from '../unit-type-save-as-dialog/unit-type-save-as-dialog.component';
import { VedValidators } from 'projects/shared/src/app/Validators/ved-validators';



@Component({
  selector: 'app-unit-type',
  templateUrl: './unit-type.component.html',
  styleUrls: ['./unit-type.component.css']
})
export class UnitTypeComponent implements OnInit {
  editId: number;
  locked = false;
  subjectEquipments: BehaviorSubject<Array<Equipment>> = new BehaviorSubject(new Array<Equipment>());
  equipments: Observable<Equipment[]> = this.subjectEquipments.asObservable();
  selectedType: string;
  requestUnitType = new RequestUnitType();
  selectedModel: any = {};
  previousSelectedModel: any = {};
  selectedMC: Equipment = new Equipment();
  equipmentList: Array<Equipment> = [];
  form: FormGroup;
  filter = '.+';
  fi: any = {
    FCU: FilterFCU,
    'Water Supply': FilterFCU
  };

  constructor(
    private unitTypeService: UnitTypeService,
    private formBuilder: FormBuilder,
    private byKeyValuePipe: ByKeyValuePipe,
    private sumByKeyPipe: SumByKeyPipe,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) { }



  ngOnInit(): void {
    // creating form group
    this.form = this.formBuilder.group({
      mcControl: ['', [Validators.required]],
      name: ['', [Validators.required, VedValidators.minLength(3)]],
      rooms: [1, [Validators.required, Validators.min(1)]],
      description: [''],
      locked: [false, [Validators.required]]
    });

    // get id if is edit
    this.editId = +this.route.snapshot.paramMap.get('id');

    // get equipment list from backend
    this.unitTypeService.getEquipmentList().subscribe((eqList: Equipments) => {
      this.equipmentList = eqList.data;
      // console.log(JSON.stringify(eqList));

      this.recalculate();

      if (this.editId) {
        this.unitTypeService.getUnitType(this.editId).subscribe(res => {

          // filling edit form from backend with selected equipments
          this.equipmentList.forEach(equipment => {
            res.data.equipment.forEach(selectedEquipment => {
              if (equipment.id === selectedEquipment.id) {
                equipment.selected = true;
                equipment.quantity = selectedEquipment.q;
                // filling side group filter with selected equipment by group
                this.selectedModel[equipment.category] = equipment;
                if (equipment.category === 'MC') {
                  this.selectedMC = equipment;
                }
              }
            });
          });

          // update equipments
          this.recalculate();

          // filling the form
          this.form.get('mcControl').setValue(this.selectedMC);
          this.form.get('name').setValue(res.data.name);
          this.form.get('rooms').setValue(res.data.rooms);
          this.form.get('description').setValue(res.data.description);
          this.form.get('locked').setValue(res.data.locked);
          this.locked = res.data.locked;
        });
      }
    });
  }

  // for mat-error validation in html
  get f() {
    return this.form.controls;
  }

  // change selected Type by equipment type group and reset the FCU and WaterSupply filters
  setType(type: string): void {
    this.fi.FCU = new FilterFCU();
    this.fi['Water Supply'] = new FilterWS();
    this.filter = '.+';
    this.selectedType = type;
    // reset validation error class on Select Type
    if (this.selectedModel[this.selectedType]) {
      this.selectedModel[this.selectedType].showQtyErrorClass = false;
    }
  }

  // FCU and WaterSupply filter
  createFilter(type: any) {
    this.filter = this.fi[type].filter();
  }

  // on Master Controller Change event
  onMcChange(event: any) {
    this.selectedModel = {};
    this.equipmentList = this.equipmentList
      .map((item: Equipment) => {
        item.selected = false;
        item.quantity = 0;
        if (event.value.id === item.id) {
          item.selected = true;
          item.quantity = 1;
          this.selectedMC = item;
        }
        return item;
      })
      .map((item: Equipment) => {
        if (event.value.model === 'RC') {
          // set Room Wall Unit
          if (item.model === 'RWU') {
            item.selected = true;
            item.quantity = this.form.get('rooms').value;
            this.selectedModel[item.category] = item;
          }
          // set Front Door Wall Unit
          if (item.model === 'FDWU') {
            item.selected = true;
            item.quantity = 1;
            this.selectedModel[item.category] = item;
          }
        }
        return item;
      });
    this.recalculate();
  }

  onRoomsNumberChange(event: any) {
    if (event.target.valueAsNumber > 0) {
      if (this.selectedMC.model === 'RC') {
        this.selectedModel['Room Wall Unit'].quantity = event.target.valueAsNumber;
        this.selectedModel['Room Wall Unit'].showQtyErrorClass = false;
      }
    }
  }

  // on keyup input type number by equipment select
  onQuantityChange(event: any, onEqpt: Equipment) {
    let previousQty: number;
    let filtered = this.byKeyValuePipe.transform(this.equipmentList, 'selected', true);

    // if enter number >= 0 in equipment quantity input, show .quantityError class
    if (event.target.valueAsNumber <= 0) {
      onEqpt.showQtyErrorClass = true;
    }
    if (event.target.valueAsNumber > 0) {
      this.equipmentList = this.equipmentList.map(equipment => {
        if (equipment.id === this.selectedModel[this.selectedType].id) {
          // reset selected item quantity on 0
          filtered = filtered.map((item: Equipment) => {
            if (item.id === equipment.id) {
              previousQty = item.quantity;
              item.quantity = 0;
            }
            return item;
          });
          // checking for available IO pins
          if (
            (equipment.hv * -1 * event.target.valueAsNumber) <= (this.sumByKeyPipe.transform(filtered, 'hv')) &&
            (equipment.av * -1 * event.target.valueAsNumber) <= this.sumByKeyPipe.transform(filtered, 'av') &&
            (equipment.lv * -1 * event.target.valueAsNumber) <= this.sumByKeyPipe.transform(filtered, 'lv') &&
            (equipment.ro * -1 * event.target.valueAsNumber) <= this.sumByKeyPipe.transform(filtered, 'ro') &&
            (equipment.tidi * -1 * event.target.valueAsNumber) <= this.sumByKeyPipe.transform(filtered, 'tidi')
          ) {
            equipment.quantity = event.target.valueAsNumber;
            equipment.showQtyErrorClass = false;
          }
          // when have not available IO pins
          else if (
            (equipment.hv * -1 * event.target.valueAsNumber) > (this.sumByKeyPipe.transform(filtered, 'hv')) ||
            (equipment.av * -1 * event.target.valueAsNumber) > this.sumByKeyPipe.transform(filtered, 'av') ||
            (equipment.lv * -1 * event.target.valueAsNumber) > this.sumByKeyPipe.transform(filtered, 'lv') ||
            (equipment.ro * -1 * event.target.valueAsNumber) > this.sumByKeyPipe.transform(filtered, 'ro') ||
            (equipment.tidi * -1 * event.target.valueAsNumber) > this.sumByKeyPipe.transform(filtered, 'tidi')
          ) {
            equipment.showQtyErrorClass = true;
            equipment.quantity = previousQty;
          }
          // Room Wall Unit Validation
          if (equipment.model === 'RWU') {
            if (event.target.valueAsNumber <= this.form.get('rooms').value) {
              equipment.quantity = event.target.valueAsNumber;
              equipment.showQtyErrorClass = false;
            }
            if (event.target.valueAsNumber > this.form.get('rooms').value) {
              equipment.quantity = previousQty;
              equipment.showQtyErrorClass = true;
            }
          }
          // Front Door Wall Unit Validation
          if (equipment.model === 'FDWU') {
            equipment.showQtyErrorClass = false;
          }
        }
        return equipment;
      });
      this.recalculate();
    }
  }


  // on equipmnet select or deselect event
  onSelect(event: any) {
    this.equipmentList = this.equipmentList
      .map((item: Equipment) => {
        if (item.category === event.target.name &&
          item.category !== 'Room Wall Unit' &&
          item.category !== 'Front Door Wall Unit') {
          const selected = item.selected;
          item.selected = false;
          // reset showQtyErrorClass on equipment changed
          item.showQtyErrorClass = false;
          if (item.id === +event.target.value) {
            if (selected) {
              this.selectedModel[item.category] = undefined;
            }
            if (!selected) {
              this.selectedModel[item.category] = item;
              item.selected = true;
              item.quantity = 1;
            }
          }
        }
        return item;
      });
    this.recalculate();
  }


  // recalculate equipment list after each change event
  recalculate() {
    const filtered = this.byKeyValuePipe.transform(this.equipmentList, 'selected', true);
    const recalculatedEquipments = this.equipmentList
      .map((equipment: Equipment) => {
        equipment.disabled = true;
        // checking available IO pins
        if (
          (equipment.hv * -1) <= this.sumByKeyPipe.transform(filtered, 'hv') &&
          (equipment.av * -1) <= this.sumByKeyPipe.transform(filtered, 'av') &&
          (equipment.lv * -1) <= this.sumByKeyPipe.transform(filtered, 'lv') &&
          (equipment.ro * -1) <= this.sumByKeyPipe.transform(filtered, 'ro') &&
          (equipment.tidi * -1) <= this.sumByKeyPipe.transform(filtered, 'tidi')
        ) {
          equipment.disabled = false;
        }
        return equipment;
      })
      .map(equipment => {
        if (equipment.selected) {
          equipment.disabled = false;
        }
        return equipment;
      });
    this.subjectEquipments.next(recalculatedEquipments);
  }

  openSaveAsDialog(): void {
    const dialogRef = this.dialog.open(UnitTypeSaveAsDialogComponent, {
      width: '500px',
      data: { name: this.form.get('name').value }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.requestUnitType.name = result;
        this.requestUnitType.rooms = this.form.get('rooms').value;
        this.requestUnitType.description = this.form.get('description').value;
        this.requestUnitType.locked = false;
        this.requestUnitType.equipment = [];
        this.equipments.subscribe(items => {
          items.forEach(item => {
            if (item.selected) {
              const requestEquipment = new SelectedEquipment();
              requestEquipment.id = item.id;
              requestEquipment.q = item.quantity;
              this.requestUnitType.equipment.push(requestEquipment);
            }
          });
        });
        this.unitTypeService.createUnitType(this.requestUnitType).subscribe(res => {
          this.router.navigate(['units']);
        });
      }

    });
  }


  submit() {
    this.requestUnitType.name = this.form.get('name').value;
    this.requestUnitType.rooms = this.form.get('rooms').value;
    this.requestUnitType.description = this.form.get('description').value;
    this.requestUnitType.locked = this.form.get('locked').value;
    this.requestUnitType.equipment = [];
    this.equipments.subscribe(items => {
      items.forEach(item => {
        if (item.selected) {
          const requestEquipment = new SelectedEquipment();
          requestEquipment.id = item.id;
          requestEquipment.q = item.quantity;
          this.requestUnitType.equipment.push(requestEquipment);
        }
      });
    });
    if (this.editId) {
      this.unitTypeService.editUnitType(this.editId, this.requestUnitType).subscribe();
    }
    else {
      this.unitTypeService.createUnitType(this.requestUnitType).subscribe(res => {
        this.router.navigate(['units']);
      });
    }
  }

}
