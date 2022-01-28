import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }

  getEmailTextbox() {
    return element(by.css('.userEmail'));
  }

  getPasswordTextbox() {
    return element(by.css('.userPassword'));
  }

  getCaptchaTextbox() {
    return element(by.css('.userCaptcha'));
  }

  getLoginForm() {
    return element(by.css('.loginForm'));
  }

  getSubmitButton() {
    return element(by.css('.submitButton'));
  }

  getForgotPassEmailTextbox() {
    return element(by.css('.Email'));
  }

  getForgotPassForm() {
    return element(by.css('.forgotPassForm'));
  }

}
