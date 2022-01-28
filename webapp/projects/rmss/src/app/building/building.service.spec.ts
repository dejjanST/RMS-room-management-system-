import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API, BUILDINGS } from '../constants';
import { SSBuildingListMock } from './building-mock';
import { BuildingService } from './building.service';

describe('BuildingService', () => {
  let service: BuildingService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    http = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BuildingService);
  });
  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('testing getList()', () => {
    service.getList({}).subscribe(res => {
      expect(res).toBeTruthy();
    });
    const req = http.expectOne(`${API}${BUILDINGS}/`);
    expect(req.request.method).toEqual('GET');
    req.flush(SSBuildingListMock);
  });

});
