import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BuildingComponent } from './building.component';
import { Component, DebugElement } from '@angular/core';
import { BuildingService } from '../building.service';
import { SiteService } from '../../site/site.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguagesModule } from 'projects/shared/src/app/languages/languages.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { GlobalService } from '../../globalService/global.service';

const site = {
  data: {
    id: 1,
    name: 'siteName',
    client_id: 1,
    site_id: '1232',
    country: 'mkd',
    city: 'grad',
    address: 'asdas'
  }
};

const mockBuildingWithImg = {
  data: {
    id: 1,
    name: 'Building1',
    client_id: 1,
    site_id: 1,
    file_id: 2
  }
};

const mockBuilding = {
  data: {
    id: 1,
    name: 'Building1',
    client_id: 1,
    site_id: 1
  }
};

@Component({
  template: ''
})
class DummyComponent {
}

class GlobalServiceMock {
  site = {
    data$: of(site),
    set() { }
  };
}

describe('BuildingComponent - Edit form', () => {
  let component: BuildingComponent;
  let fixture: ComponentFixture<BuildingComponent>;
  let buildingService: any;
  let router: any;

  beforeEach(async(() => {

    const buildingListSpy = jasmine.createSpyObj('BuildingService', ['get', 'update']);

    TestBed.configureTestingModule({
      declarations: [BuildingComponent],
      imports: [
        FormsModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatAutocompleteModule,
        MatButtonModule,
        HttpClientModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule,
        MatTableModule,
        MatSidenavModule,
        CommonModule,
        BrowserAnimationsModule,
        LanguagesModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatDialogModule,
        MatTabsModule,
        MatRadioModule,
        MatCheckboxModule,
        DragDropModule,
        MatExpansionModule,
        MatChipsModule,
        MatIconModule,
        RouterTestingModule.withRoutes([
          { path: 'sites/:id/buildings', component: DummyComponent }
        ])
      ],
      providers: [
        { provide: BuildingService, useValue: buildingListSpy },
        { provide: GlobalService, useClass: GlobalServiceMock },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 1, }, }, }, },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    buildingService = TestBed.inject(BuildingService);
    buildingService.get.and.returnValue(of(mockBuildingWithImg));
    buildingService.update.and.returnValue(of({ msg: 'success' }));
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    fixture = TestBed.createComponent(BuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('Building name validation', () => {
    fixture = TestBed.createComponent(BuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const siteName = component.form.controls.name;
    siteName.setValue('');
    expect(siteName.hasError('required')).toBeTruthy();
    expect(siteName.valid).toBeFalsy();

    siteName.setValue('a');
    expect(siteName.hasError('minlength')).toBeTruthy();
    expect(siteName.valid).toBeFalsy();

    siteName.setValue('Building 1');
    expect(siteName.hasError('minlength')).toBeFalsy();
    expect(siteName.valid).toBeTruthy();
  });


  it('form is valid, submit button is enabled and on click call editBuilding method', () => {
    fixture = TestBed.createComponent(BuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.form.controls.name.setValue('Building One');
    component.form.controls.desc.setValue('Description for Building One');
    fixture.detectChanges();
    const submitBtn: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(submitBtn.nativeElement.disabled).toBe(false);
    submitBtn.nativeElement.click();

    expect(buildingService.update).toHaveBeenCalledTimes(1);
  });

  it('Check if building data has img', () => {
    fixture = TestBed.createComponent(BuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.floorImgUrl$.subscribe(res => {
      expect(res).toEqual('/files/2');
    });
  });

  it('Test building without image', () => {
    buildingService.get.and.returnValue(of(mockBuilding));

    fixture = TestBed.createComponent(BuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.floorImgUrl$.subscribe(res => {
      expect(res).toEqual('/files/');
    });
  });
});


describe('BuildingComponent', () => {
  let component: BuildingComponent;
  let fixture: ComponentFixture<BuildingComponent>;
  let buildingService: any;
  let router: any;

  beforeEach(async(() => {

    const buildingListSpy = jasmine.createSpyObj('BuildingService', ['get', 'create']);

    TestBed.configureTestingModule({
      declarations: [ BuildingComponent ],
      imports: [
        FormsModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatAutocompleteModule,
        MatButtonModule,
        HttpClientModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule,
        MatTableModule,
        MatSidenavModule,
        CommonModule,
        BrowserAnimationsModule,
        LanguagesModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatDialogModule,
        MatTabsModule,
        MatRadioModule,
        MatCheckboxModule,
        DragDropModule,
        MatExpansionModule,
        MatChipsModule,
        MatIconModule,
        RouterTestingModule.withRoutes([
          { path: 'sites/:id/buildings', component: DummyComponent }
        ])
      ],
      providers: [
        { provide: BuildingService, useValue: buildingListSpy },
        { provide: GlobalService, useClass: GlobalServiceMock },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 0, }, }, }, },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    buildingService = TestBed.inject(BuildingService);

    buildingService.get.and.returnValue(of(mockBuilding));
    buildingService.create.and.returnValue(of({ msg: 'success' }));
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(BuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Building name validation', () => {
    const siteName = component.form.controls.name;
    siteName.setValue('');
    expect(siteName.hasError('required')).toBeTruthy();
    expect(siteName.valid).toBeFalsy();

    siteName.setValue('a');
    expect(siteName.hasError('minlength')).toBeTruthy();
    expect(siteName.valid).toBeFalsy();

    siteName.setValue('Building 1');
    expect(siteName.hasError('minlength')).toBeFalsy();
    expect(siteName.valid).toBeTruthy();
  });


  it('form is invalid, submit button is disabled', () => {
    component.form.controls.name.setValue('');
    component.form.controls.desc.setValue('');
    fixture.detectChanges();
    const submitBtn: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(submitBtn.nativeElement.disabled).toBe(true);
  });

  it('form is valid, submit button is enabled and on click call create method', () => {
    component.form.controls.name.setValue('Building One');
    component.form.controls.desc.setValue('Description for Building One');
    fixture.detectChanges();
    const submitBtn: DebugElement = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(submitBtn.nativeElement.disabled).toBe(false);
    submitBtn.nativeElement.click();

    expect(buildingService.create).toHaveBeenCalledTimes(1);
  });
});
