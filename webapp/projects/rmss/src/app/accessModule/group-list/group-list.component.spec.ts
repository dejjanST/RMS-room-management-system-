import { Component } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flush, TestBed, } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { GroupService } from '../group.service';
import { GroupListComponent } from './group-list.component';
import { Location } from '@angular/common';

const dummyGroupList = {
  data: [
    { id: 1, name: 'cleaner', type: 1 },
    { id: 2, name: 'security', type: 2 },
    { id: 3, name: 'medical', type: 1 }
  ]
};

@Component({
  template: ''
})
class DummyComponent {
}

xdescribe('GroupListComponent', () => {
  let component: GroupListComponent;
  let fixture: ComponentFixture<GroupListComponent>;
  let location: Location;
  let groupService: any;
  let dialog: any;

  beforeEach(async(() => {
    const groupServiceSpy = jasmine.createSpyObj('GroupService', ['getList', 'delete']);
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    TestBed.configureTestingModule({
      declarations: [GroupListComponent],
      imports: [
        MatIconModule,
        MatCardModule,
        MatToolbarModule,
        MatInputModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterTestingModule.withRoutes([
          { path: 'groups/:groupId', component: DummyComponent }
        ]),
        MatTableModule
      ],
      providers: [
        { provide: GroupService, useValue: groupServiceSpy },
        { provide: MatDialog, useValue: dialogSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    dialog = TestBed.inject(MatDialog);
    dialog.open.and.returnValue({ afterClosed: () => of({}) });
    groupService = TestBed.inject(GroupService);
    groupService.getList.and.returnValue(of(dummyGroupList));
    groupService.delete.and.returnValue(of({ msg: 'successfully deleted' }));
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(GroupListComponent);
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
  });

  it('should redirect to edit component after click edit link', fakeAsync(() => {
    const editLink = fixture.debugElement.query(By.css('.mat-row:last-child'));
    editLink.nativeElement.click();

    fixture.detectChanges();
    flush();

    expect(location.path()).toEqual('/groups/3');
  }));

});
