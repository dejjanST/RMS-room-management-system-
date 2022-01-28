import { TestBed } from '@angular/core/testing';
import { SiteService } from './site.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Site } from './site';
import { siteListMock, siteMock1 } from '../../mocked-data/site-data';

describe('SiteService', () => {
  let service: SiteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(SiteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Get list of sites', () => {
    const query = {
      client: 1,
      name: 'user1'
    };
    service.getList(query).subscribe(res => {
      expect(res.data[0]).toEqual(siteListMock.data[0]);
      expect(res.data[0]).not.toEqual(siteListMock.data[1]);
    });

    const mockReq = httpMock.expectOne(req => req.url === '/api/sites/' && req.method === 'GET');

    mockReq.flush(siteListMock);
  });


  it('Create new site', () => {
    const newSite = new Site();
    newSite.data.name = 'Holiday Inn';
    newSite.data.site_id = 2211;
    newSite.data.client_id = 1;
    newSite.data.country = 'Macedonia';
    newSite.data.city = 'Skopje';
    newSite.data.client_code = 222;
    newSite.data.client_name = 'Client1';
    newSite.data.client_id = 1;
    newSite.data.address = 'Filip Vtori';

    service.create(newSite).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.msg).toEqual(siteListMock1.msg);
    });

    const mockReq = httpMock.expectOne(req => req.url === '/api/sites/' && req.method === 'POST');
    const siteListMock1 = {
      msg: 'The site has been created successfully'
    };
    mockReq.flush(siteListMock1);
  });


  it('Get site by id', () => {
    service.get(1).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.data.name).toEqual(siteMock1.data.name);
    });

    const mockReq = httpMock.expectOne(req => req.url === '/api/sites/1' && req.method === 'GET');

    mockReq.flush(siteMock1);
  });


  it('Update site', () => {
    const newSite = new Site();
    newSite.data.id = 1;
    newSite.data.name = 'Holiday Inn';
    newSite.data.site_id = 2211;
    newSite.data.client_id = 1;
    newSite.data.country = 'Macedonia';
    newSite.data.city = 'Skopje';
    newSite.data.client_code = 222;
    newSite.data.client_name = 'Client1';
    newSite.data.client_id = 1;
    newSite.data.address = 'Filip Vtori';

    service.update(newSite).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.msg).toEqual(siteListMock3.msg);
    });

    const mockReq = httpMock.expectOne(req => req.url === '/api/sites/1' && req.method === 'PUT');
    const siteListMock3 = {
      msg: 'The site has been updated successfully'
    };
    mockReq.flush(siteListMock3);

  });

  it('Delete site by id', () => {
    service.delete(1).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.msg).toEqual(siteListMock4.msg);
    });

    const mockReq = httpMock.expectOne(req => req.url === '/api/sites/1' && req.method === 'DELETE');
    const siteListMock4 = {
      msg: 'The site has been deleted successfully'
    };
    mockReq.flush(siteListMock4);
  });

});
