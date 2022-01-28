import { browser, logging, element, by, Key, Browser } from 'protractor';
import { HttpClient } from 'protractor-http-client';

describe('ACL Container', () => {

  beforeAll(() => {
    browser.get(browser.baseUrl + 'en/rmss/#/key/1');
  });


  beforeEach(async () => {
    const http = new HttpClient();
    const getRequest = await http.get('http://rms-site:8000/e2e?uc_id=groups');
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

    browser.get(browser.baseUrl + 'en/rmss/#/key/1');
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


  it('Edit groups for testing and add them to acl list', () => {

    const keyNo = element(by.className('key_no'));
    const keyDesc = element(by.className('key_desc'));
    const keyValidFrom = element(by.id('validFrom'));
    const keyValidTo = element(by.id('validTo'));
    const keyType = element(by.css('.keyType'));

    // all inputs should be disabled
    expect(keyNo.isEnabled()).toBe(false);
    expect(keyDesc.isEnabled()).toBe(false);
    expect(keyValidFrom.isEnabled()).toBe(false);
    expect(keyValidTo.isEnabled()).toBe(false);
    expect(keyType.getAttribute('aria-disabled')).toEqual('true');

    // edit button should be enabled
    const editKeyButton = element(by.css('.editKey'));
    expect(editKeyButton.isEnabled).toBeTruthy();

    // ====== Edit Group 2 =========================
    browser.get(browser.baseUrl + 'en/rmss/#/groups/2');

    const groupColor = element(by.css('.groupColor'));
    // set group color
    groupColor.click();

    const hexText = element(by.css('.hex-text input'));
    hexText.clear();
    hexText.sendKeys('#0000ff');

    // ============ Click on 'Buildings' select ====================
    const buildingSelect = element(by.id('buildingSelect'));
    buildingSelect.click();

    // click on 'Building one' option
    const buildingOne = element(by.id('optionB1'));
    buildingOne.click();


    // ============ Click on 'Floors' mat select =================
    const floorSelect = element(by.id('floorSelect'));
    floorSelect.click();

    // click on 'Test floor' option
    const floorOne = element(by.id('optionF1'));
    floorOne.click();


    // // ============ Click on 'Units' mat select ==================
    const unitSelect = element(by.id('unitSelect'));
    unitSelect.click();

    // click on 'Test floor' option
    const unitTwo = element(by.id('optionU1'));
    unitTwo.click();

    // click on + button
    const grantBtn = element(by.css('.grantBtn'));
    grantBtn.click();

    // click on Create Group button
    const groupButtonSubmit = element(by.css('.groupButtonSubmit'));
    expect(groupButtonSubmit.isEnabled()).toBe(true);
    groupButtonSubmit.click();

    // wait for success update
    browser.wait(() => {
      return element(by.css('.toast-success')).isPresent();
    }, 5000);

    browser.sleep(3000);
    browser.get(browser.baseUrl + 'en/rmss/#/groups');

    // ====== Edit Group 3 =========================
    browser.get(browser.baseUrl + 'en/rmss/#/groups/3');

    // ============ Click on 'Buildings' select ====================
    const buildingSelect3 = element(by.id('buildingSelect'));
    buildingSelect3.click();

    // click on 'Building one' option
    const buildingOne3 = element(by.id('optionB1'));
    buildingOne3.click();


    // ============ Click on 'Floors' mat select =================
    const floorSelect3 = element(by.id('floorSelect'));
    floorSelect3.click();

    // click on 'Test floor' option
    const floorOne3 = element(by.id('optionF1'));
    floorOne.click();


    // // ============ Click on 'Units' mat select ==================
    const unitSelect3 = element(by.id('unitSelect'));
    unitSelect3.click();

    // click on 'Test floor' option
    const unitTwo3 = element(by.id('optionU1'));
    unitTwo3.click();


    // click on + button
    grantBtn.click();

    // click on Create Group button
    expect(groupButtonSubmit.isEnabled()).toBe(true);
    groupButtonSubmit.click();

    // wait for success update
    browser.wait(() => {
      return element(by.css('.toast-success')).isPresent();
    }, 5000);

    browser.get(browser.baseUrl + 'en/rmss/#/key/1');

    // Group List should have two records
    const groupsList = element.all(by.css('.aclList tbody tr'));
    expect(groupsList.count()).toBe(2);

    // remove group by clicking x on First Group chip
    const firstGroupChip = element(by.css('.mat-chip-remove'));
    firstGroupChip.click();

    expect(groupsList.count()).toBe(1);

    const matChipInput = element(by.css('.mat-chip-input'));
    matChipInput.click();

    // click on First Group
    const matAutocomplete = element.all(by.css('.mat-option')).first();
    matAutocomplete.click();

    // click outside mat chip input
    const matCardContent = element.all(by.css('.mat-card-content')).last();
    matCardContent.click();

    // click on Second Group
    matChipInput.click();
    matAutocomplete.click();

    // click on Third Group
    matCardContent.click();
    matChipInput.click();
    matAutocomplete.click();

    expect(groupsList.count()).toBe(3);

    // check if record has two groups
    const third = element.all(by.css('.aclList tbody tr .cdk-column-groups .flex')).last();
    const groups = third.all(by.tagName('li'));
    expect(groups.count()).toBe(2);

    // check color of first group
    const firstGroup = groups.first();
    expect(firstGroup.getCssValue('background-color')).toEqual('rgba(0, 0, 255, 1)');

    // check color of second group
    const lastGroup = groups.last();
    expect(lastGroup.getCssValue('background-color')).toEqual('rgba(206, 64, 31, 1)');

    // delete button should be disabled
    const deleteButtonFirst = element(by.css('#deleteACL1'));
    expect(deleteButtonFirst.getAttribute('disabled')).toBe('true');

    // delete button should be disabled
    const deleteButtonSecond = element(by.css('#deleteACL2'));
    expect(deleteButtonSecond.getAttribute('disabled')).toBe('true');

    // delete access created in acl container
    const deleteButton1 = element(by.css('#deleteACL0'));
    expect(deleteButton1.getAttribute('ng-reflect-disabled')).toBe('false');
    deleteButton1.click();

    expect(groupsList.count()).toBe(2);
  });


  it('Test exclude', () => {
    const buildingSelect = element(by.id('buildingSelect'));
    buildingSelect.click();

    const buildingOne = element(by.id('optionB1'));
    buildingOne.click();

    const floorSelect = element(by.id('floorSelect'));
    floorSelect.click();

    const testFloor = element(by.id('optionF1'));
    testFloor.click();

    const unitSelect = element(by.id('unitSelect'));
    unitSelect.click();

    const unitOne = element(by.id('optionU1'));
    unitOne.click();

    const denyBtn = element(by.className('denyBtn'));
    denyBtn.click();

    // Group List should have two records
    const groupsList = element.all(by.css('.aclList tbody tr'));
    expect(groupsList.count()).toBe(3);

    // delete the record
    const deleteButton = element(by.id('deleteACL2'));
    deleteButton.click();

    expect(groupsList.count()).toBe(2);
  });


  it('Test if buildings select ALL, include and exclude should be disabled', () => {
    const buildingSelect = element(by.id('buildingSelect'));
    buildingSelect.click();

    // click on 'All' option in buildings select
    const buildingsAll = element(by.id('optionB'));
    buildingsAll.click();

    // include should be disabled
    const includeRule = element(by.id('includeRule'));
    expect(includeRule.getAttribute('disabled')).toBe('true');

    // exclude should be disabled
    const excludeRule = element(by.id('excludeRule'));
    expect(excludeRule.getAttribute('disabled')).toBe('true');

    buildingSelect.click();
    const buildingOne = element(by.id('optionB1'));
    buildingOne.click();

    // include and exclude should be disabled
    expect(includeRule.getAttribute('ng-reflect-disabled')).toBe('false');
    expect(excludeRule.getAttribute('ng-reflect-disabled')).toBe('false');
  });

});




