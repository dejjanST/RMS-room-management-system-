import { browser, logging, element, by, Key, Browser } from 'protractor';
import { HttpClient } from 'protractor-http-client';

describe('Group List Test', () => {

  beforeAll(() => {
    browser.get(browser.baseUrl + 'en/rmss/#/groups');
  });


  beforeEach(async () => {
    const http = new HttpClient();
    const getRequest = await http.get('http://rms-site:8000/e2e?uc_id=groups');
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

    browser.get(browser.baseUrl + 'en/rmss/#/groups');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.DEBUG,
    } as logging.Entry));
  });

  it('url should be /groups', () => {
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'en/rmss/#/groups');
  });


  it('Should display 3 groups in list and delete one group', () => {
    // count number of groups
    const groupsList = element.all(by.css('.groupsTable tbody tr'));
    expect(groupsList.count()).toBe(3);

    // click on delete button on group 1
    const deleteButton = element(by.css('#del-3'));
    deleteButton.click();

    // wait for success update
    browser.wait(() => {
      return element(by.css('.toast-success')).isPresent();
    }, 5000);

    expect(groupsList.count()).toBe(2);
  });

  it('Delete group with force delete, dialog should open', () => {
    // count number of groups
    const groupsList = element.all(by.css('.groupsTable tbody tr'));
    expect(groupsList.count()).toBe(3);

    // click on delete button on group 1
    const deleteButton = element(by.css('#del-1'));
    deleteButton.click();

    // click on close dialog
    const closeDialog = element(by.id('cancelDeleteBtn'));
    closeDialog.click();
    expect(groupsList.count()).toBe(3);

    // click on delete button dialog, delete first group
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

    expect(groupsList.count()).toBe(2);

    // wait for success update
    browser.wait(() => {
      return element(by.css('.toast-success')).isPresent();
    }, 5000);
  });


  it('Filter by group name', () => {
    const filterName = element.all(by.css('#filterByName'));
    filterName.sendKeys('First');

    browser.sleep(1000);
    const groupsList = element.all(by.css('.groupsTable tbody tr'));
    expect(groupsList.count()).toBe(1);

    // click on Create Group button navigate to Create Group form
    const addGroupButton = element(by.id('addGroup'));
    addGroupButton.click();

    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'en/rmss/#/groups/new');
  });
});




