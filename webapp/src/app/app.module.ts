import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteTitleService } from 'projects/shared/src/app/services/route-title.service';
import { EditKeyDialogComponent } from './accessModule/access-key/edit-key-dialog/edit-key-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    EditKeyDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [RouteTitleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
