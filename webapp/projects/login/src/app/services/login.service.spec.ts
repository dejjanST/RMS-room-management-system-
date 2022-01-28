import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { UserRequestModel } from '../models/user-model';


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

    afterEach(() => {
        http.verify();
    });


    it('should be created', () => {
        expect(service).toBeTruthy('not created');
    });


    it('should login succesfully', () => {
        const user = new UserRequestModel();
        user.email = 'email';
        user.password = 'password';
        user.captcha = 'captcha';

        service.login(user).subscribe(
            res => {
                expect(res).toBeTruthy();
            },
            err => {
                expect(err).toBeFalsy();
            });

        const req = http.expectOne('/api/session/');
        req.flush({ login: 'successful' });
        expect(req.request.method).toBe('PUT');
    });


    it('should get error Bad Credentials', () => {
        const user = new UserRequestModel();
        user.email = '';
        user.password = '';
        user.captcha = '';

        service.login(user).subscribe(
            res => {
                expect(res).toBeTruthy();
            },
            err => {
                expect(err).toBeTruthy();
            });

        const req = http.expectOne('/api/session/');
        req.flush({ login: 'Bad Credentials' }, { status: 400, statusText: 'Bad Credentials' });
        expect(req.request.method).toBe('PUT');
    });


    it('should get logged user details', () => {
        const dummyResponse = { user: { username: 'usr', coockieId: 'd6as78d6as8d6as78' } };

        service.loginCheck().subscribe(
            res => {
                expect(res.body).toBe(dummyResponse, 'response do not match with mock');
            }
        );

        const req = http.expectOne('/api/session/');
        req.flush(dummyResponse);
        expect(req.request.method).toBe('GET');
    });

});
