import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TimeAgoPipe } from 'projects/shared/src/app/pipes/time-ago.pipe';
import { AccessKeyComponent } from './accessModule/access-key/access-key.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { LanguagesModule } from 'projects/shared/src/app/languages/languages.module';
import { ByKeyValuePipe } from 'projects/shared/src/app/pipes/by-key-value.pipe';
import { KeyComponent } from './accessModule/access-key/key/key.component';
import { ToastrInterceptorService } from 'projects/shared/src/app/interceptors/toastr/toastr-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { AccessGroupListComponent } from './accessModule/access-group-list/access-group-list.component';
import { AccessGroupComponent } from './accessModule/access-group/access-group.component';
import { GroupListComponent } from './accessModule/group-list/group-list.component';
import { DeleteDialogComponent } from 'projects/shared/src/app/components/dialogs/delete-dialog/delete-dialog.component';
import { StopPropagationDirective } from 'projects/shared/src/app/directives/stop-propagation.directive';
import { BackDirective } from 'projects/shared/src/app/directives/back.directive';
import { LoaderModule } from 'projects/shared/src/app/modules/loader/loader.module';
import { ColorPickerModule } from 'ngx-color-picker';
import { FilterByStringPipe } from 'projects/shared/src/app/pipes/filter-by-string.pipe';
import { ExcludePipe } from 'projects/shared/src/app/pipes/exclude.pipe';
import { AclContainerComponent } from './accessModule/acl-container/acl-container.component';
import { AclManagerComponent } from './accessModule/acl-manager/acl-manager.component';
import { KeyListComponent } from './accessModule/key-list/key-list.component';
import { EditKeyDialogComponent } from './accessModule/access-key/edit-key-dialog/edit-key-dialog.component';
import { MailerSettingsComponent } from './mailer-settings/mailer-settings.component';
import { VedTitleDirective } from 'projects/shared/src/app/directives/ved-title.directive';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    AccessKeyComponent,
    AccessGroupListComponent,
    TimeAgoPipe,
    KeyComponent,
    AccessGroupComponent,
    GroupListComponent,
    StopPropagationDirective,
    DeleteDialogComponent,
    BackDirective,
    ByKeyValuePipe,
    FilterByStringPipe,
    ExcludePipe,
    AclContainerComponent,
    AclManagerComponent,
    KeyListComponent,
    EditKeyDialogComponent,
    MailerSettingsComponent,
    VedTitleDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatSidenavModule,
    MatSelectModule,
    MatDialogModule,
    MatTabsModule,
    MatRadioModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatChipsModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    LanguagesModule,
    LoaderModule,
    ColorPickerModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ToastrInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
