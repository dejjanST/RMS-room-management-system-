import { Component, OnInit } from '@angular/core';
import { PasswordResetService } from '../../services/password-reset.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgotPass } from '../../models/forgot-pass';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;
  showForm = true;
  forgotPass = new ForgotPass();
  appRoot: string;

  constructor(
      private loginService: LoginService
    , private passwordResetService: PasswordResetService
    , private router: Router
    , private fb: FormBuilder
  ) {
    this.loginCheck();
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get f() {
    return this.form.controls;
  }

  send() {
    this.forgotPass.email = this.form.get('email').value;

    this.passwordResetService.sendMail(this.forgotPass.email).subscribe(
      res => {
        this.showForm = false;
      }
    );
  }

  loginCheck(): void {
    this.loginService.loginCheck().subscribe(
      res => {
        // window.location.href = '/vendor'; // res.redirect;
        this.router.navigate(['/loggedin']);
      },
      err => { }

    );
  }
}
