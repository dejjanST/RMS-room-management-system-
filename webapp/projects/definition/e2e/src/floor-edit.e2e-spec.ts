import { browser, logging, element, by, Key, Browser } from 'protractor';
import { HttpClient } from 'protractor-http-client';

describe('Floor Edit Test', () => {

  beforeAll(() => {
    browser.get(browser.baseUrl + 'en/definition/#/buildings/1/floors/1/');
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

    browser.get(browser.baseUrl + 'en/definition/#/buildings/1/floors/1/');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  it('title should be Floor Edit', () => {
    expect(browser.getTitle()).toEqual('Edit Floor');
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'en/definition/#/buildings/1/floors/1');
  });

  it('Update Floor Name', () => {
    const floorLayout = element(by.id('floorCreateLayout'));
    floorLayout.click();

    const optionSelect = element(by.id('option-1'));
    optionSelect.click();

    const floorName = element(by.name('floorName'));
    expect(floorName.getAttribute('value')).toEqual('Test floor');

    // Update Floor Name
    floorName.clear();
    floorName.sendKeys('Floor Name updated');

    const floorNumber = element(by.name('floorNumber'));
    expect(floorNumber.getAttribute('value')).toEqual('1');

    // Update Floor Number
    floorNumber.clear();
    floorNumber.sendKeys('2');

    const form = element(by.id('createFloorForm'));
    form.submit();

    // wait for success update
    browser.wait(() => {
      return element(by.css('.toast-success')).isPresent();
    }, 5000);

    // Navigate to Floor List
    expect(browser.getTitle()).toEqual('Floor List');

    // test if floor is updated
    const buildingList = element.all(by.css('.floorTable tbody tr'));
    expect(buildingList.count()).toBe(2);

    // floor should be updated
    const updatedFloor = element(by.id('name-1'));
    expect(updatedFloor.getText()).toMatch('Floor Name updated');

    // redirect to Floor Definition
    expect(browser.getTitle()).toEqual('Floor List');
  });
});




