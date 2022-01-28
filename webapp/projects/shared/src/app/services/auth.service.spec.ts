import { TestBed } from '@angular/core/testing';
import { of, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { LoginService } from './login.service';
import { GlobalService } from 'projects/definition/src/app/globalService/global.service';
import { UserRequestModel } from 'projects/login/src/app/models/user-model';

class GlobalServiceMock {
  public user$: BehaviorSubject<UserRequestModel> = new BehaviorSubject<UserRequestModel>(new UserRequestModel());
}

describe('AuthService', () => {
  let service: AuthService;
  let loginServiceSpy: any;

  beforeEach(() => {
    loginServiceSpy = jasmine.createSpyObj('LoginService', ['loginCheck']);
    TestBed.configureTestingModule({
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: GlobalService, useClass: GlobalServiceMock }
      ]
    });
    service = TestBed.inject(AuthService);
    loginServiceSpy.loginCheck.and.returnValue(of('success'));
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('if user is logged in, should return true', () => {
    service.canActivate().subscribe(res => {
      expect(res).toBeTrue();
    });
  });

});
