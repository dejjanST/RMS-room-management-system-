import { TestBed } from '@angular/core/testing';
import { UnitService } from './unit-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ResponseUnitLst } from './unit';

describe('UnitServiceService', () => {
  let service: UnitService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(UnitService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Get list of units', () => {
    const query = {
      buidling_id: 1,
      page: 1,
      per_page: 5
    };
    service.getList(query).subscribe(res => {
      expect(res.data[0]).toEqual(dummyResponse.data[0]);
    });

    const mockReq = httpMock.expectOne(req => req.url === '/api/units/' && req.method === 'GET');
    const dummyResponse: ResponseUnitLst = {
      data: [
        {
          unit_id: 1,
          building_id: 1,
          f_name: 'prizemje',
          f_number: 2,
          u_name: 'restoran',
          u_number: 22,
          model: 'AC',
          per_page: 5,
          page: 1,
          stage: 1
        },
        {
          unit_id: 2,
          building_id: 1,
          f_name: 'prizemje',
          f_number: 2,
          u_name: 'restoran',
          u_number: 22,
          model: 'CC',
          per_page: 5,
          page: 1,
          stage: 1
        },
      ],
      meta: {
        total: 20,
        page: 1,
        per_page: 5,
        total_pages: 5
      }
    };
    mockReq.flush(dummyResponse);
  });


  it('testing get()', () => {
    service.get(41).subscribe(res => {
      expect(res).toBeTruthy();
    });
    const req = httpMock.expectOne('/api/units/41');
    expect(req.request.method).toBe('GET');
    req.flush({
      data:
        { id: 41, name: 'room 201', unit_no: 201, floor: { id: 9 }, floor_layout_has_utd: { id: 6 }, updated: 1597918433, deleted: false }
    });
  });


  it('getEquipmentList() test', () => {
    service.getEquipmentList().subscribe(
      res => {
        expect(res).toBeTruthy();
      },
      err => {
        expect(err).toBeFalsy();
      });

    const req = httpMock.expectOne('/api/equipment/');
    expect(req.request.method).toEqual('GET');
    const dummyResponse = {
      data: [{
        id: 81, equipment_type: 'Room cabinet', model: 'RCB', hv: 0, lv: 0, av: 0,
        ro: 0, ti: 0, di: 0, description: 'Room Cabinet with equipment', updated: 1591086542
      }]
    };
    req.flush(dummyResponse);
  });
});
