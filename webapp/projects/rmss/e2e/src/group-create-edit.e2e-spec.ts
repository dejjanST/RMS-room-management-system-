import { browser, logging, element, by, Key, Browser } from 'protractor';
import { HttpClient } from 'protractor-http-client';

describe('Group Create Test', () => {

  beforeAll(() => {
    browser.get(browser.baseUrl + 'en/rmss/#/groups/new');
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

    browser.get(browser.baseUrl + 'en/rmss/#/groups/new');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.DEBUG,
    } as logging.Entry));
  });

  it('url should be groups/new', () => {
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'en/rmss/#/groups/new');
  });


  it('Create group form validation and test include and delete', () => {

    const groupName = element(by.css('.groupName'));
    const groupColor = element(by.css('.groupColor'));

    // Group Name validation
    groupName.sendKeys(Key.TAB);
    expect(element(by.css('.minLength')).isPresent()).toBeTruthy();

    // Group Color initially should not be empty
    expect(groupColor.getAttribute('value')).not.toBe('');

    // Create Group button should be disabled
    const groupButtonSubmit = element(by.css('.groupButtonSubmit'));
    expect(groupButtonSubmit.isEnabled()).toBe(false);

    // set group name
    groupName.sendKeys('Fourth Group');
    // set group color
    groupColor.sendKeys('#0000ff');


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


    // ============ Click on 'Units' mat select ==================
    const unitSelect = element(by.id('unitSelect'));
    unitSelect.click();

    // click on 'Test floor' option
    const unitTwo = element(by.id('optionU2'));
    unitTwo.click();


    // click on + button
    const grantBtn = element(by.css('.grantBtn'));
    grantBtn.click();

    // Access List should have one record
    const aclList = element.all(by.css('.aclList tbody tr'));
    expect(aclList.count()).toBe(1);

    // building should be Building one
    const newGroupBuilding = element.all(by.css('.cdk-column-building')).last();
    expect(newGroupBuilding.getText()).toMatch('Building one');

    // floor should be Test floor
    const newGroupFloor = element.all(by.css('.cdk-column-floor')).last();
    expect(newGroupFloor.getText()).toMatch('Test floor');

    // floor should be Test unit two
    const newGroupUnit = element.all(by.css('.cdk-column-unit')).last();
    expect(newGroupUnit.getText()).toMatch('Test unit two');

    // click on delete button
    const deleteButton = element(by.css('.delete-2'));
    deleteButton.click();

    // Access List should have 0 records
    expect(aclList.count()).toBe(0);
  });


  it('Create group and acl, check the group list and edit the group', () => {

    const groupName = element(by.css('.groupName'));
    const groupColor = element(by.css('.groupColor'));

    // Group Name validation
    groupName.sendKeys(Key.TAB);
    expect(element(by.css('.minLength')).isPresent()).toBeTruthy();

    // Group Color initially should not be empty
    expect(groupColor.getAttribute('value')).not.toBe('');

    // Create Group button should be disabled
    const groupButtonSubmit = element(by.css('.groupButtonSubmit'));
    expect(groupButtonSubmit.isEnabled()).toBe(false);

    // set group name
    groupName.sendKeys('Fourth Group');
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


    // ============ Click on 'Units' mat select ==================
    const unitSelect = element(by.id('unitSelect'));
    unitSelect.click();

    // click on 'Test floor' option
    const unitTwo = element(by.id('optionU1'));
    unitTwo.click();

    // click on + button
    const grantBtn = element(by.css('.grantBtn'));
    grantBtn.click();

    // Access List should have one record
    const aclList = element.all(by.css('.aclList tbody tr'));
    expect(aclList.count()).toBe(1);

    // click on Create Group button
    expect(groupButtonSubmit.isEnabled()).toBe(true);
    groupButtonSubmit.click();

    // wait for success update
    browser.wait(() => {
      return element(by.css('.toast-success')).isPresent();
    }, 5000);

    // after click Create Group button, should display Group List
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'en/rmss/#/groups');

    // Group List should have one more record
    const groupsList = element.all(by.css('.groupsTable tbody tr'));
    expect(groupsList.count()).toBe(4);

    // new record Fourth Group should be added
    const lastRecord = element.all(by.css('.cdk-column-Name')).last();
    expect(lastRecord.getText()).toMatch('Fourth Group');

    // check created group color
    const lastRecordGroupColor = element.all(by.css('.cdk-column-Color .circle')).last();
    expect(lastRecordGroupColor.getCssValue('background-color')).toEqual('rgba(0, 0, 255, 1)');

    // ================== Edit Group 4 ===========================
    const thirdGroup = element(by.id('edit-4'));
    thirdGroup.click();

    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'en/rmss/#/groups/4');

    // group name should be 'Fourth Group'
    expect(groupName.getAttribute('value')).toEqual('Fourth Group');

    // group color should be '#0000ff'
    expect(groupColor.getAttribute('value')).toEqual('#0000ff');

    // Update Group button should be enabled
    expect(groupButtonSubmit.isEnabled()).toBe(true);

    // change group name
    groupName.clear();
    groupName.sendKeys('Edited Fourth group');

    groupColor.click();

    hexText.clear();
    hexText.sendKeys('#00FA9A');

    // in ACL Building column should be 'Building one'
    const columnBuidling = element.all(by.css('.mat-column-building')).last();
    expect(columnBuidling.getText()).toMatch('Building one');

    // in ACL Floor column should be 'Test floor'
    const columnFloor = element.all(by.css('.mat-column-floor')).last();
    expect(columnFloor.getText()).toMatch('Test floor');

    // in ACL Unit column should be 'Test unit one'
    const columnUnit = element.all(by.css('.mat-column-unit')).last();
    expect(columnUnit.getText()).toMatch('Test unit one');

    // click on Update Group button
    expect(groupButtonSubmit.isEnabled()).toBe(true);
    groupButtonSubmit.click();

    // wait for success update
    browser.wait(() => {
      return element(by.css('.toast-success')).isPresent();
    }, 5000);

    // after click Update Group button, should display Group List
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'en/rmss/#/groups');

    // Access List should have same number of groups
    expect(groupsList.count()).toBe(4);

    // updated record Third Group should be 'Edited Third group'
    const lastRecordGroupName = element.all(by.css('.cdk-column-Name')).last();
    expect(lastRecordGroupName.getText()).toMatch('Edited Fourth group');

    // check edit group color
    expect(lastRecordGroupColor.getCssValue('background-color')).toEqual('rgba(0, 250, 154, 1)');
  });
});

