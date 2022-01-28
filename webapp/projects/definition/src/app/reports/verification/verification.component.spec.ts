import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { GlobalService } from '../../globalService/global.service';
import { GlobalServiceMock } from '../../globalService/global.service.mock';
import { VerificationComponent } from './verification.component';
import { VerificatinReportMock } from './verification.mock';
import { VerificationService } from './verification.service';




describe('VerificationComponent', () => {
  let component: VerificationComponent;
  let fixture: ComponentFixture<VerificationComponent>;
  let globalService: any;
  let verificationService: any;

  beforeEach(async(() => {
    const verificationServiceSpy = jasmine.createSpyObj('VerificationService', ['getList']);
    TestBed.configureTestingModule({
      declarations: [VerificationComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatSelectModule,
        MatOptionModule,
        MatToolbarModule,
        MatExpansionModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule
      ],
      providers: [
        { provide: GlobalService, useClass: GlobalServiceMock },
        { provide: VerificationService, useValue: verificationServiceSpy },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: convertToParamMap({ buildingId: 1 })
            }
          }
        }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    globalService = TestBed.inject(GlobalService);
    verificationService = TestBed.inject(VerificationService);
    verificationService.getList.and.returnValue(of(VerificatinReportMock));
    fixture = TestBed.createComponent(VerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('testing rendering table rows', () => {
    const tableRows = fixture.debugElement.queryAll(By.css('table tbody tr'));

    expect(tableRows.length).toEqual(VerificatinReportMock.data.length);

  });


});
