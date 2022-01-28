import { browser, logging, element, By } from 'protractor';
import { HttpClient } from 'protractor-http-client';

describe('Floor Layout Create', () => {

    beforeAll(() => {
        browser.get(browser.baseUrl + 'en/definition/#/sites/1/fld/new');
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

        browser.get(browser.baseUrl + 'en/definition/#/sites/1/fld/new');
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });

    it('title should contain Floor layout list', () => {
        expect(browser.getTitle()).toContain('Floor Layout Definition');
    });

    it('testing create form', () => {
        const submitBtn = element(By.css('button[type="submit"]'));
        const name = element(By.id('FLName'));
        const ut3Btn = element(By.id('ut3Btn'));

        // before all submit button should be disabled
        expect(submitBtn.isEnabled()).toBeFalsy();

        // filling form
        name.sendKeys('Ground Floor');
        expect(submitBtn.isEnabled()).toBeFalsy();

        // upload image
        const fileAbsolutePath = '/project/webapp/projects/definition/e2e/src/floorLayout/natureImage.jpg';
        const fileUpload = element(By.css('input[type="file"]'));
        fileUpload.sendKeys(fileAbsolutePath);

        browser.wait(() => {
            return element(By.className('toast-success')).isDisplayed();
        }, 5000);

        // form should be valid
        expect(submitBtn.isEnabled()).toBeTruthy();

        // // adding unit types on floor layout
        // const ut1Btn = element(By.id('ut1Btn'));
        // ut1Btn.click();
        // // index should be 1
        // expect(element(By.css('#widgetRC0 .index')).getAttribute('value')).toEqual('1');

        // // testing Unit Type index validation
        // expect(submitBtn.isEnabled()).toBeTruthy();

        // // Room Controller index range is 1-999
        // // Test validation with out of range numbers
        // element(By.css('#widgetRC0 .index')).clear();
        // element(By.css('#widgetRC0 .index')).sendKeys(0);
        // expect(submitBtn.isEnabled()).toBeFalsy();

        // element(By.css('#widgetRC0 .index')).clear();
        // element(By.css('#widgetRC0 .index')).sendKeys(1000);
        // expect(submitBtn.isEnabled()).toBeFalsy();

        // // set widget index to 1 and add another widget with Room Controller
        // element(By.css('#widgetRC0 .index')).clear();
        // element(By.css('#widgetRC0 .index')).sendKeys(1);
        // expect(submitBtn.isEnabled()).toBeTruthy();
        // // ut1Btn.click();

        // // this widged should have index 2 (first available in Room Controller range array)
        // expect(element(By.css('#widgetRC1 .index')).getAttribute('value')).toEqual('2');

        // // identical indexes on widgets with Room Controller should disable submit button
        // element(By.css('#widgetRC1 .index')).clear();
        // element(By.css('#widgetRC1 .index')).sendKeys(1);
        // expect(submitBtn.isEnabled()).toBeFalsy();

        // // set widget index to 2, submit button should be enabled
        // element(By.css('#widgetRC1 .index')).clear();
        // element(By.css('#widgetRC1 .index')).sendKeys(2);
        // expect(submitBtn.isEnabled()).toBeTruthy();

        // // adding widget with Corridor Controller, index should be 1
        // // (first available in Corridor Controller and Access Controller range array)
        // ut3Btn.click();
        // expect(element(By.css('#widgetCCAC0 .index')).getAttribute('value')).toEqual('1');
        // expect(submitBtn.isEnabled()).toBeTruthy();

        // // Corridor Controller and Access Controller index range is 1-99
        // // Test validation with out of range numbers
        // element(By.css('#widgetCCAC0 .index')).clear();
        // element(By.css('#widgetCCAC0 .index')).sendKeys(0);
        // expect(submitBtn.isEnabled()).toBeFalsy();

        // element(By.css('#widgetCCAC0 .index')).clear();
        // element(By.css('#widgetCCAC0 .index')).sendKeys(100);
        // expect(submitBtn.isEnabled()).toBeFalsy();

        // // set widget index to 1 and add another widget with Room Controller
        // element(By.css('#widgetCCAC0 .index')).clear();
        // element(By.css('#widgetCCAC0 .index')).sendKeys(1);
        // expect(submitBtn.isEnabled()).toBeTruthy();
        // ut3Btn.click();

        // // this widged should have index 2 (first available in Room Controller range array)
        // expect(element(By.css('#widgetCCAC1 .index')).getAttribute('value')).toEqual('2');

        // // deleting widget with index 2, and adding new widget from same type shoulg get againg index 2
        // // mouse over to be displayed delete button
        // browser.actions().mouseMove(element(By.id('widgetCCAC1'))).perform();
        // element(By.id('widgetCCAC1DelBtn')).click();
        // ut3Btn.click();
        // expect(element(By.css('#widgetCCAC1 .index')).getAttribute('value')).toEqual('2');

        // // submit form
        // expect(submitBtn.isEnabled()).toBeTruthy();
        // submitBtn.click();

        // // after succes create, should redirect to edit form for this Floor Layout
        // expect(browser.getCurrentUrl()).toContain('/sites/1/fld/edit/4');
    });

});
