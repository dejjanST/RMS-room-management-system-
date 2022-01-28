import { TestBed } from '@angular/core/testing';
import { LandingPageService } from './landing-page.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { SystemInfo } from './system-info';

describe('LandingPageService', () => {
  let service: LandingPageService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(LandingPageService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get system info', () => {
    service.getSystemInfo().subscribe(res => {
      expect(res.data.partner_id).toEqual(dummyResponse.data.partner_id);
    });

    const mockReq = httpMock.expectOne(req => req.url === '/api/system_info/' && req.method === 'GET');
    const dummyResponse = {
      data: {
        id_address: '172.21.0.4',
        uptime: 279860.25,
        partner_id: 1,
        serial_number: '2f96a925-369c-4239-a88c-875d6bda4180'
      }
    };
    mockReq.flush(dummyResponse);
  });


  it('test for 404 error', () => {
    const msg = 'Site not yet activated';
    const testUrl = '/api/system_info/';

    httpClient.get(testUrl).subscribe(
      data => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(msg, 'message');
      }
    );

    const req = httpMock.expectOne(testUrl);

    // Respond with mock error
    req.flush(msg, { status: 404, statusText: 'Not Found' });
  });


  it('Create new site', () => {
    const systemInfo = new SystemInfo();
    systemInfo.data.serial_number = 'Holiday Inn';
    systemInfo.data.site_name = 'Hilton Skopje';
    systemInfo.data.client_name = 'Hilton';
    systemInfo.data.last_modification = 12321321;
    systemInfo.data.uptime = 17657.04;
    systemInfo.data.partner_id = 1;

    service.create(systemInfo).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.msg).toEqual(dummyResponse.msg);
    });

    const mockReq = httpMock.expectOne(req => req.url === '/api/sites/' && req.method === 'POST');
    const dummyResponse = {
      msg: 'The site has been created successfully'
    };
    mockReq.flush(dummyResponse);
  });
});
