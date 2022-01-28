import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { keyListMock } from '../access-mock';
import { KeyService } from '../key.service';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { KeyListComponent } from './key-list.component';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  template: ''
})
class DummyComponent {
}

describe('KeyListComponent', () => {
  let component: KeyListComponent;
  let fixture: ComponentFixture<KeyListComponent>;
  let location: Location;
  let keyService: any;
  let routerSpy: any;

  beforeEach(async(() => {
    const keyListSpy = jasmine.createSpyObj('KeyService', ['getList']);
    routerSpy = { navigate: jasmine.createSpy('navigate') };

    TestBed.configureTestingModule({
      declarations: [ KeyListComponent ],
      imports: [
        MatCardModule,
        MatToolbarModule,
        MatInputModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'key/:keyId', component: DummyComponent }
        ]),
        MatTableModule
      ],
      providers: [
        { provide: KeyService, useValue: keyListSpy },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    keyService = TestBed.inject(KeyService);
    keyService.getList.and.returnValue(of(keyListMock));
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(KeyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 4 elements in the list', () => {
    const elements = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(elements.length).toEqual(4);
  });

  it('should redirect to edit component after click edit link', fakeAsync(() => {
    const editLink = fixture.debugElement.query(By.css('.mat-row:last-child'));
    editLink.nativeElement.click();

    fixture.detectChanges();
    flush();

    expect(location.path()).toEqual('/key/4');
  }));

  it('should redirect to create new key after click edit link', fakeAsync(() => {
    const editLink = fixture.debugElement.query(By.css('#addKey'));
    editLink.nativeElement.click();
    fixture.detectChanges();
    flush();

    expect(location.path()).toEqual('/key/new');
  }));
});
