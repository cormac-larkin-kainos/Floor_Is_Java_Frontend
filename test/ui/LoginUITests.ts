import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import { expect } from 'chai';
import chrome from 'selenium-webdriver/chrome';

describe('Landing Page', function () {
  this.timeout(100000);

  let driver: WebDriver;

  before(async function () {
    const options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--window-size=1920,1080');
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

        await usernameInput.sendKeys('invalidUsername');
        await passwordInput.sendKeys('validPassword');
        await loginButton.click();

        const errorMessage = await driver.wait(
          until.elementLocated(By.id('errorMessage')),
          5000
        );
        expect(await errorMessage.getText()).to.equal('Invalid Login credentials');
      });

      it('should show "Invalid Login credentials" error for incorrect password', async function () {
        const usernameInput = await driver.findElement(By.id('usernameInput'));
        const passwordInput = await driver.findElement(By.id('passwordInput'));
        const loginButton = await driver.findElement(By.id('loginSubmit'));

        await usernameInput.sendKeys('validUsername');
        await passwordInput.sendKeys('invalidPassword');
        await loginButton.click();

        const errorMessage = await driver.wait(
          until.elementLocated(By.id('errorMessage')),
          5000
        );
        expect(await errorMessage.getText()).to.equal('Invalid Login credentials');
      });
    });

    describe('Login with empty fields', function () {
      it('should show "Please fill in this field" prompt for empty username', async function () {
        const usernameInput = await driver.findElement(By.id('usernameInput'));
        const passwordInput = await driver.findElement(By.id('passwordInput'));
        const loginButton = await driver.findElement(By.id('loginSubmit'));

        // Clearing the username field to make it empty
        await usernameInput.clear();
        await passwordInput.sendKeys('validPassword');
        await loginButton.click();

        const promptMessage = await driver.wait(
          until.elementLocated(By.id('usernamePrompt')),
          5000
        );
        expect(await promptMessage.getText()).to.equal('Please fill in this field');
      });

      it('should show "Please fill in this field" prompt for empty password', async function () {
        const usernameInput = await driver.findElement(By.id('usernameInput'));
        const passwordInput = await driver.findElement(By.id('passwordInput'));
        const loginButton = await driver.findElement(By.id('loginSubmit'));

        // Clearing the password field to make it empty
        await usernameInput.sendKeys('validUsername');
        await passwordInput.clear();
        await loginButton.click();

        const promptMessage = await driver.wait(
          until.elementLocated(By.id('passwordPrompt')),
          5000
        );
        expect(await promptMessage.getText()).to.equal('Please fill in this field');
      });
    });
  });

  after(async function () {
    await driver.quit();
  });
});
