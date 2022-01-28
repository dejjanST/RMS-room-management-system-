import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LogoutComponent } from './components/logout/logout.component';
import { EditProfileComponent } from './components/Profile/components/edit-profile/edit-profile.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: { title: 'Login Page' }
  },
  {
    path: 'reset/:token',
    component: PasswordResetComponent,
  },
  {
    path: 'reset',
    component: ForgotPasswordComponent,
  },
  {
    path: 'loggedin',
    component: LogoutComponent
  },
  {
    path: 'profile',
    component: EditProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
