import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppModule } from '../../app.module';
import { FloorService } from '../floor.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FloorListComponent } from './floor-list.component';
import { GlobalService } from '../../globalService/global.service';

const floorUnit = {
  id: 1,
  name: 'flu 1',
  unit_no: 1,
  unit_type_id: 1,
  pos: {
    x: 111,
    y: 122
  }
};

const floorUnit1 = {
  id: 2,
  name: 'flu 2',
  unit_no: 2,
  unit_type_id: 1,
  pos: {
    x: 122,
    y: 133
  }
};

const mockBuilding = {
  data: {
    id: 1,
    name: 'Building1',
    client_id: 1,
    site_id: 1
  }
};

const mockFloors = {
  data: [
    // tslint:disable-next-line: max-line-length
    { id: 1, floor_no: 1, access_level: 1111, building_id: 1, name: 'Floor1', floor_layout_fileid: 1, floor_layout_id: 1, units: [floorUnit, floorUnit1] },
    // tslint:disable-next-line: max-line-length
    { id: 2, floor_no: 2, access_level: 2222, building_id: 1, name: 'Floor2', floor_layout_fileid: 1, floor_layout_id: 1, units: [floorUnit, floorUnit1] },
  ]
};

class GlobalServiceMock {
  building = {
    data$: of(mockBuilding),
    set() { }
  };
}

describe('FloorComponent', () => {
  let component: FloorListComponent;
  let fixture: ComponentFixture<FloorListComponent>;
  let floorsListSpy: any;
  let floorService: any;

  beforeEach(async(() => {
    floorsListSpy = jasmine.createSpyObj('FloorService', ['getList']);

    TestBed.configureTestingModule({
      declarations: [FloorListComponent],
      imports: [
        AppModule
      ],
      providers: [
        { provide: GlobalService, useClass: GlobalServiceMock },
        { provide: FloorService, useValue: floorsListSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 1, }, }, }, },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    floorService = TestBed.inject(FloorService);
    floorsListSpy.getList.and.returnValue(of(mockFloors));
    fixture = TestBed.createComponent(FloorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Initally Should display 2 floors', () => {
    expect(component.floors.data.length).toEqual(2);
  });

  it('On click, dialog should be called', fakeAsync(() => {
    spyOn(component, 'openDialog');
    const button = fixture.debugElement.nativeElement.querySelector('button');

    button.click();
    tick();
    fixture.detectChanges();

    expect(component.openDialog).toHaveBeenCalledTimes(1);
  }));
});
