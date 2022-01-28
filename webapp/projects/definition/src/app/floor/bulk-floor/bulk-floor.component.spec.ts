import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BulkFloorComponent } from './bulk-floor.component';
import { Component, DebugElement } from '@angular/core';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguagesModule } from 'projects/shared/src/app/languages/languages.module';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { GlobalService } from '../../globalService/global.service';
import { FloorLayoutService } from '../../floorLayout/floor-layout.service';
import { FloorService } from '../floor.service';
import { ActivatedRoute } from '@angular/router';
import { FloorLayoutsBySideList } from '../../floorLayout/floor-layout.model';
import { By } from '@angular/platform-browser';


const mockBuildingWithImg = {
  data: {
    id: 1,
    name: 'Building1',
    client_id: 1,
    site_id: 1,
    file_id: 2
  }
};

const mockFloorLayoutList: FloorLayoutsBySideList = {
  data: [
    { id: 1, name: 'Fld 1', locked: true, file_id: 1, site_id: 1 },
    { id: 2, name: 'Fld 111', locked: true, file_id: 5, site_id: 1 },
    { id: 3, name: 'Fld 222', locked: false, file_id: 6, site_id: 1 }
  ]
};

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

@Component({
  template: ''
})
class DummyComponent {
}


class GlobalServiceMock {
  building = {
    data$: of(mockBuildingWithImg),
    set() { }
  };
}

describe('BulkFloorComponent - Create Floor', () => {
  let component: BulkFloorComponent;
  let fixture: ComponentFixture<BulkFloorComponent>;
  let floorLayoutService: any;
  let floorService: any;
  let compiled: any;

  beforeEach(async(() => {
    const floorLayoutSpy = jasmine.createSpyObj('FloorLayoutService', ['getFloorLayoutsBySiteList', 'getFloorLayout']);
    const floorSpy = jasmine.createSpyObj('FloorService', ['createBulk']);

    TestBed.configureTestingModule({
      declarations: [ BulkFloorComponent ],
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatAutocompleteModule,
        MatButtonModule,
        HttpClientModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule,
        MatTableModule,
        MatSidenavModule,
        CommonModule,
        BrowserAnimationsModule,
        LanguagesModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatDialogModule,
        MatTabsModule,
        MatRadioModule,
        MatCheckboxModule,
        DragDropModule,
        MatExpansionModule,
        MatChipsModule,
        MatIconModule,
        MatToolbarModule,
        RouterTestingModule.withRoutes([
          { path: 'buildings/:id/floors', component: DummyComponent }
        ])
      ],
      providers: [
        { provide: GlobalService, useClass: GlobalServiceMock },
        { provide: FloorLayoutService, useValue: floorLayoutSpy },
        { provide: FloorService, useValue: floorSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 0, }, }, }, },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    floorLayoutService = TestBed.inject(FloorLayoutService);
    floorService = TestBed.inject(FloorService);
    floorLayoutService.getFloorLayoutsBySiteList.and.returnValue(of(mockFloorLayoutList));
    floorService.createBulk.and.returnValue(of({ msg: 'success' }));

    fixture = TestBed.createComponent(BulkFloorComponent);
    component = fixture.componentInstance;
    component.floorLayoutList = mockFloorLayoutList;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('After select Floor Layout, number of units should be 2', () => {
    const mockFloorLayout = {
      data: {
        id: 1,
        name: 'FLD 1',
        site: 1,
        units: [
          {
            id: 1,
            unit_no: 1,
            pos: {
              x: 81,
              y: 51
            }
          },
          {
            id: 2,
            unit_no: 2,
            pos: {
              x: 201,
              y: 64
            }
          }
        ]
      }
    };

    floorLayoutService.getFloorLayout.and.returnValue(of(mockFloorLayout));
    const device = {
      value: 1
    };
    component.floorSelected(device);
    expect(component.floorLayoutUnits.length).toEqual(2);
  });

  it('Floor Layout select validation from Bulk Floor', () => {
    const floorLayout = component.formBulk.controls.floorLayout;
    floorLayout.setValue('');
    expect(floorLayout.hasError('required')).toBeTruthy();
    expect(floorLayout.valid).toBeFalsy();

    floorLayout.setValue(1);
    expect(floorLayout.hasError('required')).toBeFalsy();
    expect(floorLayout.valid).toBeTruthy();
  });


  it('From Floor field validation', () => {
    const fromFloor = component.formBulk.controls.fromNumber;
    fromFloor.setValue('');
    expect(fromFloor.hasError('required')).toBeTruthy();
    expect(fromFloor.valid).toBeFalsy();

    fromFloor.setValue(4);
    expect(fromFloor.hasError('required')).toBeFalsy();
    expect(fromFloor.hasError('pattern')).toBeFalsy();
    expect(fromFloor.valid).toBeTruthy();
  });


  it('To Floor field validation', () => {
    const fromFloor = component.formBulk.controls.toNumber;
    fromFloor.setValue('');
    expect(fromFloor.hasError('required')).toBeTruthy();
    expect(fromFloor.valid).toBeFalsy();

    fromFloor.setValue(14);
    expect(fromFloor.hasError('required')).toBeFalsy();
    expect(fromFloor.hasError('pattern')).toBeFalsy();
    expect(fromFloor.valid).toBeTruthy();
  });

  it('bulk form is invalid, submit button is disabled', () => {
    component.formBulk.controls.floorLayout.setValue('');
    component.formBulk.controls.prefix.setValue('');
    component.formBulk.controls.fromNumber.setValue('');
    component.formBulk.controls.toNumber.setValue('');
    fixture.detectChanges();
    const submitBtn: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(submitBtn.nativeElement.disabled).toBe(true);
  });
});


