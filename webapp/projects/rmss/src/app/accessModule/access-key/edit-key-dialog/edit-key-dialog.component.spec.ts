import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditKeyDialogComponent } from './edit-key-dialog.component';

const mockTypes = {
  data: [
    {
      id: 1,
      type: 'Front Desk'
    },
    {
      id: 2,
      type: 'Description'
    },
    {
      id: 3,
      type: 'Maintenance'
    },
    {
      id: 4,
      type: 'Security'
    },
    {
      id: 5,
      type: 'Management'
    },
  ]
};

const mockKey = {
  data: {
    id: 1,
    key_no: '1122aa44',
    description: 'desc',
    key_type: 1,
    valid_from: '12/1/2020',
    valid_to: '11/1/2020'
  }
};

@Component({
  selector: '<app-key>'
})
class MockKeyComponent {
  @Input() editMode = true;
  @Input() responseKey: any;
  @Input() keyId = 1;
  @Input() types = mockTypes;
}


describe('EditKeyDialogComponent', () => {
  let component: EditKeyDialogComponent;
  let fixture: ComponentFixture<EditKeyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditKeyDialogComponent, MockKeyComponent],
      imports: [
        MatDialogModule,
      ],
      providers: [
        {
          provide: MatDialogRef, useValue: { close: (dialogResult: any) => { } }
        },
        {
          provide: MAT_DIALOG_DATA, useValue: {
            key:
            {
              data:
              {
                description: 'desc', id: 34, key_no: '111', key_type: 2, updated: 1603186846, valid_from: 1602540000, valid_to: null,
                groups: [{ id: 4 }], acl: []
              }
            }, types: {
              data: [{ id: 1, type: 'Front Desk' }, { id: 2, type: 'Cleaning staff' },
              { id: 3, type: 'Maintenance' }, { id: 4, type: 'Security' }, { id: 5, type: 'Management' }]
            }
          }
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditKeyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
