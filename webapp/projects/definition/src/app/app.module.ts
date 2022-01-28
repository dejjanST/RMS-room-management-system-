import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LanguagesModule } from 'projects/shared/src/app/languages/languages.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ClientListComponent } from './client/client-list/client-list.component';
import { VedTitleDirective } from 'projects/shared/src/app/directives/ved-title.directive';
import { UuidInterceptorService } from 'projects/shared/src/app/interceptors/uuid/uuid-interceptor.service';
import { HttpErrorLogInterceptorService } from 'projects/shared/src/app/interceptors/httpError/http-error-log-interceptor.service';
import { ToastrInterceptorService } from 'projects/shared/src/app/interceptors/toastr/toastr-interceptor.service';
import { ToolbarComponent } from 'projects/shared/src/app/components/toolbar/toolbar.component';
import { SiteListComponent } from './site/site-list/site-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { BuildingListComponent } from './building/building-list/building-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { UnitTypeComponent } from './unitType/unit-type/unit-type.component';
import { ByKeyValuePipe } from 'projects/shared/src/app/pipes/by-key-value.pipe';
import { DistinctPipe } from 'projects/shared/src/app/pipes/distinct.pipe';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SumByKeyPipe } from 'projects/shared/src/app/pipes/sum-by-key.pipe';
import { ByRegexPipe } from 'projects/shared/src/app/pipes/by-regex.pipe';
import { UnitTypeListComponent } from './unitType/unit-type-list/unit-type-list.component';
import { FloorLayoutComponent } from './floorLayout/floor-layout/floor-layout.component';
import { FloorLayoutListComponent } from './floorLayout/floor-layout-list/floor-layout-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StopPropagationDirective } from 'projects/shared/src/app/directives/stop-propagation.directive';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { BuildingComponent } from './building/building/building.component';
import { BackDirective } from 'projects/shared/src/app/directives/back.directive';
import { ClientComponent } from './client/client/client.component';
import { SiteComponent } from './site/site/site.component';
import { FloorComponent } from './floor/floor/floor.component';
import { FloorListComponent } from './floor/floor-list/floor-list.component';
import { TrimPipe } from 'projects/shared/src/app/pipes/trim.pipe';
import { SiteOfferComponent } from './siteOffer/site-offer/site-offer.component';
import { SiteOfferListComponent } from './siteOffer/site-offer-list/site-offer-list.component';
import { NotesComponent } from './siteOffer/notes/notes.component';
import { SendMailDialogComponent } from './siteOffer/send-mail-dialog/send-mail-dialog.component';
import { LoaderModule } from 'projects/shared/src/app/modules/loader/loader.module';
import { UnitTypeSaveAsDialogComponent } from './unitType/unit-type-save-as-dialog/unit-type-save-as-dialog.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { BulkFloorComponent } from './floor/bulk-floor/bulk-floor.component';
import { CreateFloorComponent } from './floor/create-floor/create-floor.component';
import { SiteStatusComponent } from './site/site-status/site-status.component';
import { UnitsListComponent } from './unit/units-list/units-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MasterComponent } from './commissioning/master/master.component';
import { ControllersComponent } from './commissioning/controllers/controllers.component';
import { MatListModule } from '@angular/material/list';
import { FormControllerComponent } from './commissioning/form-controller/form-controller.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { EquipmentVerificationComponent } from './verification/equipment-verification.component';
import { EquipmentItemComponent } from './verification/equipment-item/equipment-item.component';
import { VerificationComponent } from './reports/verification/verification.component';
import { InviteManagerDialogComponent } from './site/invite-manager-dialog/invite-manager-dialog.component';
import { DeleteDialogComponent } from 'projects/shared/src/app/components/dialogs/delete-dialog/delete-dialog.component';
import { ConfirmDialogModule } from 'projects/shared/src/app/modules/confirm-dialog/confirm-dialog.module';



@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    VedTitleDirective,
    ClientListComponent,
    SiteListComponent,
    BuildingListComponent,
    UnitTypeComponent,
    ByKeyValuePipe,
    DistinctPipe,
    SumByKeyPipe,
    ByRegexPipe,
    UnitTypeListComponent,
    FloorLayoutComponent,
    FloorLayoutListComponent,
    FloorComponent,
    FloorListComponent,
    StopPropagationDirective,
    BuildingComponent,
    BackDirective,
    ClientComponent,
    SiteComponent,
    TrimPipe,
    SiteOfferComponent,
    SiteOfferListComponent,
    NotesComponent,
    SendMailDialogComponent,
    UnitTypeSaveAsDialogComponent,
    BulkFloorComponent,
    CreateFloorComponent,
    SiteStatusComponent,
    UnitsListComponent,
    MasterComponent,
    ControllersComponent,
    EquipmentVerificationComponent,
    FormControllerComponent,
    EquipmentItemComponent,
    VerificationComponent,
    InviteManagerDialogComponent,
    DeleteDialogComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    LoaderModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LanguagesModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
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
    ClipboardModule,
    DragDropModule,
    ZXingScannerModule,
    ConfirmDialogModule,
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
    ByKeyValuePipe,
    SumByKeyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
