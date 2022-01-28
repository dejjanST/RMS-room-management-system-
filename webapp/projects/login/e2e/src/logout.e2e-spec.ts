import { browser, element, by, logging, Key } from 'protractor';
import { HttpClient } from 'protractor-http-client';

// have not logout component

xdescribe('Logout Test', () => {

    beforeEach(async () => {
        const http = new HttpClient();
        const getRequest = await http.get('http://rms-server:8000/e2e?uc_id=login_logout');
        expect(getRequest.statusCode).toEqual(200);

        browser.manage().deleteAllCookies();
        browser.get(browser.baseUrl + 'en/login');
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });


    it('should log in and log out successfully', () => {
        const email = element(by.css('.userEmail'));
        email.clear();
        email.sendKeys('test1@ved.mk');

        const pass = element(by.css('.userPassword'));
        pass.clear();
        pass.sendKeys('qwer1');

        const captcha = element(by.css('.userCaptcha'));
        captcha.clear();
        captcha.sendKeys('LfmU');

        browser.manage().addCookie({
            name: 'session',
            value: 'abe991d9-fb78-41df-bf57-c6552bdb7e03',
            path: '/'
        });

        const loginForm = element(by.id('loginForm'));
        loginForm.submit();

        // wait for success login
        browser.wait(() => {
            return element(by.css('.toast-success')).isPresent();
        }, 5000);

        expect(browser.getTitle()).toEqual('You are logged in');

        const logoutForm = element(by.id('logoutForm'));
        logoutForm.submit();

        // wait for succes loguot
        browser.wait(() => {
            return element(by.css('.toast-success')).isPresent();
        }, 5000);

        expect(browser.getTitle()).toEqual('Login');

    });


});

