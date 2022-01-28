import { TestBed } from '@angular/core/testing';
import { BuildingHService } from './building-h.service';
import { BuildingService } from '../building/building.service';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';
import { SiteHService } from '../site/site-h.service';

const mockBuilding1 = {
  data: {
    id: 1,
    name: 'Building1',
    client_id: 1,
    site_id: 1,
    file_id: 1,
    desc: 'description for Building 1',
    site_name: 'Site 1',
    client_name: 'Client 1',
    client_code: 11,
    site_code: 11
  }
};

const mockBuilding2 = {
  data: {
    id: 2,
    name: 'Building2',
    client_id: 1,
    site_id: 1,
    file_id: 2,
    desc: 'description for Building 2',
    site_name: 'Site 1',
    client_name: 'Client 1',
    client_code: 11,
    site_code: 11
  }
};

describe('BuildingHService', () => {
  let service: BuildingHService;
  let buildingService: any;
  let siteHService: any;

  beforeEach(() => {
    const buildingServiceSpy = jasmine.createSpyObj('BuildingService', ['get'], { updated$: of() });
    const siteHServiceSpy = jasmine.createSpyObj('SiteHService', ['set']);
    TestBed.configureTestingModule({
      providers: [
        { provide: BuildingService, useValue: buildingServiceSpy },
        { provide: SiteHService, useValue: siteHServiceSpy }
      ]
    });
    siteHService = TestBed.inject(SiteHService);
    buildingService = TestBed.inject(BuildingService);
    buildingService.get.and.returnValue(of(JSON.parse(JSON.stringify(mockBuilding1))));
    service = TestBed.inject(BuildingHService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make one request to API when requested same item multiple times', () => {
    service.set(1);
    service.set(1);
    service.set(1);
    service.data$.subscribe(res => {
      expect(res).toEqual(mockBuilding1.data);
    });
    service.set(1);
    expect(buildingService.get).toHaveBeenCalledTimes(1);
  });

  it('should make two requests to API when requested two different items', () => {
    service.set(1);
    service.data$
      .pipe(first())
      .subscribe(res => {
        expect(res).toEqual(mockBuilding1.data);
      });

    buildingService.get.and.returnValue(of(JSON.parse(JSON.stringify(mockBuilding2))));
    service.set(2);
    service.data$.subscribe(res => {
      expect(res).toEqual(mockBuilding2.data);
    });
    expect(buildingService.get).toHaveBeenCalledTimes(2);
  });

  it('should make two requests to API when requested multiple times in a row for two different items', () => {
    service.set(1);
    service.data$
      .pipe(first())
      .subscribe(res => {
        expect(res).toEqual(mockBuilding1.data);
      });
    service.set(1);
    service.data$
      .pipe(first())
      .subscribe(res => {
        expect(res).toEqual(mockBuilding1.data);
      });
    buildingService.get.and.returnValue(of(JSON.parse(JSON.stringify(mockBuilding2))));
    service.set(2);
    service.set(2);
    service.data$
      .pipe(first())
      .subscribe(res => {
        expect(res).toEqual(mockBuilding2.data);
      });
    expect(buildingService.get).toHaveBeenCalledTimes(2);
  });
});
