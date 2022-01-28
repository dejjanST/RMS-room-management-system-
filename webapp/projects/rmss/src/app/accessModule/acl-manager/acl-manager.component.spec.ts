import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { SSBuildingListMock } from '../../building/building-mock';
import { BuildingService } from '../../building/building.service';
import { SSFloorListMock } from '../../floor/floor-mock';
import { FloorService } from '../../floor/floor.service';
import { SSUnitListMock } from '../../unit/unit-mock';
import { UnitService } from '../../unit/unit.service';
import { AccessService } from '../access.service';
import { ACLListMock2 } from './access-list-mock';
import { AclManagerComponent } from './acl-manager.component';

describe('AclManagerComponent', () => {
  let component: AclManagerComponent;
  let fixture: ComponentFixture<AclManagerComponent>;
  let accessService: any;
  let buildingService: any;
  let floorService: any;
  let unitService: any;

  beforeEach(async(() => {
    const accessServiceSpy = jasmine.createSpyObj('AccessService',
      ['clearList', 'findGroups', 'addItem', 'removeItem']);
    const buildingServiceSpy = jasmine.createSpyObj('BuildingService', ['getList']);
    const floorServiceSpy = jasmine.createSpyObj('FloorService', ['getList']);
    const unitServiceSpy = jasmine.createSpyObj('UnitService', ['getList']);

    TestBed.configureTestingModule({
      declarations: [AclManagerComponent],
      imports: [
        MatListModule,
        MatCardModule,
        FormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        MatToolbarModule,
        MatTableModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule
      ],
      providers: [
        { provide: AccessService, useValue: accessServiceSpy },
        { provide: BuildingService, useValue: buildingServiceSpy },
        { provide: FloorService, useValue: floorServiceSpy },
        { provide: UnitService, useValue: unitServiceSpy },
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AclManagerComponent);
        component = fixture.componentInstance;
        component.selectAllBuidlings = false;
        accessService = TestBed.inject(AccessService);
        accessService.globalMergedACLList$ = of(JSON.parse(JSON.stringify(ACLListMock2)));
        buildingService = TestBed.inject(BuildingService);
        buildingService.getList.and.returnValue(of(SSBuildingListMock));
        floorService = TestBed.inject(FloorService);
        floorService.getList.and.returnValue(of(SSFloorListMock));
        unitService = TestBed.inject(UnitService);
        unitService.getList.and.returnValue(of(SSUnitListMock));
        fixture.detectChanges();
      });
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have table with 3 rows', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toEqual(3);

  });


  it('should click includeRule button and should call accessService.addItem()', () => {
    const includeBtn = fixture.debugElement.query(By.css('#includeRule'));
    includeBtn.nativeElement.click();
    fixture.detectChanges();

    // after adding rule, accessService.addItem() should be called
    expect(accessService.addItem).toHaveBeenCalledTimes(1);

  });

  it('should click excludeRule button and should call accessService.addItem()', () => {
    const excludeBtn = fixture.debugElement.query(By.css('#excludeRule'));
    excludeBtn.nativeElement.click();
    fixture.detectChanges();

    // after adding rule, accessService.addItem() should be called
    expect(accessService.addItem).toHaveBeenCalledTimes(1);

  });

  it('should click deleteRule button and should call accessService.accessService.removeItem()', () => {
    const deleteBtn = fixture.debugElement.query(By.css('#deleteACL1'));
    deleteBtn.nativeElement.click();
    fixture.detectChanges();

    // after adding rule, accessService.addItem() should be called
    expect(accessService.removeItem).toHaveBeenCalledTimes(1);

  });

  it('should select building and call floorService.getList().Then, on floor select, it should call unitService.getList()', () => {
    // First select a building to load floors
    const buildingSelect = fixture.debugElement.query(By.css('#buildingSelect'));
    buildingSelect.nativeElement.click();
    fixture.detectChanges();

    const buildingOption = fixture.debugElement.query(By.css('#optionB1'));
    buildingOption.nativeElement.click();
    fixture.detectChanges();

    expect(floorService.getList).toHaveBeenCalledTimes(1);
    // After buildings are selected floors are loaded and they can be selected
    const floorSelect = fixture.debugElement.query(By.css('#floorSelect'));
    floorSelect.nativeElement.click();
    fixture.detectChanges();

    const floorOption = fixture.debugElement.query(By.css('#optionF1'));
    floorOption.nativeElement.click();
    fixture.detectChanges();

    expect(unitService.getList).toHaveBeenCalledTimes(1);
  });



});
