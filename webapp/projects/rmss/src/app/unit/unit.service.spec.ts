import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API, UNITS } from '../constants';
import { SSUnitListMock } from './unit-mock';
import { UnitService } from './unit.service';

describe('UnitService', () => {
  let service: UnitService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    http = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UnitService);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('testing getList()', () => {
    service.getList({ floor_id: 2 }).subscribe(res => {
      expect(res).toBeTruthy();
    });
    const req = http.expectOne(`${API}${UNITS}/?floor_id=2`);
    expect(req.request.method).toEqual('GET');
    req.flush(SSUnitListMock);
  });
});
