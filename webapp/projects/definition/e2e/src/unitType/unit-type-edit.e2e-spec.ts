import { browser, logging, element, by, Key } from 'protractor';
import { HttpClient } from 'protractor-http-client';

describe('Unit Type Edit', () => {
    beforeAll(() => {
        browser.get(browser.baseUrl + 'en/definition/#/units/edit/1');
    });

    beforeEach(async () => {
        const http = new HttpClient();
        const getRequest = await http.get('http://rms-server:8000/e2e?uc_id=unit_type');
        expect(getRequest.statusCode).toEqual(200);

        browser.manage().deleteAllCookies();
        browser.manage().addCookie({
            name: 'session',
            value: '5f0aa8d2-b12d-471a-ab40-85b778106201',
            path: '/',
        });
        browser.manage().addCookie({
            name: 'Llang',
            value: 'en',
            path: '/',
        });

        browser.get(browser.baseUrl + 'en/definition/#/units/edit/1');
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });

    it('title should contain Unit Type List', () => {
        expect(browser.getTitle()).toContain('Edit Unit Type');
    });

    it('edit form and submit', () => {
        const generalData = element(by.className('mat-expansion-panel-header'));
        const utName = element(by.id('utName'));
        const roomsNumber = element(by.id('roomsNumber'));
        const submitBtn = element(by.css('button[type="submit"]'));
        const toastSuccess = element(by.className('toast-success'));
        const rwuSelected = element(by.css('#typeRoomWallUnit .selectedByType'));
        const fdwuSelected = element(by.css('#typeFrontDoorWallUnit .selectedByType'));
        const fcuSelected = element(by.css('#typeFCU .selectedByType'));

        // this equipments should be selected
        expect(fcuSelected.getText()).toEqual('FCU2P - HHV0T / 1');
        expect(rwuSelected.getText()).toEqual('RWU / 1');
        expect(fdwuSelected.getText()).toEqual('FDWU / 1');

        // opening accordion General Data
        generalData.click();
        browser.wait(() => {
            return element(by.id('utName')).isPresent();
        }, 5000);

        // changing filled form
        utName.clear();
        utName.sendKeys('Test 2');
        roomsNumber.clear();
        roomsNumber.sendKeys(3);
        roomsNumber.sendKeys(Key.TAB);

        // after change rooms number Room Wall Unit should be changed
        expect(rwuSelected.getText()).toEqual('RWU / 3');

        // submit form
        expect(submitBtn.isEnabled()).toBeTruthy();
        submitBtn.click();

        browser.wait(() => {
            return toastSuccess.isPresent();
        }, 5000);

        expect(toastSuccess.isPresent()).toBeTruthy();
    });

});
