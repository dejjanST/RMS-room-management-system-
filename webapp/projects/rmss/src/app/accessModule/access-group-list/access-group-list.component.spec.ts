import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExcludePipe } from 'projects/shared/src/app/pipes/exclude.pipe';
import { FilterByStringPipe } from 'projects/shared/src/app/pipes/filter-by-string.pipe';
import { of } from 'rxjs';
import { groupAccessMock1, groupListMock } from '../access-mock';
import { AccessListData } from '../access.model';
import { AccessService } from '../access.service';
import { GroupService } from '../group.service';
import { AccessGroupListComponent } from './access-group-list.component';


describe('AccessGroupListComponent', () => {
  let component: AccessGroupListComponent;
  let fixture: ComponentFixture<AccessGroupListComponent>;
  let groupService: any;
  let accessService: any;

  beforeEach(async(() => {
    const groupServiceSpy = jasmine.createSpyObj('GroupService', ['getList', 'getAccess']);
    const accessServiceSpy = jasmine.createSpyObj('AccessService', ['removeGroup', 'getAccess', 'pushGroup']);
    TestBed.configureTestingModule({
      declarations: [
        AccessGroupListComponent,
        FilterByStringPipe,
        ExcludePipe
      ],
      imports: [
        MatCardModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatChipsModule,
        MatAutocompleteModule
      ],
      providers: [
        { provide: GroupService, useValue: groupServiceSpy },
        { provide: AccessService, useValue: accessServiceSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    groupService = TestBed.inject(GroupService);
    groupService.getList.and.returnValue(of(JSON.parse(JSON.stringify(groupListMock))));
    groupService.getAccess.and.returnValue(of(JSON.parse(JSON.stringify(groupAccessMock1))));
    accessService = TestBed.inject(AccessService);
    accessService.globalGroupList$ = of([]);
    fixture = TestBed.createComponent(AccessGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('remove method should call removeGroup from access service', () => {
    const group = new AccessListData();
    component.remove(group);
    expect(accessService.removeGroup).toHaveBeenCalledTimes(1);
  });


  it('setGroup method should call getAccess from group service', () => {
    const group = new AccessListData();
    component.setGroup(group);
    expect(groupService.getAccess).toHaveBeenCalledTimes(1);
    expect(accessService.pushGroup).toHaveBeenCalledTimes(1);
  });

});
