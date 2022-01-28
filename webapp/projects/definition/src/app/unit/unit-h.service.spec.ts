import { TestBed } from '@angular/core/testing';
import { UnitHService } from './unit-h.service';
import { UnitService } from './unit-service.service';
import { FloorHService } from '../floor/floor-h.service';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';
import { ResponseUnit } from './unit';

const unit1: ResponseUnit = {
  data: {
    id: 1, name: 'Unit 1', floor_id: 2, deleted: false,
    floor_layout_has_utd: 6, unit_no: 1, stage: 2, updated: 1599048169
  }
};

const unit2: ResponseUnit = {
  data: {
    id: 2, name: 'Unit 12', floor_id: 2, deleted: false,
    floor_layout_has_utd: 6, unit_no: 1, stage: 2, updated: 1599048170
  }
};

describe('UnitHService', () => {
  let unitService: any;
  let floorHService: any;
  let service: UnitHService;

  beforeEach(() => {
    const unitServiceSpy = jasmine.createSpyObj('UnitService', ['get'], { updated$: of() });
    const floorHServiceSpy = jasmine.createSpyObj('FloorHService', ['set']);
    TestBed.configureTestingModule({
      providers: [
        { provide: UnitService, useValue: unitServiceSpy },
        { provide: FloorHService, useValue: floorHServiceSpy }
      ]
    });
    unitService = TestBed.inject(UnitService);
    unitService.get.and.returnValue(of(JSON.parse(JSON.stringify(unit1))));
    floorHService = TestBed.inject(FloorHService);
    service = TestBed.inject(UnitHService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make one request to API when requested same item multiple times', () => {
    service.set(1);
    service.set(1);
    service.set(1);
    service.data$.subscribe(res => {
      expect(res).toEqual(unit1.data);
    });
    service.set(1);
    expect(unitService.get).toHaveBeenCalledTimes(1);
  });

  it('should make two requests to API when requested two different items', () => {
    service.set(1);
    service.data$
      .pipe(first())
      .subscribe(res => {
        expect(res).toEqual(unit1.data);
      });

    unitService.get.and.returnValue(of(JSON.parse(JSON.stringify(unit2))));
    service.set(2);
    service.data$.subscribe(res => {
      expect(res).toEqual(unit2.data);
    });
    expect(unitService.get).toHaveBeenCalledTimes(2);
  });

  it('should make two requests to API when requested multiple times in a row for two different items', () => {
    service.set(1);
    service.data$
      .pipe(first())
      .subscribe(res => {
        expect(res).toEqual(unit1.data);
      });
    service.set(1);
    service.data$
      .pipe(first())
      .subscribe(res => {
        expect(res).toEqual(unit1.data);
      });
    unitService.get.and.returnValue(of(JSON.parse(JSON.stringify(unit2))));
    service.set(2);
    service.set(2);
    service.data$
      .pipe(first())
      .subscribe(res => {
        expect(res).toEqual(unit2.data);
      });
    expect(unitService.get).toHaveBeenCalledTimes(2);
  });
});
