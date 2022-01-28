import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API, GROUPS } from '../constants';
import { groupAccessMock1, groupListMock, groupMock } from './access-mock';
import { RequestAccessGroup } from './access.model';
import { GroupService } from './group.service';

describe('GroupService', () => {
  let service: GroupService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    http = TestBed.inject(HttpTestingController);
    service = TestBed.inject(GroupService);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('getList() without params testing', () => {
    service.getList().subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.data.length).toEqual(10);
    });

    const req = http.expectOne(`${API}/groups/`);
    expect(req.request.method).toEqual('GET');
    req.flush(groupListMock);
  });

  it('getList() with params testing', () => {
    service.getList('group').subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.data.length).toEqual(10);
    });

    const req = http.expectOne(`${API}/groups/?name=group`);
    expect(req.request.method).toEqual('GET');
    req.flush(groupListMock);
  });


  it('getAccess() testing', () => {
    service.getAccess(1).subscribe(res => {
      expect(res).toBeTruthy();
      expect(res.data.groups.length).toEqual(2);
    });

    const req = http.expectOne(`${API}/groups/1`);
    expect(req.request.method).toEqual('GET');
    req.flush(groupAccessMock1);
  });


  it('create() testing', () => {
    const group = new RequestAccessGroup();

    service.create(group).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = http.expectOne(`${API}${GROUPS}/`);
    expect(req.request.method).toEqual('POST');
    req.flush({ msg: 'success' });
  });



  it('update() testing', () => {
    const group = new RequestAccessGroup();

    service.update(3, group).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = http.expectOne(`${API}${GROUPS}/3`);
    expect(req.request.method).toEqual('PUT');
    req.flush({ msg: 'success' });
  });


  it('delete() testing', () => {

    service.delete(groupMock).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = http.expectOne(`${API}${GROUPS}/1?force=false`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({ msg: 'success' });
  });

});
