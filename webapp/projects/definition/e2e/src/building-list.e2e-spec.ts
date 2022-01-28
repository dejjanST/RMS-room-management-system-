import { browser, logging, element, by, Key, Browser } from 'protractor';
import { HttpClient } from 'protractor-http-client';

describe('Building List Test', () => {

  beforeAll(() => {
    browser.get(browser.baseUrl + 'en/definition/#/sites/4/buildings');
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

    browser.get(browser.baseUrl + 'en/definition/#/sites/4/buildings');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  it('Title should be Buildings List', () => {
    expect(browser.getTitle()).toEqual('Building List');
  });


  it('Should display 5 buildings', () => {
    // count number of buildings
    const buildingsList = element.all(by.css('.buildingTable tbody tr'));
    expect(buildingsList.count()).toBe(2);
  });


  it('Click on building row and open edit form', () => {
    // click on edit button on building
    const editBtton = element(by.id('editBuilding-4'));
    editBtton.click();

    // should show edit building form
    const title = element(by.css('.mat-card-title span:first-child'));
    expect(title.getText()).toMatch('Edit Building');

    const form = element(by.tagName('form'));
    expect(form).toBeTruthy();
    expect(browser.getTitle()).toEqual('Edit Building');
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'en/definition/#/sites/4/buildings/4');
  });


  it('Clik on floors button, navigate to floors list', () => {
    // click on floors button on building 4
    const floorsButton = element(by.id('fld-4'));
    floorsButton.click();

    // navigate to floors list
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'en/definition/#/buildings/4/floors');
  });

  it('Click on Verification Report button', () => {
    const verificationReport = element(by.id('vr-4'));
    verificationReport.click();

    expect(browser.getTitle()).toEqual('Verification Report');
    // navigate to floors list
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'en/definition/#/buildings/4/reports/verification');
  });

});




