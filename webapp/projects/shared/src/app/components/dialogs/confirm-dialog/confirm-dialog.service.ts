import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@Injectable()

export class ConfirmDialogService {
  dialogRef: MatDialogRef<ConfirmDialogComponent>;
  proceed = false;

  constructor(public dialog: MatDialog) { }


  open(data: any) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data,
    });
  }

  close(): Observable<any> {
    return this.dialogRef.afterClosed();
  }
}

