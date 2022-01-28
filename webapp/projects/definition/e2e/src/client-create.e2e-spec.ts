import { browser, logging, element, by, Key } from 'protractor';
import { HttpClient } from 'protractor-http-client';

describe('Create Client Test', () => {

  beforeAll(() => {
    browser.get(browser.baseUrl + 'en/definition/#/clients/new');
  });


  beforeEach(async () => {
    const http = new HttpClient();
    const getRequest = await http.get('http://rms-server:8000/e2e?uc_id=client');
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

    browser.get(browser.baseUrl + 'en/definition/#/clients/new');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  it('title should be Create Client', () => {
    // Navigate to Create Client
    expect(browser.getTitle()).toEqual('Create Client');
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'en/definition/#/clients/new');
  });


  it('test name, client_id and status validation', () => {
    const form = element(by.tagName('form'));
    const name = element(by.name('name'));
    const clientId = element(by.name('client_id'));
    const email = element(by.name('email'));
    const status = element(by.name('status'));
    const submitBtn = element(by.css('button[type="submit"]'));

    // Testing name required validation
    name.sendKeys(Key.TAB);
    expect(element(by.id('ClientNameRequired')).isPresent()).toBeTruthy();
    // Testing name length validation
    name.sendKeys('a');
    expect(element(by.id('clientNameLength')).isPresent()).toBeTruthy();

    // Testing client_id required validation
    clientId.sendKeys(Key.TAB);
    expect(element(by.id('clientIdRequired')).isPresent()).toBeTruthy();
    // Testing client_id numeric validation
    clientId.sendKeys('dasd');
    expect(element(by.id('clientIdNumber')).isPresent()).toBeTruthy();

    // Testing phone numeric validation
    email.sendKeys('dddd');
    email.sendKeys(Key.TAB);
    expect(element(by.id('clientEmailValidation')).isPresent()).toBeTruthy();

    // Testing status required validation
    status.sendKeys(Key.TAB);
    expect(element(by.id('validateStatusRequired')).isPresent()).toBeTruthy();

    // Form is invalid, button is disabled
    expect(form.getAttribute('class')).toContain('ng-invalid');
    expect(submitBtn.isEnabled()).toBeFalsy();
  });


  it('Test create client', () => {
    const name = element(by.css('.clientName'));
    name.clear();
    name.sendKeys('newClient');

    const clientId = element(by.css('.client_id'));
    clientId.clear();
    clientId.sendKeys(1431);

    const country = element(by.css('.country'));
    country.clear();
    country.sendKeys('mkd');

    const city = element(by.css('.city'));
    city.clear();
    city.sendKeys('sk');

    const address = element(by.css('.address'));
    address.clear();
    address.sendKeys('adresa');

    const bankAccount = element(by.css('.bank_account'));
    bankAccount.clear();
    bankAccount.sendKeys('11122112');

    const bankName = element(by.css('.bank_name'));
    bankName.clear();
    bankName.sendKeys('bankname');

    const bankCountry = element(by.css('.bank_country'));
    bankCountry.clear();
    bankCountry.sendKeys('mkd');

    const status = element(by.css('.status'));
    status.click();

    const optionSelect = element(by.id('statusOption-1'));
    optionSelect.click();

    const form = element(by.id('clientForm'));
    form.submit();

    // wait for success login
    browser.wait(() => {
      return element(by.css('.toast-success')).isPresent();
    }, 5000);

    // redirect to Client List
    expect(browser.getTitle()).toEqual('Client List');

    // test if user is added
    const clientList = element.all(by.css('.clientsTable tbody tr'));
    expect(clientList.count()).toBe(6);

    // new client should be added
    const newClient = element(by.id('name-6'));
    expect(newClient.getText()).toMatch('newClient');
  });

});
