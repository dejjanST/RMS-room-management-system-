import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FLOORS } from 'projects/definition/src/app/constants';
import { API } from '../constants';
import { SSFloorListMock } from './floor-mock';
import { FloorService } from './floor.service';

describe('FloorService', () => {
  let service: FloorService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    http = TestBed.inject(HttpTestingController);
    service = TestBed.inject(FloorService);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('testing getList()', () => {
    service.getList({ building_id: 1 }).subscribe(res => {
      expect(res).toBeTruthy();
    });
    const req = http.expectOne(`${API}${FLOORS}/?building_id=1`);
    expect(req.request.method).toEqual('GET');
    req.flush(SSFloorListMock);
  });
});
