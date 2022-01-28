import { browser, logging, element, By, Key, by } from 'protractor';
import { HttpClient } from 'protractor-http-client';

describe('Floor Layout List', () => {

  beforeAll(() => {
    browser.get(browser.baseUrl + 'en/definition/#/sites/1/fld');
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

    browser.get(browser.baseUrl + 'en/definition/#/sites/1/fld');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  it('title should contain Floor layout list', () => {
    expect(browser.getTitle()).toContain('Floor Layout List');
  });

  it('should have 3 items in list 3, delete button and 3 edit Links', () => {
    const lists = element.all(By.className('FLRow'));
    expect(lists.count()).toEqual(3);

    const deleteBtns = element.all(By.className('deleteBtn'));
    expect(deleteBtns.count()).toEqual(3);

  });


  it('should delete item from list and show text when have not items in list', () => {
    const lists = element.all(By.className('FLRow'));
    expect(lists.count()).toEqual(3);

    const deleteBtn1 = element.all(By.id('del1'));
    deleteBtn1.click();

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

    expect(lists.count()).toEqual(2);
    const noDataFoundInfo = element.all(By.id('noDataFoundInfo'));
    expect(noDataFoundInfo.isDisplayed()).toBeTruthy();
  });

  it('should open floor layout Edit for Test floor layout 1 ut', () => {
    const lists = element.all(By.className('FLRow'));
    expect(lists.count()).toEqual(3);

    const editLink = element.all(By.id('FL1'));
    editLink.click();

    expect(browser.getCurrentUrl()).toContain('/fld/edit/1');
  });


});
