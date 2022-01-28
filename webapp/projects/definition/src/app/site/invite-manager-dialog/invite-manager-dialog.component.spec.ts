import { async, ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { siteMock1 } from 'projects/definition/src/mocked-data/site-data';
import { of } from 'rxjs';
import { InviteManagerDialogComponent } from './invite-manager-dialog.component';
import { ManagerService } from './manager.service';

describe('InviteManagerDialogComponent', () => {
  let component: InviteManagerDialogComponent;
  let fixture: ComponentFixture<InviteManagerDialogComponent>;
  let managerService: any;
  let matDialogRef: any;

  beforeEach(async(() => {
    const managerServiceSpy = jasmine.createSpyObj('ManagerService', ['create']);
    const matDialogRefSpy = jasmine.createSpyObj('MatDialogRed', ['close']);
    TestBed.configureTestingModule({
      declarations: [InviteManagerDialogComponent],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatCardModule,
        MatInputModule
      ],
      providers: [
        { provide: ManagerService, useValue: managerServiceSpy },
        { provide: MatDialogRef, useValue: matDialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: siteMock1.data }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    managerService = TestBed.inject(ManagerService);
    managerService.create.and.returnValue(of({}));
    matDialogRef = TestBed.inject(MatDialogRef);
    matDialogRef.close.and.returnValue(of({}));
    fixture = TestBed.createComponent(InviteManagerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('invite() should call create() from manager service once', fakeAsync(() => {
    component.invite();
    flush();
    expect(managerService.create).toHaveBeenCalledTimes(1);
  }));

  it('onNoClick() should close the mat dialog', () => {
    component.onNoClick();

    expect(matDialogRef.close).toHaveBeenCalledTimes(1);
  });

});
