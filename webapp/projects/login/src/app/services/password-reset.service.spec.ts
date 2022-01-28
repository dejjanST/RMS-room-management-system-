import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { PasswordResetService } from './password-reset.service';
import { ResetPass } from '../models/reset-pass';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { VedMetaToastr } from 'projects/shared/src/app/interceptors/toastr/ved-meta-toastr';

describe('PasswordResetService', () => {

    let service: PasswordResetService;
    let http: HttpTestingController;


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });

        service = TestBed.get(PasswordResetService);
        http = TestBed.get(HttpTestingController);
    });


    afterEach(() => {
        http.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should reset succesfully', () => {
        const user = new ResetPass();
        user.password = 'password';
        user.confirm_pass = 'password';
        user.token = '1234';

        service.resetPass(user).subscribe(
            res => {
                expect(res).toBeTruthy();
            },
            err => {
                expect(err).toBeFalsy();
            });

        const req = http.expectOne('/api/auth/reset/');
        req.flush({ reset: 'successful' });
        expect(req.request.method).toBe('PUT');
    });


    it('should get error', () => {
        const user = new ResetPass();
        user.password = '';
        user.confirm_pass = '';
        user.token = '';

        service.resetPass(user).subscribe(
            err => {
                expect(err).toBeTruthy();
            });

        const req = http.expectOne('/api/auth/reset/');
        req.flush({ reset: 'error' });
        expect(req.request.method).toBe('PUT');
    });


    it('should get Users List forom /api/users with querry params', () => {
        service.sendMail('mail@mail.com').subscribe(res => {
            expect(res).toBeTruthy();
        });

        const mockedReq = http.expectOne(req => req.url === '/api/auth/reset' && req.method === 'GET' && req.params.has('email'));
        mockedReq.flush('test');

    });
});
