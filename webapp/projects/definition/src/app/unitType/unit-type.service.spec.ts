import { TestBed } from '@angular/core/testing';
import { UnitTypeService } from './unit-type.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RequestUnitType, ResponseUnitType } from './models/unit-type.Model';

describe('UnitTypeService', () => {
  let service: UnitTypeService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(UnitTypeService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getEquipmentList() test', () => {
    service.getEquipmentList().subscribe(
      res => {
        expect(res).toBeTruthy();
      },
      err => {
        expect(err).toBeFalsy();
      });

    const req = http.expectOne('/api/equipment/');
    expect(req.request.method).toEqual('GET');
    const dummyResponse = {
      data: [{
        id: 81, equipment_type: 'Room cabinet', model: 'RCB', hv: 0, lv: 0, av: 0,
        ro: 0, ti: 0, di: 0, description: 'Room Cabinet with equipment', updated: 1591086542
      }]
    };
    req.flush(dummyResponse);
  });


  it('createUnitType() test', () => {
    const dummyUnitType = new RequestUnitType();
    dummyUnitType.name = 'test';
    dummyUnitType.rooms = 2;
    dummyUnitType.description = '';
    dummyUnitType.locked = false;

    service.createUnitType(dummyUnitType).subscribe(
      res => {
        expect(res).toBeTruthy();
      },
      err => {
        expect(err).toBeFalse();
      });

    const req = http.expectOne('/api/utd/');
    expect(req.request.method).toEqual('POST');
    req.flush({ msg: 'Successfully created unit type' });
  });

  it('deleteUnitType() test', () => {
    const dummyUnitType = new ResponseUnitType();
    dummyUnitType.id = 1;
    dummyUnitType.name = 'test';
    dummyUnitType.rooms = 2;
    dummyUnitType.description = '';
    dummyUnitType.locked = false;

    service.deleteUnitType(dummyUnitType.id).subscribe(
      res => {
        expect(res).toBeTruthy();
      },
      err => {
        expect(err).toBeFalse();
      });

    const req = http.expectOne('/api/utd/1');
    expect(req.request.method).toEqual('DELETE');
    req.flush({ msg: 'Successfully deleted unit type' });
  });

  it('editUnitType() test', () => {
    const dummyUnitType = new RequestUnitType();
    dummyUnitType.name = 'test';
    dummyUnitType.rooms = 2;
    dummyUnitType.description = '';
    dummyUnitType.locked = false;

    service.editUnitType(2, dummyUnitType).subscribe(
      res => {
        expect(res).toBeTruthy();
      },
      err => {
        expect(err).toBeFalse();
      });

    const req = http.expectOne('/api/utd/2');
    expect(req.request.method).toEqual('PUT');
    req.flush({ msg: 'Successfully updated unit type' });
  });

  it('getUnitType() test', () => {
    const dummyResponse = {
      data: {
        id: 1,
        name: 'Ednosoben apartman',
        rooms: 1,
        description: 'Describe one room apartment',
        locked: false,
        updated: 1590486724,
        deleted: false,
        equipment: [
          {
            id: 1,
            q: 1
          },
          {
            id: 4,
            q: 1
          },
          {
            id: 46,
            q: 2
          },
          {
            id: 62,
            q: 1
          }
        ]
      }
    };

    service.getUnitType(1).subscribe(
      res => {
        expect(res).toBeTruthy();
        expect(res.data.name).toEqual(dummyResponse.data.name);
      },
      err => {
        expect(err).toBeFalse();
      });

    const req = http.expectOne('/api/utd/1');
    expect(req.request.method).toEqual('GET');
    req.flush(dummyResponse);
  });


  it('listUnitTypes() test', () => {
    const dummyResponse = {
      data: [
        {
          id: 1,
          name: 'Ednosoben apartman',
          rooms: 1,
          description: 'Describe one room apartment',
          locked: false,
          updated: 1590486724,
          deleted: false
        },
        {
          id: 2,
          name: 'Dvosoben apartman',
          rooms: 2,
          description: 'Describe two room apartment',
          locked: true,
          updated: 1590486724,
          deleted: false
        },
        {
          id: 3,
          name: 'Koridor',
          rooms: 1,
          description: 'Describe corridor',
          locked: true,
          updated: 1590486724,
          deleted: false
        }
      ]
    };

    service.listUnitTypes().subscribe(
      res => {
        expect(res).toBeTruthy();
        expect(res.data[0].name).toEqual(dummyResponse.data[0].name);
      },
      err => {
        expect(err).toBeFalsy();
      });

    const req = http.expectOne('/api/utd/');
    expect(req.request.method).toEqual('GET');
    req.flush(dummyResponse);
  });


  it('getListAcceptedBySite() test', () => {
    const dummyResponse = {
      data: [
        {
          id: 1,
          name: 'Ednosoben apartman',
          rooms: 1,
          description: 'Describe one room apartment',
          locked: false,
          updated: 1590486724,
          deleted: false
        },
        {
          id: 2,
          name: 'Dvosoben apartman',
          rooms: 2,
          description: 'Describe two room apartment',
          locked: true,
          updated: 1590486724,
          deleted: false
        },
        {
          id: 3,
          name: 'Koridor',
          rooms: 1,
          description: 'Describe corridor',
          locked: true,
          updated: 1590486724,
          deleted: false
        }
      ]
    };

    service.getListAcceptedBySite(3).subscribe(
      res => {
        expect(res).toBeTruthy();
        expect(res.data[0].name).toEqual(dummyResponse.data[0].name);
      },
      err => {
        expect(err).toBeFalsy();
      });

    const req = http.expectOne('/api/utd/accepted/3');
    expect(req.request.method).toEqual('GET');
    req.flush(dummyResponse);
  });

});
