import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import { expect } from 'chai';
import chrome from 'selenium-webdriver/chrome';

describe('Landing Page', function () {
  this.timeout(100000);

  let driver: WebDriver;

  before(async function () {
    const options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--start-maximized');
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    await driver.get('http://localhost:3000');
  });

  describe('Click Login button in header', function () {
    it('should open the login page and present form', async function () {
      const button = await driver.findElement(By.id('loginButton'));
      await new Promise((resolve) => setTimeout(resolve, 10000));
      await button.click();

      const loginForm = await driver.wait(until.elementLocated(By.id('form')), 30000);
      expect(await loginForm.isDisplayed()).to.be.true;
    });

    describe('Login with invalid credentials', function () {
      it('should show "Invalid Login credentials" error for incorrect username', async function () {
        const usernameInput = await driver.findElement(By.id('username'));
        const passwordInput = await driver.findElement(By.id('password'));
        const loginButton = await driver.findElement(By.id('loginSubmit'));

        await usernameInput.sendKeys('fakeUsername');
        await passwordInput.sendKeys(process.env.PASSWORD_SECRET);
        await loginButton.click();

        const errorMessage = await driver.wait(
          until.elementLocated(By.id('loginError')),
          5000
        );
        expect(await errorMessage.getText()).to.equal('Could not login');
      });

      it('should show "Invalid Login credentials" error for incorrect password', async function () {
        const usernameInput = await driver.findElement(By.id('username'));
        const passwordInput = await driver.findElement(By.id('password'));
        const loginButton = await driver.findElement(By.id('loginSubmit'));

        await usernameInput.sendKeys(process.env.USERNAME_SECRET);
        await passwordInput.sendKeys('fakePassword');
        await loginButton.click();

        const errorMessage = await driver.wait(
          until.elementLocated(By.id('loginAlert')),
          5000
        );
        expect(await errorMessage.getText()).to.equal('Could not login');
      });
    });

    describe('Login with empty fields', function () {
      it('should show "Please fill in this field" prompt for empty username', async function () {
        const usernameInput = await driver.findElement(By.id('username'));
        const passwordInput = await driver.findElement(By.id('password'));
        const loginButton = await driver.findElement(By.id('loginSubmit'));

        await usernameInput.clear();
        await passwordInput.sendKeys(process.env.PASSWORD_SECRET);
        await loginButton.click();

        const alert = await driver.switchTo().alert();
        const alertText = await alert.getText();
        
        expect(alertText).to.equal('Please fill in this field');
      });

      it('should show "Please fill in this field" prompt for empty password', async function () {
        const usernameInput = await driver.findElement(By.id('username'));
        const passwordInput = await driver.findElement(By.id('password'));
        const loginButton = await driver.findElement(By.id('loginSubmit'));

        await usernameInput.sendKeys(process.env.USERNAME_SECRET);
        await passwordInput.clear();
        await loginButton.click();

        const alert = await driver.switchTo().alert();
        const alertText = await alert.getText();
        
        expect(alertText).to.equal('Please fill in this field');
      });
    });
  });

  describe('Login with valid credentials', function () {
    it('should redirect to the correct page', async function () {
      const usernameInput = await driver.findElement(By.id('username'));
      const passwordInput = await driver.findElement(By.id('password'));
      const loginButton = await driver.findElement(By.id('loginSubmit'));
  
      await usernameInput.sendKeys(process.env.USERNAME_SECRET);
      await passwordInput.sendKeys(process.env.PASSWORD_SECRET);
      await loginButton.click();
  
      const redirectedPage = await driver.wait(
        until.urlContains('jobs'), 
        10000
      );
  
      expect(redirectedPage).to.be.true;
    });
  });
  

  after(async function () {
    await driver.quit();
  });
});
