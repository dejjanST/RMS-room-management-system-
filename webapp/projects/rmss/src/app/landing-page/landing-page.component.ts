import { Component, OnInit } from '@angular/core';
import { SystemInfo } from './system-info';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LandingPageService } from './landing-page.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  systemInfo: SystemInfo = new SystemInfo();
  showForm = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private landingPageService: LandingPageService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getSystemInfo();
  }

  initForm() {
    this.form = this.fb.group({
      serialNumber: ['', [Validators.required]],
      partnerId: ['', [Validators.required, , Validators.pattern('^[0-9]*$')]]
    });
  }

  get f() {
    return this.form.controls;
  }

  save() {
    this.systemInfo.data.serial_number = this.form.get('serialNumber').value;
    this.systemInfo.data.partner_id = +this.form.get('partnerId').value;

    this.landingPageService.create(this.systemInfo).subscribe(
      res => this.getSystemInfo()
    );
  }


  getSystemInfo() {
    this.landingPageService.getSystemInfo().subscribe(
      res => {
        this.systemInfo = res;
        this.showForm = false;
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.showForm = true;
        }
      }
    );
  }
}

