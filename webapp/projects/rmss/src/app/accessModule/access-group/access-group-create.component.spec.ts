import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ColorPickerModule } from 'ngx-color-picker';
import { of } from 'rxjs';
import { groupAccessMock1 } from '../access-mock';
import { GroupService } from '../group.service';
import { AccessGroupComponent } from './access-group.component';

@Component({
  selector: 'app-access-units'
})
class AccessUnitsComponent { }

@Component({})
class DummyComponent { }


@Component({
  selector: 'app-acl-manager'
})
class AclManagerMockComponent { }

describe('AccessGroupComponent Create', () => {
  let component: AccessGroupComponent;
  let fixture: ComponentFixture<AccessGroupComponent>;
  let groupService: any;
  let location: Location;

  beforeEach(async(() => {
    const groupServiceSpy = jasmine.createSpyObj('GroupService', ['getAccess', 'update', 'create']);
    TestBed.configureTestingModule({
      declarations: [
        AccessGroupComponent,
        AccessUnitsComponent,
        AclManagerMockComponent
      ],
      imports: [
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatToolbarModule,
        ColorPickerModule,
        RouterTestingModule.withRoutes([
          {
            path: 'groups',
            component: DummyComponent
          },
        ])
      ],
      providers: [
        { provide: GroupService, useValue: groupServiceSpy },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: convertToParamMap({ groupId: undefined })
            }
          }
        }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    location = TestBed.inject(Location);
    groupService = TestBed.inject(GroupService);
    groupService.getAccess.and.returnValue(of(groupAccessMock1));
    groupService.create.and.returnValue(of({ msg: 'Successfully created group' }));
    fixture = TestBed.createComponent(AccessGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('testing create group', fakeAsync(() => {
    // testing form validation
    const submitBtn = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(submitBtn.nativeElement.disabled).toBeTruthy();

    component.groupName.patchValue('Group 1');
    fixture.detectChanges();
    expect(submitBtn.nativeElement.disabled).toBeFalsy();

    submitBtn.nativeElement.click();
    flush();

    expect(groupService.create).toHaveBeenCalledTimes(1);
    expect(location.path()).toEqual('/groups');

  }));

});
