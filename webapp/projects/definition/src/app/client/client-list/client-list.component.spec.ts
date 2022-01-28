import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ClientListComponent } from './client-list.component';
import { AppModule } from '../../app.module';
import { ClientService } from '../client.service';
import { of } from 'rxjs';


const mockClients = {
  data: [
    { id: 1, name: 'User1', client_id: 1, country: 'Mk', status: 1 },
    { id: 2, name: 'User2', client_id: 2, country: 'Mk', status: 1 },
    { id: 3, name: 'User3', client_id: 3, country: 'Mk', status: 1 },
    { id: 4, name: 'User4', client_id: 4, country: 'Mk', status: 1 },
    { id: 5, name: 'User5', client_id: 5, country: 'Mk', status: 1 },
    { id: 6, name: 'User6', client_id: 6, country: 'Mk', status: 1 },
    { id: 7, name: 'User7', client_id: 7, country: 'Mk', status: 1 },
    { id: 8, name: 'User8', client_id: 8, country: 'Mk', status: 1 },
  ]
};

describe('ClientListComponent', () => {
  let component: ClientListComponent;
  let clientService: any;
  let fixture: ComponentFixture<ClientListComponent>;
  let clientListSpy: any;

  beforeEach(async(() => {
    clientListSpy = jasmine.createSpyObj('ClientService', ['getList']);
    TestBed.configureTestingModule({
      declarations: [ClientListComponent],
      imports: [
        AppModule
      ],
      providers: [
        { provide: ClientService, useValue: clientListSpy },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    clientService = TestBed.inject(ClientService);
    clientListSpy.getList.and.returnValue(of(mockClients));
    fixture = TestBed.createComponent(ClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Initally Should display 8 clients', () => {
    expect(component.clients.data.length).toEqual(8);
  });


  it('On click, dialog should be called', () => {
    spyOn(component, 'openDialog');
    const button = fixture.debugElement.nativeElement.querySelector('button');

    button.click();
    expect(component.openDialog).toHaveBeenCalledTimes(1);
  });
});
