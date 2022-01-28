import { async, ComponentFixture, TestBed, flush, fakeAsync } from '@angular/core/testing';
import { SiteOfferListComponent } from './site-offer-list.component';
import { SiteService } from '../../site/site.service';
import { SiteOfferService } from '../site-offer.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SiteOffer } from '../site-offer.model';
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
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { GlobalService } from '../../globalService/global.service';

@Component({
  template: ''
})
class DummyComponent {
}

class MatDialogMock {
  dialogResponse = new SiteOffer();
  open() {
    this.dialogResponse.id = 15;
    this.dialogResponse.name = 'Offer 1';
    return {
      afterClosed: () => of(this.dialogResponse)
    };
  }
}

class GlobalServiceMock {
  site = {
    set: (id: number) => { },
    data$: of({
      data: {
        id: 2, name: 'Test', site_id: 110, client_id: 2, client_name: 'dasdssa', client_code: 123,
        country: null, address: null, city: null, progress: { total: 0, remaining: 0, created: 0 }
      }
    })
  };
}


describe('SiteOfferListComponent', () => {
  let component: SiteOfferListComponent;
  let fixture: ComponentFixture<SiteOfferListComponent>;
  let siteOfferService: any;
  let location: Location;

  beforeEach(async(() => {
    const siteOfferServiceSpy = jasmine.createSpyObj('SiteOfferService', ['getOffersBySite', 'deleteSiteOffer']);
    TestBed.configureTestingModule({
      declarations: [SiteOfferListComponent],
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
        RouterTestingModule.withRoutes([
          { path: 'sites/:siteId/offers/:offerId', component: DummyComponent }
        ])
      ],
      providers: [
        { provide: GlobalService, useClass: GlobalServiceMock },
        { provide: SiteOfferService, useValue: siteOfferServiceSpy },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: convertToParamMap({ siteId: 1 })
            }
          }
        },
        { provide: MatDialog, useClass: MatDialogMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    location = TestBed.inject(Location);
    siteOfferService = TestBed.inject(SiteOfferService);
    siteOfferService.deleteSiteOffer.and.returnValue(of({ msg: 'The offer has been deleted successfully' }));
    siteOfferService.getOffersBySite.and.returnValue(of({
      data: [
        {
          id: 15, name: 'Offer 1', status: 1, file_id: null, site_id: 2, client_id: 2,
          site_name: 'Test', client_name: 'dasdssa', client_code: 123, site_code: 110, created_at: 1594630013,
          number_of_buildings: 1, number_of_receptions: 1, items: {}
        },
        {
          id: 16, name: 'Offer 2', status: 2, file_id: 24, site_id: 2, client_id: 2,
          site_name: 'Test', client_name: 'dasdssa', client_code: 123, site_code: 110, created_at: 1594630013,
          number_of_buildings: 2, number_of_receptions: 2, items: {}
        },
        {
          id: 17, name: 'Offer 3', status: 3, file_id: 25, site_id: 2, client_id: 2,
          site_name: 'Test', client_name: 'dasdssa', client_code: 123, site_code: 110, created_at: 1594630013,
          number_of_buildings: 3, number_of_receptions: 3, items: {}
        },
        {
          id: 18, name: 'Offer 4', status: 4, file_id: 26, site_id: 2, client_id: 2,
          site_name: 'Test', client_name: 'dasdssa', client_code: 123, site_code: 110, created_at: 1594630013,
          number_of_buildings: 4, number_of_receptions: 4, items: {}
        }]
    }));
    fixture = TestBed.createComponent(SiteOfferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 4 site offers in list', () => {
    const list = fixture.debugElement.queryAll(By.css('table tbody tr'));
    expect(list.length).toEqual(4);
  });


  it('should have 3 delete buttons, 1 is enabled', () => {
    const deleteBtns = fixture.debugElement.queryAll(By.css('.deleteBtn'));
    expect(deleteBtns.length).toEqual(4);

    // only site offer with "Open" status can be deleted
    expect(fixture.debugElement.query(By.css('#del15')).nativeElement.disabled).toBeFalsy();
    expect(fixture.debugElement.query(By.css('#del16')).nativeElement.disabled).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#del17')).nativeElement.disabled).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#del18')).nativeElement.disabled).toBeTruthy();
  });

  xit('test delete site offer, deleteSiteOffer() should be called', fakeAsync(() => {
    let deleteBtns = fixture.debugElement.queryAll(By.css('.deleteBtn'));
    expect(deleteBtns.length).toEqual(4);
    const delete15Btn = fixture.debugElement.query(By.css('#del15'));
    expect(delete15Btn.nativeElement.disabled).toBeFalsy();

    delete15Btn.nativeElement.click();
    fixture.detectChanges();
    flush();

    expect(siteOfferService.deleteSiteOffer).toHaveBeenCalledTimes(1);

    // after remove Site offer should have 3 items in list
    deleteBtns = fixture.debugElement.queryAll(By.css('.deleteBtn'));
    expect(deleteBtns.length).toEqual(3);
  }));

  it('should redirect to edit component after click edit link', fakeAsync(() => {
    const editLink = fixture.debugElement.query(By.css('#SO16'));
    editLink.nativeElement.click();
    fixture.detectChanges();
    flush();

    expect(location.path()).toEqual('/sites/1/offers/16');
  }));

});
