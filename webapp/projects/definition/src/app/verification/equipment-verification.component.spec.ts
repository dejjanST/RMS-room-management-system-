import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
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
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { of } from 'rxjs';
import { BrowserModule, By } from '@angular/platform-browser';
import { LoaderModule } from 'projects/shared/src/app/modules/loader/loader.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguagesModule } from 'projects/shared/src/app/languages/languages.module';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EquipmentVerificationComponent } from './equipment-verification.component';
import { EquipmentVerificationService } from './equipment-verification.service';
import { EquipmentItemComponent } from './equipment-item/equipment-item.component';
import { GlobalService } from '../globalService/global.service';

const site = {
  data: {
    id: 1,
    name: 'siteName',
    client_id: 1,
    site_id: '1232',
    country: 'Macedonia',
    city: 'Skopje',
    address: 'Filip Vtori'
  }
};

const user = {
  company: {
    id: 123,
    name: 'User1'
  }
};

const unit = {
  data:
    { id: 5, name: '5', floor_id: 1, deleted: false, floor_layout_has_utd: 5, unit_no: 5, stage: 2, updated: 1600174207 }
};

class GlobalServiceMock {
  site = {
    data$: of(site.data),
    set() { },
    service: {
      updated$: of()
    }
  };
  building = {
    data$: of(),
    set() { },
    service: {
      updated$: of()
    }
  };
  unit = {
    data$: of(unit.data),
    set() { }
  };
  user$ = of(user);
}

describe('EquipmentVerificationComponent', () => {
  let component: EquipmentVerificationComponent;
  let fixture: ComponentFixture<EquipmentVerificationComponent>;
  let verificationService: any;

  beforeEach(async(() => {
    const equipmentVerificationServiceMock = jasmine.createSpyObj(
      'EquipmentVerificationService', ['verifyEqpt', 'getEqptsByUnit', 'getUnitDetails']
    );
    TestBed.configureTestingModule({
      declarations: [EquipmentVerificationComponent, EquipmentItemComponent],
      imports: [
        BrowserModule,
        FormsModule,
        LoaderModule,
        CommonModule,
        HttpClientModule,
        BrowserAnimationsModule,
        LanguagesModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule,
        MatTableModule,
        MatSidenavModule,
        MatSelectModule,
        MatDialogModule,
        MatTabsModule,
        MatRadioModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatChipsModule,
        MatIconModule,
        MatProgressBarModule,
        MatPaginatorModule,
        ClipboardModule,
        DragDropModule,
      ],
      providers: [
        { provide: GlobalService, useClass: GlobalServiceMock },
        { provide: EquipmentVerificationService, useValue: equipmentVerificationServiceMock },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: convertToParamMap({ unitId: 1 })
            }
          }
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    verificationService = TestBed.inject(EquipmentVerificationService);
    verificationService.getUnitDetails.and.returnValue(of({
      data:
        { id: 41, name: 'room 201', unit_no: 201, floor: { id: 9 }, floor_layout_has_utd: { id: 6 }, updated: 1597918433, deleted: false }
    }));
    verificationService.verifyEqpt.and.returnValue(of({ msg: 'Checklist created' }));
    verificationService.getEqptsByUnit.and.returnValue(of({
      data: [
        {
          utd_has_equipment: 8, category: 'FCU', equipment_type: 'CONTROL ITEM', model: 'FCU2P - HHV0T',
          description: '2 Pipes, High Voltage speed control, High Voltage Valve', status: 2, note: null
        },
        {
          utd_has_equipment: 9, category: 'Water Supply HW', equipment_type: 'CONTROL ITEM', model: 'HW - HV',
          description: 'Hot Water - High Voltage Valve', status: 3, note: null
        },
        {
          utd_has_equipment: 10, category: 'Floor Heating', equipment_type: 'CONTROL ITEM', model: 'FH - HV',
          description: 'Floor Heating - High Voltage Valve', status: 4, note: null
        },
        {
          utd_has_equipment: 11, category: 'Room Aggregate Power', equipment_type: 'CONTROL ITEM', model: 'RAP - LV',
          description: 'Room Aggregate Power - Low Voltage Contactor', status: 1, note: null
        },
        {
          utd_has_equipment: 12, category: 'Welcome Light', equipment_type: 'CONTROL ITEM', model: 'LGH - WL',
          description: 'Welcome Light', status: 1, note: 'Test'
        },
        {
          utd_has_equipment: 13, category: 'Windows', equipment_type: 'ADDITIONAL ITEM', model: 'WS - AI',
          description: 'Windows Additional Item', status: 1, note: null
        }]
    }));
    fixture = TestBed.createComponent(EquipmentVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have 6 instance of EquipmentItemComponent', () => {
    const childs = fixture.debugElement.queryAll(By.css('app-equipment-item'));
    expect(childs.length).toEqual(6);
  });

});
