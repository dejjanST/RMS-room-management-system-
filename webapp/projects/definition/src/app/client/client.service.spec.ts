import { TestBed } from '@angular/core/testing';
import { ClientService } from './client.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Client } from './client.model';

describe('ClientService', () => {
  let service: ClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a list of clients', () => {
    service.getList().subscribe(res => {
      expect(res.data[0].name).toEqual(dummyResponse.data[0].name);
    });

    const mockReq = httpMock.expectOne(req => req.url === '/api/clients/' && req.method === 'GET');
    const dummyResponse = {
      data: [
        {
          id: 1,
          name: 'Holiday Inn',
          client_id: '1',
          country: 'Macedonia',
          city: 'Skopje',
          address: 'Bulevar Filip 2',
          bank_account: '321sdas2123',
          bank_name: 'Halk',
          bank_country: 'Macedonia',
          status: 1
        },
        {
          id: 2,
          name: 'Continental',
          client_id: '2',
          country: 'Macedonia',
          city: 'Skopje',
          address: 'Aleksandar Veliki',
          bank_account: '321s222jkkk',
          bank_name: 'Halk',
          bank_country: 'Macedonia',
          status: 1
        }
      ]
    };
    mockReq.flush(dummyResponse);
  });

  it('should create new client', () => {
    const client = new Client();
    client.data.id = 1;
    client.data.name = 'Holiday Inn';
    client.data.client_id = 1;
    client.data.country = 'Macedonia';
    client.data.city = 'Skopje';
    client.data.address = 'Bulevar Filip 2';
    client.data.bank_account = '321sdas2123';
    client.data.bank_name = 'Halk';
    client.data.bank_country = 'Macedonia';
    client.data.status = 1;

    service.create(client).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.msg).toEqual(dummyResponse.msg);
    });

    const mockReq = httpMock.expectOne(req => req.url === '/api/clients/' && req.method === 'POST');
    const dummyResponse = {
      msg: 'The client has been created successfully'
    };
    mockReq.flush(dummyResponse);

  });

  it('should get client by id', () => {
    service.get(1).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.data.name).toEqual(dummyResponse.data.name);
    });

    const mockReq = httpMock.expectOne(req => req.url === '/api/clients/1' && req.method === 'GET');
    const dummyResponse = {
      data:
      {
        id: 1,
        name: 'Holiday Inn',
        client_id: '1',
        country: 'Macedonia',
        city: 'Skopje',
        address: 'Bulevar Filip 2',
        bank_account: '321sdas2123',
        bank_name: 'Halk',
        bank_country: 'Macedonia',
        status: 1
      }
    };
    mockReq.flush(dummyResponse);
  });


  it('should edit client', () => {
    const client = new Client();
    client.data.id = 1;
    client.data.name = 'Holiday Inn';
    client.data.client_id = 1;
    client.data.country = 'Macedonia';
    client.data.city = 'Skopje';
    client.data.address = 'Bulevar Filip 2';
    client.data.bank_account = '321sdas2123';
    client.data.bank_name = 'Halk';
    client.data.bank_country = 'Macedonia';
    client.data.status = 1;

    service.update(client).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.msg).toEqual(dummyResponse.msg);
    });

    const mockReq = httpMock.expectOne(req => req.url === '/api/clients/1' && req.method === 'PUT');
    const dummyResponse = {
      msg: 'The client has been updated successfully'
    };
    mockReq.flush(dummyResponse);
  });


  it('should delete client by id', () => {
    service.delete(1).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.msg).toEqual(dummyResponse.msg);
    });

    const mockReq = httpMock.expectOne(req => req.url === '/api/clients/1' && req.method === 'DELETE');
    const dummyResponse = {
      msg: 'The client has been deleted successfully'
    };
    mockReq.flush(dummyResponse);
  });
});
