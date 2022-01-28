import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ACLList } from '../../access-list.model';
import { AccessListData } from '../access.model';
import { AccessService } from '../access.service';
import { KeyService } from '../key.service';
import { AclContainerComponent } from './acl-container.component';



@Component({
  selector: 'app-key',
})
class KeyMockComponent {
  @Input() keyId: number;
}

@Component({
  selector: 'app-access-group-list',
})
class AccessGroupListMockComponent { }

@Component({
  selector: 'app-acl-manager',
})
class ACLManagerMockComponent { }


class AccessServiceMock {
  tmpACLList = new ACLList();
  tmpGroupList = new AccessListData();
}

describe('AclContainerComponent', () => {
  let component: AclContainerComponent;
  let fixture: ComponentFixture<AclContainerComponent>;
  let keyService: any;
  let activatedRoute: any;

  beforeEach(async(() => {
    const keyServiceSpy = jasmine.createSpyObj('KeyService', ['assignAccess']);
    TestBed.configureTestingModule({
      declarations: [
        AclContainerComponent,
        ACLManagerMockComponent,
        AccessGroupListMockComponent,
        KeyMockComponent
      ],
      imports: [
        MatCardModule,
        MatToolbarModule
      ],
      providers: [
        { provide: KeyService, useValue: keyServiceSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 0, }, }, }, },
        { provide: AccessService, useClass: AccessServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    keyService = TestBed.inject(KeyService);
    keyService.assignAccess.and.returnValue(of({}));
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture = TestBed.createComponent(AclContainerComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('on submit button should call assignAccess()', () => {
    // TODO: da vidi toshe

    // const submitBtn = fixture.debugElement.query(By.css('#assignBtn'));
    // submitBtn.nativeElement.click();

    // fixture.detectChanges();

    component.assignPermissions();

    expect(keyService.assignAccess).toHaveBeenCalledTimes(1);
  });

});
