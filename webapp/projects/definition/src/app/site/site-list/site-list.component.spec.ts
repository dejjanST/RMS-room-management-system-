import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SiteListComponent } from './site-list.component';
import { SiteService } from '../site.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../globalService/global.service';
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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { SiteStatusPollingService } from '../site-status-polling.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, Input } from '@angular/core';
import { siteListMock, sitesInfoMock } from 'projects/definition/src/mocked-data/site-data';
import { SiteData } from '../site';


const client = {
  data: {
    id: 1,
    name: 'Dejan',
    client_id: 111,
    country: 'mkd',
    city: 'grad',
    address: 'asdas',
    bank_account: 'asdasd',
    bank_name: 'halk',
    bank_country: 'asdsd',
    active: 1
  }
};

class GlobalServiceMock {
  client = {
    data$: of(client.data),
    set() { }
  };
}
@Component({
  selector: 'site-status',
  template: '',

})
class MockSiteStatusComponent {
  @Input() siteDetails: SiteData;

}

describe('SiteListComponent', () => {
  let component: SiteListComponent;
  let siteService: any;
  let fixture: ComponentFixture<SiteListComponent>;
  let siteStatusPollingService: any;

  beforeEach(async(() => {
    const siteServiceSpy = jasmine.createSpyObj('SiteService', ['getList']);
    const siteStatusPollingServiceSpy = jasmine.createSpyObj('SiteStatusPollingService', ['getSiteStatusPoling']);

    TestBed.configureTestingModule({
      declarations: [SiteListComponent, MockSiteStatusComponent],
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
        MatProgressBarModule,
        MatPaginatorModule,
        MatListModule,
        RouterTestingModule
      ],
      providers: [
        { provide: GlobalService, useClass: GlobalServiceMock },
        { provide: SiteService, useValue: siteServiceSpy },
        { provide: SiteStatusPollingService, useValue: siteStatusPollingServiceSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 1, }, }, }, },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    siteService = TestBed.inject(SiteService);
    siteService.getList.and.returnValue(of(siteListMock));
    siteStatusPollingService = TestBed.inject(SiteStatusPollingService);
    siteStatusPollingService.getSiteStatusPoling.and.returnValue(of(sitesInfoMock));
    fixture = TestBed.createComponent(SiteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Initally Should display 5 sites', () => {
    expect(component.sites.data.length).toEqual(5);
  });

  // it('On click, dialog should be called', () => {
  //   spyOn(component, 'openDialog');
  //   const button = fixture.debugElement.nativeElement.querySelector('button');
  //   button.click();
  //   expect(component.openDialog).toHaveBeenCalledTimes(1);
  // });

});
