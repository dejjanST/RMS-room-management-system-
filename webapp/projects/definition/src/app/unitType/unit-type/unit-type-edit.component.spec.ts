import { async, ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { UnitTypeComponent } from './unit-type.component';
import { DebugElement, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UnitTypeService } from '../unit-type.service';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { Location, CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { ByKeyValuePipe } from 'projects/shared/src/app/pipes/by-key-value.pipe';
import { SumByKeyPipe } from 'projects/shared/src/app/pipes/sum-by-key.pipe';
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
import { DistinctPipe } from 'projects/shared/src/app/pipes/distinct.pipe';
import { ByRegexPipe } from 'projects/shared/src/app/pipes/by-regex.pipe';
import { unitType17 } from './unit-type-mock';
import { ActivatedRoute } from '@angular/router';
import { eqptList } from './equipment-list-mock';
import { TrimPipe } from 'projects/shared/src/app/pipes/trim.pipe';
@Component({
    template: ''
})
class DummyComponent {
}

describe('UnitTypeComponent Edit Form', () => {
    let component: UnitTypeComponent;
    let fixture: ComponentFixture<UnitTypeComponent>;
    let unitTypeService: any;
    let location: Location;
    let equipmentList: any;

    beforeEach(async(() => {
        const unitTypeServiceSpy = jasmine.createSpyObj('UnitTypeService',
            ['getEquipmentList', 'editUnitType', 'createUnitType', 'getUnitType']);
        TestBed.configureTestingModule({
            declarations: [
                UnitTypeComponent,
                DummyComponent,
                ByKeyValuePipe,
                DistinctPipe,
                SumByKeyPipe,
                ByRegexPipe,
                TrimPipe
            ],
            imports: [
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
                    { path: 'units', component: DummyComponent },
                ])
            ],
            providers: [
                ByKeyValuePipe,
                SumByKeyPipe,
                { provide: UnitTypeService, useValue: unitTypeServiceSpy },
                { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 17, }, }, }, },
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        equipmentList = JSON.parse(JSON.stringify(eqptList));
        unitTypeService = TestBed.inject(UnitTypeService);
        unitTypeService.getEquipmentList.and.returnValue(of(equipmentList));
        unitTypeService.editUnitType.and.returnValue(of({ msg: 'Successfully edited unit type' }));
        location = TestBed.inject(Location);
        unitTypeService.getUnitType.withArgs(17).and.returnValue(of(unitType17));
        fixture = TestBed.createComponent(UnitTypeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });


    it('should create', () => {
        expect(component).toBeTruthy();
    });



    it('should fill edit form and call editUnitType method on submit button', fakeAsync(() => {

        expect(unitTypeService.getUnitType).toHaveBeenCalledWith(component.editId);

        const submitBtn: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'));
        expect(submitBtn.nativeElement.disabled).toBeFalsy();
        submitBtn.nativeElement.click();

        fixture.detectChanges();
        flush();
        expect(unitTypeService.createUnitType).not.toHaveBeenCalled();
        expect(unitTypeService.editUnitType).toHaveBeenCalledTimes(1);
    }));



    it('if filled form is emptied, update button should be disabled', fakeAsync(() => {
        expect(unitTypeService.getUnitType).toHaveBeenCalledWith(component.editId);

        const submitBtn: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'));
        expect(submitBtn.nativeElement.disabled).toBeFalsy();

        // making form to be invalid
        component.form.controls.mcControl.setValue('');
        component.form.controls.name.setValue('');
        component.form.controls.rooms.setValue('');
        component.form.controls.description.setValue('');
        component.form.controls.locked.setValue('');
        fixture.detectChanges();
        flush();
        expect(submitBtn.nativeElement.disabled).toBeTruthy();
    }));


});
