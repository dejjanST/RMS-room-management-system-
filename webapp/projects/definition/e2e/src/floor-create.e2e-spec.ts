import { browser, logging, element, by, Key, Browser } from 'protractor';
import { HttpClient } from 'protractor-http-client';

describe('Floor Create Test', () => {

  beforeAll(() => {
    browser.get(browser.baseUrl + 'en/definition/#/buildings/1/floors/new/');
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

    browser.get(browser.baseUrl + 'en/definition/#/buildings/1/floors/new/');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  it('title should be Floor Definition', () => {
    expect(browser.getTitle()).toEqual('Create Floor');
  });

  it('test floor layout validation', () => {
    const form = element(by.tagName('form'));
    const floorLayout = element(by.name('floorLayout'));
    const floorName = element(by.name('floorName'));
    const floorNumber = element(by.name('floorNumber'));
    const submitBtn = element(by.css('button[type="submit"]'));

    // Testing Floor Layout required validation
    floorLayout.sendKeys(Key.TAB);
    expect(element(by.id('validateFloorLayoutRequired')).isPresent()).toBeTruthy();


    // Testing Floor Name required validation
    floorName.sendKeys(Key.TAB);
    expect(element(by.id('validateFloorNameRequired')).isPresent()).toBeTruthy();
    // Testing Floor Name length
    floorName.sendKeys('a');
    expect(element(by.id('validateFloorNameLength')).isPresent()).toBeTruthy();


    // Testing Floor Number required validation
    floorNumber.sendKeys(Key.TAB);
    expect(element(by.id('validateFloorNumRequired')).isPresent()).toBeTruthy();
    // Testing Floor Number numeric validation
    floorNumber.sendKeys('a');
    expect(element(by.id('validateFloorNumberNumeric')).isPresent()).toBeTruthy();

    // submit button should be disabled
    expect(form.getAttribute('class')).toContain('ng-invalid');
    expect(submitBtn.isEnabled()).toBeFalsy();
  });


  it('Test create floor', () => {
    const floorLayout = element(by.id('floorCreateLayout'));
    floorLayout.click();

    const optionSelect = element(by.id('option-1'));
    optionSelect.click();

    const floorName = element(by.css('.floorName'));
    floorName.clear();
    floorName.sendKeys('New Floor');

    const floorNumber = element(by.css('.floorNumber'));
    floorNumber.clear();
    floorNumber.sendKeys('3');

    const form = element(by.id('createFloorForm'));
    form.submit();

    // wait for success login
    browser.wait(() => {
      return element(by.css('.toast-success')).isPresent();
    }, 5000);

    // redirect to Floor Definition
    expect(browser.getTitle()).toEqual('Floor List');

    // test if floor is added
    const floorList = element.all(by.css('.floorTable tbody tr'));
    expect(floorList.count()).toBe(3);

    // new floor should be added
    const newFloor = element(by.id('name-3'));
    expect(newFloor.getText()).toMatch('New Floor');
  });


  it('Test create floor with negative floor number', () => {
    const floorLayout = element(by.id('floorCreateLayout'));
    floorLayout.click();

    const optionSelect = element(by.id('option-1'));
    optionSelect.click();

    const floorName = element(by.css('.floorName'));
    floorName.clear();
    floorName.sendKeys('New Floor');

    const floorNumber = element(by.css('.floorNumber'));
    floorNumber.clear();
    floorNumber.sendKeys('3');

    const form = element(by.id('createFloorForm'));
    form.submit();

    // wait for success login
    browser.wait(() => {
      return element(by.css('.toast-success')).isPresent();
    }, 5000);

    // redirect to Floor Definition
    expect(browser.getTitle()).toEqual('Floor List');

    // test if floor is added
    const floorList = element.all(by.css('.floorTable tbody tr'));
    expect(floorList.count()).toBe(3);

    // new floor should be added
    const newFloor = element(by.id('name-3'));
    expect(newFloor.getText()).toMatch('New Floor');
  });

  it('test bulk floor validation', () => {
    const bulk = element(by.id('mat-tab-label-0-1'));
    bulk.click();

    const form = element(by.tagName('form'));
    const floorLayout = element(by.css('.floorBulkLayout'));
    const prefix = element(by.name('prefix'));
    const fromNumber = element(by.name('fromNumber'));
    const toNumber = element(by.name('toNumber'));
    const submitBtn = element(by.css('button[type="submit"]'));

    // Testing Floor Layout required validation
    floorLayout.sendKeys(Key.TAB);
    expect(element(by.id('validateBulkFloorLayRequired')).isPresent()).toBeTruthy();

    // Testing prefix required validation
    prefix.sendKeys(Key.TAB);
    expect(element(by.id('prefixRequired')).isPresent()).toBeTruthy();

    // Testing From (floor) Number required validation
    fromNumber.sendKeys(Key.TAB);
    expect(element(by.id('fromNumberRequired')).isPresent()).toBeTruthy();
    // Testing Floor Number numeric validation
    fromNumber.sendKeys('a');
    expect(element(by.id('fromNumber')).isPresent()).toBeTruthy();


    // Testing To (floor) Number required validation
    toNumber.sendKeys(Key.TAB);
    expect(element(by.id('toNumberRequired')).isPresent()).toBeTruthy();
    // Testing To (floor) Number numeric validation
    toNumber.sendKeys('a');
    expect(element(by.id('toNumber')).isPresent()).toBeTruthy();

    // submit button should be disabled
    expect(form.getAttribute('class')).toContain('ng-invalid');
    expect(submitBtn.isEnabled()).toBeFalsy();
  });


  it('Test bulk floor create', () => {
    const bulk = element(by.id('mat-tab-label-0-1'));
    bulk.click();

    browser.sleep(1000);

    // browser.wait(() => {
    //   return element(by.css('.floorBulkLayout')).isPresent();
    // }, 5000);

    const floorLayout = element(by.css('.floorBulkLayout'));
    floorLayout.click();

    const optionSelect = element(by.id('bulkOption-2'));
    optionSelect.click();

    const prefix = element(by.name('prefix'));
    prefix.clear();
    prefix.sendKeys('room');

    const fromNumber = element(by.name('fromNumber'));
    fromNumber.clear();
    fromNumber.sendKeys('4');

    const toNumber = element(by.name('toNumber'));
    toNumber.clear();
    toNumber.sendKeys('14');

    const form = element(by.id('bulkFloorForm'));
    form.submit();

    // wait for success login
    browser.wait(() => {
      return element(by.css('.toast-success')).isPresent();
    }, 5000);

    // redirect to Floor Definition
    expect(browser.getTitle()).toEqual('Floor List');

    // test if floor is added
    const floorList = element.all(by.css('.floorTable tbody tr'));
    expect(floorList.count()).toBe(13);
  });
});
