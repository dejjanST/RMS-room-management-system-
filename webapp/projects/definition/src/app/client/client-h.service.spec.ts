import { TestBed } from '@angular/core/testing';
import { ClientHService } from './client-h.service';
import { ClientService } from '../client/client.service';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';

const clientDataMock1 = {
  data: {
    id: 1,
    name: 'Client1',
    client_id: 111,
    country: 'mkd',
    city: 'Skopje',
    address: 'address',
    bank_account: 'as123dasd',
    bank_name: 'halk',
    bank_country: 'Macedonia',
    phone: '1133322',
    email: 'user@example.com',
    active: 1,
    status: 1
  }
};

const clientDataMock2 = {
  data: {
    id: 2,
    name: 'Client2',
    client_id: 22,
    country: 'mkd',
    city: 'Skopje',
    address: 'address',
    bank_account: 'a1122sdasd',
    bank_name: 'halk',
    bank_country: 'Macedonia',
    phone: '1133aa3ss22',
    email: 'user1@example.com',
    active: 1,
    status: 1
  }
};

describe('ClientHService', () => {
  let service: ClientHService;
  let clientService: any;

  beforeEach(() => {
    const clientServiceSpy = jasmine.createSpyObj('ClientService', ['get'], { updated$: of() });
    TestBed.configureTestingModule({
      providers: [
        { provide: ClientService, useValue: clientServiceSpy }
      ]
    });
    service = TestBed.inject(ClientHService);
    clientService = TestBed.inject(ClientService);
    clientService.get.and.returnValue(of(JSON.parse(JSON.stringify(clientDataMock1))));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make one request to API when requested same item multiple times', () => {
    service.set(1);
    service.set(1);
    service.set(1);
    service.data$.subscribe(res => {
      expect(res).toEqual(clientDataMock1.data);
    });
    service.set(1);
    expect(clientService.get).toHaveBeenCalledTimes(1);
  });

  it('should make two requests to API when requested two different items', () => {
    service.set(1);
    service.data$
      .pipe(first())
      .subscribe(res => {
        expect(res).toEqual(clientDataMock1.data);
      });

    clientService.get.and.returnValue(of(JSON.parse(JSON.stringify(clientDataMock2))));
    service.set(2);
    service.data$.subscribe(res => {
      expect(res).toEqual(clientDataMock2.data);
    });
    expect(clientService.get).toHaveBeenCalledTimes(2);
  });

  it('should make two requests to API when requested multiple times in a row for two different items', () => {
    service.set(1);
    service.data$
      .pipe(first())
      .subscribe(res => {
        expect(res).toEqual(clientDataMock1.data);
      });
    service.set(1);
    service.data$
      .pipe(first())
      .subscribe(res => {
        expect(res).toEqual(clientDataMock1.data);
      });
    clientService.get.and.returnValue(of(JSON.parse(JSON.stringify(clientDataMock2))));
    service.set(2);
    service.set(2);
    service.data$
      .pipe(first())
      .subscribe(res => {
        expect(res).toEqual(clientDataMock2.data);
      });
    expect(clientService.get).toHaveBeenCalledTimes(2);
  });
});
