import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { FloorLayoutComponent } from './floor-layout.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule, Location } from '@angular/common';
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
import { Component } from '@angular/core';
import { UnitTypeService } from '../../unitType/unit-type.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { FileUploadService } from 'projects/shared/src/app/services/file-upload.service';
import { FloorLayoutService } from '../floor-layout.service';
import { listUnitTypesMock, imageUploadMock } from './floor-layout-mock';

@Component({
  template: ''
})
class DummyComponent {
}

describe('FloorLayoutComponent Create', () => {
  let component: FloorLayoutComponent;
  let fixture: ComponentFixture<FloorLayoutComponent>;
  let location: Location;
  let floorLayoutService: any;
  let unitTypeSerice: any;
  let fileUploadService: any;

  beforeEach(async(() => {
    const floorLayoutServiceSpy = jasmine.createSpyObj('FloorLayoutService', ['editFloorLayout', 'createFloorLayout']);
    const unitTypeServiceSpy = jasmine.createSpyObj('UnitTypeService', ['getListAcceptedBySite']);
    const fileUploadServiceSpy = jasmine.createSpyObj('FileUploadService', ['upload']);
    TestBed.configureTestingModule({
      declarations: [FloorLayoutComponent, DummyComponent],
      imports: [
        BrowserModule,
        FormsModule,
        MatToolbarModule,
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
        RouterTestingModule.withRoutes([
          {
            path: 'sites/:siteId/fld/edit/:floorLayoutId',
            component: DummyComponent
          },
        ])
      ],
      providers: [
        { provide: FloorLayoutService, useValue: floorLayoutServiceSpy },
        { provide: UnitTypeService, useValue: unitTypeServiceSpy },
        { provide: FileUploadService, useValue: fileUploadServiceSpy },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: convertToParamMap({ siteId: 1 })
            }
          }
        }

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    floorLayoutService = TestBed.inject(FloorLayoutService);
    floorLayoutService.createFloorLayout.and.returnValue(of({ msg: 'The floor type has been created successfully', data: { id: 1 } }));
    unitTypeSerice = TestBed.inject(UnitTypeService);
    unitTypeSerice.getListAcceptedBySite.and.returnValue(of(JSON.parse(JSON.stringify(listUnitTypesMock))));
    fileUploadService = TestBed.inject(FileUploadService);
    fileUploadService.upload.and.returnValue(of(JSON.parse(JSON.stringify(imageUploadMock))));
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(FloorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 unitType buttons', () => {
    const unitTypeBtns = fixture.debugElement.queryAll(By.css('.utBtns'));
    expect(unitTypeBtns.length).toEqual(6);
  });

  it('testing create form validation, add unit Type as widget and create method to be called on submit valid form', fakeAsync(() => {
    // submit button should be disabled
    let submitBtn = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(submitBtn.nativeElement.disabled).toBeTruthy();

    // after click on unitType widget should appear above picture
    const ut1Btn = fixture.debugElement.query(By.css('#ut1Btn'));
    const ut2Btn = fixture.debugElement.query(By.css('#ut2Btn'));

    ut1Btn.nativeElement.click();

    fixture.detectChanges();

    // should have 1 widget
    let widgets = fixture.debugElement.queryAll(By.css('.widget'));
    expect(widgets.length).toEqual(1);


    // add same unitType should appear another widget and should have total 2 widgets
    ut1Btn.nativeElement.click();
    fixture.detectChanges();
    widgets = fixture.debugElement.queryAll(By.css('.widget'));
    expect(widgets.length).toEqual(2);

    // add another unitType should appear another widget and should have total 3 widgets
    ut2Btn.nativeElement.click();
    fixture.detectChanges();
    widgets = fixture.debugElement.queryAll(By.css('.widget'));
    expect(widgets.length).toEqual(3);

    // delete added widget
    const widget2DelBtn = fixture.debugElement.query(By.css('#widgetRC2DelBtn'));
    widget2DelBtn.nativeElement.click();
    const widget1DelBtn = fixture.debugElement.query(By.css('#widgetRC1DelBtn'));
    widget1DelBtn.nativeElement.click();
    fixture.detectChanges();

    // after delete 2 widgets should have total 1 widget
    widgets = fixture.debugElement.queryAll(By.css('.widget'));
    expect(widgets.length).toEqual(1);

    // filling rest of the form to be valid and submit
    component.form.get('fileId').setValue(2);
    component.form.get('name').setValue('Ground floor');

    fixture.detectChanges();

    // after valid form, submit button should be enabled
    submitBtn = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(submitBtn.nativeElement.disabled).toBeFalsy();

    // submit form
    submitBtn.nativeElement.click();
    fixture.detectChanges();
    flush();

    expect(floorLayoutService.editFloorLayout).not.toHaveBeenCalled();
    expect(floorLayoutService.createFloorLayout).toHaveBeenCalledTimes(1);

    // after success create should redirect to edit component
    expect(location.path()).toEqual('/sites/1/fld/edit/1');
  }));

});
