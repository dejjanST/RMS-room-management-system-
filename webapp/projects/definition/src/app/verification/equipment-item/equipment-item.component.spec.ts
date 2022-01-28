import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguagesModule } from 'projects/shared/src/app/languages/languages.module';
import { LoaderModule } from 'projects/shared/src/app/modules/loader/loader.module';
import { of } from 'rxjs';
import { Equipment } from '../equipment-verification.model';
import { EquipmentVerificationService } from '../equipment-verification.service';

import { EquipmentItemComponent } from './equipment-item.component';

describe('EquipmentItemComponent', () => {
  let component: EquipmentItemComponent;
  let fixture: ComponentFixture<EquipmentItemComponent>;
  let verificationService: any;

  beforeEach(async(() => {
    const equipmentVerificationServiceMock = jasmine.createSpyObj(
      'EquipmentVerificationService', ['verifyEqpt', 'getEqptsByUnit', 'getUnitDetails']
    );
    TestBed.configureTestingModule({
      declarations: [EquipmentItemComponent],
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
        { provide: EquipmentVerificationService, useValue: equipmentVerificationServiceMock },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    verificationService = TestBed.inject(EquipmentVerificationService);
    verificationService.verifyEqpt.and.returnValue(of({ msg: 'Checklist created' }));
    fixture = TestBed.createComponent(EquipmentItemComponent);
    component = fixture.componentInstance;
    component.siteId = 1;
    component.unitId = 2;
    component.equipment = new Equipment();
    component.equipment.category = 'FCU';
    component.equipment.description = '2 Pipes, High Voltage speed control, High Voltage Valve';
    component.equipment.equipment_type = 'CONTROL ITEM';
    component.equipment.model = 'FCU2P - HHV0T';
    component.equipment.note = 'dsaads';
    component.equipment.status = 5;
    component.equipment.utd_has_equipment = 4;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('save() should call verifyEqpt once', fakeAsync(() => {
    component.save();
    flush();
    fixture.detectChanges();

    expect(verificationService.verifyEqpt).toHaveBeenCalledTimes(1);
  }));


});
