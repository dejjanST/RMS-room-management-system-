import { TestBed } from '@angular/core/testing';

import { FloorService } from './floor.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {  FloorUnit, RequestBulkData, FloorSearch, ResponseFloor } from './floor';

describe('FloorService', () => {
  let service: FloorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(FloorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('Create new floor', () => {
    const floorUnit = new FloorUnit();
    floorUnit.id = 1;
    floorUnit.name = 'flu 1';
    floorUnit.unit_no = 1;
    floorUnit.unit_type_id = 1;
    floorUnit.pos = {
      x: 111,
      y: 122
    };

    const floorUnit1 = new FloorUnit();
    floorUnit.id = 2;
    floorUnit.name = 'flu 2';
    floorUnit.unit_no = 2;
    floorUnit.unit_type_id = 1;
    floorUnit.pos = {
      x: 122,
      y: 133
    };

    const newFloor = new ResponseFloor();
    newFloor.data.building_id = 1;
    newFloor.data.floor_layout_id = 1;
    newFloor.data.floor_no = 2;
    newFloor.data.name = 'First floor';
    newFloor.data.access_level = 1111;
    newFloor.data.units = [floorUnit, floorUnit1];

    service.create(newFloor).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.msg).toEqual(dummyResponse.msg);
    });

    const mockReq = httpMock.expectOne(req => req.url === '/api/floors/' && req.method === 'POST');
    const dummyResponse = {
      msg: 'The floor has been created successfully'
    };
    mockReq.flush(dummyResponse);
  });


  it('Get floor by id', () => {
    service.get(1).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.data.name).toEqual(dummyResponse.data.name);
    });

    const mockReq = httpMock.expectOne(req => req.url === '/api/floors/1' && req.method === 'GET');

    const dummyResponse = {
      data:
      {
        id: 1,
        name: 'First floor',
        floor_layout_id: 1,
        floor_no: 2,
        building_id: 1,
        access_level: 11111
      }
    };

    mockReq.flush(dummyResponse);
  });

  // unit_type_name: string;
  it('Update floor', () => {
    const floorUnit = new FloorUnit();
    floorUnit.id = 1;
    floorUnit.name = 'flu 1';
    floorUnit.unit_no = 1;
    floorUnit.unit_type_id = 1;
    floorUnit.pos = {
      x: 111,
      y: 122
    };

    const floorUnit1 = new FloorUnit();
    floorUnit.id = 2;
    floorUnit.name = 'flu 2';
    floorUnit.unit_no = 2;
    floorUnit.unit_type_id = 1;
    floorUnit.pos = {
      x: 122,
      y: 133
    };

    const florId = 2;

    const newFloor = new ResponseFloor();
    newFloor.data.id = 2;
    newFloor.data.building_id = 1;
    newFloor.data.floor_layout_id = 1;
    newFloor.data.floor_no = 2;
    newFloor.data.name = 'First floor';
    newFloor.data.access_level = 1111;
    newFloor.data.units = [floorUnit, floorUnit1];

    service.update(newFloor, florId).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.msg).toEqual(dummyResponse.msg);
    });

    const mockReq = httpMock.expectOne(req => req.url === '/api/floors/2' && req.method === 'PUT');
    const dummyResponse = {
      msg: 'The floor has been updated successfully'
    };
    mockReq.flush(dummyResponse);
  });


  it('Get list of floors', () => {
    const query: FloorSearch = {
      building_id: 1,
      name: 'First floor'
    };
    service.getList(query).subscribe(res => {
      expect(res.data[0]).toEqual(dummyResponse.data[0]);
      expect(res.data[1]).toEqual(dummyResponse.data[1]);
    });

    const mockReq = httpMock.expectOne(req => req.url === '/api/floors/' && req.method === 'GET');

    const floorUnit = new FloorUnit();
    floorUnit.id = 1;
    floorUnit.name = 'flu 1';
    floorUnit.unit_no = 1;
    floorUnit.unit_type_id = 1;
    floorUnit.unit_type_name = 'Two bedroom';
    floorUnit.pos = {
      x: 111,
      y: 122
    };

    const floorUnit1 = new FloorUnit();
    floorUnit.id = 2;
    floorUnit.name = 'flu 2';
    floorUnit.unit_no = 2;
    floorUnit.unit_type_id = 1;
    floorUnit.unit_type_name = 'One bedroom';
    floorUnit.pos = {
      x: 122,
      y: 133
    };

    const dummyResponse = {
      data: [
        {
          id: 1,
          name: 'First floor',
          floor_layout_id: 1,
          floor_layout_fileid: 1,
          floor_no: 1,
          building_id: 1,
          access_level: 11111,
          units: [floorUnit, floorUnit1]
        },
        {
          id: 2,
          name: 'Second floor',
          floor_layout_id: 1,
          floor_layout_fileid: 1,
          floor_no: 2,
          building_id: 1,
          access_level: 22222,
          units: [floorUnit, floorUnit1]
        },
      ]
    };
    mockReq.flush(dummyResponse);
  });


  it('Create bulk floor', () => {
    const newBulkFloor = new RequestBulkData();
    newBulkFloor.data.floor_from = 2;
    newBulkFloor.data.floor_to = 12;
    newBulkFloor.data.floor_layout_id = 1;
    newBulkFloor.data.building_id = 1;

    service.createBulk(newBulkFloor).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.msg).toEqual(dummyResponse.msg);
    });

    const mockReq = httpMock.expectOne(req => req.url === '/api/floors/bulk/' && req.method === 'POST');
    const dummyResponse = {
      msg: 'The bulk floor has been created successfully'
    };
    mockReq.flush(dummyResponse);
  });


  it('Delete floor by id', () => {
    service.delete(1).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.msg).toEqual(dummyResponse.msg);
    });

    const mockReq = httpMock.expectOne(req => req.url === '/api/floors/1' && req.method === 'DELETE');
    const dummyResponse = {
      msg: 'The floor has been deleted successfully'
    };
    mockReq.flush(dummyResponse);
  });
});
