import { TestBed } from '@angular/core/testing';
import { SiteStatusService } from './site-status.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { API } from '../../constants';

describe('SiteStatusService', () => {
  let service: SiteStatusService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    http = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SiteStatusService);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('testing pushConfiguration()', () => {
    service.pushConfiguration(1).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const reqMock = http.expectOne(`${API}/conf/1`);
    expect(reqMock.request.method).toEqual('POST');
    reqMock.flush({ msg: 'Site configuration successfully set up' });

  });


});
