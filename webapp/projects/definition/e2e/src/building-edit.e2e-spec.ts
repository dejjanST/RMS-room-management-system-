import { browser, logging, element, by, Key, Browser } from 'protractor';
import { HttpClient } from 'protractor-http-client';

describe('Edit Building Test', () => {

  beforeAll(() => {
    browser.get(browser.baseUrl + 'en/definition/#/sites/1/buildings/4');
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

    browser.get(browser.baseUrl + 'en/definition/#/sites/4/buildings/4');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  it('Title should be Edit Building', () => {
    // navigate to Edit Building
    expect(browser.getTitle()).toEqual('Edit Building');
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'en/definition/#/sites/4/buildings/4');
  });


  it('Update Building', () => {
    const buildingName = element(by.name('name'));
    expect(buildingName.getAttribute('value')).toEqual('Building for test case 4');

    // Update Building Name
    buildingName.clear();
    buildingName.sendKeys('Building 1 edited');

    const desc = element(by.name('desc'));
    expect(desc.getAttribute('value')).toEqual('Building four described');

    // Update Building Description
    desc.clear();
    desc.sendKeys(' Building desc edited');

    const form = element(by.id('buildingForm'));
    form.submit();

    // wait for success update
    browser.wait(() => {
      return element(by.css('.toast-success')).isPresent();
    }, 5000);

    // Navigate to Building List
    expect(browser.getTitle()).toEqual('Building List');

    // test if building is updated
    const buildingList = element.all(by.css('.buildingTable tbody tr'));
    expect(buildingList.count()).toBe(2);

    // building should be updated
    const newBuilding = element(by.id('name-4'));
    expect(newBuilding.getText()).toMatch('Building 1 edited');
  });
});







