import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { BuildingListComponent } from './building-list.component';
import { AppModule } from '../../app.module';
import { BuildingService } from '../building.service';
import { SiteService } from '../../site/site.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../globalService/global.service';

const mockBuildings = {
  data: [
    { id: 1, name: 'Building1', client_id: 1, site_id: 1 },
    { id: 2, name: 'Building2', client_id: 2, site_id: 2 },
    { id: 3, name: 'Building3', client_id: 3, site_id: 3 },
    { id: 4, name: 'Building4', client_id: 4, site_id: 4 },
  ]
};

class GlobalServiceMock {
  site = {
    data$: of(mockSite),
    set() { }
  };
}

const mockSite = {
  data:
    { id: 1, name: 'SiteName1', site_id: '1', client: { id: '1' }, country: 'Mk', city: '1231221', address: 'asd' }
};

describe('BuildingListComponent', () => {
  let component: BuildingListComponent;
  let buildingService: any;
  let buildingListSpy: any;
  let fixture: ComponentFixture<BuildingListComponent>;

  beforeEach(async(() => {
    buildingListSpy = jasmine.createSpyObj('BuildingService', ['getList']);

    TestBed.configureTestingModule({
      declarations: [BuildingListComponent],
      imports: [
        AppModule
      ],
      providers: [
        { provide: BuildingService, useValue: buildingListSpy },
        { provide: GlobalService, useClass: GlobalServiceMock },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 1, }, }, }, },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    buildingService = TestBed.inject(BuildingService);
    buildingListSpy.getList.and.returnValue(of(mockBuildings));
    fixture = TestBed.createComponent(BuildingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Initally Should display 4 buildings', () => {
    expect(component.buildings.data.length).toEqual(4);
  });

  // it('On click, dialog should be called', fakeAsync(() => {
  //   spyOn(component, 'openDialog');
  //   const button = fixture.debugElement.nativeElement.querySelector('button');

  //   button.click();
  //   tick();
  //   fixture.detectChanges();

  //   expect(component.openDialog).toHaveBeenCalledTimes(1);
  // }));
});
