import { browser, logging, element, by } from 'protractor';
import { HttpClient } from 'protractor-http-client';

describe('Unit Type Create', () => {
    beforeAll(() => {
        browser.get(browser.baseUrl + 'en/definition/#/units/new');
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

        browser.get(browser.baseUrl + 'en/definition/#/units/new');
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });

    it('title should contain Unit Type List', () => {
        expect(browser.getTitle()).toContain('Create Unit Type');
    });

    it('test validation, IO terminals and submit button', () => {
        const remainingHV = element(by.id('remainingHV'));
        const remainingAV = element(by.id('remainingAV'));
        const remainingLV = element(by.id('remainingLV'));
        const remainingRO = element(by.id('remainingRO'));
        const remainingTIDI = element(by.id('remainingTIDI'));
        const typeFCU = element(by.id('typeFCU'));
        const generalData = element(by.className('mat-expansion-panel-header'));
        const mcOption = element(by.id('mcOption1'));
        const mcSelect = element(by.id('mcSelect'));
        const utName = element(by.id('utName'));
        const submitBtn = element(by.css('button[type="submit"]'));
        const eq7 = element(by.id('eq7'));
        const img7 = element(by.id('img7'));
        const qty7 = element(by.id('qty7'));
        const eq8 = element(by.id('eq8'));
        const toastSuccess = element(by.className('toast-success'));

        // invalid form
        expect(submitBtn.isEnabled()).toBeFalsy();

        // before select Master Controller, remaining IO terminals should be 0
        expect(remainingHV.getText()).toEqual('0');
        expect(remainingAV.getText()).toEqual('0');
        expect(remainingLV.getText()).toEqual('0');
        expect(remainingRO.getText()).toEqual('0');
        expect(remainingTIDI.getText()).toEqual('0');

        // when have not remaining IO terminals, the equipments should be disabled
        typeFCU.click();
        expect(eq7.isEnabled()).toBeFalsy();

        // opening accordion General Data
        generalData.click();
        browser.wait(() => {
            return element(by.id('utName')).isPresent();
        }, 5000);

        // filling form
        utName.sendKeys('Test 1');
        expect(submitBtn.isEnabled()).toBeFalsy();

        // select Master Controler: Room Controller
        mcSelect.click();
        mcOption.click();
        expect(submitBtn.isEnabled()).toBeTruthy();

        // Room Wall Unit and Front Door Wall Unit should be automaticly selected
        const rwuSelected = element(by.css('#typeRoomWallUnit .selectedByType'));
        expect(rwuSelected.getText()).toEqual('RWU / 1');
        const fdwuSelected = element(by.css('#typeFrontDoorWallUnit .selectedByType'));
        expect(fdwuSelected.getText()).toEqual('FDWU / 1');

        // checking remaining IO terminals
        expect(remainingHV.getText()).toEqual('12');
        expect(remainingAV.getText()).toEqual('4');
        expect(remainingLV.getText()).toEqual('8');
        expect(remainingRO.getText()).toEqual('2');
        expect(remainingTIDI.getText()).toEqual('21');

        // when have remaining IO terminals, the equipments should be enabled
        expect(eq7.isEnabled()).toBeTruthy();
        expect(img7.isDisplayed()).toBeTruthy();

        // select equipment FCU with id 7
        img7.click();
        const fcuSelected = element(by.css('#typeFCU .selectedByType'));
        expect(fcuSelected.getText()).toEqual('FCU2P - HHV0T / 1');

        // checking remaining IO terminals after selected FCU
        expect(remainingHV.getText()).toEqual('8');
        expect(remainingAV.getText()).toEqual('4');
        expect(remainingLV.getText()).toEqual('8');
        expect(remainingRO.getText()).toEqual('2');
        expect(remainingTIDI.getText()).toEqual('21');

        // change quantity of selected FCU
        qty7.clear();
        qty7.sendKeys(3);

        // checking remaining IO terminals after increase quantity of selected FCU
        expect(remainingHV.getText()).toEqual('0');
        expect(remainingAV.getText()).toEqual('4');
        expect(remainingLV.getText()).toEqual('8');
        expect(remainingRO.getText()).toEqual('2');
        expect(remainingTIDI.getText()).toEqual('21');

        // after have not remaining IO terminals, other equipments should be disabled
        expect(eq8.isEnabled()).toBeFalsy();


        // after deselect selected equipment, IO terminals should be released
        img7.click();
        expect(remainingHV.getText()).toEqual('12');
        expect(remainingAV.getText()).toEqual('4');
        expect(remainingLV.getText()).toEqual('8');
        expect(remainingRO.getText()).toEqual('2');
        expect(remainingTIDI.getText()).toEqual('21');


        // select equipment and submit form
        img7.click();
        expect(submitBtn.isEnabled()).toBeTruthy();
        submitBtn.click();

        browser.wait(() => {
            return toastSuccess.isPresent();
        }, 5000);

        expect(toastSuccess.isPresent()).toBeTruthy();

        // after create unit type, should redirect to unit type list
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'en/definition/#/units');
    });

});
