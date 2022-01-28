import { browser, logging, element, by, Key, Browser, Ptor, By } from 'protractor';
import { HttpClient } from 'protractor-http-client';

describe('Create Offer', () => {

  beforeAll(() => {
    browser.get(browser.baseUrl + 'en/definition/#/sites/1/offers/new/');
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

    browser.get(browser.baseUrl + 'en/definition/#/sites/1/offers/new/');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });


  it('title should be Site Offers', () => {
    expect(browser.getTitle()).toEqual('Create Site Offer');
  });


  // mat-expansion-panel-header-title
  it('Test site offer create', async () => {
    const genData = element(by.css('.mat-accordion:first-child'));
    genData.click();
    browser.sleep(1000);

    const offerName = element(by.id('siteOfferName'));
    offerName.sendKeys('New Offer Created');

    const numOfBuildings = element(by.id('numberOfBuildings'));
    numOfBuildings.sendKeys('2');

    const numOfReceptions = element(by.id('numberOfReceptions'));
    numOfReceptions.sendKeys('1');
    browser.sleep(1000);

    // const unitType = element(by.css('.mat-accordion:nth-of-type(2)'));
    // unitType.click();
    // browser.sleep(1000);

    // const li = element(by.id('unitType-1'));
    // const destination = element(by.id('cdk-drop-list-1'));

    // const submitBtn = element(by.css('button[type="submit"]'));
    // expect(submitBtn.isEnabled()).toBeTruthy();
    // submitBtn.click();

    // // wait for success login
    // browser.wait(() => {
    //   return element(by.css('.toast-success')).isPresent();
    // }, 5000);

    // // navigate to Site List
    // expect(browser.getTitle()).toEqual('Site Offers list for site:');

    // // // site should be added
    // const offersList = element.all(by.css('.offersTable tbody tr'));
    // expect(offersList.count()).toBe(5);
  });
});

