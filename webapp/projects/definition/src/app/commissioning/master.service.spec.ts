import { TestBed } from '@angular/core/testing';
import { MasterService } from './master.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RequestController } from './master';

describe('MasterService', () => {
  let service: MasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(MasterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Set master controller', () => {
    const master = new RequestController();
    master.serial_no = '55ee18e3-8cfe-49e4-99ec-7e509291589c';
    master.site_id = 1;
    master.unit_id = 1;

    service.setMasterController(master).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.msg).toEqual(dummyResponse.msg);
    });

    const mockReq = httpMock.expectOne(req => req.url === '/api/controller/' && req.method === 'POST');
    const dummyResponse = {
      msg: 'Controller associated'
    };
    mockReq.flush(dummyResponse);
  });

  it('should get a list of controllers', () => {
    service.getAllControllers(1).subscribe(res => {
      expect(res.data[0].serial_no).toEqual(dummyResponse.data[0].serial_no);
    });

    const mockReq = httpMock.expectOne(req => req.url === '/api/controller/1' && req.method === 'GET');
    const dummyResponse = {
      data: [
        {
          id: 1,
          serial_no: 'd084dc29-529a-48f6-ab11-eb39d41c8dd1',
          equipment_type: 'MC CONTROLLER',
          description: 'Room Controller',
          model: 'RC'
        },
        {
          id: 2,
          serial_no: 'dasd4dc29-529a-48f6-ab11-eb3asdd1',
          equipment_type: 'MC CONTROLLER',
          description: 'Room Controller',
          model: 'RC'
        }
      ]
    };
    mockReq.flush(dummyResponse);
  });


  it('should get a list of associated controllers', () => {
    service.getAssociatedControllers(1).subscribe(res => {
      expect(res.data[0].serial_no).toEqual(dummyResponse.data[0].serial_no);
    });

    const mockReq = httpMock.expectOne(req => req.url === '/api/controller/associated/1' && req.method === 'GET');
    const dummyResponse = {
      data: [
        {
          id: 1,
          serial_no: 'd084dc29-529a-48f6-ab11-eb39d41c8dd1',
          equipment_type: 'MC CONTROLLER',
          description: 'Room Controller',
          model: 'RC'
        },
        {
          id: 2,
          serial_no: 'dasd4dc29-529a-48f6-ab11-eb3asdd1',
          equipment_type: 'MC CONTROLLER',
          description: 'Room Controller',
          model: 'RC'
        }
      ]
    };
    mockReq.flush(dummyResponse);
  });
});
