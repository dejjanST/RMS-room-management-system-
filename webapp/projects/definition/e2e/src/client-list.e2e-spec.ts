import { browser, logging, element, by, Key } from 'protractor';
import { HttpClient } from 'protractor-http-client';

describe('List Client Test', () => {

  beforeAll(() => {
    browser.get(browser.baseUrl + 'en/definition/#/clients');
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

    browser.get(browser.baseUrl + 'en/definition/#/clients');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  it('title should be Client List', () => {
    expect(browser.getTitle()).toEqual('Client List');
  });


  it('Should display 5 clients', () => {
    // count number of clients (li)
    const clientList = element.all(by.css('.clientsTable tbody tr'));
    expect(clientList.count()).toBe(5);
  });


  it('Click on create button, open create client form', () => {
    // click on create button
    const createBtton = element(by.id('createClient'));
    createBtton.click();

    // should show create client form
    const title = element(by.css('.mat-card-title span'));
    expect(title.getText()).toMatch('Create Client');

    const form = element(by.tagName('form'));
    expect(form).toBeTruthy();
  });


  it('Should delete client', () => {
    const clientList = element.all(by.css('.clientsTable tbody tr'));
    expect(clientList.count()).toBe(5);

    // click on delete button on client 1
    const deleteButton = element(by.id('del-1'));
    deleteButton.click();


    // click on close dialog
    const closeDialog = element(by.id('cancelDeleteBtn'));
    closeDialog.click();
    expect(clientList.count()).toBe(5);


    // click on delete button dialog
    deleteButton.click();

    // required validation
    const enterId = element(by.css('#confirmId'));
    enterId.sendKeys(Key.TAB);
    expect(element(by.id('requiredId')).isPresent()).toBeTruthy();

    // delete button should be disabled
    const delDialog = element(by.id('confirmDeleteBtn'));
    expect(delDialog.getAttribute('disabled')).toBe('true');

    // enter wrong id
    enterId.sendKeys(2);
    expect(element(by.id('wrongId')).isPresent()).toBeTruthy();

    // delete button should be disabled
    expect(delDialog.getAttribute('disabled')).toBe('true');

    enterId.clear();
    enterId.sendKeys(1);
    // delete button should be enabled
    expect(delDialog.getAttribute('disabled')).toBe(null);

    delDialog.click();

    expect(clientList.count()).toBe(4);
  });


  it('Click on client row and open edit form', () => {
    // click on edit button on client 4
    const editBtton = element(by.id('edit-4'));
    editBtton.click();

    // should show edit client form
    const title = element(by.css('.mat-card-title span'));
    expect(title.getText()).toMatch('Edit Client');

    const form = element(by.tagName('form'));
    expect(form).toBeTruthy();

    // Navigate to Edit Client
    // expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'en/definition/#/clients/4');
    expect(browser.getCurrentUrl()).toContain('en/definition/#/clients/4');
  });
});

