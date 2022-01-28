import { browser, logging, element, By, by, Key } from 'protractor';
import { HttpClient } from 'protractor-http-client';

describe('Unit Type List', () => {

  beforeAll(() => {
    browser.get(browser.baseUrl + 'en/definition/#/units');
  });


  beforeEach(async () => {
    const http = new HttpClient();
    const getRequest = await http.get('http://rms-server:8000/e2e?uc_id=unit_type');
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

    browser.get(browser.baseUrl + 'en/definition/#/units');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  it('title should be Unit Type List', () => {
    expect(browser.getTitle()).toEqual('Unit Type List');
  });

  it('should have 3 items in list 1 delete button and 3 edit Links', () => {
    const lists = element.all(By.className('UTRow'));
    expect(lists.count()).toEqual(3);

    const deleteBtns = element.all(By.className('deleteBtn'));
    expect(deleteBtns.count()).toEqual(3);

    const editLinks = element.all(By.className('UTRow'));
    expect(editLinks.count()).toEqual(3);
  });


  it('should delete item from list', () => {
    const lists = element.all(By.className('UTRow'));
    expect(lists.count()).toEqual(3);

    const deleteBtn = element.all(By.id('del1'));
    deleteBtn.click();

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
  });

  it('should open unit type Edit for Unit Type 1', () => {
    const lists = element.all(By.className('UTRow'));
    expect(lists.count()).toEqual(3);

    const editLink = element.all(By.id('UT1'));
    editLink.click();

    expect(browser.getCurrentUrl()).toContain('/units/edit/1');
  });


});
