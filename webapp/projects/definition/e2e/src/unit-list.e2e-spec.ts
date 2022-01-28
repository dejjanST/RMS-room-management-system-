import { browser, logging, element, by, Key, Browser } from 'protractor';
import { HttpClient } from 'protractor-http-client';

describe('Unit List Test', () => {

  beforeAll(() => {
    browser.get(browser.baseUrl + 'en/definition/#/buildings/1/units');
  });


  beforeEach(async () => {
    const http = new HttpClient();
    const getRequest = await http.get('http://rms-server:8000/e2e?uc_id=unit');
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

    browser.get(browser.baseUrl + 'en/definition/#/buildings/1/units');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  it('title should be Unit List', () => {
    expect(browser.getTitle()).toEqual('Unit List');
  });


  it('test title of table', () => {
    const unitList = element(by.css('.unitListTitle'));
    expect(unitList.getText()).toContain('Building for test case 1');
  });


  it('should display 10 units', () => {
    // count number of units
    const unitList = element.all(by.css('.unitTable tbody tr'));
    expect(unitList.count()).toBe(10);
  });


  it('filter by unit name', () => {
    const matExspansionPanel = element(by.css('.mat-expansion-panel'));
    matExspansionPanel.click();

    browser.wait(() => {
      return (element(by.css('.uName')).isPresent());
    }, 5000);

    const uName = element(by.css('.uName'));

    // Enter unit name
    uName.sendKeys('Test unit one');

    browser.sleep(1000);
    const unitList = element.all(by.css('.unitTable tbody tr'));
    expect(unitList.count()).toBe(2);
  });


  it('filter by unit number', () => {
    const matExspansionPanel = element(by.css('.mat-expansion-panel'));
    matExspansionPanel.click();

    browser.wait(() => {
      return (element(by.css('.uNumber')).isPresent());
    }, 5000);

    const uNumber = element(by.css('.uNumber'));

    // Enter unit number
    uNumber.sendKeys('101');

    // browser.sleep(1000);
    const unitList = element.all(by.css('.unitTable tbody tr'));
    expect(unitList.count()).toBe(1);
  });


  it('filter by floor name', () => {
    const matExspansionPanel = element(by.css('.mat-expansion-panel'));
    matExspansionPanel.click();

    browser.wait(() => {
      return (element(by.css('.uFloorName')).isPresent());
    }, 5000);

    const uFloorName = element(by.css('.uFloorName'));

    // Enter unit floor name
    uFloorName.sendKeys('aa');

    // browser.sleep(1000);
    const unitList = element.all(by.css('.unitTable tbody tr'));
    // no units found
    expect(unitList.count()).toBe(0);

    // no floor name found displayed
    const nFloor = element(by.css('.nUnitsFound'));
    expect(nFloor.isDisplayed()).toBe(true);
  });


  it('filter by floor number', () => {
    const matExspansionPanel = element(by.css('.mat-expansion-panel'));
    matExspansionPanel.click();

    browser.wait(() => {
      return (element(by.css('.uFloorNumber')).isPresent());
    }, 5000);

    const uFloorName = element(by.css('.uFloorNumber'));

    // Enter unit floor name
    uFloorName.sendKeys('1');

    // browser.sleep(1000);
    const unitList = element.all(by.css('.unitTable tbody tr'));
    expect(unitList.count()).toBe(2);
  });


  it('filter by unit name and filter by floor number', () => {
    const matExspansionPanel = element(by.css('.mat-expansion-panel'));
    matExspansionPanel.click();

    browser.wait(() => {
      return (element(by.css('.uName')).isPresent());
    }, 5000);

    const uName = element(by.css('.uName'));
    // Enter unit name
    uName.sendKeys('Test unit one');
    // browser.sleep(1000);


    const uFloorNumber = element(by.css('.uFloorNumber'));
    // Enter unit floor name
    uFloorNumber.sendKeys('1');
    // browser.sleep(1000);


    const unitList = element.all(by.css('.unitTable tbody tr'));
    expect(unitList.count()).toBe(1);
  });


  it('filter by floor name and filter by unit number', () => {
    const matExspansionPanel = element(by.css('.mat-expansion-panel'));
    matExspansionPanel.click();

    browser.wait(() => {
      return (element(by.css('.uFloorName')).isPresent());
    }, 5000);

    const uFloorName = element(by.css('.uFloorName'));
    // Enter unit floor name
    uFloorName.sendKeys('2');
    // browser.sleep(1000);


    const uNumber = element(by.css('.uNumber'));
    // Enter unit number
    uNumber.sendKeys('201');


    const unitList = element.all(by.css('.unitTable tbody tr'));
    expect(unitList.count()).toBe(1);
  });


  it('filter by state', () => {
    const matExspansionPanel = element(by.css('.mat-expansion-panel'));
    matExspansionPanel.click();

    browser.wait(() => {
      return (element(by.css('.unitStage')).isPresent());
    }, 5000);

    const unitStage = element(by.css('.unitStage'));
    unitStage.click();

    // click on Assocation
    const matOption = element(by.css('#mat-option-3'));
    matOption.click();

    // browser.sleep(1000);

    const unitList = element.all(by.css('.unitTable tbody tr'));
    // no units found
    expect(unitList.count()).toBe(0);

    // no units found displayed
    const nFloor = element(by.css('.nUnitsFound'));
    expect(nFloor.isDisplayed()).toBe(true);
  });


  it('filter by master controller', () => {
    const matExspansionPanel = element(by.css('.mat-expansion-panel'));
    matExspansionPanel.click();

    browser.wait(() => {
      return (element(by.css('.typeMasterController')).isPresent());
    }, 5000);

    const unitStage = element(by.css('.typeMasterController'));
    unitStage.click();

    // click on Room Controller
    const matOption1 = element(by.css('#mcOption1'));
    matOption1.click();

    // browser.sleep(1000);

    const unitList = element.all(by.css('.unitTable tbody tr'));
    expect(unitList.count()).toBe(1);

    unitStage.click();

    // click on Corridor Controller
    const matOption2 = element(by.css('#mcOption2'));
    matOption2.click();

    // browser.sleep(1000);

    expect(unitList.count()).toBe(10);

    unitStage.click();

    // click on Access Controller
    const matOption3 = element(by.css('#mcOption3'));
    matOption3.click();

    // browser.sleep(1000);

    expect(unitList.count()).toBe(0);

    // no units found displayed
    const nFloor = element(by.css('.nUnitsFound'));
    expect(nFloor.isDisplayed()).toBe(true);
  });

});




