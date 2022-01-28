import { TestBed } from '@angular/core/testing';
import { GlobalService } from './global.service';
import { ClientHService } from '../client/client-h.service';
import { BuildingHService } from '../building/building-h.service';
import { SiteHService } from '../site/site-h.service';
import { FloorHService } from '../floor/floor-h.service';
import { UnitHService } from '../unit/unit-h.service';

class ClientHServiceMock { }
class SiteHServiceMock { }
class BuildingHServiceMock { }
class FloorHServiceMock { }
class UnitHServiceMock { }

describe('GlobalService', () => {
  let service: GlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ClientHService, useClass: ClientHServiceMock },
        { provide: SiteHService, useClass: SiteHServiceMock },
        { provide: BuildingHService, useClass: BuildingHServiceMock },
        { provide: FloorHService, useClass: FloorHServiceMock },
        { provide: UnitHService, useClass: UnitHServiceMock }
      ]
    });
    service = TestBed.inject(GlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
