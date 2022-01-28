import { async, ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { UnitTypeComponent } from './unit-type.component';
import { DebugElement, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UnitTypeService } from '../unit-type.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { eqptList } from './equipment-list-mock';
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
import { ActivatedRoute } from '@angular/router';
import { TrimPipe } from 'projects/shared/src/app/pipes/trim.pipe';


@Component({
  template: ''
})
class DummyComponent {
}
describe('UnitTypeComponent Create Form', () => {
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
          { path: 'units', component: DummyComponent }
        ])
      ],
      providers: [
        ByKeyValuePipe,
        SumByKeyPipe,
        { provide: UnitTypeService, useValue: unitTypeServiceSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 0, }, }, }, },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    equipmentList = JSON.parse(JSON.stringify(eqptList));
    unitTypeService = TestBed.inject(UnitTypeService);
    unitTypeService.getEquipmentList.and.returnValue(of(equipmentList));
    unitTypeService.createUnitType.and.returnValue(of({ msg: 'Successfully created unit type' }));
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(UnitTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('if form is invalid button should be disabled', fakeAsync(() => {
    // invalid form
    component.form.controls.mcControl.setValue('');
    component.form.controls.name.setValue('');
    component.form.controls.rooms.setValue('');
    component.form.controls.description.setValue('');
    component.form.controls.locked.setValue('');
    fixture.detectChanges();
    flush();
    const submitBtn: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(submitBtn.nativeElement.disabled).toBeTruthy();

    // invalid form
    component.form.controls.mcControl.setValue('');
    component.form.controls.name.setValue('1 bed room');
    component.form.controls.rooms.setValue(1);
    component.form.controls.description.setValue('');
    component.form.controls.locked.setValue(false);
    fixture.detectChanges();
    flush();
    expect(submitBtn.nativeElement.disabled).toBeTruthy();

    // valid form
    component.form.controls.mcControl.setValue(equipmentList.data[1]);
    component.form.controls.name.setValue('1 bed room');
    component.form.controls.rooms.setValue(1);
    component.form.controls.description.setValue('');
    component.form.controls.locked.setValue(false);
    fixture.detectChanges();
    flush();
    expect(submitBtn.nativeElement.disabled).toBeFalsy();
  }));

  it('submit valid form should call createUnitType method', fakeAsync(() => {
    component.form.controls.mcControl.setValue(equipmentList.data[0]);
    component.form.controls.name.setValue('1 bed room');
    component.form.controls.rooms.setValue(1);
    component.form.controls.description.setValue('');
    component.form.controls.locked.setValue(false);
    fixture.detectChanges();
    flush();

    const submitBtn: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(submitBtn.nativeElement.disabled).toBeFalsy();
    submitBtn.nativeElement.click();

    fixture.detectChanges();
    flush();
    expect(unitTypeService.createUnitType).toHaveBeenCalledTimes(1);
    expect(unitTypeService.editUnitType).not.toHaveBeenCalled();
    expect(location.path()).toEqual('/units');
  }));

  it('before select master controler all remaining terminals should be 0', fakeAsync(() => {
    const remainingHV = fixture.debugElement.query(By.css('#remainingHV'));
    const remainingAV = fixture.debugElement.query(By.css('#remainingAV'));
    const remainingLV = fixture.debugElement.query(By.css('#remainingLV'));
    const remainingRO = fixture.debugElement.query(By.css('#remainingRO'));
    const remainingTIDI = fixture.debugElement.query(By.css('#remainingTIDI'));
    fixture.detectChanges();
    tick(1000);

    expect(remainingHV.nativeElement.textContent).toEqual('0');
    expect(remainingAV.nativeElement.textContent).toEqual('0');
    expect(remainingLV.nativeElement.textContent).toEqual('0');
    expect(remainingRO.nativeElement.textContent).toEqual('0');
    expect(remainingTIDI.nativeElement.textContent).toEqual('0');
  }));

  it('testing table with remining IO terminals', fakeAsync(() => {
    const remainingHV = fixture.debugElement.query(By.css('#remainingHV'));
    const remainingAV = fixture.debugElement.query(By.css('#remainingAV'));
    const remainingLV = fixture.debugElement.query(By.css('#remainingLV'));
    const remainingRO = fixture.debugElement.query(By.css('#remainingRO'));
    const remainingTIDI = fixture.debugElement.query(By.css('#remainingTIDI'));

    // equipments should be disabled when have not available IO terminals
    const typeBtn = fixture.debugElement.query(By.css('#typeFCU'));
    typeBtn.nativeElement.click();
    fixture.detectChanges();
    tick(1000);
    const eq7 = fixture.debugElement.query(By.css('#eq7'));
    expect(eq7.nativeElement.disabled).toBeTruthy();

    const MCSelect = fixture.debugElement.query(By.css('#mcSelect')).nativeElement;
    MCSelect.click();
    fixture.detectChanges();
    tick(1000);
    const matOption = fixture.debugElement.query(By.css('#mcOption1')).nativeElement;
    matOption.click();
    fixture.detectChanges();
    tick(1000);

    // after select master controller remaining terminals should be equal as that controller
    expect(remainingHV.nativeElement.textContent).toEqual(equipmentList.data[0].hv.toString());
    expect(remainingAV.nativeElement.textContent).toEqual(equipmentList.data[0].av.toString());
    expect(remainingLV.nativeElement.textContent).toEqual(equipmentList.data[0].lv.toString());
    expect(remainingRO.nativeElement.textContent).toEqual(equipmentList.data[0].ro.toString());
    expect(remainingTIDI.nativeElement.textContent).toEqual((equipmentList.data[0].tidi).toString());

    // equipments should be enabled when have available IO terminals
    expect(eq7.nativeElement.disabled).toBeFalsy();


    // when select equipment remining IO terminals should be reduced
    eq7.nativeElement.click();
    fixture.detectChanges();
    tick(1000);
    expect(remainingHV.nativeElement.textContent).toEqual(((equipmentList.data[0].hv + equipmentList.data[6].hv).toString()));
    expect(remainingAV.nativeElement.textContent).toEqual(((equipmentList.data[0].av + equipmentList.data[6].av).toString()));
    expect(remainingLV.nativeElement.textContent).toEqual(((equipmentList.data[0].lv + equipmentList.data[6].lv).toString()));
    expect(remainingRO.nativeElement.textContent).toEqual(((equipmentList.data[0].ro + equipmentList.data[6].ro).toString()));
    expect(remainingTIDI.nativeElement.textContent).toEqual(((equipmentList.data[0].tidi + equipmentList.data[6].tidi).toString()));

    // when change selected equipment quantity IO terminals should be reduced
    const qty7 = fixture.debugElement.query(By.css('#qty7'));
    qty7.nativeElement.value = 3;
    qty7.nativeElement.dispatchEvent(new Event('keyup'));

    fixture.detectChanges();
    tick(1000);
    expect(remainingHV.nativeElement.textContent).toEqual(((equipmentList.data[0].hv + equipmentList.data[6].hv * 3).toString()));
    expect(remainingAV.nativeElement.textContent).toEqual(((equipmentList.data[0].av + equipmentList.data[6].av * 3).toString()));
    expect(remainingLV.nativeElement.textContent).toEqual(((equipmentList.data[0].lv + equipmentList.data[6].lv * 3).toString()));
    expect(remainingRO.nativeElement.textContent).toEqual(((equipmentList.data[0].ro + equipmentList.data[6].ro * 3).toString()));
    expect(remainingTIDI.nativeElement.textContent).toEqual(((equipmentList.data[0].tidi + equipmentList.data[6].tidi * 3).toString()));

    // after all available IO terminals are spent, other equipments should be disabled
    const eq8 = fixture.debugElement.query(By.css('#eq8'));
    expect(eq8.nativeElement.disabled).toBeTruthy();


    // after deselect selected equipment,used IO terminals should be released
    eq7.nativeElement.click();
    fixture.detectChanges();
    tick(1000);

    expect(remainingHV.nativeElement.textContent).toEqual(equipmentList.data[0].hv.toString());
    expect(remainingAV.nativeElement.textContent).toEqual(equipmentList.data[0].av.toString());
    expect(remainingLV.nativeElement.textContent).toEqual(equipmentList.data[0].lv.toString());
    expect(remainingRO.nativeElement.textContent).toEqual(equipmentList.data[0].ro.toString());
    expect(remainingTIDI.nativeElement.textContent).toEqual((equipmentList.data[0].tidi).toString());

  }));




});


