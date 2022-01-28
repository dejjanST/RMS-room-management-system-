import { TestBed } from '@angular/core/testing';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { HttpErrorLogInterceptorService } from './http-error-log-interceptor.service';

describe('HttpErrorHandlerService', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  // let interceptor: HttpErrorLogInterceptorService;
  let service: HttpErrorHandlerService;

  beforeEach(() => {
    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpErrorLogInterceptorService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorLogInterceptorService,
          multi: true
        }
      ]
    });

    service = TestBed.get(HttpErrorHandlerService);
    httpClient = TestBed.get(HttpClient);
    httpMock = TestBed.get(HttpTestingController);
  });



  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('When status === 401', () => {
    const error = {
      status: 401,
      statusText: 'Bad Request'
    };

    // Make an HTTP GET request
    httpClient.get('/data')
      .pipe(
        catchError((err) => {
          expect(err.status).toEqual(401);
          expect(err.statusText).toEqual('Bad Request');
          return of([]);
        })
      )
      .subscribe();

    // The following `expectOne()` will match the request's URL.
    const req = httpMock.expectOne('/data');
    expect(req.request.method).toEqual('GET');

    // Respond with mock error
    req.flush(error);
  });


  it('The interceptor should save the error in localStorage', () => {
    // Make an HTTP GET request
    httpClient.get('/data').pipe(
      catchError(err => {
        return throwError(err);
      }))
      .subscribe(res => {
        //  console.log(this.store);
      },
        err => {
          expect(JSON.parse(localStorage.getItem('HttpErrors')).length).toEqual(1);
        });

    // The following `expectOne()` will match the request's URL.
    const req = httpMock.expectOne('/data');
    expect(req.request.method).toEqual('GET');

    // Respond with mock error
    req.flush({ message: 'error' }, { status: 400, statusText: 'bad credentials' });
  });


  it('Local storage should contain max 100 request errors', () => {
    const niza: any[] = [];

    for (let i = 1; i <= 130; i++) {
      niza.unshift(
        {
          status: 400,
          url: '/data',
          message: 'Http failure response for /data: 400 bad credentials',
          clientTime: '2020-03-13T11:11:35.367Z',
          serverTime: null
        });
    }

    localStorage.setItem('HttpErrors', JSON.stringify(niza));

    httpClient.get('/data').pipe(
      catchError(err => {
        return throwError(err);
      }))
      .subscribe(res => {
        // console.log(this.store);
      },
        err => {
          expect(JSON.parse(localStorage.getItem('HttpErrors')).length).toEqual(100);
        });

    // The following `expectOne()` will match the request's URL.
    const req = httpMock.expectOne('/data');
    expect(req.request.method).toEqual('GET');

    // Respond with mock error
    req.flush({ message: 'error' }, { status: 400, statusText: 'bad credentials' });
  });


});
