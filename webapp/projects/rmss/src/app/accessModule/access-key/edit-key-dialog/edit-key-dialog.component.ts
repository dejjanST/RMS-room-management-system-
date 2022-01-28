import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-key-dialog',
  templateUrl: './edit-key-dialog.component.html',
  styleUrls: ['./edit-key-dialog.component.css']
})
export class EditKeyDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EditKeyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }
}
