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
import { editFloorLayoutMock, listUnitTypesMock, imageUploadMock } from './floor-layout-mock';

@Component({
    template: ''
})
class DummyComponent {
}

describe('FloorLayoutComponent Edit', () => {
    let component: FloorLayoutComponent;
    let fixture: ComponentFixture<FloorLayoutComponent>;
    let location: Location;
    let floorLayoutService: any;
    let unitTypeSerice: any;
    let fileUploadService: any;

    beforeEach(async(() => {
        const floorLayoutServiceSpy = jasmine.createSpyObj('FloorLayoutService',
            ['getFloorLayout', 'editFloorLayout', 'createFloorLayout']);
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
                            paramMap: convertToParamMap({ siteId: 1, floorLayoutId: 1 })
                        }
                    }
                }

            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        floorLayoutService = TestBed.inject(FloorLayoutService);
        floorLayoutService.getFloorLayout.and.returnValue(of(JSON.parse(JSON.stringify(editFloorLayoutMock))));
        floorLayoutService.editFloorLayout.and.returnValue(of({ msg: 'The floor layout has been updated successfully' }));
        unitTypeSerice = TestBed.inject(UnitTypeService);
        unitTypeSerice.getListAcceptedBySite.and.returnValue(of(JSON.parse(JSON.stringify(listUnitTypesMock))));
        fileUploadService = TestBed.inject(FileUploadService);
        fileUploadService.upload.and.returnValue(of(JSON.parse(JSON.stringify(imageUploadMock))));
        location = TestBed.inject(Location);
        fixture = TestBed.createComponent(FloorLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // Most of functionalities of Edit form are covered by Create form tests.
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('form should be filled', fakeAsync(() => {
        let submitBtn = fixture.debugElement.query(By.css('button[type=submit]'));

        // checking filled form
        expect(component.form.get('name').value).toEqual('Ground Floor');
        expect(component.form.get('fileId').value).toEqual('1');
        expect(component.form.get('RCUnitTypes').value[0].unitType.id).toEqual(2);
        expect(component.form.get('RCUnitTypes').value[0].unitType.name).toEqual('Unit Type 2');

        // should have 1 widget
        let widgets = fixture.debugElement.queryAll(By.css('.widget'));
        expect(widgets.length).toEqual(1);

        // edit form
        component.form.get('name').setValue('1 Floor');
        component.form.get('fileId').setValue(2);

        fixture.detectChanges();
        widgets = fixture.debugElement.queryAll(By.css('.widget'));
        expect(widgets.length).toEqual(1);

        const widget1Index = fixture.debugElement.query(By.css('#widgetRC0 .index'));
        widget1Index.nativeElement.value = 101;
        widget1Index.nativeElement.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        // after valid form, submit button should be enabled
        submitBtn = fixture.debugElement.query(By.css('button[type=submit]'));
        expect(submitBtn.nativeElement.disabled).toBeFalsy();

        submitBtn.nativeElement.click();
        fixture.detectChanges();
        flush();

        expect(floorLayoutService.createFloorLayout).not.toHaveBeenCalled();
        expect(floorLayoutService.editFloorLayout).toHaveBeenCalledTimes(1);
    }));

});
