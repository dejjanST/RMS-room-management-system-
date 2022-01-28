import { TestBed } from '@angular/core/testing';
import { ManagerService } from './manager.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RequestManager } from './manager';

describe('ManagerService', () => {
  let service: ManagerService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ManagerService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create new site manager', () => {
    const manager = new RequestManager();
    manager.first_name = 'Manager name';
    manager.last_name = 'Manager surname';
    manager.email = 'manager@exaple.com';

    service.create(1, manager).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.msg).toEqual(dummyResponse.msg);
    });

    const mockReq = httpMock.expectOne(req => req.url === '/api/site/account/1' && req.method === 'POST');
    const dummyResponse = {
      msg: 'The site manager has been created successfully'
    };
    mockReq.flush(dummyResponse);
  });

  it('test for 400 error', () => {
    const msg = 'Account already exists';
    const testUrl = '/api/manager/';

    httpClient.get(testUrl).subscribe(
      data => fail('should have failed with the 400 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(400, 'status');
        expect(error.error).toEqual(msg, 'message');
      }
    );

    const req = httpMock.expectOne(testUrl);

    // Respond with mock error
    req.flush(msg, { status: 400, statusText: 'Duplicate data' });
  });
});
