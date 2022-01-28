import { Component, OnInit } from '@angular/core';
import { EditProfileService } from '../../services/edit-profile.service';
import { ResponseProfile, PostProfile } from '../../models/profile';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  currentPass = '';
  newPass = '';
  rePass = '';

  hide = {
    pass: true,
    fpass: true,
    cpass: true
  };

  user: ResponseProfile = new ResponseProfile();
  postProfile: PostProfile = new PostProfile();

  constructor(private editProfileService: EditProfileService, private router: Router) { }

  ngOnInit() {

    this.editProfileService.editProfile().subscribe(
      user => {
        this.user = user;
      },
      (err: HttpErrorResponse) => {
        if (err.status >= 400 && err.status < 500) {
          this.router.navigate(['/']);
        }

      }
    );
  }

  update() {
    this.postProfile.first_name = this.user.first_name;
    this.postProfile.last_name = this.user.last_name;
    this.postProfile.current_password = this.currentPass;
    this.postProfile.new_password = this.newPass;
    this.postProfile.retyped_password = this.rePass;

    this.editProfileService.updateProfile(this.postProfile).subscribe();
  }
}
