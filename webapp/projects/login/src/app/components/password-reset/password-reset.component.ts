import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PasswordResetService } from '../../services/password-reset.service';
import { ResetPass } from '../../models/reset-pass';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmedValidator } from './confirm-password.validator';
import { VedValidators } from 'projects/shared/src/app/Validators/ved-validators';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  form: FormGroup;
  submitted =  false;

  resetPass = new ResetPass();
  showForm = true;

  hide = {
    fpass: true,
    cpass: true
  };

  constructor(
          private loginService: LoginService
        , private passwordResetService: PasswordResetService
        , private route: ActivatedRoute
        , private router: Router
        , private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      password: ['', [Validators.required, VedValidators.minLength(4)]],
      confirm_password: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    });
  }

  get f() {
    return this.form.controls;
  }

  reset() {
    this.submitted = true;
    this.resetPass.password = this.form.get('password').value;
    this.resetPass.confirm_pass = this.form.get('confirm_password').value;
    this.resetPass.token = this.route.snapshot.paramMap.get('token');

    this.passwordResetService.resetPass(this.resetPass).subscribe(
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
          }
      );
  }
}
