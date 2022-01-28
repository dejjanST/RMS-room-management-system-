import { browser, logging, element, by, Key, Browser } from 'protractor';
import { HttpClient } from 'protractor-http-client';

describe('List Offers', () => {

  beforeAll(() => {
    browser.get(browser.baseUrl + 'en/definition/#/sites/1/offers');
  });


  beforeEach(async () => {
    const http = new HttpClient();
    const getRequest = await http.get('http://rms-server:8000/e2e?uc_id=offer');
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

    browser.get(browser.baseUrl + 'en/definition/#/sites/1/offers');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  it('title should be Site Offers', () => {
    expect(browser.getTitle()).toEqual('Site Offers List');
  });


  it('Should display 4 offers', () => {
    // count number of offers
    const offersList = element.all(by.css('.offersTable tbody tr'));
    expect(offersList.count()).toBe(4);
  });


  it('Click on create button, should navigate to Create Site Offer', () => {
    const back = element(by.id('create'));
    back.click();

    // Navigate to Create Site Offer
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'en/definition/#/sites/1/offers/new');
    expect(browser.getTitle()).toEqual('Create Site Offer');
  });


  it('Click on delete button should delete offer', () => {
    // click on delete button on offer 1
    const deleteButton = element(by.id('del1'));
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

    const offersList = element.all(by.css('.offersTable tbody tr'));
    expect(offersList.count()).toBe(3);
  });


  it('Delete button for offer 2 should be disabled', () => {
    // click on delete button on offer 1
    const deleteButton = element(by.id('del2'));
    expect(deleteButton.isEnabled()).toBeFalsy();
  });


  it('Click on offer row and open edit form', () => {
    // click on edit button on offer 4
    const offerRow = element(by.id('SO4'));
    offerRow.click();

    // Navigate to Edit Site Offer
    expect(browser.getTitle()).toEqual('Edit Site Offer');
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'en/definition/#/sites/1/offers/4');

    const form = element(by.tagName('form'));
    expect(form).toBeTruthy();
  });
});


