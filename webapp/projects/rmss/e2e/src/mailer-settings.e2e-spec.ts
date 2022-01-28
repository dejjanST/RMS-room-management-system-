import { browser, logging, element, by, Key, Browser } from 'protractor';
import { HttpClient } from 'protractor-http-client';

describe('Key List Test', () => {

  beforeAll(() => {
    browser.get(browser.baseUrl + 'en/rmss/#/mailer_settings');
  });


  beforeEach(async () => {
    const http = new HttpClient();
    const getRequest = await http.get('http://rms-site:8000/e2e?uc_id=keys');
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

    browser.get(browser.baseUrl + 'en/rmss/#/mailer_settings');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.DEBUG,
    } as logging.Entry));
  });

  it('Title should be Rmss', () => {
    expect(browser.getTitle()).toEqual('Mailer Settings');
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'en/rmss/#/mailer_settings');
  });


  it('test mailer setting form validation', () => {
    const form = element(by.tagName('form'));
    const email = element(by.id('email'));
    const hostName = element(by.id('hostName'));
    const port = element(by.id('port'));
    const userName = element(by.id('userName'));
    const password = element(by.id('password'));
    const protocolSelect = element(by.id('protocolSelect'));
    const mailTo = element(by.id('mat-input-5'));
    const testBtn = element(by.id('testBtn'));
    const submitBtn = element(by.css('button[type="submit"]'));

    // form is displayed
    expect(form.isDisplayed()).toBeTruthy();

    // ==========  Form should be filled ================
    email.sendKeys(Key.TAB);
    expect(email.getAttribute('value')).toEqual('');

    hostName.sendKeys(Key.TAB);
    expect(hostName.getAttribute('value')).toEqual('');

    port.sendKeys(Key.TAB);
    expect(port.getAttribute('value')).toEqual('');

    userName.sendKeys(Key.TAB);
    expect(userName.getAttribute('value')).toEqual('');

    password.sendKeys(Key.TAB);
    expect(password.getAttribute('value')).toEqual('');

    // Mail To input should be empty
    mailTo.sendKeys(Key.TAB);
    expect(mailTo.getAttribute('value')).toEqual('');

    // TEST Mailer button should be disabled
    expect(testBtn.getAttribute('disabled')).toBe('true');

    // Save button should be disabled
    expect(submitBtn.getAttribute('disabled')).toBe('true');

    // =========== Test inputs validation =================

    email.sendKeys(Key.TAB);
    expect(element(by.id('requiredEmail')).isPresent()).toBeTruthy();
    email.sendKeys('mail');
    expect(element(by.id('validEmail')).isPresent()).toBeTruthy();

    hostName.sendKeys(Key.TAB);
    expect(element(by.id('hostNameRequired')).isPresent()).toBeTruthy();

    port.sendKeys(Key.TAB);
    expect(element(by.id('portRequired')).isPresent()).toBeTruthy();
    port.sendKeys(4444444);
    expect(element(by.id('portMax')).isPresent()).toBeTruthy();

    userName.sendKeys(Key.TAB);
    expect(element(by.id('usernameRequired')).isPresent()).toBeTruthy();

    password.sendKeys(Key.TAB);
    expect(element(by.id('passRequired')).isPresent()).toBeTruthy();

    protocolSelect.sendKeys(Key.TAB);
    expect(element(by.id('protocolRequired')).isPresent()).toBeTruthy();

    // protocol select should have 3 options
    protocolSelect.click();
    const options = element.all(by.css('.mat-option'));
    expect(options.count()).toEqual(3);

    mailTo.sendKeys(Key.TAB);
    expect(element(by.id('mailToRequired')).isPresent()).toBeTruthy();
    mailTo.sendKeys('aaa');
    expect(element(by.id('mailToValid')).isPresent()).toBeTruthy();

    // Form is invalid, button is disabled
    expect(form.getAttribute('class')).toContain('ng-invalid');
    expect(submitBtn.isEnabled()).toBeFalsy();

    // =========== fill the form =================

    email.sendKeys('user@example.com');
    expect(element(by.id('requiredEmail')).isPresent()).toBeFalsy();
    expect(element(by.id('validEmail')).isPresent()).toBeFalsy();

    hostName.sendKeys('mail.live.net.mk');
    expect(element(by.id('hostNameRequired')).isPresent()).toBeFalsy();

    port.clear();
    port.sendKeys(444);
    expect(element(by.id('portRequired')).isPresent()).toBeFalsy();
    expect(element(by.id('portMax')).isPresent()).toBeFalsy();

    userName.sendKeys('userExample');
    expect(element(by.id('usernameRequired')).isPresent()).toBeFalsy();

    password.sendKeys('11224412');
    expect(element(by.id('passRequired')).isPresent()).toBeFalsy();

    // protocolSelect.click();
    const option2 = element(by.id('opt2'));
    option2.click();
    expect(element(by.id('protocolRequired')).isPresent()).toBeFalsy();

    mailTo.clear();
    mailTo.sendKeys('demo@demo.com');

    // Form is invalid, button is disabled
    expect(form.getAttribute('class')).toContain('ng-valid');

    // TEST Mailer button should be disabled
    expect(testBtn.getAttribute('ng-reflect-disabled')).toBe('false');
    testBtn.click();

    // wait for success update
    browser.wait(() => {
      return element(by.css('.toast-success')).isPresent();
    }, 5000);

    expect(submitBtn.isEnabled()).toBeTruthy();

    // ================== after change one field, submit button should be disabled ====

    userName.sendKeys('e');
    expect(submitBtn.isEnabled()).toBeFalsy();
  });
});




