import { browser, logging, element, by, Key, Browser } from 'protractor';
import { HttpClient } from 'protractor-http-client';

describe('Access Card Test', () => {

  beforeAll(() => {
    browser.get(browser.baseUrl + 'en/rmss/#/acl');
  });


  beforeEach(async () => {
    const http = new HttpClient();
    const getRequest = await http.get('http://rms-site:8000/e2e?uc_id=keys');
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

    browser.get(browser.baseUrl + 'en/rmss/#/acl');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.DEBUG,
    } as logging.Entry));
  });

  it('Title should be Rmss', () => {
    expect(browser.getTitle()).toEqual('Rmss');
  });


  it('Enter Aaa, click add new key button and create card/key', () => {
    const addKeyButton = element(by.css('.addKeyButton'));
    const keySearch = element(by.css('.keySearch'));

    keySearch.clear();
    keySearch.sendKeys('A');

    // enter character, mat option should be hiden
    const firstMatOption = element(by.id('firstMatOption'));
    expect(firstMatOption.isPresent()).toBe(false);

    // two characters, mat option should be hiden
    keySearch.sendKeys('a');
    expect(firstMatOption.isPresent()).toBe(false);

    // three characters, mat option should be displayed
    keySearch.sendKeys('a');
    expect(firstMatOption.isPresent()).toBe(true);
    expect(addKeyButton.isPresent()).toBe(true);

    // click on button 'Add New Key'
    addKeyButton.click();

    // Aaa should not be shown in url
    expect(browser.getCurrentUrl()).toContain('/key/new/');

    // Key Number input should be empty
    const keyNo = element(by.className('key_no'));
    expect(keyNo.getAttribute('value')).toEqual('');

    // Key Description input should be empty
    const keyDesc = element(by.className('key_desc'));
    expect(keyDesc.getAttribute('value')).toEqual('');

    // after click should display 'Create Key' form
    const matCardTitle = element(by.tagName('mat-card-title')).getText();
    expect(matCardTitle).toContain('Create Key');
    expect(browser.getCurrentUrl()).toContain('/key/new/');

    // FORM VALIDATION

    // key number validation
    keyNo.sendKeys(Key.TAB);
    expect(element(by.id('key_noNumRequired')).isPresent()).toBeTruthy();

    // key description validation
    keyDesc.sendKeys(Key.TAB);
    expect(element(by.id('key_descNameRequired')).isPresent()).toBeTruthy();

    // valid from validation
    const keyValidFrom = element(by.id('validFrom'));
    keyValidFrom.sendKeys(Key.TAB);
    expect(element(by.id('key_validFrom')).isPresent()).toBeTruthy();

    const matCheckbox = element(by.css('.mat-checkbox'));
    matCheckbox.click();

    // valid to is not required
    const keyValidTo = element(by.id('validTo'));
    keyValidTo.sendKeys(Key.TAB);
    expect(element(by.id('key_validTo')).isPresent()).toBeFalsy();

    // key type validation
    const keyType = element(by.css('.keyType'));
    keyType.sendKeys(Key.TAB);
    expect(element(by.id('validateKeyRequired')).isPresent()).toBeTruthy();

    // Form is invalid, button is disabled
    const form = element(by.tagName('form'));
    const submitBtn = element(by.css('button[type="submit"]'));
    expect(form.getAttribute('class')).toContain('ng-invalid');
    expect(submitBtn.isEnabled()).toBeFalsy();

    // enter earlier date than VALID TO
    keyValidFrom.sendKeys('12/10/2020');
    expect(element(by.id('key_validFrom')).isPresent()).toBeFalsy();

    // VALID TO should display error
    keyValidTo.sendKeys('12/09/2020');
    expect(element(by.id('key_validTo')).isPresent()).toBeTruthy();

    // VALID TO is bigger than VALID FROM, error is not displayed
    keyValidTo.getAttribute('value').then((text) => {
      const len = text.length;
      const backspaceSeries = Array(len + 1).join(Key.BACK_SPACE);
      keyValidTo.sendKeys(backspaceSeries);
    });
    keyValidTo.sendKeys('12/10/2020');
    expect(element(by.id('key_validTo')).isPresent()).toBeFalsy();

    // fill the form
    keyNo.sendKeys('12244');
    keyDesc.sendKeys('Adda');
    keyType.click();
    const keyType1 = element(by.id('keyType-1'));
    keyType1.click();

    // click on create button
    expect(submitBtn.isEnabled()).toBeTruthy();
    submitBtn.click();

    // after click submit should open Access Card form
    const matCardTitleSpan = element(by.css('.containerACL')).getText();
    expect(matCardTitleSpan).toContain('Access Card');

    // edit button should be enabled
    const editKeyButton = element(by.css('.editKey'));
    expect(editKeyButton.isEnabled).toBeTruthy();

    // all inputs should be disabled
    const checkBox = element(by.css('.mat-checkbox-input'));
    expect(checkBox.getAttribute('disabled')).toBe('true');
    expect(keyNo.isEnabled()).toBe(false);
    expect(keyDesc.isEnabled()).toBe(false);
    expect(keyValidFrom.isEnabled()).toBe(false);
    expect(keyValidTo.isEnabled()).toBe(false);
    expect(keyType.getAttribute('aria-disabled')).toEqual('true');
  });


  it('Enter 112 and click add new key button, key number input should be filled', () => {
    const addKeyButton = element(by.css('.addKeyButton'));
    const keySearch = element(by.css('.keySearch'));

    keySearch.clear();
    keySearch.sendKeys(1);

    // enter character, mat option should be hiden
    const firstMatOption = element(by.id('firstMatOption'));
    expect(firstMatOption.isPresent()).toBe(false);

    // two characters, mat option should be hiden
    keySearch.sendKeys(1);

    // three characters, mat option should be displayed
    keySearch.sendKeys(2);
    expect(firstMatOption.isPresent()).toBe(true);
    expect(addKeyButton.isPresent()).toBe(true);

    // click on button 'Add New Key'
    addKeyButton.click();

    // Key Number input should be 112
    const keyNo = element(by.css('.key_no'));
    expect(keyNo.getAttribute('value')).toEqual('112');

    // Key Description input should be empty
    const keyDesc = element(by.css('.key_desc'));
    expect(keyDesc.getAttribute('value')).toEqual('');

    // after click should display 'Create Key' form
    const matCardTitle = element(by.tagName('mat-card-title')).getText();
    expect(matCardTitle).toContain('Create Key');
    expect(browser.getCurrentUrl()).toContain('/key/new/112');
  });


  it('Edit key', () => {
    // Enter Adm
    const keySearch = element(by.css('.keySearch'));
    keySearch.sendKeys('A');
    keySearch.sendKeys('d');
    keySearch.sendKeys('m');

    // click on first mat-option
    const firstMatOption = element.all(by.tagName('mat-option')).first();
    expect(firstMatOption.isPresent()).toBe(true);

    firstMatOption.click();

    // Key Number input should be 10812093710026706100
    const keyNo = element(by.css('.key_no'));
    expect(keyNo.getAttribute('value')).toEqual('10812093710026706100');

    // Key Description input should be Admin admin
    const keyDesc = element(by.css('.key_desc'));
    expect(keyDesc.getAttribute('value')).toEqual('Admin admin');

    const keyValidFrom = element(by.css('.validFrom'));
    expect(keyValidFrom.getAttribute('value')).toEqual('9/25/2020');

    const keyValidTo = element.all(by.css('.validTo')).last();
    expect(keyValidTo.getAttribute('value')).toEqual('12/31/2021');

    const keyType = element(by.css('.keyType'));
    expect(keyType.getText()).toEqual('Front Desk');

    const editKeyButton = element(by.css('.editKey'));
    editKeyButton.click();


    // Dialog Edit Key Opened, inputs should be filled

    // Key Number input should be 10812093710026706100
    const keyNoEdit = element.all(by.css('.key_no')).last();
    expect(keyNoEdit.getAttribute('value')).toEqual('10812093710026706100');

    // Key Description input should be Admin admin
    const keyDescEdit = element.all(by.css('.key_desc')).last();
    expect(keyDescEdit.getAttribute('value')).toEqual('Admin admin');

    const keyValidFromEdit = element.all(by.css('.validFrom')).last();
    expect(keyValidFromEdit.getAttribute('value')).toEqual('9/25/2020');

    const keyValidToEdit = element.all(by.css('.validTo')).last();
    expect(keyValidToEdit.getAttribute('value')).toEqual('12/31/2021');

    const keyTypeEdit = element.all(by.css('.keyType')).last();
    expect(keyTypeEdit.getText()).toEqual('Front Desk');

    // all inputs should be enabled, except Key Number;
    expect(keyNoEdit.isEnabled()).toBe(false);
    expect(keyDescEdit.isEnabled()).toBe(true);
    expect(keyValidFromEdit.isEnabled()).toBe(true);
    expect(keyValidToEdit.isEnabled()).toBe(false);
    expect(keyTypeEdit.isEnabled()).toBe(true);

    // edit Key description
    keyDescEdit.clear();
    keyDescEdit.sendKeys('Edited Admin');

    // edit Valid from
    keyValidFromEdit.getAttribute('value').then((text) => {
      const len = text.length;
      const backspaceSeries = Array(len + 1).join(Key.BACK_SPACE);
      keyValidFromEdit.sendKeys(backspaceSeries);
    });
    keyValidFromEdit.sendKeys('10/10/2020');

    const matCheckbox = element.all(by.css('.mat-checkbox')).last();
    matCheckbox.click();

    // edit Valid to
    keyValidToEdit.getAttribute('value').then((text) => {
      const len = text.length;
      const backspaceSeries = Array(len + 1).join(Key.BACK_SPACE);
      keyValidToEdit.sendKeys(backspaceSeries);
    });
    keyValidToEdit.sendKeys('11/11/2020');

    // Edit Key Type, select management
    keyTypeEdit.click();
    const management = element(by.id('keyType-5'));
    management.click();

    // Click on Update button
    const updateButton = element(by.css('.updateKey'));
    expect(updateButton.isEnabled).toBeTruthy();
    updateButton.click();

    // wait for success update
    browser.wait(() => {
      return element(by.css('.toast-success')).isPresent();
    }, 5000);

    // Key form (disabled) should be updated
    expect(keyDesc.getAttribute('value')).toEqual('Edited Admin');
    expect(keyValidFrom.getAttribute('value')).toEqual('10/10/2020');
    expect(keyValidTo.getAttribute('value')).toEqual('11/11/2020');
    expect(keyType.getText()).toEqual('Management');
  });


  // migracie problem
  xit('Edit key, clear valid to input and click update', () => {
    // Enter Adm
    const keySearch = element(by.css('.keySearch'));
    keySearch.sendKeys('A');
    keySearch.sendKeys('d');
    keySearch.sendKeys('m');

    // click on first mat-option
    const firstMatOption = element.all(by.tagName('mat-option')).first();
    expect(firstMatOption.isPresent()).toBe(true);
    firstMatOption.click();

    const editKeyButton = element(by.css('.editKey'));
    editKeyButton.click();

    // Dialog Edit Key Opened, inputs should be filled

    const matCheckbox = element.all(by.css('.mat-checkbox')).last();
    matCheckbox.click();

    const keyValidToEdit = element.all(by.css('.validTo')).last();

    // edit Valid to
    keyValidToEdit.getAttribute('value').then((text) => {
      const len = text.length;
      const backspaceSeries = Array(len + 1).join(Key.BACK_SPACE);
      keyValidToEdit.sendKeys(backspaceSeries);
    });

    // Click on Update button
    const updateButton = element(by.css('.updateKey'));
    expect(updateButton.isEnabled).toBeTruthy();
    updateButton.click();

    // // wait for success update
    // browser.wait(() => {
    //   return element(by.css('.toast-success')).isPresent();
    // }, 5000);


    // // Key Valid To (disabled) should be empty
    // expect(keyValidTo.getAttribute('value')).toEqual('');
  });
});




