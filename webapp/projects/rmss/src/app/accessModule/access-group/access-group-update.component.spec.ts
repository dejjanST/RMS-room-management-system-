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
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ColorPickerModule } from 'ngx-color-picker';
import { of } from 'rxjs';
import { groupAccessMock1 } from '../access-mock';
import { GroupService } from '../group.service';
import { AccessGroupComponent } from './access-group.component';

@Component({
    selector: 'app-access-units'
})
class AccessUnitsComponent {

}

@Component({
    selector: 'app-acl-manager'
})
class AclManagerMockComponent { }


@Component({})
class DummyComponent { }

describe('AccessGroupComponent Update', () => {
    let component: AccessGroupComponent;
    let fixture: ComponentFixture<AccessGroupComponent>;
    let groupService: any;
    let location: Location;
    let router: Router;

    beforeEach(async(() => {
        const groupServiceSpy = jasmine.createSpyObj('GroupService', ['getAccess', 'update', 'create']);
        TestBed.configureTestingModule({
            declarations: [
                AccessGroupComponent,
                AccessUnitsComponent,
                AclManagerMockComponent,
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
                            paramMap: convertToParamMap({ groupId: 1 })
                        }
                    }
                }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        groupService = TestBed.inject(GroupService);
        groupService.getAccess.and.returnValue(of(groupAccessMock1));
        groupService.update.and.returnValue(of({ msg: 'Successfully updated group' }));
        fixture = TestBed.createComponent(AccessGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


    it('testing update group', fakeAsync(() => {
        // form should be filled in update
        expect(component.groupName.value).toEqual('Group 1');

        // testing form validation
        const submitBtn = fixture.debugElement.query(By.css('button[type=submit]'));
        expect(submitBtn.nativeElement.disabled).toBeFalsy();

        component.groupName.patchValue('Group 2');
        fixture.detectChanges();
        expect(submitBtn.nativeElement.disabled).toBeFalsy();

        submitBtn.nativeElement.click();
        flush();
        expect(groupService.update).toHaveBeenCalledTimes(1);
        expect(location.path()).toEqual('/groups');

    }));

});
