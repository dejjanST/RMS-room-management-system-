import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginService } from './login.service';
import { UserRequestModel } from 'projects/login/src/app/models/user-model';

describe('LoginService', () => {
  let service: LoginService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(LoginService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should get logged user details', () => {
    const dummyResponse = { user: { username: 'usr', coockieId: 'd6as78d6as8d6as78' } };

    service.loginCheck().subscribe(
      res => {
        expect(res).toBe(dummyResponse, 'response do not match with mock');
      }
    );

    const req = http.expectOne('/api/session/');
    req.flush(dummyResponse);
    expect(req.request.method).toBe('GET');
  });
});
