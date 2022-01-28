import { Component, ElementRef, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Key, ResponseKeyTypes } from '../key';
import { KeyService } from '../../key.service';
import { dateLessThan } from './date.validation';
import { AccessService } from '../../access.service';
import { MatDialog } from '@angular/material/dialog';
import { GroupService } from '../../group.service';
import { EditKeyDialogComponent } from '../edit-key-dialog/edit-key-dialog.component';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.css']
})
export class KeyComponent implements OnInit {
  @Input() keyId: number;
  @Input() editMode = false;
  @Input() responseKey: Key;
  @Input() types: ResponseKeyTypes = new ResponseKeyTypes();
  checkBoxDisabled = false;
  form: FormGroup;
  keyNumber: number;

  constructor(
    public activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private keyService: KeyService,
    private router: Router,
    private accessService: AccessService,
    private groupService: GroupService,
    public dialog: MatDialog,
  ) { }


  ngOnInit(): void {
    this.keyNumber = +this.route.snapshot.paramMap.get('keyNumber');

    this.initForm();

    if (!this.editMode) {
      this.keyService.getKeyTypes()
        .subscribe(
          (res: ResponseKeyTypes) => {
            this.types = res;
          }
        );
    }

    // if key not exists, fill the key number input in create key form
    if (this.keyNumber > 0) {
      this.form.get('key_no').setValue(this.keyNumber);
      return;
    }


    // if key already exists, fill the create key form
    if (this.keyId && !this.editMode) {
      this.loadKeyData(this.keyId);
    }
    else if (this.keyId) {
      // dialog edit mode
      this.form.get('desc').setValue(this.responseKey.data.description);
      this.form.get('valid_from').setValue(this.toDate(this.responseKey.data.valid_from));
      if (this.responseKey.data.valid_to) {
        this.form.get('valid_to').setValue(this.toDate(this.responseKey.data.valid_to));
      }
      this.form.get('key_type').setValue(this.responseKey.data.key_type);
      this.form.get('key_no').setValue(this.responseKey.data.key_no);
      this.form.get('key_no').disable();

    }

    if (!this.editMode && !this.router.url.includes('/key/new')) {
      this.disableInputs();
    }
  }

  initForm() {
    this.form = this.fb.group({
      desc: ['', [Validators.required]],
      key_no: ['', [Validators.required]],
      valid_from: ['', Validators.required],
      // valid_to: [''],
      valid_to: [{value: '', disabled: true}],
      key_type: ['', [Validators.required]],
    }, { validators: dateLessThan('valid_from', 'valid_to') });
  }


  loadKeyData(keyId: number) {
    this.keyService.get(keyId)
      .subscribe(
        res => {
          this.responseKey = res;
          if (Object.keys(res).length) {
            this.form.get('desc').setValue(res.data.description);
            this.form.get('valid_from').setValue(this.toDate(res.data.valid_from));
            // if (res.data.valid_to) {
            //   this.form.get('valid_to').setValue(this.toDate(res.data.valid_to));
            // }
            // else {
            //   this.form.get('valid_to').setValue('');
            // }
            res.data.valid_to ? this.form.get('valid_to').setValue(this.toDate(res.data.valid_to)) : this.form.get('valid_to').setValue('');

            this.form.get('key_type').setValue(res.data.key_type);
            this.form.get('key_no').setValue(res.data.key_no);
            this.checkBoxDisabled = true;

            this.accessService.clearList();
            // this.accessService.pushList(res.data.acl);
            if (res.data.acl) {
              res.data.acl.forEach(item => this.accessService.addItem(item));
            }

            if (res.data.groups) {
              res.data.groups.forEach(group => {
                this.groupService.getAccess(group.id).subscribe(res => {
                  this.accessService.pushGroup(res.data);
                  this.accessService.findGroups();
                });
              });
            }
          }
        }
      );
  }

  // disable form inputs
  disableInputs() {
    this.form.get('desc').disable();
    this.form.get('key_no').disable();
    this.form.get('valid_from').disable();
    this.form.get('valid_to').disable();
    this.form.get('key_type').disable();
  }

  get f() {
    return this.form.controls;
  }

  // convert timestamp to date
  toDate(timeStamp) {
    const date = new Date(timeStamp * 1000);
    return date;
  }

  // convert date to timestamp
  toTimestamp(strDate) {
    const timestamp = new Date(strDate).getTime() / 1000;
    return timestamp;
  }

  save() {
    const requestKey = new Key();
    requestKey.data.valid_from = this.toTimestamp(this.form.get('valid_from').value);
    requestKey.data.valid_to = this.form.get('valid_to').value ? this.toTimestamp(this.form.get('valid_to').value) : null;
    requestKey.data.key_type = +this.form.get('key_type').value;
    requestKey.data.key_no = this.form.get('key_no').value.toString();
    requestKey.data.description = this.form.get('desc').value;

    if (this.keyId) {
      requestKey.data.id = this.keyId;
      this.keyService.update(requestKey).subscribe(
        res => {
          this.dialog.closeAll();
        }
      );
    }
    else {
      this.keyService.create(requestKey).subscribe(
        res => {
          this.router.navigate(['/key', res.data.id]);
        }
      );
    }
  }

  setAll(e) {
    e ? this.form.get('valid_to').disable() : this.form.get('valid_to').enable();
  }

  openEditKeyDialog(): void {
    this.dialog.open(EditKeyDialogComponent, {
      width: '600px',
      data: {
        key: this.responseKey,
        types: this.types
      }
    }).afterClosed().subscribe(() => {
      this.loadKeyData(this.keyId);
    });

  }
}
