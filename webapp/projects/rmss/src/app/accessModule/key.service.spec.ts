import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RequestKeyAccess, ResponseKeyList } from './access-key/key';
import { key, keyListMock, keyTypesList } from './access-mock';
import { KeyService } from './key.service';


describe('KeyService', () => {
  let service: KeyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(KeyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('Get list of keys', () => {
    service.getList().subscribe(res => {
      expect(res.data[0]).toEqual(keyListMock.data[0]);
    });

    const mockReq = httpMock.expectOne(req => req.url === '/api/keys/' && req.method === 'GET');
    mockReq.flush(keyListMock);
  });

  it('Get empty object if have not list of keys', () => {
    service.getList().subscribe(res => {
      expect(res).toBeTruthy();
    });

    const mockReq = httpMock.expectOne(req => req.url === '/api/keys/' && req.method === 'GET');
    mockReq.flush(new ResponseKeyList(), { status: 400, statusText: 'have not items' });
  });

  it('Get list of key types', () => {
    service.getKeyTypes().subscribe(res => {
      expect(res.data[0]).toEqual(keyTypesList.data[0]);
    });

    const mockReq = httpMock.expectOne(req => req.url === '/api/key_types/' && req.method === 'GET');
    mockReq.flush(keyTypesList);
  });

  it('Get key by id', () => {
    service.get(1).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.data.id).toEqual(key.data.id);
    });

    const mockReq = httpMock.expectOne(req => req.url === '/api/keys/1' && req.method === 'GET');
    mockReq.flush(key);
  });


  it('Create new key', () => {
    service.create(key).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.msg).toEqual(keyCreateMock.msg);
    });

    const mockReq = httpMock.expectOne(req => req.url === '/api/keys/' && req.method === 'POST');
    const keyCreateMock = {
      msg: 'The site has been created successfully'
    };
    mockReq.flush(keyCreateMock);
  });


  it('Update key', () => {
    service.update(key).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.msg).toEqual(keyUpdateMock.msg);
    });

    const mockReq = httpMock.expectOne(req => req.url === '/api/keys/2' && req.method === 'PUT');
    const keyUpdateMock = {
      msg: 'The key has been updated successfully'
    };
    mockReq.flush(keyUpdateMock);
  });



  it('assignAccess', () => {
    const keyAccess = new RequestKeyAccess();

    service.assignAccess(keyAccess).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.msg).toEqual(keyUpdateMock.msg);
    });

    const mockReq = httpMock.expectOne(req => req.url === '/api/keys/access/' && req.method === 'PUT');
    const keyUpdateMock = {
      msg: 'The key has been assigned successfully'
    };
    mockReq.flush(keyUpdateMock);
  });


});
