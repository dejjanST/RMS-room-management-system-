import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogService } from 'projects/shared/src/app/components/dialogs/confirm-dialog/confirm-dialog.service';
import { RequestController, Controller } from '../master';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-form-controller',
  templateUrl: './form-controller.component.html',
  styleUrls: ['./form-controller.component.css']
})
export class FormControllerComponent implements OnInit {
  @Input() unitId: number;
  @Input() siteId: number;
  @Input() controller: Controller;
  @Input() position: number;
  @Output() succEvent: EventEmitter<any> = new EventEmitter();
  form: FormGroup;
  master: RequestController = new RequestController();
  scannerEnabled = false;

  currentDevice: MediaDeviceInfo = null;
  hasDevices: boolean;
  hasPermission: boolean;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private masterService: MasterService,
    private confirmDialogService: ConfirmDialogService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      masterID: ['', [Validators.required]],
    });

    this.form.get('masterID').setValue(this.controller.serial_no);
  }

  enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.form.get('masterID').setValue(resultString);
    this.scannerEnabled = false;
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  save() {
    this.master.serial_no = this.form.get('masterID').value;
    this.master.unit_id = this.unitId;
    this.master.site_id = this.siteId;
    this.master.position = this.position;
    this.master.card_holder = false;
    this.master.device_type = this.controller.device_type;

    this.masterService.setMasterController(this.master).subscribe(
      res => {
        this.succEvent.emit(res);
      },
      err => {
        this.confirmDialogService.open(err.error.msg);
        this.confirmDialogService.close().subscribe(res => {
          if (res === true) {
            this.master.force = true;
            this.save();
          }
        });
      }
    );
  }
}
