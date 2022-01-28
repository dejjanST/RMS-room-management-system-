import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatExpansionModule } from '@angular/material/expansion';
import { ControllersComponent } from './controllers.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { FormControllerComponent } from '../form-controller/form-controller.component';
import { LanguagesModule } from 'projects/shared/src/app/languages/languages.module';
import { MatFormFieldModule } from '@angular/material/form-field';
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
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { RouterTestingModule } from '@angular/router/testing';
import { MasterService } from '../master.service';
import { GlobalService } from '../../globalService/global.service';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { ConfirmDialogService } from 'projects/shared/src/app/components/dialogs/confirm-dialog/confirm-dialog.service';

const buidlingMock = {
  data: {
    id: 2,
    name: 'Building 2',
    site_id: 1,
    client_id: 1,
    desc: 'description for north wing',
    file_id: 7,
    site_name: 'Hilton Skopje',
    client_name: 'Mario Maksimovic',
    client_code: 11,
    site_code: 1100
  }
};


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
    set() { }
  };
  user$ = of(user);
}

const allControllersMock = {
  data: [
    {
      device_type: 1, category: 'MC', equipment_type: 'MC CONTROLLER', model: 'RC',
      description: 'Room Controller', quantity: 1
    }, {
      device_type: 4,
      category: 'Room Wall Unit', equipment_type: 'CONTROLLER', model: 'RWU',
      description: 'Room Wall Unit', quantity: 3
    }, {
      device_type: 5,
      category: 'Front Door Wall Unit', equipment_type: 'CONTROLLER',
      model: 'FDWU', description: 'Front Door Wall Unit', quantity: 1
    }]
};

const assocControllersMock = {
  data: [
    {
      device_type: 1, id: 24, serial_no: '85BN7AUZG4WE7FBQR74E',
      equipment_type: 'MC CONTROLLER', description: 'Room Controller',
      model: 'RC', position: 1
    }, {
      device_type: 4, id: 17,
      serial_no: '285V22U7WJRAM5RFM2AK', equipment_type: 'CONTROLLER',
      description: 'Room Wall Unit', model: 'RWU', position: 0
    },
    {
      device_type: 4, id: 18, serial_no: 'CY7EHUEPQMBAXQ4HGM83',
      equipment_type: 'CONTROLLER', description: 'Room Wall Unit',
      model: 'RWU', position: 1
    }, {
      device_type: 4, id: 19,
      serial_no: '57E4JKFX4U75AR4VRB8J', equipment_type: 'CONTROLLER',
      description: 'Room Wall Unit', model: 'RWU', position: 2
    },
    {
      device_type: 5, id: 20, serial_no: 'MEJBPFU8HH3DAJM2WPPA',
      equipment_type: 'CONTROLLER', description: 'Front Door Wall Unit',
      model: 'FDWU', position: 3
    }]
};


describe('ControllersComponent', () => {
  let component: ControllersComponent;
  let fixture: ComponentFixture<ControllersComponent>;
  let masterService: any;

  beforeEach(async(() => {
    const masterServiceSpy = jasmine.createSpyObj(
      'MasterService', ['setMasterController', 'getAllControllers', 'getAssociatedControllers']
    );
    const confirmDialogServiceSpy = jasmine.createSpyObj('ConfirmDialogService', ['open', 'close']);
    TestBed.configureTestingModule({
      imports: [
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
        MatProgressBarModule,
        MatPaginatorModule,
        MatListModule,
        RouterTestingModule
      ],
      declarations: [ControllersComponent, FormControllerComponent],
      providers: [
        { provide: MasterService, useValue: masterServiceSpy },
        { provide: GlobalService, useClass: GlobalServiceMock },
        { provide: ConfirmDialogService, useValue: confirmDialogServiceSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 1, }, }, }, },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    masterService = TestBed.inject(MasterService);
    masterService.setMasterController.and.returnValue(of({ msg: 'success' }));
    masterService.getAllControllers.and.returnValue(of(allControllersMock));
    masterService.getAssociatedControllers.and.returnValue(of(assocControllersMock));
    fixture = TestBed.createComponent(ControllersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have four instance of child component (app-form-controller)', () => {
    const childs = fixture.debugElement.queryAll(By.css('app-form-controller'));

    expect(childs.length).toEqual(4);

  });


});
