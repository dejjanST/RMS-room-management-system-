import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { UnitTypeListComponent } from './unit-type-list.component';
import { UnitTypeService } from '../unit-type.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ResponseUnitType } from '../models/unit-type.Model';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { StopPropagationDirective } from 'projects/shared/src/app/directives/stop-propagation.directive';

@Component({
  template: ''
})
class DummyComponent {
}

class MatDialogMock {
  dialogResponse = new ResponseUnitType();
  open() {
    this.dialogResponse.id = 1,
      this.dialogResponse.name = 'Ednosoben apartman',
      this.dialogResponse.rooms = 1,
      this.dialogResponse.description = 'Describe one room apartment',
      this.dialogResponse.locked = false,
      this.dialogResponse.updated = 1590486724,
      this.dialogResponse.deleted = false;
    return {
      afterClosed: () => of(this.dialogResponse)
    };
  }
}

describe('UnitTypeListComponent', () => {
  let component: UnitTypeListComponent;
  let fixture: ComponentFixture<UnitTypeListComponent>;
  let unitTypeService: any;
  let dialog: any;
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    const unitTypeServiceSpy = jasmine.createSpyObj('UnitTypeService', ['listUnitTypes', 'deleteUnitType']);
    TestBed.configureTestingModule({
      declarations: [UnitTypeListComponent, DummyComponent, StopPropagationDirective],
      imports: [
        MatMenuModule,
        MatFormFieldModule,
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatTableModule,
        RouterTestingModule.withRoutes([
          { path: 'units/edit/:id', component: DummyComponent }
        ])
      ],
      providers: [
        { provide: UnitTypeService, useValue: unitTypeServiceSpy },
        { provide: MatDialog, useClass: MatDialogMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    const dummyUnitTypes = {
      data: [
        {
          id: 1,
          name: 'Ednosoben apartman',
          rooms: 1,
          description: 'Describe one room apartment',
          locked: false,
          updated: 1590486724,
          deleted: false
        },
        {
          id: 2,
          name: 'Dvosoben apartman',
          rooms: 2,
          description: 'Describe two room apartment',
          locked: true,
          updated: 1590486724,
          deleted: false
        },
        {
          id: 3,
          name: 'Koridor',
          rooms: 1,
          description: 'Describe corridor',
          locked: true,
          updated: 1590486724,
          deleted: false
        }
      ]
    };
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    unitTypeService = TestBed.inject(UnitTypeService);
    unitTypeService.listUnitTypes.and.returnValue(of(dummyUnitTypes));
    unitTypeService.deleteUnitType.and.returnValue(of({ msg: 'Successfuly deleted' }));
    dialog = TestBed.inject(MatDialog);
    fixture = TestBed.createComponent(UnitTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 elements in the list', () => {
    const elements = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(elements.length).toEqual(3);
  });

  it('should have 3 delete buttons, 1 is enabled', () => {
    const deleteBtns = fixture.debugElement.queryAll(By.css('.deleteBtn'));
    expect(deleteBtns.length).toEqual(3);

    expect(fixture.debugElement.query(By.css('#del1')).nativeElement.disabled).toBeFalsy();
    expect(fixture.debugElement.query(By.css('#del2')).nativeElement.disabled).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#del3')).nativeElement.disabled).toBeTruthy();

  });

  it('should open dialog and delete item from list', fakeAsync(() => {
    const deleteBtn = fixture.debugElement.query(By.css('#del1'));
    deleteBtn.nativeElement.click();

    fixture.detectChanges();
    flush();

    expect(unitTypeService.deleteUnitType).toHaveBeenCalled();

    const lista = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(lista.length).toEqual(2);
  }));

  it('should redirect to edit component after click edit link', fakeAsync(() => {
    const editLink = fixture.debugElement.query(By.css('#UT1'));
    editLink.nativeElement.click();
    fixture.detectChanges();
    flush();

    expect(location.path()).toEqual('/units/edit/1');
  }));

});
