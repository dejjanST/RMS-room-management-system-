import { TestBed } from '@angular/core/testing';

import { FloorHService } from './floor-h.service';
import { ResponseFloor } from './floor';
import { of } from 'rxjs';
import { FloorService } from './floor.service';
import { first } from 'rxjs/operators';
import { BuildingHService } from '../building/building-h.service';

const floor1Mock: ResponseFloor = {
  data: {
    id: 1, name: 'Floor 1', building_id: 2,
    building_name: 'Building 2', floor_layout_fileid: 3, floor_no: 1,
    floor_layout_id: 2, units: [{
      id: 6, unit_no: 1, name: '1',
      unit_type_name: 'Trosoben apartman', pos: { x: 445, y: 282 }
    },
    {
      id: 8, unit_no: 3, name: '3', unit_type_name: 'Trosoben apartman',
      pos: { x: 327, y: 466 }
    }, {
      id: 7, unit_no: 2, name: '2',
      unit_type_name: 'Trosoben apartman', pos: { x: 813, y: 359 }
    }]
  }
};


const floor2Mock: ResponseFloor = {
  data: {
    id: 2, name: 'Floor 2', building_id: 2,
    building_name: 'Building 2', floor_layout_fileid: 3, floor_no: 1,
    floor_layout_id: 2, units: [{
      id: 6, unit_no: 1, name: '1',
      unit_type_name: 'Trosoben apartman', pos: { x: 445, y: 282 }
    },
    {
      id: 8, unit_no: 3, name: '3', unit_type_name: 'Trosoben apartman',
      pos: { x: 327, y: 466 }
    }, {
      id: 7, unit_no: 2, name: '2',
      unit_type_name: 'Trosoben apartman', pos: { x: 813, y: 359 }
    }]
  }
};

describe('FloorHService', () => {
  let service: FloorHService;
  let floorService: any;
  let buildingHService: any;


  beforeEach(() => {
    const floorServiceSpy = jasmine.createSpyObj('FloorService', ['get'], { updated$: of() });
    const buildingHServiceSpy = jasmine.createSpyObj('BuildingHService', ['set']);
    TestBed.configureTestingModule({
      providers: [
        { provide: FloorService, useValue: floorServiceSpy },
        { provide: BuildingHService, useValue: buildingHServiceSpy }
      ]
    });
    floorService = TestBed.inject(FloorService);
    floorService.get.and.returnValue(of(JSON.parse(JSON.stringify(floor1Mock))));
    buildingHService = TestBed.inject(BuildingHService);
    service = TestBed.inject(FloorHService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should make one request to API when requested same item multiple times', () => {
    service.set(1);
    service.set(1);
    service.set(1);
    service.data$.subscribe(res => {
      expect(res).toEqual(floor1Mock.data);
    });
    service.set(1);
    expect(floorService.get).toHaveBeenCalledTimes(1);
  });

  it('should make two requests to API when requested two different items', () => {
    service.set(1);
    service.data$
      .pipe(first())
      .subscribe(res => {
        expect(res).toEqual(floor1Mock.data);
      });

    floorService.get.and.returnValue(of(JSON.parse(JSON.stringify(floor2Mock))));
    service.set(2);
    service.data$.subscribe(res => {
      expect(res).toEqual(floor2Mock.data);
    });
    expect(floorService.get).toHaveBeenCalledTimes(2);
  });

  it('should make two requests to API when requested multiple times in a row for two different items', () => {
    service.set(1);
    service.data$
      .pipe(first())
      .subscribe(res => {
        expect(res).toEqual(floor1Mock.data);
      });
    service.set(1);
    service.data$
      .pipe(first())
      .subscribe(res => {
        expect(res).toEqual(floor1Mock.data);
      });
    floorService.get.and.returnValue(of(JSON.parse(JSON.stringify(floor2Mock))));
    service.set(2);
    service.set(2);
    service.data$
      .pipe(first())
      .subscribe(res => {
        expect(res).toEqual(floor2Mock.data);
      });
    expect(floorService.get).toHaveBeenCalledTimes(2);
  });
});
