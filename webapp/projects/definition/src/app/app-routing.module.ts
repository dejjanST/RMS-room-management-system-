import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientListComponent } from './client/client-list/client-list.component';
import { SiteListComponent } from './site/site-list/site-list.component';
import { UnitTypeComponent } from './unitType/unit-type/unit-type.component';
import { BuildingListComponent } from './building/building-list/building-list.component';
import { AuthService } from 'projects/shared/src/app/services/auth.service';
import { UnitTypeListComponent } from './unitType/unit-type-list/unit-type-list.component';
import { FloorLayoutComponent } from './floorLayout/floor-layout/floor-layout.component';
import { FloorLayoutListComponent } from './floorLayout/floor-layout-list/floor-layout-list.component';
import { BuildingComponent } from './building/building/building.component';
import { ClientComponent } from './client/client/client.component';
import { SiteComponent } from './site/site/site.component';
import { FloorListComponent } from './floor/floor-list/floor-list.component';
import { FloorComponent } from './floor/floor/floor.component';
import { SiteOfferListComponent } from './siteOffer/site-offer-list/site-offer-list.component';
import { SiteOfferComponent } from './siteOffer/site-offer/site-offer.component';
import { UnitsListComponent } from './unit/units-list/units-list.component';
import { MasterComponent } from './commissioning/master/master.component';
import { ControllersComponent } from './commissioning/controllers/controllers.component';
import { EquipmentVerificationComponent } from './verification/equipment-verification.component';
import { VerificationComponent } from './reports/verification/verification.component';


const routes: Routes = [
  {
    path: '',
    component: ClientListComponent,
    canActivate: [AuthService]
  },
  {
    // client list
    path: 'clients',
    component: ClientListComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },
  {
    // client new
    path: 'clients/new',
    component: ClientComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },
  {
    // client edit
    path: 'clients/:clientId',
    component: ClientComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },
  {
    // sites
    path: 'sites',
    component: SiteListComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },
  {
    // site list by client
    path: 'clients/:clientId/sites',
    component: SiteListComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },
  {
    path: 'sites',
    component: SiteListComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },
  {
    // site new
    path: 'clients/:clientId/sites/new',
    component: SiteComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },
  {
    // site edit
    path: 'clients/:clientId/sites/:siteId',
    component: SiteComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },
  {
    // buildings list
    path: 'sites/:siteId/buildings',
    component: BuildingListComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },
  {
    // buildings new
    path: 'sites/:siteId/buildings/new',
    component: BuildingComponent,
    canActivate: [AuthService],
    pathMatch: 'full'

  },
  {
    // buildings edit
    path: 'sites/:siteId/buildings/:buildingId',
    component: BuildingComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },
  {
    // floor list
    path: 'buildings/:buildingId/floors',
    component: FloorListComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },

  {
    // floor new
    path: 'buildings/:buildingId/floors/new',
    component: FloorComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },
  {
    // floor edit
    path: 'buildings/:buildingId/floors/:floorId',
    component: FloorComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },

  {
    // floor list
    path: 'buildings/:buildingId/units',
    component: UnitsListComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },

  {
    path: 'units/new',
    component: UnitTypeComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },
  {
    path: 'units',
    component: UnitTypeListComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },
  {
    path: 'units/edit/:id',
    component: UnitTypeComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },
  {
    path: 'units/:unitId/master',
    component: MasterComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },
  {
    path: 'units/:unitId/controllers',
    component: ControllersComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },
  {
    path: 'sites/:siteId/fld/new',
    component: FloorLayoutComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },
  {
    path: 'sites/:siteId/fld/edit/:floorLayoutId',
    component: FloorLayoutComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },
  {
    path: 'sites/:siteId/fld',
    component: FloorLayoutListComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },
  {
    path: 'sites/:siteId/offers',
    component: SiteOfferListComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },
  {
    path: 'sites/:siteId/offers/new',
    component: SiteOfferComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },
  {
    path: 'sites/:siteId/offers/:offerId',
    component: SiteOfferComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },
  {
    path: 'units/:unitId/verification',
    component: EquipmentVerificationComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },

  {
    path: 'buildings/:buildingId/reports/verification',
    component: VerificationComponent,
    canActivate: [AuthService],
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'clients',
    canActivate: [AuthService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

