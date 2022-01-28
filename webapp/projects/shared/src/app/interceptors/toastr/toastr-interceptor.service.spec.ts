import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { ToastrInterceptorService } from './toastr-interceptor.service';
import { ToastrHandlerService } from './toastr-handler.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';


describe('ToastrInterceptorService', () => {
  let service: ToastrInterceptorService;
  let toastrHandlerServiceSpy: any;
  let httpMock: HttpTestingController;
  let http: HttpClient;

  beforeEach(() => {
    toastrHandlerServiceSpy = jasmine.createSpyObj('ToastrHandlerService', ['addResponse']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ToastrInterceptorService,
        {
          provide: ToastrHandlerService,
          useValue: toastrHandlerServiceSpy
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ToastrInterceptorService,
          multi: true
        }
      ]
    });
    httpMock = TestBed.get(HttpTestingController);
    http = TestBed.get(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });



  it('should be created', () => {
    service = TestBed.get(ToastrInterceptorService);
    expect(service).toBeTruthy();
  });


  it('should call addResponse one time for one HttpErrorResponse', fakeAsync(() => {
    http.get('/test')
      .subscribe(
        res => { },
        err => { }
      );

    const req = httpMock.expectOne('/test');
    expect(req.request.method).toBe('GET');
    req.flush('error', { status: 403, statusText: 'Bad Credentials' });

    flush();
    expect(toastrHandlerServiceSpy.addResponse).toHaveBeenCalledTimes(1);

  }));


  it('should call addResponse one time for one HttpResponse', fakeAsync(() => {
    http.get('/test')
      .subscribe(
        res => { },
        err => { }
      );

    const req = httpMock.expectOne('/test');
    expect(req.request.method).toBe('GET');
    req.flush('success', { status: 200, statusText: 'success' });

    flush();
    expect(toastrHandlerServiceSpy.addResponse).toHaveBeenCalledTimes(1);

  }));

});
