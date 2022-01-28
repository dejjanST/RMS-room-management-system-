import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { ToastrHandlerService, ServerResponseModel } from './toastr-handler.service';
import { HttpErrorResponse, HttpResponse, HttpRequest } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { VedMetaToastr, VedMetaToastrParams } from './ved-meta-toastr';

describe('ToastrHandlerService', () => {
    let service: ToastrHandlerService;
    let toastrSpy: any;

    beforeEach(() => {
        toastrSpy = jasmine.createSpyObj('ToastrService', ['show', 'success', 'error', 'info', 'warning']);
        TestBed.configureTestingModule({
            imports: [
                ToastrModule.forRoot(),
            ],
            providers: [
                ToastrHandlerService,
                { provide: ToastrService, useValue: toastrSpy }
            ]
        });
        service = TestBed.get(ToastrHandlerService);

    });



    it('should be created', () => {
        expect(service).toBeTruthy();
    });


    it('should get success toastr message', fakeAsync(() => {
        const dummyObject = new VedMetaToastr();
        dummyObject.params = new VedMetaToastrParams();
        dummyObject.req = new HttpRequest('GET', '/test');
        let bodyRes = new ServerResponseModel();
        bodyRes.msg = 'success';
        dummyObject.res = new HttpResponse({ status: 200, statusText: 'OK', url: '/test', body: bodyRes });

        service.addResponse(dummyObject);

        flush();

        expect(toastrSpy.error).not.toHaveBeenCalled();
        expect(toastrSpy.success).toHaveBeenCalledTimes(1);
    }));


    it('should NOT get success toastr message', fakeAsync(() => {
        const dummyObject = new VedMetaToastr();
        dummyObject.params = new VedMetaToastrParams();
        dummyObject.req = new HttpRequest('GET', '/test');
        let bodyRes = new ServerResponseModel();
        bodyRes.data = 'success';
        dummyObject.res = new HttpResponse({ status: 200, statusText: 'OK', url: '/test', body: bodyRes });

        service.addResponse(dummyObject);

        flush();

        expect(toastrSpy.error).not.toHaveBeenCalled();
        expect(toastrSpy.success).toHaveBeenCalledTimes(0);
    }));


    it('should get client error toastr message', fakeAsync(() => {
        const dummyObject = new VedMetaToastr();
        dummyObject.params = new VedMetaToastrParams();
        dummyObject.req = new HttpRequest('GET', '/test');
        dummyObject.res = new HttpErrorResponse({ status: 403, statusText: 'Bad Credentials', url: '/test', error: { msg: 'error' } });

        service.addResponse(dummyObject);

        flush();

        expect(toastrSpy.success).not.toHaveBeenCalled();
        expect(toastrSpy.error).toHaveBeenCalledTimes(1);
    }));

    it('should NOT get client error toastr message', fakeAsync(() => {
        const dummyObject = new VedMetaToastr();
        dummyObject.params = new VedMetaToastrParams();
        dummyObject.req = new HttpRequest('GET', '/test');
        dummyObject.res = new HttpErrorResponse({ status: 403, statusText: 'Bad Credentials', url: '/test', error: { data: 'error' } });

        service.addResponse(dummyObject);

        flush();

        expect(toastrSpy.success).not.toHaveBeenCalled();
        expect(toastrSpy.error).toHaveBeenCalledTimes(0);
    }));



    it('should get server error toastr message', fakeAsync(() => {
        const dummyObject = new VedMetaToastr();
        dummyObject.params = new VedMetaToastrParams();
        dummyObject.req = new HttpRequest('GET', '/test');
        dummyObject.res = new HttpErrorResponse({ status: 500, statusText: 'Internal Server Error', url: '/test' });

        service.addResponse(dummyObject);

        flush();

        expect(toastrSpy.success).not.toHaveBeenCalled();
        expect(toastrSpy.error).toHaveBeenCalledTimes(1);
    }));



    // it('should add 200 success response', fakeAsync(() => {

    //   const successResponse = new HttpResponse({ status: 200 });


    //   service.errorResponses$.subscribe(res => {
    //     expect(res).toBeFalsy();
    //   });

    //   service.serverErrorResponses$.subscribe(res => {
    //     expect(res).toBeFalsy();
    //   });

    //   service.successResponses$.subscribe(res => {
    //     expect(res).toBeTruthy();
    //     expect(res instanceof HttpResponse).toBeTruthy();

    //   });

    //   service.addResponse(successResponse);

    //   flush();
    // }));


    // it('should add 500 server error response', fakeAsync(() => {

    //   const successResponse = new HttpErrorResponse({ status: 500 });


    //   service.errorResponses$.subscribe(res => {
    //     expect(res).toBeFalsy();
    //   });

    //   service.serverErrorResponses$.subscribe(res => {
    //     expect(res).toBeTruthy();
    //     expect(res instanceof HttpErrorResponse).toBeTruthy();

    //   });

    //   service.successResponses$.subscribe(res => {
    //     expect(res).toBeFalsy();

    //   });

    //   service.addResponse(successResponse);

    //   flush();
    // }));

});
