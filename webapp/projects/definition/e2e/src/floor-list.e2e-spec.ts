import { browser, logging, element, by, Key, Browser } from 'protractor';
import { HttpClient } from 'protractor-http-client';

describe('Floor List Test', () => {

  beforeAll(() => {
    browser.get(browser.baseUrl + 'en/definition/#/buildings/1/floors');
  });


  beforeEach(async () => {
    const http = new HttpClient();
    const getRequest = await http.get('http://rms-server:8000/e2e?uc_id=floor');
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

    browser.get(browser.baseUrl + 'en/definition/#/buildings/1/floors');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  it('title should be Floor Definition', () => {
    expect(browser.getTitle()).toEqual('Floor List');
  });


  it('Should display 2 floors', () => {
    // count number of floors
    const floorsList = element.all(by.css('.floorTable tbody tr'));
    expect(floorsList.count()).toBe(2);
  });


  it('Click on create button, open create floor form', () => {
    // click on create button
    const createBtton = element(by.id('addFloor'));
    createBtton.click();

    // should show create floor form
    const title = element(by.css('.mat-card-title span:first-child'));
    expect(title.getText()).toMatch('Create Floor');

    const form = element(by.tagName('form'));
    expect(form).toBeTruthy();
    expect(browser.getTitle()).toEqual('Create Floor');
  });


  it('Should delete floor', () => {
    const floorList = element.all(by.css('.floorTable tbody tr'));
    expect(floorList.count()).toBe(2);

    // click on delete floor on floor 1
    const deleteButton = element(by.id('delete-1'));
    deleteButton.click();

    // click on close dialog
    const closeDialog = element(by.id('cancelDeleteBtn'));
    closeDialog.click();
    expect(floorList.count()).toBe(2);

    // click on delete button dialog, delete first floor
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

    expect(floorList.count()).toBe(1);
  });


  it('Click on floor row and open edit form', () => {
    // click on edit button on floor
    const editBtton = element(by.id('editFloor-2'));
    editBtton.click();

    // should show edit floor form
    const title = element(by.css('.mat-card-title span:first-child'));
    expect(title.getText()).toMatch('Edit Floor');

    const form = element(by.tagName('form'));
    expect(form).toBeTruthy();
    expect(browser.getTitle()).toEqual('Edit Floor');
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'en/definition/#/buildings/1/floors/2');
  });
});




