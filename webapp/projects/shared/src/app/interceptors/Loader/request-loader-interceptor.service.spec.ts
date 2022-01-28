import { TestBed, fakeAsync, flush } from '@angular/core/testing';

import { RequestLoaderInterceptorService } from './request-loader-interceptor.service';
import { RequestLoaderService } from './request-loader.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';

describe('RequestLoaderInterceptorService', () => {
    let service: RequestLoaderInterceptorService;
    let requestLoaderService: any;
    let http: HttpClient;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        const loaderSpy = jasmine.createSpyObj('RequestLoaderService', ['addRequest', 'removeRequest']);

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                RequestLoaderService,
                {
                    provide: RequestLoaderService,
                    useValue: loaderSpy
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: RequestLoaderInterceptorService,
                    multi: true
                }
            ]
        });
        service = TestBed.get(RequestLoaderInterceptorService);
        requestLoaderService = TestBed.get(RequestLoaderService);
        http = TestBed.get(HttpClient);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });



    it('should be created', () => {
        expect(service).toBeTruthy();
    });


    it('addRequest and removeRequest should be called once on HttpErrorResponse', fakeAsync(() => {
        http.get('/test')
            .subscribe(
                res => { },
                err => { }
            );

        const req = httpMock.expectOne('/test');
        expect(req.request.method).toBe('GET');
        req.flush('error', { status: 403, statusText: 'Bad Credentials' });

        flush();
        expect(requestLoaderService.addRequest).toHaveBeenCalledTimes(1);
        expect(requestLoaderService.removeRequest).toHaveBeenCalledTimes(1);
    }));


    it('addRequest and removeRequest should be called once on HttpResponse', fakeAsync(() => {
        http.get('/test')
            .subscribe(
                res => { },
                err => { }
            );

        const req = httpMock.expectOne('/test');
        expect(req.request.method).toBe('GET');
        req.flush('success');

        flush();
        expect(requestLoaderService.addRequest).toHaveBeenCalledTimes(1);
        expect(requestLoaderService.removeRequest).toHaveBeenCalledTimes(1);
    }));



});
