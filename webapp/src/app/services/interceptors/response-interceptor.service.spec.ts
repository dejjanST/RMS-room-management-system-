import { TestBed, inject, getTestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ResponseInterceptorService } from './response-interceptor.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { pipe, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const testUrl = '/data';

interface Data {
    name: string;
}

describe('intercept', () => {
    let interceptor: ResponseInterceptorService;
    let httpClient: HttpClient;
    let httpMock: HttpTestingController;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                ToastrModule.forRoot()
            ],
            providers: [ResponseInterceptorService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: ResponseInterceptorService,
                    multi: true,
                }
            ]
        });

        interceptor = TestBed.get(ResponseInterceptorService);
        httpClient = TestBed.get(HttpClient);
        httpMock = TestBed.get(HttpTestingController);

        // spyOn(toastrService, 'error');
    });

    it('When status === 401', inject([ToastrService], (toastrService: ToastrService) => {


        spyOn(toastrService, 'error');

        const error = {
            status: 401,
            statusText: 'Bad Request'
        };

        // Make an HTTP GET request
        httpClient.get<Data>('testUrl')
            .pipe(
                catchError((err) => {
                    expect(toastrService.error).toHaveBeenCalledTimes(1);
                    expect(toastrService.error).toHaveBeenCalled();
                    expect(err.status).toEqual(401);
                    expect(err.statusText).toEqual('Bad Request');
                    return of([]);
                })
            )
            .subscribe();

        // The following `expectOne()` will match the request's URL.
        const req = httpMock.expectOne('testUrl');

        expect(req.request.method).toEqual('GET');

        // Respond with mock error
        req.flush(error);
    }));

});



