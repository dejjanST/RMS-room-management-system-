import { TestBed, fakeAsync, tick, flush } from '@angular/core/testing';

import { SiteStatusPollingService } from './site-status-polling.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('SiteStatusPollingService', () => {
  let service: SiteStatusPollingService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    http = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SiteStatusPollingService);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('testing get()', () => {
    const siteIds: Array<number> = [1, 2, 3];
    service.get(siteIds).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = http.expectOne('/api/sites/info/?sites_ids=1&sites_ids=2&sites_ids=3');
    expect(req.request.method).toEqual('GET');
    req.flush({});
  });

  it('testing getSiteStatusPoling()', fakeAsync(() => {
    const siteIds: Array<number> = [5, 6, 7];

    const subscription = service.getSiteStatusPoling(siteIds).subscribe(res => {
      expect(res).toBeTruthy();
    });

    tick(100);

    const req = http.expectOne('/api/sites/info/?sites_ids=5&sites_ids=6&sites_ids=7');
    expect(req.request.method).toEqual('GET');
    req.flush({});

    subscription.unsubscribe();
  }));


  it('getSiteStatusPoling() for 1 minute should make 5 requests to backend', fakeAsync(() => {
    const siteIds: Array<number> = [4, 3, 2, 1];

    const subscription = service.getSiteStatusPoling(siteIds).subscribe(res => {
      expect(res).toBeTruthy();
    });

    tick(60000);

    subscription.unsubscribe();

    const req = http.match('/api/sites/info/?sites_ids=4&sites_ids=3&sites_ids=2&sites_ids=1');
    expect(req.length).toEqual(5);
  }));


  //TODO: test polling service with error response
  
});
