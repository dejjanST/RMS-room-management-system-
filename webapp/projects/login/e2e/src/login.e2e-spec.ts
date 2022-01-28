import { browser, element, by, logging, Key } from 'protractor';
import { HttpClient } from 'protractor-http-client';

describe('Login Test', () => {

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


    it('should have a title named Login', () => {
        expect(browser.getTitle()).toEqual('Login');
    });

    it('should log in successfully', () => {
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

        const form = element(by.id('loginForm'));
        form.submit();

        // // wait for success login
        // browser.wait(() => {
        //     return element(by.css('.toast-success')).isPresent();
        // }, 5000);

        expect(browser.getTitle()).not.toEqual('Login');
    });

    it('test email, password and captcha validation', () => {
        const form = element(by.tagName('form'));
        const email = element(by.name('email'));
        const password = element(by.name('password'));
        const captcha = element(by.name('captcha'));
        const submitBtn = element(by.css('button[type="submit"]'));

        // Testing email required validation
        email.sendKeys(Key.TAB);
        expect(element(by.id('validateEmailRequired')).isPresent()).toBeTruthy();
        // Testing email validation
        email.sendKeys('as');
        expect(element(by.id('validateEmailProper')).isPresent()).toBeTruthy();

        // Testing password required validation
        password.sendKeys(Key.TAB);
        expect(element(by.id('validatePasswordRequired')).isPresent()).toBeTruthy();
        // Testing password length validation
        password.sendKeys('as');
        expect(element(by.id('validatePasswordLength')).isPresent()).toBeTruthy();

        // Testing captcha required validation
        captcha.sendKeys(Key.TAB);
        expect(element(by.id('validateCaptchaRequired')).isPresent()).toBeTruthy();
        // Testing captcha length validation
        captcha.sendKeys('as');
        expect(element(by.id('validateCaptchaLength')).isPresent()).toBeTruthy();

        expect(form.getAttribute('class')).toContain('ng-invalid');
        expect(submitBtn.isEnabled()).toBeFalsy();
    });

    it('test log in with invalid captcha', () => {
        const email = element(by.css('.userEmail'));
        email.clear();
        email.sendKeys('test1@ved.mk');

        const pass = element(by.css('.userPassword'));
        pass.clear();
        pass.sendKeys('qwer1');

        const captcha = element(by.css('.userCaptcha'));
        captcha.clear();
        captcha.sendKeys('asdf');

        browser.manage().addCookie({
            name: 'session',
            value: 'abe991d9-fb78-41df-bf57-c6552bdb7e03',
            path: '/'
        });

        const form = element(by.id('loginForm'));
        form.submit();

        // wait for error toastr to be appear
        browser.wait(() => {
            return element(by.css('.toast-error')).isPresent();
        }, 5000);

        expect(element(by.css('.toast-error')).isPresent()).toBeTruthy();
    });


    it('test log in with invalid password', () => {
        const email = element(by.css('.userEmail'));
        email.clear();
        email.sendKeys('test1@ved.mk');

        const pass = element(by.css('.userPassword'));
        pass.clear();
        pass.sendKeys('poiuy123');

        const captcha = element(by.css('.userCaptcha'));
        captcha.clear();
        captcha.sendKeys('LfmU');

        browser.manage().addCookie({
            name: 'session',
            value: 'abe991d9-fb78-41df-bf57-c6552bdb7e03',
            path: '/'
        });

        const form = element(by.id('loginForm'));
        form.submit();

        // wait for error toastr to be appear
        browser.wait(() => {
            return element(by.css('.toast-error')).isPresent();
        }, 5000);

        expect(element(by.css('.toast-error')).isPresent()).toBeTruthy();
    });

    it('test log in with valid but not sensitive password', () => {
        const email = element(by.css('.userEmail'));
        email.clear();
        email.sendKeys('test1@ved.mk');

        const pass = element(by.css('.userPassword'));
        pass.clear();
        pass.sendKeys('qWeR1');

        const captcha = element(by.css('.userCaptcha'));
        captcha.clear();
        captcha.sendKeys('LfmU');

        browser.manage().addCookie({
            name: 'session',
            value: 'abe991d9-fb78-41df-bf57-c6552bdb7e03',
            path: '/'
        });

        const form = element(by.id('loginForm'));
        form.submit();

        // wait for error toastr to be appear
        browser.wait(() => {
            return element(by.css('.toast-error')).isPresent();
        }, 5000);

        expect(element(by.css('.toast-error')).isPresent()).toBeTruthy();
    });


    it('test log in with valid email and valid password for other user in database', () => {
        const email = element(by.css('.userEmail'));
        email.clear();
        email.sendKeys('test1@ved.mk');

        const pass = element(by.css('.userPassword'));
        pass.clear();
        pass.sendKeys('asdf2');

        const captcha = element(by.css('.userCaptcha'));
        captcha.clear();
        captcha.sendKeys('LfmU');

        browser.manage().addCookie({
            name: 'session',
            value: 'abe991d9-fb78-41df-bf57-c6552bdb7e03',
            path: '/'
        });

        const form = element(by.id('loginForm'));
        form.submit();

        // wait for error toastr to be appear
        browser.wait(() => {
            return element(by.css('.toast-error')).isPresent();
        }, 5000);

        expect(element(by.css('.toast-error')).isPresent()).toBeTruthy();
    });


    it('should get new captcha with invalid login', () => {
        const email = element(by.css('.userEmail'));
        email.clear();
        email.sendKeys('test1@ved.mk');

        const pass = element(by.css('.userPassword'));
        pass.clear();
        pass.sendKeys('invalidPassword');

        const captcha = element(by.css('.userCaptcha'));
        captcha.clear();
        captcha.sendKeys('LfmU');

        browser.manage().addCookie({
            name: 'session',
            value: 'abe991d9-fb78-41df-bf57-c6552bdb7e03',
            path: '/'
        });

        // saving actual captcha url
        const oldCaptchaSrc = element(by.id('captchaImg')).getAttribute('src');

        const form = element(by.id('loginForm'));
        form.submit();

        // waiting error toastr for invalid login
        browser.wait(() => {
            return element(by.css('.toast-error')).isPresent();
        }, 5000);

        // saving new captcha url
        const newCaptchaSrc = element(by.id('captchaImg')).getAttribute('src');

        expect(oldCaptchaSrc).not.toEqual(newCaptchaSrc);
    });

    it('test log in with deleted user', () => {
        const email = element(by.css('.userEmail'));
        email.clear();
        email.sendKeys('test3@ved.mk');

        const pass = element(by.css('.userPassword'));
        pass.clear();
        pass.sendKeys('zxcv3');

        const captcha = element(by.css('.userCaptcha'));
        captcha.clear();
        captcha.sendKeys('LfmU');

        browser.manage().addCookie({
            name: 'session',
            value: 'abe991d9-fb78-41df-bf57-c6552bdb7e03',
            path: '/'
        });

        const form = element(by.id('loginForm'));
        form.submit();

        // wait for error toastr to be appear
        browser.wait(() => {
            return element(by.css('.toast-error')).isPresent();
        }, 5000);

        expect(element(by.css('.toast-error')).isPresent()).toBeTruthy();
    });

    it('test login with valid credentials and valid captcha for another sessionId', () => {
        const email = element(by.css('.userEmail'));
        email.clear();
        email.sendKeys('test1@ved.mk');

        const pass = element(by.css('.userPassword'));
        pass.clear();
        pass.sendKeys('qwer1');

        const captcha = element(by.css('.userCaptcha'));
        captcha.clear();
        captcha.sendKeys('QeMO');

        browser.manage().addCookie({
            name: 'session',
            value: 'abe991d9-fb78-41df-bf57-c6552bdb7e03',
            path: '/'
        });

        const form = element(by.id('loginForm'));
        form.submit();

        // wait for error toastr to be appear
        browser.wait(() => {
            return element(by.css('.toast-error')).isPresent();
        }, 5000);

        expect(element(by.css('.toast-error')).isPresent()).toBeTruthy();
    });

});
