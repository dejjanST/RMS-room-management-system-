import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthService } from 'projects/shared/src/app/services/auth.service';
import { KeyComponent } from './accessModule/access-key/key/key.component';
import { AccessKeyComponent } from './accessModule/access-key/access-key.component';
import { AccessGroupComponent } from './accessModule/access-group/access-group.component';
import { GroupListComponent } from './accessModule/group-list/group-list.component';
import { AclContainerComponent } from './accessModule/acl-container/acl-container.component';
import { KeyListComponent } from './accessModule/key-list/key-list.component';
import { MailerSettingsComponent } from './mailer-settings/mailer-settings.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/acl',
    pathMatch: 'full'
  },
  {
    path: 'acl',
    component: AccessKeyComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },
  {
    path: 'site_info',
    component: LandingPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'key/new',
    component: KeyComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },
  {
    path: 'key/new/:keyNumber',
    component: KeyComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },
  {
    path: 'key/:keyId',
    component: AclContainerComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },
  {
    path: 'keys',
    component: KeyListComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },
  {
    path: 'groups/new',
    component: AccessGroupComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },
  {
    path: 'groups/:groupId',
    component: AccessGroupComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },
  {
    path: 'groups',
    component: GroupListComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },
  {
    path: 'mailer_settings',
    component: MailerSettingsComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'access',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

