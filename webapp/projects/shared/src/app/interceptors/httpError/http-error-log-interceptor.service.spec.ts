import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { HttpErrorLogInterceptorService } from './http-error-log-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorHandlerService } from './http-error-handler.service';

describe('HttpErrorLogInterceptorService', () => {
    let interceptor: HttpErrorLogInterceptorService;
    let httpErrorHandler: any;
    let httpMock: HttpTestingController;
    let http: HttpClient;

    beforeEach(() => {
        const httpErrorHandlerSpy = jasmine.createSpyObj('HttpErrorHandlerService', ['add']);
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                HttpClientModule
            ],
            providers: [
                {
                    provide: HttpErrorHandlerService,
                    useValue: httpErrorHandlerSpy
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: HttpErrorLogInterceptorService,
                    multi: true
                }
            ]
        });
        interceptor = TestBed.get(HttpErrorLogInterceptorService);
        httpErrorHandler = TestBed.get(HttpErrorHandlerService);
        httpMock = TestBed.get(HttpTestingController);
        http = TestBed.get(HttpClient);
    });



    it('should be created', () => {
        expect(interceptor).toBeTruthy();
    });


    it('should call add method from HttpErrorHandlerService', fakeAsync(() => {
        http.get('/test').subscribe(
            res => { },
            err => { }
        );

        flush();

        const httpRequest = httpMock.expectOne(req => req.url === '/test' && req.method === 'GET');
        httpRequest.flush('err', { status: 403, statusText: 'Forbiden' });

        expect(httpErrorHandler.add).toHaveBeenCalledTimes(1);

    }));



});
