import { browser, logging, element, by, Key, Browser } from 'protractor';
import { HttpClient } from 'protractor-http-client';

describe('List Sites Test', () => {

  beforeAll(() => {
    browser.waitForAngularEnabled(false);
    browser.get(browser.baseUrl + '/en/definition/#/clients/2/sites');
  });

  afterAll(() => {
    browser.waitForAngularEnabled(true);
  });

  beforeEach(async () => {
    const http = new HttpClient();
    const getRequest = await http.get('http://rms-server:8000/e2e?uc_id=site');
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
    browser.get(browser.baseUrl + '/en/definition/#/clients/2/sites');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
    browser.get(browser.baseUrl);
  });


  it('Should create, edit and delete site', () => {
    browser.wait(() => {
      return (element.all(by.css('.sitesTable tbody tr')).isPresent());
    }, 5000);

    expect(browser.getTitle()).toContain('Site List');

    // count number of sites
    const sitesList = element.all(by.css('.sitesTable tbody tr'));
    expect(sitesList.count()).toBe(3);

    // ================= Create Site ======================
    // click on create button
    const createBtton = element(by.id('createSite'));
    createBtton.click();

    // should show create site form
    const title = element(by.css('.mat-card-title span:first-child'));
    expect(title.getText()).toMatch('Create Site');

    const form = element(by.tagName('form'));
    expect(form).toBeTruthy();

    // enter site name
    const name = element(by.css('.siteName'));
    name.clear();
    name.sendKeys('Site 3');

    // enter site id
    const siteId = element(by.css('.site_id'));
    siteId.clear();
    siteId.sendKeys(1221);

    // submit the form
    const formSite = element(by.id('siteForm'));
    formSite.submit();

    // wait for success
    browser.wait(() => {
      return element(by.css('.toast-success')).isPresent();
    }, 5000);

    // navigate to Site List
    expect(browser.getTitle()).toEqual('Site List');

    // test if site is updated
    const siteList = element.all(by.css('.sitesTable tbody tr'));
    expect(siteList.count()).toBe(4);

    // site should be added
    const siteCreated = element(by.id('name-6'));
    expect(siteCreated.getText()).toMatch('Site 3');

    // ================= Delete site =========================
    // click on delete button on site 2
    const deleteButton = element(by.id('del-4'));
    deleteButton.click();


    // click on close dialog, number of site should be same
    const closeDialog = element(by.id('cancelDeleteBtn'));
    closeDialog.click();
    expect(siteList.count()).toBe(4);

    // click on delete button dialog
    deleteButton.click();

    // required validation
    const enterId = element(by.css('#confirmId'));
    enterId.sendKeys(Key.TAB);
    expect(element(by.id('requiredId')).isPresent()).toBeTruthy();

    // delete button should be disabled
    const delDialog = element(by.id('confirmDeleteBtn'));
    expect(delDialog.getAttribute('disabled')).toBe('true');

    // enter wrong id
    enterId.sendKeys(1);
    expect(element(by.id('wrongId')).isPresent()).toBeTruthy();

    // delete button should be disabled
    expect(delDialog.getAttribute('disabled')).toBe('true');

    enterId.clear();
    enterId.sendKeys(4);
    // delete button should be enabled
    expect(delDialog.getAttribute('disabled')).toBe(null);

    delDialog.click();

    browser.sleep(1000);

    // site should be deleted
    expect(siteList.count()).toBe(3);

    // ================== Edit site =============================
    // click on edit button on site 3
    const editBtton = element(by.id('edit-3'));
    editBtton.click();

    // should show edit site form
    expect(title.getText()).toMatch('Edit Site');

    // Update Site Name
    const siteName = element(by.name('name'));
    expect(siteName.getAttribute('value')).toEqual('Test sitesss 3');

    // Update site name
    siteName.clear();
    siteName.sendKeys('Edited site 1');

    // Update site id
    siteId.clear();
    siteId.sendKeys(11);

    // const form = element(by.id('siteForm'));
    form.submit();

    // wait for success update
    browser.wait(() => {
      return element(by.css('.toast-success')).isPresent();
    }, 5000);

    expect(browser.getTitle()).toEqual('Site List');

    // test if site is updated
    expect(siteList.count()).toBe(3);

    // site should be updated
    const siteUpdate = element(by.id('name-3'));
    expect(siteUpdate.getText()).toMatch('Edited site 1');

    // ========================= Click on buidlings button ==================
    // browser.get(browser.baseUrl + '/en/definition/#/clients/2/sites');

    // // wait for success
    // browser.wait(() => {
    //   return element(by.css('.mat-card-title')).isDisplayed();
    // }, 5000);

    // click on buildings button on site 2
    const buildingButton = element(by.id('building-3'));
    buildingButton.click();

    // Navigate to Building List
    expect(browser.getTitle()).toEqual('Building List');
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'en/definition/#/sites/3/buildings');

    // =========================== Click on Floor Layouts button ===================
    browser.get(browser.baseUrl + '/en/definition/#/clients/2/sites');

    // wait for success
    browser.wait(() => {
      return element(by.css('.mat-card-title')).isDisplayed();
    }, 5000);

    // click on Floor Layouts button
    const fld = element(by.id('fld-3'));
    fld.click();

    // Navigate to Floor Layout List
    expect(browser.getTitle()).toEqual('Floor Layout List');
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'en/definition/#/sites/3/fld');

    // ========================== Click on Offers button =====================
    browser.get(browser.baseUrl + '/en/definition/#/clients/2/sites');

    // wait for success
    browser.wait(() => {
      return element(by.css('.mat-card-title')).isDisplayed();
    }, 5000);

    // click on Offers button
    const offer = element(by.id('offer-3'));
    offer.click();

    // Navigate to Offers List
    expect(browser.getTitle()).toEqual('Site Offers List');
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'en/definition/#/sites/3/offers');

    // =========================== Click on Invite Manager, test validation ====================
    browser.get(browser.baseUrl + '/en/definition/#/clients/2/sites');

    // wait for success
    browser.wait(() => {
      return element(by.css('.mat-card-title')).isDisplayed();
    }, 5000);

    // click on Offers button
    const inviteManager = element(by.id('invite-3'));
    inviteManager.click();

    expect(element(by.id('mat-dialog-0')).isPresent()).toBeTruthy();

    // const managerName = element(by.css('.managerName'));
    const managerForm = element(by.css('.managerForm'));
    const nameManager = element(by.name('name'));
    const surnameManager = element(by.name('surname'));
    const email = element(by.name('email'));
    const submitBtn = element(by.css('button[type="submit"]'));

    // Testing name required validation
    nameManager.sendKeys(Key.TAB);
    expect(element(by.id('validateNameRequired')).isPresent()).toBeTruthy();
    // Testing name length validation
    nameManager.sendKeys('a');
    expect(element(by.id('validateNameLength')).isPresent()).toBeTruthy();

    // Testing surname required validation
    surnameManager.sendKeys(Key.TAB);
    expect(element(by.id('validateSurnameRequired')).isPresent()).toBeTruthy();
    // Testing name length validation
    surnameManager.sendKeys('a');
    expect(element(by.id('validateSurnameLength')).isPresent()).toBeTruthy();

    // Testing phone numeric validation
    email.sendKeys(Key.TAB);
    expect(element(by.id('validateEmailRequired')).isPresent()).toBeTruthy();
    email.sendKeys('dddd');
    email.sendKeys(Key.TAB);
    expect(element(by.id('validateEmailProper')).isPresent()).toBeTruthy();

    // Form is invalid, button is disabled
    expect(managerForm.getAttribute('class')).toContain('ng-invalid');
    expect(submitBtn.isEnabled()).toBeFalsy();
  });
});



