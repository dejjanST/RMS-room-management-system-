import { TestBed } from '@angular/core/testing';

import { FloorLayoutService } from './floor-layout.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RequestFloorLayout } from './floor-layout.model';

describe('FloorLayoutService', () => {
  let service: FloorLayoutService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    http = TestBed.inject(HttpTestingController);
    service = TestBed.inject(FloorLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



  it('getFloorLayouts() test', () => {
    service.getFloorLayouts().subscribe(
      res => {
        expect(res).toBeTruthy();
      },
      err => {
        expect(err).toBeFalsy();
      });

    const req = http.expectOne('/api/floors/layout/');
    expect(req.request.method).toEqual('GET');
    const dummyResponse = {
      data: { msg: 'success' }
    };
    req.flush(dummyResponse);
  });


  it('getFloorLayoutsBySiteList() test', () => {
    service.getFloorLayoutsBySiteList(3).subscribe(
      res => {
        expect(res).toBeTruthy();
      },
      err => {
        expect(err).toBeFalsy();
      });

    const req = http.expectOne('/api/floors/layout/?site_id=3');
    expect(req.request.method).toEqual('GET');
    const dummyResponse = {
      data: { msg: 'success' }
    };
    req.flush(dummyResponse);
  });


  it('deleteFloorLayout() test', () => {
    service.deleteFloorLayout(5).subscribe(
      res => {
        expect(res).toBeTruthy();
      },
      err => {
        expect(err).toBeFalsy();
      });

    const req = http.expectOne('/api/floors/layout/5');
    expect(req.request.method).toEqual('DELETE');
    const dummyResponse = {
      data: { msg: 'success' }
    };
    req.flush(dummyResponse);
  });


  it('createFloorLayout() test', () => {
    const requestFloorLayout = new RequestFloorLayout();
    service.createFloorLayout(requestFloorLayout).subscribe(
      res => {
        expect(res).toBeTruthy();
      },
      err => {
        expect(err).toBeFalsy();
      });

    const req = http.expectOne('/api/floors/layout/');
    expect(req.request.method).toEqual('POST');
    const dummyResponse = {
      data: { msg: 'success' }
    };
    req.flush(dummyResponse);
  });

  it('getFloorLayout() test', () => {
    service.getFloorLayout(10).subscribe(
      res => {
        expect(res).toBeTruthy();
      },
      err => {
        expect(err).toBeFalsy();
      });

    const req = http.expectOne('/api/floors/layout/10');
    expect(req.request.method).toEqual('GET');
    const dummyResponse = {
      data: { msg: 'success' }
    };
    req.flush(dummyResponse);
  });

  it('editFloorLayout() test', () => {
    const requestFloorLayout = new RequestFloorLayout();
    service.editFloorLayout(10, requestFloorLayout).subscribe(
      res => {
        expect(res).toBeTruthy();
      },
      err => {
        expect(err).toBeFalsy();
      });

    const req = http.expectOne('/api/floors/layout/10');
    expect(req.request.method).toEqual('PUT');
    const dummyResponse = {
      data: { msg: 'success' }
    };
    req.flush(dummyResponse);
  });

});
