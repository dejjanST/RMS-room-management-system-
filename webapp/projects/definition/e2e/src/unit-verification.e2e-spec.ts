import { browser, logging, element, by, Key, Browser, Button } from 'protractor';
import { HttpClient } from 'protractor-http-client';

describe('Unit Verification Test', () => {

  beforeAll(() => {
    browser.get(browser.baseUrl + 'en/definition/#/units/1/verification');
  });


  beforeEach(async () => {
    const http = new HttpClient();
    const getRequest = await http.get('http://rms-server:8000/e2e?uc_id=equipment_verification');
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

    browser.get(browser.baseUrl + 'en/definition/#/units/1/verification');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  it('title should be Verification', () => {
    expect(browser.getTitle()).toEqual('Verification');
  });

  it('should display two equipments', () => {
    const equipments = element.all(by.tagName('mat-expansion-panel'));
    expect(equipments.count()).toBe(2);
  });

  it('select Working radio button, add note and click save', () => {
    // click on mat-expansion FCU2P-HHV0T
    const firstEquipment = element.all(by.tagName('mat-expansion-panel')).first();
    firstEquipment.click();
    browser.sleep(1000);

    // click on radio button Working
    const matRadio = element(by.id('mat-radio-3'));
    matRadio.click();

    // enter note
    const matInput = element(by.id('mat-input-0'));
    matInput.sendKeys('Note example');

    // click on save button
    const submitBtn = element.all(by.css('.mat-raised-button')).first();
    // const submitBtn = element(by.id('saveButton-0'));
    submitBtn.click();

    // check if mat-expansion has green icon - checked
    const status = element(by.className('working'));
    expect(status.getText()).toContain('check_circle_outline');
  });


  it('select No action taken radio button and click save', () => {
    // click on mat-expansion FCU2P-HHV0T
    const firstEquipment = element.all(by.tagName('mat-expansion-panel')).first();
    firstEquipment.click();

    // click on radio button No action taken
    const matRadio = element(by.id('mat-radio-2'));
    matRadio.click();

    // click on save button
    const submitBtn = element.all(by.css('.mat-raised-button')).first();
    submitBtn.click();

    // check if mat-expansion has green icon - checked
    const status = element.all(by.css('.noActionTaken')).first();
    expect(status.getText()).toContain('radio_button_unchecked');
  });


  it('select Not working taken radio button and click save', () => {
    // click on mat-expansion FCU2P-HHV0T
    const firstEquipment = element.all(by.tagName('mat-expansion-panel')).first();
    firstEquipment.click();

    // click on radio button Not working
    const matRadio = element.all(by.id('mat-radio-4')).first();
    matRadio.click();

    // Click on radio button Equipment - Choose a reason
    const chooseReason = element(by.id('mat-radio-11'));
    chooseReason.click();

    // click on save button
    const submitBtn = element.all(by.css('.mat-raised-button')).first();
    submitBtn.click();

    // check if mat-expansion has red icon - highlight_off
    const status = element(by.className('notWorking'));
    expect(status.getText()).toContain('highlight_off');
  });
});








