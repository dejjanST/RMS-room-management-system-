import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { SiteOfferComponent, ACCEPTED_OFFER } from './site-offer.component';
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
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FileUploadService } from 'projects/shared/src/app/services/file-upload.service';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { eqptList } from '../../unitType/unit-type/equipment-list-mock';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { NotesComponent } from '../notes/notes.component';
import { GlobalService } from '../../globalService/global.service';

@Component({
    template: ''
})
class DummyComponent { }

@Component({
    selector: 'app-notes',
    template: '',
    providers: [
        { provide: NotesComponent, useClass: MockNotesComponent }
    ]
})
class MockNotesComponent {
    @Input() offerId: number;
    refreshNotes() { }
}

class GlobalServiceMock {
    site = {
        set: (id: number) => { },
        data$: of({
            id: 1, name: 'Hilton Skopje', site_id: 11, client_id: 1, client_name: 'Hilton', client_code: 11, country: 'Macedonia',
            address: 'Bulevar ASNOM 17, Skopje 1000', city: 'Skopje', progress: { total: 0, remaining: 0, created: 0 }
        })
    };
}


describe('SiteOfferComponent Edit Form', () => {
    let component: SiteOfferComponent;
    let fixture: ComponentFixture<SiteOfferComponent>;
    let siteOfferService: any;
    let unitTypeService: any;
    let fileUploadService: any;
    let location: Location;

    beforeEach(async(() => {
        const siteOfferServiceSpy = jasmine.createSpyObj('SiteOfferService', ['editSiteOffer', 'getSiteOffer', 'getOffersBySite', 'deleteSiteOffer', 'updateOfferStatus', 'sendMail', 'createSiteOffer']);
        const unitTypeServiceSpy = jasmine.createSpyObj('UnitTypeService', ['getEquipmentList', 'listUnitTypes']);
        const fileUploadServiceSpy = jasmine.createSpyObj('FileUploadService', ['upload']);
        TestBed.configureTestingModule({
            declarations: [SiteOfferComponent, DummyComponent, MockNotesComponent],
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
                            paramMap: convertToParamMap({ siteId: 1, offerId: 4 })
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
        siteOfferService.editSiteOffer.and.returnValue(of({ msg: 'The offer has been updated successfully', data: { id: 5 } }));
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
    });

    // Most of functionalities of Edit form are covered by Create form tests.
    it('should create', () => {
        siteOfferService.getSiteOffer.and.returnValue(of({
            data:
            {
                id: 5, name: 'Offer 1', status: 1, file_id: null, site_id: 1, client_id: 1, site_name: 'Hilton Skopje', client_name: 'Hilton',
                client_code: 11, site_code: 11, created_at: 1595226388, number_of_buildings: 2, number_of_receptions: 1,
                items: { ut: [{ utd_id: 1, utd_name: 'Ednosoben apartman', quantity: 60 }], additional: [] }
            }
        }));
        fixture = TestBed.createComponent(SiteOfferComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        expect(component).toBeTruthy();
    });


    it('test edit form with status 1', fakeAsync(() => {
        siteOfferService.getSiteOffer.and.returnValue(of({
            data:
            {
                id: 5, name: 'Offer 1', status: 1, file_id: null, site_id: 1, client_id: 1, site_name: 'Hilton Skopje', client_name: 'Hilton',
                client_code: 11, site_code: 11, created_at: 1595226388, number_of_buildings: 2, number_of_receptions: 1,
                items: { ut: [{ utd_id: 1, utd_name: 'Ednosoben apartman', quantity: 60 }], additional: [] }
            }
        }));

        fixture = TestBed.createComponent(SiteOfferComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        const submitBtn = fixture.debugElement.query(By.css('button[type=submit]'));

        // form should be filled
        const name = component.form.get('name');
        const numberOfBuildings = component.form.get('numberOfBuildings');
        const numberOfReceptions = component.form.get('numberOfReceptions');
        expect(name.value).toEqual('Offer 1');
        expect(numberOfBuildings.value).toEqual(2);
        expect(numberOfReceptions.value).toEqual(1);

        // edit form
        name.setValue('Offer 2');
        numberOfBuildings.setValue(4);
        numberOfReceptions.setValue(2);

        fixture.detectChanges();

        // form should be valid and submit btn should be enabled
        expect(component.form.valid).toBeTruthy();
        expect(submitBtn.nativeElement.disabled).toBeFalsy();

        // after click on submit button, editSiteOffer should be callled and redirect to site offer list
        submitBtn.nativeElement.click();
        flush();
        expect(siteOfferService.editSiteOffer).toHaveBeenCalledTimes(1);
        expect(location.path()).toEqual('/sites/1/offers');
    }));

    it('test edit form with status 2', fakeAsync(() => {
        siteOfferService.getSiteOffer.and.returnValue(of({
            data:
            {
                id: 5, name: 'Offer 1', status: 2, file_id: 3, site_id: 1, client_id: 1, site_name: 'Hilton Skopje', client_name: 'Hilton',
                client_code: 11, site_code: 11, created_at: 1595226388, number_of_buildings: 2, number_of_receptions: 1,
                items: { ut: [{ utd_id: 1, utd_name: 'Ednosoben apartman', quantity: 60 }], additional: [] }
            }
        }));
        siteOfferService.updateOfferStatus.and.returnValue(of({ msg: 'The offer has been accepted successfully', data: { id: 4 } }));
        fixture = TestBed.createComponent(SiteOfferComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        const submitBtn = fixture.debugElement.query(By.css('button[type=submit]'));

        // form should be filled
        const name = component.form.get('name');
        const numberOfBuildings = component.form.get('numberOfBuildings');
        const numberOfReceptions = component.form.get('numberOfReceptions');
        expect(name.value).toEqual('Offer 1');
        expect(numberOfBuildings.value).toEqual(2);
        expect(numberOfReceptions.value).toEqual(1);

        // when status is different from Open, the input fields should be readonly
        expect(fixture.debugElement.query(By.css('#siteOfferName')).nativeElement.getAttribute('readonly')).toBeTruthy();
        expect(fixture.debugElement.query(By.css('#numberOfBuildings')).nativeElement.getAttribute('readonly')).toBeTruthy();
        expect(fixture.debugElement.query(By.css('#numberOfReceptions')).nativeElement.getAttribute('readonly')).toBeTruthy();

        // should have Accept and Decline buttons
        const acceptBtn = fixture.debugElement.query(By.css('#acceptOffer'));
        const declinetBtn = fixture.debugElement.query(By.css('#declineOffer'));

        expect(acceptBtn).toBeTruthy();
        expect(declinetBtn).toBeTruthy();

        // after click on acceptBtn, status should be changed to Accepted and updateOfferStatus() should be called
        acceptBtn.nativeElement.click();
        flush();
        fixture.detectChanges();
        expect(siteOfferService.updateOfferStatus).toHaveBeenCalledTimes(1);
        expect(siteOfferService.updateOfferStatus).toHaveBeenCalledWith(component.offerId, ACCEPTED_OFFER);
        expect(fixture.debugElement.query(By.css('.mat-chip')).nativeElement.textContent).toEqual('Accepted');

    }));



});
