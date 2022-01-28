import { async, ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { FormControllerComponent } from './form-controller.component';
import { MasterService } from '../master.service';
import { of, throwError } from 'rxjs';
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
import { MatListModule } from '@angular/material/list';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { Controller } from '../master';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ConfirmDialogService } from 'projects/shared/src/app/components/dialogs/confirm-dialog/confirm-dialog.service';

describe('FormControllerComponent', () => {
  let component: FormControllerComponent;
  let fixture: ComponentFixture<FormControllerComponent>;
  let masterService: any;
  let confirmDialogService: any;


  beforeEach(async(() => {
    const masterServiceSpy = jasmine.createSpyObj('MasterService', ['setMasterController']);
    const confirmDialogServiceSpy = jasmine.createSpyObj('ConfirmDialogService', ['open', 'close']);
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BrowserAnimationsModule,
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
        ClipboardModule,
        DragDropModule,
        ZXingScannerModule,
      ],
      declarations: [FormControllerComponent],
      providers: [
        { provide: MasterService, useValue: masterServiceSpy },
        { provide: ConfirmDialogService, useValue: confirmDialogServiceSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    confirmDialogService = TestBed.inject(ConfirmDialogService);
    confirmDialogService.close.and.returnValue(of(true));

    masterService = TestBed.inject(MasterService);
    fixture = TestBed.createComponent(FormControllerComponent);
    component = fixture.componentInstance;
    component.unitId = 1;
    component.siteId = 1;
    component.controller = new Controller();
    component.controller.category = 'MC';
    component.controller.description = 'Room Controller';
    component.controller.device_type = 1;
    component.controller.equipment_type = 'MC CONTROLLER';
    component.controller.model = 'RC';
    component.controller.quantity = 1;
    component.position = 1;
    fixture.detectChanges();

  });

  it('should create', () => {
    masterService.setMasterController.and.returnValue(of({ msg: 'Controller associated' }));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('save() should call setMasterController method and emit succEvent on succes response', fakeAsync(() => {
    masterService.setMasterController.and.returnValue(of({ msg: 'Controller associated' }));
    fixture.detectChanges();

    spyOn(component.succEvent, 'emit');
    component.save();
    flush();
    fixture.detectChanges();

    expect(masterService.setMasterController).toHaveBeenCalledTimes(1);
    expect(component.succEvent.emit).toHaveBeenCalledTimes(1);
  }));


  it('form is invalid, submit button should be disabled', () => {
    masterService.setMasterController.and.returnValue(of({ msg: 'Controller associated' }));
    fixture.detectChanges();

    component.form.controls.masterID.setValue('');

    const submitEL1: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(submitEL1.nativeElement.disabled).toBe(true);

    component.form.controls.masterID.setValue('85BN7AUZG4WE7FBQR74E');

    fixture.detectChanges();

    expect(submitEL1.nativeElement.disabled).toBe(false);

  });


  xit('on click save, if controller already associated, should open confirmDialog ', () => {
    masterService.setMasterController.and.returnValue(throwError({ error: { msg: 'Controller already associated in unit' } }), of({ msg: 'Controller associated' }));

    component.save();

    expect(confirmDialogService.open).toHaveBeenCalled();
    expect(confirmDialogService.close).toHaveBeenCalled();
  });

  // rest of methods are from ZXingScannerModule and are not tested.

});
