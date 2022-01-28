import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { FloorLayoutListComponent } from './floor-layout-list.component';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { FloorLayout } from '../floor-layout.model';
import { MatDialog } from '@angular/material/dialog';
import { FloorLayoutService } from '../floor-layout.service';
import { floorLayoutMock } from './floor-layout-mock';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { StopPropagationDirective } from 'projects/shared/src/app/directives/stop-propagation.directive';
import { Location } from '@angular/common';
import { GlobalService } from '../../globalService/global.service';

@Component({
  template: ''
})
class DummyComponent {
}

class GlobalServiceMock {
  site = {
    set: (id: number) => { },
    data$: of(JSON.parse(JSON.stringify(floorLayoutMock)))
  };
}

class MatDialogMock {
  dialogResponse = new FloorLayout();
  open() {
    this.dialogResponse.id = 1;
    this.dialogResponse.name = 'Test';
    return {
      afterClosed: () => of(this.dialogResponse)
    };
  }
}

describe('FloorLayoutListComponent', () => {
  let component: FloorLayoutListComponent;
  let fixture: ComponentFixture<FloorLayoutListComponent>;
  let floorLayoutService: any;
  let globalService: any;
  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    const floorLayoutServiceSpy = jasmine.createSpyObj('FloorLayoutService', ['getFloorLayoutsBySiteList', 'deleteFloorLayout']);
    TestBed.configureTestingModule({
      declarations: [FloorLayoutListComponent, DummyComponent, StopPropagationDirective],
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
          { path: 'sites/:siteId/fld/edit/:floorLayoutId', component: DummyComponent }
        ])
      ],
      providers: [
        { provide: FloorLayoutService, useValue: floorLayoutServiceSpy },
        { provide: GlobalService, useClass: GlobalServiceMock },
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 1, }, }, }, },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    globalService = TestBed.inject(GlobalService);
    floorLayoutService = TestBed.inject(FloorLayoutService);
    floorLayoutService.getFloorLayoutsBySiteList.and.returnValue(of(JSON.parse(JSON.stringify(floorLayoutMock))));
    floorLayoutService.deleteFloorLayout.and.returnValue(of({ msg: 'Successfuly deleted' }));
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(FloorLayoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 floor layouts in list', () => {
    const list = fixture.debugElement.queryAll(By.css('table tbody tr'));

    expect(list.length).toEqual(3);
  });

  it('should have 3 delete button', () => {
    const deleteBtns = fixture.debugElement.queryAll(By.css('.deleteBtn'));

    expect(deleteBtns.length).toEqual(3);
  });

  it('should open dialog and delete item from list', fakeAsync(() => {
    const deleteBtn = fixture.debugElement.query(By.css('#del14'));
    deleteBtn.nativeElement.click();

    fixture.detectChanges();
    flush();

    expect(floorLayoutService.deleteFloorLayout).toHaveBeenCalled();

    const list = fixture.debugElement.queryAll(By.css('table tbody tr'));
    expect(list.length).toEqual(2);
  }));

  it('should redirect to edit component after click edit link', fakeAsync(() => {
    const editLink = fixture.debugElement.query(By.css('#FL15'));
    editLink.nativeElement.click();
    fixture.detectChanges();
    flush();

    expect(location.path()).toEqual('/sites/1/fld/edit/15');
  }));

});
