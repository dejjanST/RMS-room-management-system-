import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { SiteOfferComponent } from './site-offer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { SiteOfferService } from '../site-offer.service';
import { of } from 'rxjs';
import { Location } from '@angular/common';
import { UnitTypeService } from '../../unitType/unit-type.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FileUploadService } from 'projects/shared/src/app/services/file-upload.service';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { eqptList } from '../../unitType/unit-type/equipment-list-mock';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ResponseUnitType } from '../../unitType/models/unit-type.Model';
import { Equipment } from '../../unitType/models/equipment.Model';
import { Component } from '@angular/core';
import { GlobalService } from '../../globalService/global.service';

@Component({
  template: ''
})
class DummyComponent {
}

class GlobalServiceMock {
  site = {
    set: (id: number) => { },
    data$: of({
      id: 2, name: 'Test', site_id: 110, client_id: 2, client_name: 'dasdssa', client_code: 123,
      country: null, address: null, city: null, progress: { total: 0, remaining: 0, created: 0 }
    })
  };
}

describe('SiteOfferComponent Create Form', () => {
  let component: SiteOfferComponent;
  let fixture: ComponentFixture<SiteOfferComponent>;
  let siteOfferService: any;
  let unitTypeService: any;
  let fileUploadService: any;
  let location: Location;

  beforeEach(async(() => {
    const siteOfferServiceSpy = jasmine.createSpyObj('SiteOfferService', ['getOffersBySite', 'deleteSiteOffer', 'updateOfferStatus', 'sendMail', 'createSiteOffer']);
    const unitTypeServiceSpy = jasmine.createSpyObj('UnitTypeService', ['getEquipmentList', 'listUnitTypes']);
    const fileUploadServiceSpy = jasmine.createSpyObj('FileUploadService', ['upload']);
    TestBed.configureTestingModule({
      declarations: [SiteOfferComponent, DummyComponent],
      imports: [
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
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        DragDropModule,
        RouterTestingModule.withRoutes([
          { path: 'sites/:siteId/offers', component: DummyComponent }
        ])],
      providers: [
        { provide: GlobalService, useClass: GlobalServiceMock },
        { provide: SiteOfferService, useValue: siteOfferServiceSpy },
        { provide: UnitTypeService, useValue: unitTypeServiceSpy },
        { provide: FileUploadService, useValue: fileUploadServiceSpy },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: convertToParamMap({ siteId: 1 })
            }
          }
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    location = TestBed.inject(Location);
    fileUploadService = TestBed.inject(FileUploadService);
    siteOfferService = TestBed.inject(SiteOfferService);
    siteOfferService.createSiteOffer.and.returnValue(of({ msg: 'The offer has been created successfully', data: { id: 20 } }));
    unitTypeService = TestBed.inject(UnitTypeService);
    unitTypeService.getEquipmentList.and.returnValue(of(JSON.parse(JSON.stringify(eqptList))));
    unitTypeService.listUnitTypes.and.returnValue(of({
      data: [
        {
          id: 1, name: 'Ednosoben apartman', rooms: 1, master_controller_model: 'RC',
          description: null, locked: true, updated: 1594324693, deleted: false
        },
        {
          id: 2, name: 'Dvosoben apartman', rooms: 2, master_controller_model: 'RC',
          description: null, locked: false, updated: 1594733532, deleted: false
        }]
    }));
    fixture = TestBed.createComponent(SiteOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test form validation', () => {
    const submitBtn = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(component.form.valid).toBeFalsy();
    expect(submitBtn.nativeElement.disabled).toBeTruthy();

    const name = component.form.get('name');
    const numberOfBuildings = component.form.get('numberOfBuildings');
    const numberOfReceptions = component.form.get('numberOfReceptions');

    expect(name.hasError('required')).toBeTruthy();
    expect(numberOfBuildings.hasError('required')).toBeTruthy();
    expect(numberOfBuildings.hasError('min')).toBeFalsy();
    expect(numberOfReceptions.hasError('required')).toBeTruthy();
    expect(numberOfReceptions.hasError('min')).toBeFalsy();

    name.setValue('te');
    expect(component.form.valid).toBeFalsy();
    expect(name.hasError('required')).toBeFalsy();
    expect(name.hasError('minlength')).toBeTruthy();

    name.setValue('test');
    expect(component.form.valid).toBeFalsy();
    expect(name.hasError('required')).toBeFalsy();
    expect(name.hasError('minlength')).toBeFalsy();

    numberOfBuildings.setValue(-1);
    expect(component.form.valid).toBeFalsy();
    expect(numberOfBuildings.hasError('required')).toBeFalsy();
    expect(numberOfBuildings.hasError('min')).toBeTruthy();

    numberOfBuildings.setValue(3);
    expect(component.form.valid).toBeFalsy();
    expect(numberOfBuildings.hasError('required')).toBeFalsy();
    expect(numberOfBuildings.hasError('min')).toBeFalsy();

    numberOfReceptions.setValue(-3);
    expect(component.form.valid).toBeFalsy();
    expect(numberOfReceptions.hasError('required')).toBeFalsy();
    expect(numberOfReceptions.hasError('min')).toBeTruthy();

    numberOfReceptions.setValue(5);
    expect(component.form.valid).toBeTruthy();
    expect(numberOfReceptions.hasError('required')).toBeFalsy();
    expect(numberOfReceptions.hasError('min')).toBeFalsy();

    fixture.detectChanges();

    // can not submit form without unit types
    expect(submitBtn.nativeElement.disabled).toBeTruthy();
    const ut = new ResponseUnitType();
    ut.id = 1;
    ut.name = 'Unit Type 1';
    ut.quantity = 2;
    component.addUnitType(ut);

    fixture.detectChanges();
    expect(submitBtn.nativeElement.disabled).toBeFalsy();

  });

  it('test unitTypes and additionalEqpts form arrays validations and submit valid form', fakeAsync(() => {
    component.form.get('name').setValue('Offer 1');
    component.form.get('numberOfBuildings').setValue(2);
    component.form.get('numberOfReceptions').setValue(4);
    fixture.detectChanges();
    expect(component.form.valid).toBeTruthy();

    const ut = new ResponseUnitType();
    ut.id = 1;
    ut.name = 'Ednosoben apartman';
    ut.master_controller_model = 'RC';

    // should add one unit type in list and require quantity input,
    // witch means form validation is invalid
    component.addUnitType(ut);
    fixture.detectChanges();
    expect(component.form.valid).toBeFalsy();

    const addeUT = fixture.debugElement.queryAll(By.css('.selectedUT'));
    expect(addeUT.length).toEqual(1);

    const UTQty1 = fixture.debugElement.query(By.css('.selectedUT #qty1'));
    UTQty1.nativeElement.value = 2;
    UTQty1.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // form validation should be valid
    expect(component.form.valid).toBeTruthy();

    const aEqpt = new Equipment();
    aEqpt.id = 85;
    aEqpt.model = 'EMDL';
    aEqpt.description = 'Electromechanical door lock';

    // should add one additional equipment in list and require quantity input,
    // witch means form validation is invalid
    component.addAdditionalEqpt(aEqpt);
    fixture.detectChanges();
    expect(component.form.valid).toBeFalsy();

    const addedAEqpt = fixture.debugElement.queryAll(By.css('.selectedAE'));
    expect(addedAEqpt.length).toEqual(1);

    const AEQty1 = fixture.debugElement.query(By.css('.selectedAE #qty85'));
    AEQty1.nativeElement.value = 4;
    AEQty1.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // form validation should be valid
    expect(component.form.valid).toBeTruthy();
    const submitBtn = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(submitBtn.nativeElement.disabled).toBeFalsy();

    // submit button should call createSiteOffer() method and should redirect to list site offers
    submitBtn.nativeElement.click();
    fixture.detectChanges();
    flush();

    expect(siteOfferService.createSiteOffer).toHaveBeenCalledTimes(1);
    expect(location.path()).toEqual('/sites/1/offers');
  }));

});
