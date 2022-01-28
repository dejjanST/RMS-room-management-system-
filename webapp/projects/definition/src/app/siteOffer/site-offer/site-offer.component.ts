import { Component, OnInit, ViewChild, OnDestroy, } from '@angular/core';
import { SiteOfferService } from '../site-offer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteData } from '../../site/site';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { OfferStatus, RequestSiteOffer, OfferUnitType, OfferAdditionalEqpt, ResponseSiteOffer, OfferMail } from '../site-offer.model';
import { CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';
import { UnitTypeService } from '../../unitType/unit-type.service';
import { ResponseUnitTypeList, ResponseUnitType } from '../../unitType/models/unit-type.Model';
import { Equipment, Equipments } from '../../unitType/models/equipment.Model';
import { FileUploadService } from 'projects/shared/src/app/services/file-upload.service';
import { MatDialog } from '@angular/material/dialog';
import { SendMailDialogComponent } from '../send-mail-dialog/send-mail-dialog.component';
import { NotesComponent } from '../notes/notes.component';
import { GlobalService } from '../../globalService/global.service';
import { VedValidators } from 'projects/shared/src/app/Validators/ved-validators';

export const ACCEPTED_OFFER = 3;
export const DECLINED_OFFER = 4;

@Component({
  selector: 'app-site-offer',
  templateUrl: './site-offer.component.html',
  styleUrls: ['./site-offer.component.css']
})

export class SiteOfferComponent implements OnInit {
  siteId: number;
  offerId: number;
  responseSiteOffer: ResponseSiteOffer = new ResponseSiteOffer();
  site: SiteData = new SiteData();
  form: FormGroup;
  availableUnitTypes: ResponseUnitType[] = [];
  equipmentList: Equipment[] = [];
  offerStatus: OfferStatus[] = [
    { value: 1, viewValue: 'Open' },
    { value: 2, viewValue: 'Sent' },
    { value: 3, viewValue: 'Accepted' },
    { value: 4, viewValue: 'Declined' }
  ];
  pdfDownloadLink: string;
  selectedUt = [];
  selectedAEqpt = [];

  @ViewChild(NotesComponent) child: NotesComponent;

  constructor(
    public globalService: GlobalService,
    private siteOfferService: SiteOfferService,
    private unitTypeService: UnitTypeService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private fileUploadService: FileUploadService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.siteId = +this.route.snapshot.paramMap.get('siteId');
    this.offerId = +this.route.snapshot.paramMap.get('offerId');

    this.form = this.fb.group({
      name: ['', [Validators.required, VedValidators.minLength(3)]],
      status: [1, [Validators.required]],
      siteId: [this.siteId, [Validators.required]],
      clientId: [, [Validators.required]],
      numberOfBuildings: [, [Validators.required, Validators.min(0)]],
      numberOfReceptions: [, [Validators.required, Validators.min(0)]],
      unitTypes: this.fb.array([]),
      additionalEqpts: this.fb.array([])
    });

    // filling Edit form
    if (this.offerId) {
      this.siteOfferService.getSiteOffer(this.offerId).subscribe((res: ResponseSiteOffer) => {
        this.responseSiteOffer = res;
        this.form.get('name').setValue(this.responseSiteOffer.data.name);
        this.form.get('status').setValue(this.responseSiteOffer.data.status);
        this.form.get('siteId').setValue(this.responseSiteOffer.data.site_id);
        this.form.get('clientId').setValue(this.responseSiteOffer.data.client_id);
        this.form.get('numberOfBuildings').setValue(this.responseSiteOffer.data.number_of_buildings);
        this.form.get('numberOfReceptions').setValue(this.responseSiteOffer.data.number_of_receptions);
        this.pdfDownloadLink = `/files/${this.responseSiteOffer.data.file_id}`;
        this.responseSiteOffer.data.items.ut.forEach(item => {
          const ut = new ResponseUnitType();
          ut.id = item.utd_id;
          ut.name = item.utd_name;
          ut.quantity = item.quantity;
          this.addUnitType(ut);
        });
        this.responseSiteOffer.data.items.additional.forEach(item => {
          const additionalEqpt = new Equipment();
          additionalEqpt.id = item.equipment_id;
          additionalEqpt.model = item.model;
          additionalEqpt.description = item.description;
          additionalEqpt._quantity = item.quantity;
          this.addAdditionalEqpt(additionalEqpt);
        });
      });
    }

    this.globalService.site.set(this.siteId);
    this.globalService.site.data$.subscribe(res => {
      this.site = res;
      this.form.get('clientId').setValue(this.site.client_id);
    });

    this.unitTypeService.getEquipmentList().subscribe((res: Equipments) => {
      this.equipmentList = res.data;
      this.equipmentList = this.equipmentList.filter(item => {
        return item.equipment_type === 'ADDITIONAL ITEM';
      });
    });

    this.unitTypeService.listUnitTypes().subscribe((res: ResponseUnitTypeList) => {
      this.availableUnitTypes = res.data;
    });
  }
  fileBrowseHandler(event: any) {
    this.fileUploadService.upload(event.target.files[0], 'offer', this.offerId).subscribe(res => {
      this.responseSiteOffer.data.file_id = res.body.data.id;
      this.responseSiteOffer.data.file_name = res.body.data.file_name;
      this.pdfDownloadLink = '/files/' + res.body.data.id;
    });
  }

  getOfferViewValue(id: number) {
    return this.offerStatus.find(item => item.value === id).viewValue;
  }


  get f() {
    return this.form.controls;
  }

  get unitTypeFormArray(): FormArray {
    return this.form.get('unitTypes') as FormArray;
  }

  createUnitType(unitType: ResponseUnitType) {
    return this.fb.group({
      utdId: [unitType.id, [Validators.required]],
      utdName: [unitType.name, [Validators.required]],
      qty: [unitType.quantity, [Validators.required, Validators.min(1)]]
    });
  }

  addUnitType(unitType: ResponseUnitType) {
    this.unitTypeFormArray.push(this.createUnitType(unitType));
  }

  removeUnitType(index: number) {
    this.unitTypeFormArray.removeAt(index);
  }

  get additionalEqptsFormArray(): FormArray {
    return this.form.get('additionalEqpts') as FormArray;
  }

  createAdditionalEqpt(eqpt: Equipment) {
    return this.fb.group({
      eqptId: [eqpt.id, [Validators.required]],
      eqptModel: [eqpt.model],
      eqptDesc: [eqpt.description],
      qty: [eqpt._quantity, [Validators.required, Validators.min(1)]]
    });
  }

  addAdditionalEqpt(eqpt: Equipment) {
    this.additionalEqptsFormArray.push(this.createAdditionalEqpt(eqpt));
  }

  removeAdditionalEqpt(index: number) {
    this.additionalEqptsFormArray.removeAt(index);
  }


  dropUT(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const draggedUT: ResponseUnitType = this.availableUnitTypes[event.item.element.nativeElement.getAttribute('value')];
      if (this.unitTypeFormArray.value.findIndex(item => item.utdId === draggedUT.id) === -1) {
        this.addUnitType(draggedUT);
        copyArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }
    }
  }

  dropEqpt(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const draggedEqpt: Equipment = this.equipmentList[event.item.element.nativeElement.getAttribute('value')];
      if (this.additionalEqptsFormArray.value.findIndex(item => item.eqptId === draggedEqpt.id) === -1) {
        this.addAdditionalEqpt(draggedEqpt);
        copyArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }
    }
  }

  acceptOffer() {
    this.siteOfferService.updateOfferStatus(this.offerId, ACCEPTED_OFFER).subscribe(() => {
      this.responseSiteOffer.data.status = ACCEPTED_OFFER;
      this.child.refreshNotes();
    });
  }

  declineOffer() {
    this.siteOfferService.updateOfferStatus(this.offerId, DECLINED_OFFER).subscribe(() => {
      this.responseSiteOffer.data.status = DECLINED_OFFER;
      this.child.refreshNotes();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SendMailDialogComponent, {
      width: '500px',
      data: this.responseSiteOffer
    });
    dialogRef.afterClosed().subscribe((offerMail: OfferMail) => {
      if (offerMail) {
        this.siteOfferService.sendMail(this.responseSiteOffer.data.id, offerMail).subscribe(() => {
          this.responseSiteOffer.data.status = 2;
          this.child.refreshNotes();
        });
      }
    });
  }


  submit() {
    const req = new RequestSiteOffer();
    req.site_id = this.form.get('siteId').value;
    req.client_id = this.form.get('clientId').value;
    req.name = this.form.get('name').value;
    req.status = this.form.get('status').value;
    req.number_of_buildings = this.form.get('numberOfBuildings').value;
    req.number_of_receptions = this.form.get('numberOfReceptions').value;
    this.form.value.unitTypes.forEach(element => {
      const unitType = new OfferUnitType();
      unitType.utd_id = element.utdId;
      unitType.quantity = element.qty;
      req.items.ut.push(unitType);
    });
    this.form.value.additionalEqpts.forEach(element => {
      const additionalEqpt = new OfferAdditionalEqpt();
      additionalEqpt.equipment_id = element.eqptId;
      additionalEqpt.quantity = element.qty;
      req.items.additional.push(additionalEqpt);
    });
    if (!this.offerId) {
      this.siteOfferService.createSiteOffer(req).subscribe(res => {
        this.router.navigate(['sites', this.siteId, 'offers']);
      });
    }
    if (this.offerId) {
      this.siteOfferService.editSiteOffer(req, this.offerId).subscribe(res => {
        this.router.navigate(['sites', this.siteId, 'offers']);
      });
    }
  }

}
