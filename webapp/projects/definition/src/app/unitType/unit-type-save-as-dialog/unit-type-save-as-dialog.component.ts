import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { VedValidators } from 'projects/shared/src/app/Validators/ved-validators';

@Component({
  selector: 'app-unit-type-save-as-dialog',
  templateUrl: './unit-type-save-as-dialog.component.html',
  styleUrls: ['./unit-type-save-as-dialog.component.css']
})
export class UnitTypeSaveAsDialogComponent implements OnInit {
  nameFormControl: FormControl;

  constructor(
    public dialogRef: MatDialogRef<UnitTypeSaveAsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
    this.nameFormControl = new FormControl(`${this.data.name} - Copy`, [Validators.required, VedValidators.minLength(3)]);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
