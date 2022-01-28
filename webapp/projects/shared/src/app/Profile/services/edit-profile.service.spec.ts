import { TestBed } from '@angular/core/testing';

import { EditProfileService } from './edit-profile.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostProfile } from '../models/profile';

describe('EditProfileService', () => {
  let service: EditProfileService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.get(EditProfileService);
    httpMock = TestBed.get(HttpTestingController);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should test editProfile method', () => {
    const id = 1;
    service.editProfile().subscribe(res => {
      expect(res).toBeTruthy();
    });

    const mockedReq = httpMock.expectOne(req => req.url === `/api/users/user` && req.method === 'GET');
    mockedReq.flush('test');
  });


  it('should test updateProfile method', () => {
    const user = new PostProfile();
    service.updateProfile(user).subscribe(res => {
      expect(res).toBeTruthy();
    });
    const mockedReq = httpMock.expectOne(req => req.url === `/api/users/user` && req.method === 'PUT');
    mockedReq.flush('test');
  });
});
