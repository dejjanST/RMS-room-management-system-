import { browser, logging, element, By } from 'protractor';
import { HttpClient } from 'protractor-http-client';

describe('Floor Layout Edit', () => {

    beforeAll(() => {
        browser.get(browser.baseUrl + 'en/definition/#/sites/1/fld/edit/1');
    });


    beforeEach(async () => {
        const http = new HttpClient();
        const getRequest = await http.get('http://rms-server:8000/e2e?uc_id=floor_layout');
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

        browser.get(browser.baseUrl + 'en/definition/#/sites/1/fld/edit/1');
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });

    // Most of functionalities of Edit form are covered by Create form tests.

    it('title should contain Floor layout list', () => {
        expect(browser.getTitle()).toContain('Floor Layout Definition');
    });

    it('testing edit form', () => {
        const submitBtn = element(By.css('button[type="submit"]'));
        const name = element(By.id('FLName'));
        // //const ut3Btn = element(By.id('ut3Btn'));

        // before all submit button should be enabled
        expect(submitBtn.isEnabled()).toBeTruthy();

        // check filled form
        expect(name.getAttribute('value')).toEqual('Test floor layout 1 ut');
        // should have 2 widgets
        // //expect(element.all(By.className('widget')).count()).toEqual(2);


        // edit form
        name.clear();
        name.sendKeys('Ground Floor');
        expect(name.getAttribute('value')).toEqual('Ground Floor');
        expect(submitBtn.isEnabled()).toBeTruthy();

        // // add another widget, number of widgets should be 3
        // ut3Btn.click();
        // expect(element.all(By.className('widget')).count()).toEqual(3);

        // submit edited form
        submitBtn.click();

        browser.wait(() => {
            return element(By.className('toast-success')).isDisplayed();
        }, 5000);

    });

});
