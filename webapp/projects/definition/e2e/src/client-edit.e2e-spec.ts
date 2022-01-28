import { browser, logging, element, by, Key } from 'protractor';
import { HttpClient } from 'protractor-http-client';

describe('Edit Client Test', () => {

  beforeAll(() => {
    browser.get(browser.baseUrl + 'en/definition/#/clients/1');
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

    browser.get(browser.baseUrl + 'en/definition/#/clients/1');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });


  it('title should be Edit Client', () => {
    // Navigate to Edit Client
    expect(browser.getTitle()).toEqual('Edit Client');
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'en/definition/#/clients/1');
  });


  it('Update Client', () => {
    const clientName = element(by.name('name'));
    expect(clientName.getAttribute('value')).toEqual('User1');

    // Update Client Name
    clientName.clear();
    clientName.sendKeys('newUser');

    // Update Client ID
    const clientId = element(by.name('client_id'));
    clientId.clear();
    clientId.sendKeys(132);

    const status = element(by.tagName('mat-select'));
    status.sendKeys(2);

    const form = element(by.id('clientForm'));
    form.submit();

    // wait for success update
    browser.wait(() => {
      return element(by.css('.toast-success')).isPresent();
    }, 5000);

    expect(browser.getTitle()).toEqual('Client List');

    // test if client is updated
    const clientList = element.all(by.css('.clientsTable tbody tr'));
    expect(clientList.count()).toBe(5);

    // client should be updated
    const newClient = element(by.id('name-1'));
    expect(newClient.getText()).toMatch('newUser');
  });
});
