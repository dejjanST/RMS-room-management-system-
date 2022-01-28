import { browser, logging, element, by, Key, Browser } from 'protractor';
import { HttpClient } from 'protractor-http-client';

describe('Key List Test', () => {

  beforeAll(() => {
    browser.get(browser.baseUrl + 'en/rmss/#/keys');
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

    browser.get(browser.baseUrl + 'en/rmss/#/keys');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.DEBUG,
    } as logging.Entry));
  });

  it('url should be /keys', () => {
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'en/rmss/#/keys');
  });


  it('Should display 7 keys in list', () => {
    // count number of keys
    const keysList = element.all(by.css('.keysTable tbody tr'));
    expect(keysList.count()).toBe(7);
  });

  it('Valid From and Valid To should display date', () => {
    // Key Valid From input should be empty
    const validFrom = element.all(by.css('.keysTable tbody .mat-column-valid_from')).first();
    expect(validFrom.getText()).toEqual('09/25/2020');

    // Key Valid To input should be empty
    const validTo = element.all(by.css('.keysTable tbody .mat-column-valid_to')).first();
    expect(validTo.getText()).toEqual('12/31/2021');
  });

  it('Filter by key number', () => {
    const filterName = element.all(by.css('#filterKey'));
    filterName.sendKeys('111');

    // number of records should be 0
    const keysList = element.all(by.css('.keysTable tbody tr'));
    expect(keysList.count()).toBe(0);

    // should display 'No Keys Found'
    const noKeyFound = element(by.tagName('p'));
    expect(noKeyFound.isDisplayed).toBeTruthy();

    filterName.clear();
    filterName.sendKeys('108');
    expect(keysList.count()).toBe(2);

    filterName.clear();
    filterName.sendKeys('508');
    expect(keysList.count()).toBe(1);
  });


  it('Filter by key description', () => {
    const filterName = element.all(by.css('#filterKey'));
    filterName.sendKeys('eee');

    // number of records should be 0
    const keysList = element.all(by.css('.keysTable tbody tr'));
    expect(keysList.count()).toBe(0);

    // should display 'No Keys Found'
    const noKeyFound = element(by.tagName('p'));
    expect(noKeyFound.isDisplayed).toBeTruthy();

    filterName.clear();
    filterName.sendKeys('Admin');
    expect(keysList.count()).toBe(2);

    filterName.sendKeys(' Jack');
    expect(keysList.count()).toBe(1);
  });


  it('Click on Create Key button should open empty form', () => {
    const addKey = element(by.id('addKey'));
    addKey.click();

    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'en/rmss/#/key/new');

    // Key Number input should be empty
    const keyNo = element(by.className('key_no'));
    expect(keyNo.getAttribute('value')).toEqual('');

    // Key Description input should be empty
    const keyDesc = element(by.className('key_desc'));
    expect(keyDesc.getAttribute('value')).toEqual('');

    // Form is invalid, button is disabled
    const form = element(by.tagName('form'));
    const submitBtn = element(by.css('button[type="submit"]'));
    expect(form.getAttribute('class')).toContain('ng-invalid');
    expect(submitBtn.isEnabled()).toBeFalsy();
  });


  it('Click on row 6, should open filled form', () => {
    const editKey = element(by.id('edit-6'));
    editKey.click();

    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'en/rmss/#/key/6');

    // Key Number input should not be empty
    const keyNo = element(by.className('key_no'));
    expect(keyNo.getAttribute('value')).toEqual('50812093710026706500');

    // Key Description input not should be empty
    const keyDesc = element(by.className('key_desc'));
    expect(keyDesc.getAttribute('value')).toEqual('Sebastian Vettel');

    // Key Valid From input should not be empty
    const validFrom = element(by.className('validFrom'));
    expect(validFrom.getAttribute('value')).toEqual('9/25/2020');

    // Key Valid From input should not be empty
    const validTo = element.all(by.className('validTo')).last();
    expect(validTo.getAttribute('value')).toEqual('12/31/2021');

    // Key Valid From input should not be empty
    const keyType = element(by.className('keyType'));
    expect(keyType.getText()).toEqual('Management');

    // all inputs should be disabled
    expect(keyNo.isEnabled()).toBe(false);
    expect(keyDesc.isEnabled()).toBe(false);
    expect(validFrom.isEnabled()).toBe(false);
    expect(validTo.getAttribute('disabled')).toEqual('true');
    expect(keyType.getAttribute('aria-disabled')).toEqual('true');

    // Form is valid, button is enabled
    const editKeyButton = element(by.css('.editKey'));
    expect(editKeyButton.isEnabled()).toBeTruthy();
  });

});




