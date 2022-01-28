import { browser, logging, element, by, Key, Browser, Button, protractor } from 'protractor';
import { HttpClient } from 'protractor-http-client';

describe('Verification Report Test', () => {

  beforeAll(() => {
    browser.get(browser.baseUrl + 'en/definition/#/buildings/1/reports/verification');
  });


  beforeEach(async () => {
    const http = new HttpClient();
    const getRequest = await http.get('http://rms-server:8000/e2e?uc_id=validation_report');
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

    browser.get(browser.baseUrl + 'en/definition/#/buildings/1/reports/verification');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  it('title should be Verification Report', () => {
    expect(browser.getTitle()).toEqual('Verification Report');
  });


  it('should display site name and report generated date', () => {
    const siteName = element.all(by.css('header strong')).first();
    expect(siteName.getText()).toBe('Test site 1');

    const dd = new Date().getDate();
    const mm = new Date().toLocaleString('default', { month: 'short' });
    const yyyy = new Date().getFullYear();
    const today = dd + ' ' + mm + ' ' + yyyy;

    const reportGenerated = element.all(by.css('header strong')).last();
    expect(reportGenerated.getText()).toBe(today);
  });


  it('should display table and should have 6 records', () => {
    const verificationTable = element(by.id('verificationTable'));
    expect(verificationTable.isDisplayed()).toBeTruthy();

    const records = element.all(by.css('#verificationTable tbody tr'));
    expect(records.count()).toBe(6);
  });


  it('test filter by floor number', () => {
    // click on mat-expansion
    const filterPanel = element.all(by.tagName('mat-expansion-panel')).first();
    filterPanel.click();

    const floorNumberFilter = element(by.id('floorNumber'));
    floorNumberFilter.sendKeys('1');

    const records = element.all(by.css('#verificationTable tbody tr'));
    expect(records.count()).toBe(4);

    floorNumberFilter.clear();
    floorNumberFilter.sendKeys('2');
    expect(records.count()).toBe(2);

    floorNumberFilter.clear();
    expect(records.count()).toBe(6);
  });


  it('test filter by unit name', () => {
    // click on mat-expansion
    const filterPanel = element.all(by.tagName('mat-expansion-panel')).first();
    filterPanel.click();

    const unitNameFilter = element(by.id('unitName'));
    unitNameFilter.sendKeys('Test Unit one');

    const records = element.all(by.css('#verificationTable tbody tr'));
    expect(records.count()).toBe(4);

    unitNameFilter.clear();
    unitNameFilter.sendKeys('Test Unit two');
    expect(records.count()).toBe(2);
  });


  it('test filter by equipment', () => {
    // click on mat-expansion
    const filterPanel = element.all(by.tagName('mat-expansion-panel')).first();
    filterPanel.click();

    const floorNumberFilter = element(by.id('equipment'));
    floorNumberFilter.sendKeys('Windows');

    const records = element.all(by.css('#verificationTable tbody tr'));
    expect(records.count()).toBe(3);

    floorNumberFilter.clear();
    floorNumberFilter.sendKeys('Water');
    expect(records.count()).toBe(2);

    floorNumberFilter.clear();
    floorNumberFilter.sendKeys('FCU');
    expect(records.count()).toBe(1);
  });


  it('test filter by status', () => {
    // click on mat-expansion
    const filterPanel = element.all(by.tagName('mat-expansion-panel')).first();
    filterPanel.click();

    const filterStatusPanel = element(by.id('status'));
    filterStatusPanel.click();

    // should have 6 options
    const statusOptions = element.all(by.css('#status-panel mat-option'));
    expect(statusOptions.count()).toBe(6);

    const optionWorking = element(by.id('mat-option-1'));
    optionWorking.click();

    const records = element.all(by.css('#verificationTable tbody tr'));
    expect(records.count()).toBe(1);

    filterStatusPanel.click();
    const optionWiring = element(by.id('mat-option-2'));
    optionWiring.click();
    expect(records.count()).toBe(1);

    filterStatusPanel.click();
    const optionAll = element(by.id('mat-option-0'));
    optionAll.click();
    expect(records.count()).toBe(6);
  });


  it('test filter by floor number and equipment', () => {
    // click on mat-expansion
    const filterPanel = element.all(by.tagName('mat-expansion-panel')).first();
    filterPanel.click();

    const floorNumberFilter = element(by.id('floorNumber'));
    floorNumberFilter.sendKeys('1');

    const floorEquipmentFilter = element(by.id('equipment'));
    floorEquipmentFilter.sendKeys('Windows');

    const records = element.all(by.css('#verificationTable tbody tr'));
    expect(records.count()).toBe(2);
  });


  it('test filter by unit name and equipment', () => {
    // click on mat-expansion
    const filterPanel = element.all(by.tagName('mat-expansion-panel')).first();
    filterPanel.click();

    const unitNameFilter = element(by.id('unitName'));
    unitNameFilter.sendKeys('one');

    const equipmentFilter = element(by.id('equipment'));
    equipmentFilter.sendKeys('Windows');

    const records = element.all(by.css('#verificationTable tbody tr'));
    expect(records.count()).toBe(2);
  });


  it('test click on button /Print or Save REPORT/', () => {
    // click on button
    const printReport = element(by.id('printReport'));
    printReport.click();

    const result = browser.executeAsyncScript((elm, callback) => {
      function listener() {
        callback(true);
      }

      window.print = listener;
      elm.click();
    }, printReport.getWebElement());

    expect(result).toBe(true);
  });
});








