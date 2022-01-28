import { TestBed, inject, fakeAsync, tick, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GlobalSettingsService } from './global-settings.service';
import { HttpClient, HttpBackend, HttpRequest, HttpResponse, HttpHandler } from '@angular/common/http';
import { log } from 'util';
import { ResponseUserSettingsModel, ResponseGlobalModel, ResponseGlobalMapSettingsModel } from '../models/settings-models';

describe('GlobalSettingsService', () => {
    let injector: TestBed;
    let service: GlobalSettingsService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        injector = getTestBed();
        service = injector.get(GlobalSettingsService);
        httpMock = injector.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    })

    it('should be created', () => {
        expect(service).toBeTruthy();

    });

    const dummyResponse = { "items": [{ "key": "marker_settings", "value": "1", "system": false, "option": [{ "color1": "#d40b0b", "img": "4", "color0": "#4ca137", "color2": "#fa0d35", "var": 1, "color3": "#a59696", "size": 9.3, "dev_type": 1 }, { "img": "0", "color0": "#02fc62", "color2": "#ff0000", "var": 0, "color3": "#9c989d", "size": 9.9, "dev_type": 2 }], "id": 1 }, { "key": "lng_settings", "value": "EN", "system": false, "option": { "LANGUAGE": "EN" }, "id": 3 }, { "key": "MAP", "value": "1", "system": false, "option": { "extent": false, "min_zoom": 4, "center": [37.001953125, 58.95000823335701], "zoom": 4, "max_zoom": 19 }, "id": 4 }, { "key": "LANGUAGE", "value": "EN", "system": false, "option": { "LANGUAGE": "EN" }, "id": 5 }, { "key": "MY_DEVICES", "value": "1", "system": false, "option": {}, "id": 7 }, { "key": "APP_LIMITS", "value": "1", "system": false, "option": { "11": { "3": 1, "2": null }, "24": { "3": 21, "1": 5, "0": 10, "6": 60, "5": 30 }, "-1": { "3": 365, "0": 10, "6": 600, "4": 1095, "1": 5, "2": 30, "5": 30 }, "16": { "1": 10, "0": 20 }, "1": { "3": -1, "4": -1, "1": 100, "2": -1, "0": -1 }, "2": { "1": 20, "0": 100 }, "8": { "1": 2, "0": 3 }, "20": { "6": null }, "21": { "6": 677 }, "19": { "3": 300, "1": 5, "0": 10, "6": 600, "5": 30 }, "3": { "3": 21, "1": 2, "0": 3, "6": 600, "5": 30 }, "25": { "3": 365 }, "9": { "0": 10 }, "17": { "0": 50 } }, "id": 8 }, { "key": "CLIENT", "value": "OJE", "system": false, "option": {}, "id": 10 }], "meta": { "num_pages": 1, "page": 1, "per_page": 20, "total": 7 } };
    it('get() should return ResponseGlobalModel', () => {

        service.get().subscribe((res) => {
            expect(res instanceof ResponseGlobalModel).toBeTruthy();
            expect(res).toEqual(new ResponseGlobalModel(dummyResponse));

        })
        const req = httpMock.expectOne('/api/app_settings/api/setting/');
        expect(req.request.method).toBe('GET');
        req.flush(dummyResponse);
    })

    it('ResponseGlobalModel should have map of ResponseGlobalMapSettingsModel', () => {

        service.get().subscribe((res) => {

            expect(res.map instanceof ResponseGlobalMapSettingsModel).toBeTruthy();
        })
        const req = httpMock.expectOne('/api/app_settings/api/setting/');
        expect(req.request.method).toBe('GET');
        req.flush(dummyResponse);
    })
});

