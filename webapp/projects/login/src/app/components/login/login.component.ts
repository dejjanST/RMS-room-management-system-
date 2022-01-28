import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserRequestModel } from '../../models/user-model';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { VedValidators } from 'projects/shared/src/app/Validators/ved-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('lUser', { static: true }) userForm: NgForm;

  form: FormGroup;
  showForm = false;

  username: string;
  pass: string;
  captcha: string;
  hide = true;

  captchaImage$: Observable<string> = of(this.captchaUrl());

  userFormData = new UserRequestModel();

  constructor(
      private loginService: LoginService
    , private router: Router
    , private fb: FormBuilder
  ) {
    this.loginCheck();
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, VedValidators.minLength(4)]],
      captcha: ['', [Validators.required, VedValidators.minLength(4)]]
    });
  }

  get f() {
    return this.form.controls;
  }

  login(): void {
    this.userFormData.email = this.form.get('email').value;
    this.userFormData.password = this.form.get('password').value;
    this.userFormData.captcha = this.form.get('captcha').value;

    this.loginService.login(this.userFormData).subscribe(
      (res: HttpResponse<any>) => {
        this.loginCheck();
      },
      error => {
        this.form.get('captcha').setValue('');
        this.form.get('captcha').markAsPristine();
        this.form.get('captcha').markAsUntouched();
        this.captchaImage$ = of(this.captchaUrl());
      }
    );
  }

  loginCheck(): void {
    this.loginService.loginCheck().subscribe(
      (res: HttpResponse<any>) => {
        const redirectTo = (res.headers.get('rms-app'));
        window.location.href = `/${redirectTo}/`;
      },
      err => {
        this.showForm = true;
      }
    );
  }

  captchaUrl(): string {
    return `/api/captcha/?ts=` + Date.now();
  }

}
