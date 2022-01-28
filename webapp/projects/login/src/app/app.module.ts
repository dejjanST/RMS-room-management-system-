import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UuidInterceptorService } from 'projects/shared/src/app/interceptors/uuid/uuid-interceptor.service';
import { RequestLoaderInterceptorService } from 'projects/shared/src/app/interceptors/Loader/request-loader-interceptor.service';
import { ToastrInterceptorService } from 'projects/shared/src/app/interceptors/toastr/toastr-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HttpErrorLogInterceptorService } from 'projects/shared/src/app/interceptors/httpError/http-error-log-interceptor.service';
import { LanguageInterceptorService } from 'projects/shared/src/app/interceptors/language/language-interceptor.service';
import { LogoutComponent } from './components/logout/logout.component';
import { VedTitleDirective } from 'projects/shared/src/app/directives/ved-title.directive';
import { EditProfileComponent } from './components/Profile/components/edit-profile/edit-profile.component';
import { LanguagesModule } from 'projects/shared/src/app/languages/languages.module';
import { LoaderModule } from 'projects/shared/src/app/modules/loader/loader.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PasswordResetComponent,
    ForgotPasswordComponent,
    LogoutComponent,
    EditProfileComponent,
    VedTitleDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoaderModule,
    FormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    CommonModule,
    BrowserAnimationsModule,
    LanguagesModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UuidInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorLogInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ToastrInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LanguageInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
