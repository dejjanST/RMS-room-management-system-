import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResponseSiteOffer, OfferMail } from '../site-offer.model';
import { VedValidators } from 'projects/shared/src/app/Validators/ved-validators';

@Component({
  selector: 'app-send-mail-dialog',
  templateUrl: './send-mail-dialog.component.html',
  styleUrls: ['./send-mail-dialog.component.css']
})
export class SendMailDialogComponent implements OnInit {
  form: FormGroup;
  offerMail = new OfferMail();

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SendMailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ResponseSiteOffer) { }


  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [VedValidators.required, VedValidators.email]],
      subject: ['', [VedValidators.minLength(3)]],
      message: ['', [VedValidators.minLength(3)]]
    });
  }

  get f() {
    return this.form.controls;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    this.offerMail.email = this.form.get('email').value;
    this.offerMail.subject = this.form.get('subject').value;
    this.offerMail.message = this.form.get('message').value;
  }
}
