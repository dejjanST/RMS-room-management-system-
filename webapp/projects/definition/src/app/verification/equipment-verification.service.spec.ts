import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RequestEquipment } from './equipment-verification.model';
import { EquipmentVerificationService } from './equipment-verification.service';

describe('EquipmentVerificationService', () => {
  let service: EquipmentVerificationService;
  let http: HttpTestingController;

  afterEach(() => {
    http.verify();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    http = TestBed.inject(HttpTestingController);
    service = TestBed.inject(EquipmentVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('testing getEqptsByUnit()', () => {
    service.getEqptsByUnit(3).subscribe(res => {
      expect(res).toBeTruthy();
    });
    const req = http.expectOne('/api/units/equipment/3');
    expect(req.request.method).toBe('GET');
    req.flush({
      data: [
        {
          utd_has_equipment: 8, category: 'FCU', equipment_type: 'CONTROL ITEM', model: 'FCU2P - HHV0T',
          description: '2 Pipes, High Voltage speed control, High Voltage Valve', status: null, note: null
        },
        {
          utd_has_equipment: 9, category: 'Water Supply HW', equipment_type: 'CONTROL ITEM', model: 'HW - HV',
          description: 'Hot Water - High Voltage Valve', status: null, note: null
        },
        {
          utd_has_equipment: 10, category: 'Floor Heating', equipment_type: 'CONTROL ITEM', model: 'FH - HV',
          description: 'Floor Heating - High Voltage Valve', status: null, note: null
        },
        {
          utd_has_equipment: 11, category: 'Room Aggregate Power', equipment_type: 'CONTROL ITEM', model: 'RAP - LV',
          description: 'Room Aggregate Power - Low Voltage Contactor', status: null, note: null
        },
        {
          utd_has_equipment: 12, category: 'Welcome Light', equipment_type: 'CONTROL ITEM', model: 'LGH - WL',
          description: 'Welcome Light', status: null, note: null
        },
        {
          utd_has_equipment: 13, category: 'Windows', equipment_type: 'ADDITIONAL ITEM', model: 'WS - AI',
          description: 'Windows Additional Item', status: null, note: null
        }]
    });

  });


  it('testing verifyEqpt()', () => {
    const eqpt = new RequestEquipment();
    eqpt.site_id = 1;
    eqpt.status = 2;
    eqpt.utd_has_equipment = 4;
    eqpt.note = 'Unit Testing.';

    service.verifyEqpt(23, eqpt).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = http.expectOne('/api/units/equipment/23');
    expect(req.request.method).toBe('POST');
    req.flush({ msg: 'Checklist created' });
  });

});
