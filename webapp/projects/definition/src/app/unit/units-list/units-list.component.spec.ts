import { async, ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { UnitsListComponent } from './units-list.component';
import { AppModule } from '../../app.module';
import { ActivatedRoute } from '@angular/router';
import { UnitService } from '../unit-service.service';
import { of } from 'rxjs';
import { GlobalService } from '../../globalService/global.service';
import { MatPaginator } from '@angular/material/paginator';

const mockBuildingWithImg = {
  data: {
    id: 1,
    name: 'Building1',
    client_id: 1,
    site_id: 1,
    file_id: 2
  }
};


const mockUnits = {
  data: [
    { f_name: 'Prizemje', f_number: 0, u_name: '1', u_number: 1 },
    { f_name: 'Prizemje', f_number: 0, u_name: '2', u_number: 2 },
    { f_name: 'Prizemje', f_number: 0, u_name: '3', u_number: 3 },
    { f_name: 'Prizemje', f_number: 0, u_name: '4', u_number: 4 },
    { f_name: 'Prv sprat', f_number: 1, u_name: '1', u_number: 101 },
    { f_name: 'Prv sprat', f_number: 1, u_name: '2', u_number: 102 },
    { f_name: 'Prv sprat', f_number: 1, u_name: '3', u_number: 103 },
    { f_name: 'Prv sprat', f_number: 1, u_name: '4', u_number: 104 },
    { f_name: '2', f_number: 2, u_name: 'Soba 201', u_number: 201 },
    { f_name: '2', f_number: 2, u_name: 'Soba 202', u_number: 202 }
  ],
  meta: {
    total: 208,
    page: 1,
    per_page: 10,
    total_pages: 21
  }
};

const mockEquipmentList = {
  data: [
    // tslint:disable-next-line: max-line-length
    { id: 1, category: 'MC', model: 'RC', equipment_type: 'MC CONTROLLER', hv: 12, av: 4, description: 'Room Controller', di: 0, lv: 8, ro: 2, ti: 21, updated: 1597321261 },
    // tslint:disable-next-line: max-line-length
    { id: 2, category: 'MC', model: 'CC', equipment_type: 'MC CONTROLLER', hv: 12, av: 4, description: 'Corridor Controller', di: 0, lv: 8, ro: 2, ti: 21, updated: 1597321261 },
    // tslint:disable-next-line: max-line-length
    { id: 3, category: 'MC', model: 'AC', equipment_type: 'MC CONTROLLER', hv: 12, av: 0, description: 'Access Controller', di: 0, lv: 1, ro: 0, ti: 0, updated: 1597321261 },
    // tslint:disable-next-line: max-line-length
    { id: 4, category: 'Room Wall Unit', model: 'RWU', equipment_type: 'CONTROLLER', hv: 0, av: 0, description: 'Room Wall Unit', di: 0, lv: 0, ro: 0, ti: 0, updated: 1597321261 }
  ]
};

class GlobalServiceMock {
  building = {
    data$: of(mockBuildingWithImg),
    set() { }
  };
}

describe('UnitsListComponent', () => {
  let component: UnitsListComponent;
  let unitService: any;
  let unitListSpy: any;
  let fixture: ComponentFixture<UnitsListComponent>;

  beforeEach(async(() => {
    unitListSpy = jasmine.createSpyObj('UnitService', ['getList', 'getEquipmentList']);

    TestBed.configureTestingModule({
      declarations: [UnitsListComponent],
      imports: [
        AppModule
      ],
      providers: [
        { provide: UnitService, useValue: unitListSpy },
        { provide: GlobalService, useClass: GlobalServiceMock },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 1, }, }, }, },
        MatPaginator
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    unitService = TestBed.inject(UnitService);
    unitListSpy.getList.and.returnValue(of(mockUnits));
    unitListSpy.getEquipmentList.and.returnValue(of(mockUnits));
    fixture = TestBed.createComponent(UnitsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test units table', () => {
    // number of records dispalyed should be 10
    const tableRows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(tableRows.length).toBe(10);

    // test values in first row
    const firstRow = tableRows[0];
    expect(firstRow.cells[0].innerHTML).toContain('1');
    expect(firstRow.cells[1].innerHTML).toContain('1');
    expect(firstRow.cells[2].innerHTML).toContain('Prizemje');
    expect(firstRow.cells[3].innerHTML).toContain('0');
  });
});
