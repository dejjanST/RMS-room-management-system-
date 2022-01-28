import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { VerificatinReportMock } from './verification.mock';
import { VerificationService } from './verification.service';

describe('VerificationService', () => {
  let service: VerificationService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(VerificationService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getList the report', () => {
    service.getList(1).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = http.expectOne('/api/reports/verification/1');
    expect(req.request.method).toEqual('GET');
    req.flush(VerificatinReportMock);
  });


  it('getList the report with queryParams', () => {
    service.getList(1, { equipment: 'FCU', status: '3' }).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = http.expectOne('/api/reports/verification/1?equipment=FCU&status=3');
    expect(req.request.method).toEqual('GET');
    req.flush(VerificatinReportMock);
  });

  it('getList the report with queryParams without data found', () => {
    service.getList(1, { equipment: 'FCU', status: '3' }).subscribe(response => {
      expect(response).toBeTruthy();
      expect(response.data.length).toEqual(0);
    });

    const req = http.expectOne('/api/reports/verification/1?equipment=FCU&status=3');
    expect(req.request.method).toEqual('GET');
    req.flush({}, { status: 404, statusText: 'Not found' });
  });
});
