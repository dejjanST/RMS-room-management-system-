import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VedValidators } from 'projects/shared/src/app/Validators/ved-validators';
import { SiteData } from '../site';
import { RequestManager } from './manager';
import { ManagerService } from './manager.service';

@Component({
  selector: 'app-invite-manager-dialog',
  templateUrl: './invite-manager-dialog.component.html',
  styleUrls: ['./invite-manager-dialog.component.css']
})
export class InviteManagerDialogComponent implements OnInit {
  form: FormGroup;
  manager: RequestManager;

  constructor(
    private fb: FormBuilder,
    private managerService: ManagerService,
    public dialogRef: MatDialogRef<InviteManagerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SiteData) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, VedValidators.minLength(3)]],
      surname: ['', [Validators.required, VedValidators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }



  invite() {
    this.manager = new RequestManager();
    this.manager.first_name = this.form.get('name').value;
    this.manager.last_name = this.form.get('surname').value;
    this.manager.email = this.form.get('email').value;

    this.managerService.create(this.data.id, this.manager).subscribe(
      res => {
        this.dialogRef.close();
      }
    );
  }

}
