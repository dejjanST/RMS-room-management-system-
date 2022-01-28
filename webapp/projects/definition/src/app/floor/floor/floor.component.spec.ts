import { async, ComponentFixture, TestBed, flush, tick } from '@angular/core/testing';
import { FloorComponent } from './floor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
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
import { RouterTestingModule } from '@angular/router/testing';
import { FloorLayoutService } from '../../floorLayout/floor-layout.service';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { FloorService } from '../floor.service';
import { GlobalService } from '../../globalService/global.service';
import { BulkFloorComponent } from '../bulk-floor/bulk-floor.component';
import { CreateFloorComponent } from '../create-floor/create-floor.component';


const mockBuildingWithImg = {
  data: {
    id: 1,
    name: 'Building1',
    client_id: 1,
    site_id: 1,
    file_id: 2
  }
};

const mockFloorLayoutList = {
  data: [
    {
      id: 1,
      name: 'FLD 1',
      file_id: 4,
      site_id: 1
    },
    {
      id: 2,
      name: 'FLD 2',
      file_id: 5,
      site_id: 1
    }
  ]
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

describe('FloorComponent - Create Floor', () => {
  let component: FloorComponent;
  let fixture: ComponentFixture<FloorComponent>;
  let floorLayoutService: any;
  let floorService: any;
  let compiled: any;

  beforeEach(async(() => {
    const floorLayoutSpy = jasmine.createSpyObj('FloorLayoutService', ['getFloorLayoutsBySiteList', 'getFloorLayout']);

    TestBed.configureTestingModule({
      declarations: [FloorComponent, BulkFloorComponent, CreateFloorComponent],
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
        { provide: FloorLayoutService, useValue: floorLayoutSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    floorLayoutService = TestBed.inject(FloorLayoutService);
    floorService = TestBed.inject(FloorService);
    floorLayoutService.getFloorLayoutsBySiteList.and.returnValue(of(mockFloorLayoutList));
    fixture = TestBed.createComponent(FloorComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.floorLayoutList.data.length).toBeGreaterThan(0);
  });

});



