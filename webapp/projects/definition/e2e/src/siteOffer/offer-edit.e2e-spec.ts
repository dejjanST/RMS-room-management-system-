import { browser, logging, element, by, Key, Browser } from 'protractor';
import { HttpClient } from 'protractor-http-client';

describe('Edit Offer', () => {

  beforeAll(() => {
    browser.get(browser.baseUrl + 'en/definition/#/sites/1/offers/1');
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

    browser.get(browser.baseUrl + 'en/definition/#/sites/1/offers/1');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });

  it('title should be Site Offers', () => {
    expect(browser.getTitle()).toEqual('Edit Site Offer');
  });


  it('testing edit offer with status open and update offer name', () => {
    // offer status
    const chipStatus = element(by.css('.mat-chip'));
    expect(chipStatus.getText()).toEqual('Open');

    // View offer link is not displayed
    const viewOffer = element(by.id('viewOffer'));
    expect(viewOffer.isPresent()).toEqual(false);

    // Send offer button is not displayed
    const sendOffer = element(by.id('sendOffer'));
    expect(sendOffer.isPresent()).toBeFalsy();

    const genData = element(by.css('.mat-accordion:first-child'));
    genData.click();
    browser.sleep(1000);

    // Offer name input should contain 'Test offer open'
    const siteOfferName = element(by.id('siteOfferName'));
    expect(siteOfferName.getAttribute('value')).toEqual('Test offer open');
    siteOfferName.clear();
    siteOfferName.sendKeys('Offer name Updated');

    // Number of Buildings input should be 1
    const numOfBuildings = element(by.id('numberOfBuildings'));
    expect(numOfBuildings.getAttribute('value')).toEqual('1');

    // Number of Receptions input should be 1
    const numberOfReceptions = element(by.id('numberOfReceptions'));
    expect(numberOfReceptions.getAttribute('value')).toEqual('1');

    // Click on update button
    const updateBtn = element(by.id('submitButton'));
    expect(updateBtn.isEnabled()).toBeTruthy();
    updateBtn.click();

    // Should navigate to Site Offers list
    expect(browser.getTitle()).toEqual('Site Offers List');

    // site should be updated
    const siteUpdate = element(by.id('name-1'));
    expect(siteUpdate.getText()).toMatch('Offer name Updated');
  });


  it('testing edit offer with status open and send offer email', () => {
    const chipStatus = element(by.css('.mat-chip'));
    const sendOffer = element(by.id('sendOffer'));
    const viewOffer = element(by.id('viewOffer'));

     // upload image
    const fileAbsolutePath = '/project/webapp/projects/definition/e2e/src/siteOffer/offer.pdf';
    const fileUpload = element(by.css('input[type="file"]'));
    fileUpload.sendKeys(fileAbsolutePath);

    // toast after file upload
    browser.wait(() => {
      return element(by.className('toast-success')).isDisplayed();
    }, 5000);

    expect(element(by.id('toast-container')).getText()).toEqual('The file has been created successfully');

    // View offer link is displayed
    expect(viewOffer.isDisplayed()).toBeTruthy();

    // Send offer button is displayed
    expect(sendOffer.isDisplayed()).toBeTruthy();

    // refresh the browser, toast for upload pdf will disappear
    browser.get(browser.baseUrl + 'en/definition/#/sites/1/offers/1');

    // After click send offer button, should display send offer form
    sendOffer.click();

    // Send Offer Form Validation
    const toEmail = element(by.css('input[type="email"]'));
    toEmail.sendKeys(Key.TAB);
    // test email required
    expect(element(by.id('emailToRequired')).isPresent()).toBeTruthy();
    // test email validation
    toEmail.sendKeys('a');
    expect(element(by.id('emailToValidation')).isPresent()).toBeTruthy();

    const subject = element(by.id('subject'));
    subject.sendKeys(Key.TAB);
    // test subject length validation
    expect(element(by.id('subjectLengthValidation')).isPresent()).toBeTruthy();

    const message = element(by.id('message'));
    message.sendKeys(Key.TAB);
    // test message length validation
    expect(element(by.id('messageLengthValidation')).isPresent()).toBeTruthy();


    // Form is invalid, button is disabled
    const submitBtn = element(by.id('btnSendOffer'));
    expect(submitBtn.isEnabled()).toBeFalsy();

    // fill the form
    toEmail.clear();
    toEmail.sendKeys('user@example.com');
    subject.sendKeys('Site Offer');
    message.sendKeys('Some message for site offer');

    // submit button is enabled
    expect(submitBtn.isEnabled()).toBeTruthy();

    // sending offer
    submitBtn.click();

    // toast after send offer
    browser.wait(() => {
      return element(by.className('toast-success')).isDisplayed();
    }, 5000);

    expect(element(by.id('toast-container')).getText()).toEqual('The offer has been sent successfully');

    // after sending offer, new note has been added
    const notes = element.all(by.css('#notesList li'));
    expect(notes.count()).toBe(2);

    // offer status changed to Sent
    expect(chipStatus.getText()).toEqual('Sent');

    // accept button to be displayed
    const acceptOffer = element(by.id('acceptOffer'));
    expect(acceptOffer.isPresent()).toBeTruthy();

    // decline button to be displayed
    const declineOffer = element(by.id('declineOffer'));
    expect(declineOffer.isPresent()).toBeTruthy();

    // view offer link to be displayed
    expect(viewOffer.isPresent()).toBeTruthy();
  });


  it('Test offer with status sent, click on decline', () => {
    browser.get(browser.baseUrl + 'en/definition/#/sites/1/offers/2');

    // status offer should be Sent
    const chipStatus = element(by.css('.mat-chip'));
    expect(chipStatus.getText()).toEqual('Sent');

    // accept button to be displayed
    const acceptOffer = element(by.id('acceptOffer'));
    expect(acceptOffer.isPresent()).toBeTruthy();

    // decline button to be displayed
    const declineOffer = element(by.id('declineOffer'));
    expect(declineOffer.isPresent()).toBeTruthy();

    // click on decline offer
    declineOffer.click();

    // offer status changed to Declined
    expect(chipStatus.getText()).toEqual('Declined');

    // after click decline, new hote should be added
    const notes = element.all(by.css('#notesList li'));
    expect(notes.count()).toBe(2);

    // toast after decline offer
    browser.wait(() => {
      return element(by.className('toast-success')).isDisplayed();
    }, 5000);

    expect(element(by.id('toast-container')).getText()).toEqual('The offer has been declined successfully');
  });


  it('Test offer with status sent, click on accept', () => {
    browser.get(browser.baseUrl + 'en/definition/#/sites/1/offers/2');

    const chipStatus = element(by.css('.mat-chip'));
    expect(chipStatus.getText()).toEqual('Sent');

    // accept button to be displayed
    const acceptOffer = element(by.id('acceptOffer'));
    expect(acceptOffer.isPresent()).toBeTruthy();

    // click on accept offer
    acceptOffer.click();

    // offer status changed to Accepted
    expect(chipStatus.getText()).toEqual('Accepted');

    // after click accept, new hote should be added
    const notes = element.all(by.css('#notesList li'));
    expect(notes.count()).toBe(2);

    // toast after decline offer
    browser.wait(() => {
      return element(by.className('toast-success')).isDisplayed();
    }, 5000);

    expect(element(by.id('toast-container')).getText()).toEqual('The offer has been accepted successfully');
  });


  it('Test creating note', () => {
    // number of notes should be 1
    const notes = element.all(by.css('#notesList li'));
    expect(notes.count()).toBe(1);

    const submitNoteMessage = element(by.id('noteSave'));

    // note area validation
    const noteArea = element(by.id('noteArea'));
    expect(noteArea.isDisplayed).toBeTruthy();

    noteArea.sendKeys(Key.TAB);
    // textarea length validation
    expect(element(by.id('noteLength')).isPresent()).toBeTruthy();
    expect(submitNoteMessage.isEnabled()).toBeFalsy();

    noteArea.sendKeys('message for note');
    expect(submitNoteMessage.isEnabled()).toBeTruthy();
    submitNoteMessage.click();

    // toast after adding note
    browser.wait(() => {
      return element(by.className('toast-success')).isDisplayed();
    }, 5000);

    // check if new note is in the list
    const note = element.all(by.css('#note1 mat-card'));
    expect(note.getText()).toMatch('Test note');
    expect(notes.count()).toBe(2);
  });
});


