import { Component, OnInit } from '@angular/core';
import { EditProfileService } from '../../services/edit-profile.service';
import { ResponseProfile, PostProfile } from '../../models/profile';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { PlatformLocation } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { ConfirmedValidator } from './confirm-password.validator';
import { VedValidators } from 'projects/shared/src/app/Validators/ved-validators';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  appRoot: string;
  form: FormGroup;

  hide = {
    pass: true,
    fpass: true,
    cpass: true
  };

  user: ResponseProfile = new ResponseProfile();
  postProfile: PostProfile = new PostProfile();


  constructor(
      private editProfileService: EditProfileService
    , private router: Router
    , private http: HttpClient
    , public platformLocation: PlatformLocation
    , private fb: FormBuilder
  ) {

    this.appRoot = platformLocation.getBaseHrefFromDOM() + '../';
  }

  ngOnInit() {
    this.editProfileService.editProfile().subscribe(
      user => {
        this.user = user.data;
        this.initForm();
      },
      (err: HttpErrorResponse) => {
        if (err.status >= 400 && err.status < 500) {
          this.router.navigate(['/']);
        }
      }
    );
  }

  initForm() {
    this.form = this.fb.group({
      firstName: [this.user.first_name, [Validators.required, VedValidators.minLength(2)]],
      lastName: [this.user.last_name, [Validators.required, VedValidators.minLength(2)]],
      oldPassword: ['', [Validators.minLength(4)]],
      newPassword: ['', [Validators.minLength(4)]],
      confirmPassword: ['']
    }, {
      validator: ConfirmedValidator('newPassword', 'confirmPassword', 'oldPassword')
    });
  }

  get f() {
    return this.form.controls;
  }

  update() {
    this.postProfile.first_name = this.form.get('firstName').value;
    this.postProfile.last_name = this.form.get('lastName').value;
    this.postProfile.current_password = this.form.get('oldPassword').value;
    this.postProfile.new_password = this.form.get('newPassword').value;
    this.postProfile.retyped_password = this.form.get('confirmPassword').value;

    this.editProfileService.updateProfile(this.postProfile).subscribe(
      res => {
        this.form.controls.oldPassword.setValue('');
        this.form.controls.newPassword.setValue('');
        this.form.controls.confirmPassword.setValue('');
      }
    );
  }


  loggout() {
    this.http.delete('/api/auth').subscribe(
      res => {
        this.router.navigate(['/']);
      }
    );
  }
}
