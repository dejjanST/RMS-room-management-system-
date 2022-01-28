import { TestBed } from '@angular/core/testing';
import { BuildingService } from './building.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Building } from './buildings';

describe('BuildingService', () => {
  let service: BuildingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(BuildingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('Get building by id', () => {
    service.get(1).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.data.name).toEqual(dummyResponse.data.name);
    });

    const mockReq = httpMock.expectOne(req => req.url === '/api/buildings/1' && req.method === 'GET');

    const dummyResponse = {
      data:
      {
        id: 1,
        name: 'Building 1',
        client_id: 1,
        site_id: 1
      }
    };

    mockReq.flush(dummyResponse);
  });


  it('Edit building', () => {
    const building = new Building();
    building.data.id = 2;
    building.data.name = 'BuildingName';
    building.data.desc = 'Description for Building 1';
    building.data.file_id = 1;
    building.data.client_id = 1;
    building.data.site_id = 1;

    service.update(building).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.msg).toEqual(dummyResponse.msg);
    });

    const mockReq = httpMock.expectOne(req => req.url === '/api/buildings/2' && req.method === 'PUT');
    const dummyResponse = {
      msg: 'The building has been updated successfully'
    };
    mockReq.flush(dummyResponse);
  });


  it('Delete building by id', () => {
    service.delete(1).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.msg).toEqual(dummyResponse.msg);
    });

    const mockReq = httpMock.expectOne(req => req.url === '/api/buildings/1' && req.method === 'DELETE');
    const dummyResponse = {
      msg: 'The building has been deleted successfully'
    };
    mockReq.flush(dummyResponse);
  });

  it('Create new building', () => {
    const newBuilding = new Building();
    newBuilding.data.name = 'BuildingName';
    newBuilding.data.desc = 'Description for Building 1';
    newBuilding.data.file_id = 1;
    newBuilding.data.client_id = 1;
    newBuilding.data.site_id = 1;

    service.create(newBuilding).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.msg).toEqual(dummyResponse.msg);
    });

    const mockReq = httpMock.expectOne(req => req.url === '/api/buildings/' && req.method === 'POST');
    const dummyResponse = {
      msg: 'The building has been created successfully'
    };
    mockReq.flush(dummyResponse);
  });
});
