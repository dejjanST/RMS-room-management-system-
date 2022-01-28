import { browser, logging, element, by, Key, Browser } from 'protractor';
import { HttpClient } from 'protractor-http-client';

describe('Create Building Test', () => {

  beforeAll(() => {
    browser.get(browser.baseUrl + 'en/definition/#/sites/4/buildings/new');
  });


  beforeEach(async () => {
    const http = new HttpClient();
    const getRequest = await http.get('http://rms-server:8000/e2e?uc_id=building');
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

    browser.get(browser.baseUrl + 'en/definition/#/sites/4/buildings/new');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  it('Title should be Create Building', () => {
    expect(browser.getTitle()).toEqual('Create Building');
  });

  it('Test name validation', () => {
    const form = element(by.tagName('form'));
    const name = element(by.name('name'));
    const submitBtn = element(by.css('button[type="submit"]'));

    // Testing name required validation
    name.sendKeys(Key.TAB);
    expect(element(by.id('siteNameRequired')).isPresent()).toBeTruthy();
    // Testing name length validation
    name.sendKeys('a');
    expect(element(by.id('siteNameLength')).isPresent()).toBeTruthy();

    // submit button should be disabled
    expect(form.getAttribute('class')).toContain('ng-invalid');
    expect(submitBtn.isEnabled()).toBeFalsy();
  });
});







