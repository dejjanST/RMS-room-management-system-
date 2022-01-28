import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RequestLoaderInterceptorService } from './interceptors/Loader/request-loader-interceptor.service';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { HttpErrorLogInterceptorService } from './interceptors/httpError/http-error-log-interceptor.service';
import { EditProfileComponent } from './Profile/components/edit-profile/edit-profile.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { VedTitleDirective } from './directives/ved-title.directive';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RedirectToLoginComponent } from './components/redirect-to-login/redirect-to-login.component';
import { ByKeyValuePipe } from './pipes/by-key-value.pipe';
import { DistinctPipe } from './pipes/distinct.pipe';
import { SumByKeyPipe } from './pipes/sum-by-key.pipe';
import { ByRegexPipe } from './pipes/by-regex.pipe';
import { StopPropagationDirective } from './directives/stop-propagation.directive';
import { DndDirective } from './dnd.directive';
import { BackDirective } from './directives/back.directive';
import { TrimPipe } from './pipes/trim.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { DeleteDialogComponent } from './components/dialogs/delete-dialog/delete-dialog.component';
import { FilterByStringPipe } from './pipes/filter-by-string.pipe';
import { ExcludePipe } from './pipes/exclude.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    EditProfileComponent,
    VedTitleDirective,
    RedirectToLoginComponent,
    ByKeyValuePipe,
    DistinctPipe,
    SumByKeyPipe,
    ByRegexPipe,
    StopPropagationDirective,
    DndDirective,
    BackDirective,
    TrimPipe,
    TimeAgoPipe,
    DeleteDialogComponent,
    FilterByStringPipe,
    ExcludePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatMenuModule,
    MatFormFieldModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDividerModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorLogInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestLoaderInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
