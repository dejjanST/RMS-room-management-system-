import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { RequestLoaderService } from './request-loader.service';
import { HttpClient, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { VedMetaLoader } from './ved-meta-loader';
import { v4 as uuidv4 } from 'uuid';

describe('RequestLoaderService', () => {
  let service: RequestLoaderService;
  let http: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RequestLoaderService,
        HttpClient,
        HttpHandler
      ]
    });
    service = TestBed.get(RequestLoaderService);
    http = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



  it('test with 1 request', () => {
    const vedMetaLoader = new VedMetaLoader();
    const headers = new HttpHeaders()
      .set('X-VedMeta-uuid', uuidv4());
    vedMetaLoader.req = new HttpRequest('GET', '/test1', { headers });


    service.addRequest(vedMetaLoader);
    expect(service.httpRequests.length).toEqual(1);

    service.removeRequest(vedMetaLoader);
    expect(service.httpRequests.length).toEqual(0);

  });




  it('test with multiple request', () => {
    const vedMetaLoader1 = new VedMetaLoader();
    const headers1 = new HttpHeaders()
      .set('X-VedMeta-uuid', uuidv4());
    vedMetaLoader1.req = new HttpRequest('GET', '/test1', { headers: headers1 });

    const vedMetaLoader2 = new VedMetaLoader();
    const headers2 = new HttpHeaders()
      .set('X-VedMeta-uuid', uuidv4());
    vedMetaLoader2.req = new HttpRequest('GET', '/test2', { headers: headers2 });

    const vedMetaLoader3 = new VedMetaLoader();
    const headers3 = new HttpHeaders()
      .set('X-VedMeta-uuid', uuidv4());
    vedMetaLoader3.req = new HttpRequest('GET', '/test3', { headers: headers3 });


    service.addRequest(vedMetaLoader1);
    service.addRequest(vedMetaLoader2);
    service.addRequest(vedMetaLoader3);
    expect(service.httpRequests.length).toEqual(3);

    service.removeRequest(vedMetaLoader2);
    expect(service.httpRequests.length).toEqual(2);

  });

});
