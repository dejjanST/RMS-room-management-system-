import { ElementRef, Input, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Equipment, RequestEquipment } from '../equipment-verification.model';
import { EquipmentVerificationService } from '../equipment-verification.service';

@Component({
  selector: 'app-equipment-item',
  templateUrl: './equipment-item.component.html',
  styleUrls: ['./equipment-item.component.css']
})
export class EquipmentItemComponent implements OnInit {
  @Input() equipment: Equipment;
  @Input() siteId: number;
  @Input() unitId: number;
  @ViewChild('mep') mep: MatExpansionPanel;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public equipmentVerificationService: EquipmentVerificationService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      status: [this.equipment.status],
      setStatus: [this.equipment.status],
      note: [this.equipment.note ? this.equipment.note : ''],
    });

  }



  save() {
    const reqEqpt = new RequestEquipment();
    reqEqpt.utd_has_equipment = this.equipment.utd_has_equipment;
    reqEqpt.status = this.form.get('setStatus').value;
    reqEqpt.site_id = this.siteId;
    reqEqpt.note = this.form.get('note').value;


    this.equipmentVerificationService.verifyEqpt(this.unitId, reqEqpt).subscribe(
      res => {
        this.equipment.status = reqEqpt.status;
        this.mep.close();
      });
  }


}
