import { Builder, By, Capabilities, until, WebDriver } from 'selenium-webdriver';
import { expect } from 'chai';
import { Options } from 'selenium-webdriver/chrome';
import { writeFile } from 'node:fs/promises';

describe('Login & Site Flow Tests', function() {
  this.timeout(100000);

  let driver: WebDriver;

  before(async function() {
    const options = new Options();
    options.windowSize({
      height: 1080,
      width: 1920,
    });
    driver = await new Builder().withCapabilities(Capabilities.chrome()).setChromeOptions(options).build();
    await driver.get('http://localhost:3000');
  });

  describe('Login with valid credentials', function () {
    it('should redirect to the correct page', async function () {
      const usernameInput = await driver.findElement(By.id('username'));
      await usernameInput.sendKeys(process.env.TEST_VALID_USERNAME);
      const passwordInput = await driver.findElement(By.id('password'));
      await passwordInput.sendKeys(process.env.TEST_VALID_PASSWORD);
      const loginButton = await driver.findElement(By.id('loginSubmit'));
      await loginButton.click();
  
      const redirectedPage = await driver.wait(
        until.urlIs('http://localhost:3000/'), 
        10000
      );
  
      expect(redirectedPage).to.be.true;
    });
  });
  

  describe('"View Job Roles" button', function() {
    it('should load job list when clicked', async function() {
      await driver.get('http://localhost:3000');
      const button = await driver.findElement(By.id('viewJobRolesButton'));
      await new Promise(resolve => setTimeout(resolve, 5000));
      await button.click();
      
      const jobTable = await driver.wait(until.elementLocated(By.id('jobs')), 30000);
      expect(await jobTable.isDisplayed()).to.be.true;
    });
  });

  describe('"First See Responsibilities" button', function() {
    it('should redirect to the appropriate page when clicked', async function() {
      const jobId = 5;
      const button = await driver.findElement(By.id(`viewJobSpecButton_${jobId}`));
      await button.click();

      await driver.wait(until.urlContains('job-spec'), 20000);

      const url = await driver.getCurrentUrl();
      expect(url).to.include('job-spec');
    });
  });

  describe('Click Login button in header', function () {
    it('should open the login page and present form', async function () {
      await driver.get('http://localhost:3000/login');
      const button = await driver.findElement(By.id('loginButton'));
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await button.click();

      const loginForm = await driver.wait(until.elementLocated(By.id('form')), 30000);
      expect(await loginForm.isDisplayed()).to.be.true;
    });
  });

  describe('Click Logout button in header', function () {
    it('should logout and redirect to login page', async function () {
      await driver.get('http://localhost:3000');
      const logoutButton = await driver.findElement(By.id('logoutButton'));
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await logoutButton.click();

      const url = await driver.getCurrentUrl();
      expect(url).to.include('login');
    });
  });

describe('Login with invalid login credentials', function () {
  it('should show "Invalid Login credentials" error for incorrect username', async function () {
    await driver.get('http://localhost:3000/login');
    const usernameInput = await driver.findElement(By.id('username'));
    await usernameInput.sendKeys('fakeUsername');
    const passwordInput = await driver.findElement(By.id('password'));
    await passwordInput.sendKeys(process.env.TEST_VALID_PASSWORD);
    const loginButton = await driver.findElement(By.id('loginSubmit'));

    await loginButton.click();

    const errorMessage = await driver.wait(
      until.elementLocated(By.id('errorMessage')),
      5000
    );
    expect(await errorMessage.getText()).to.equal('Invalid Login credentials');
  });
});

describe('Login with invalid password credentials', function () {
  it('should show "Invalid Login credentials" error for incorrect password', async function () {
    await driver.get('http://localhost:3000/login');
    const usernameInput = await driver.findElement(By.id('username'));
    await usernameInput.sendKeys(process.env.TEST_VALID_USERNAME);
    const passwordInput = await driver.findElement(By.id('password'));
    await passwordInput.sendKeys('fakePassword');
    const loginButton = await driver.findElement(By.id('loginSubmit'));
    await loginButton.click();

    const url = await driver.getCurrentUrl();
      expect(url).to.include('login');
    });
});

describe('Login with empty username field', function () {
  it('should show "Please fill in this field" prompt for empty username', async function () {
    await driver.get('http://localhost:3000/login');
    const usernameInput = await driver.findElement(By.id('username'));
    await usernameInput.clear();
    const passwordInput = await driver.findElement(By.id('password'));
    await passwordInput.sendKeys(process.env.TEST_VALID_PASSWORD);
    const loginButton = await driver.findElement(By.id('loginSubmit'));

    await loginButton.click();
    
    const url = await driver.getCurrentUrl();
      expect(url).to.include('login');
    });
});

describe('Login with empty password field', function () {
  it('should show "Please fill in this field" prompt for empty password', async function () {
    await driver.get('http://localhost:3000/login');
    const usernameInput = await driver.findElement(By.id('username'));
    await usernameInput.sendKeys(process.env.TEST_VALID_USERNAME);
    const passwordInput = await driver.findElement(By.id('password'));
    await passwordInput.clear();
    const loginButton = await driver.findElement(By.id('loginSubmit'));

    await loginButton.click();
    
    const url = await driver.getCurrentUrl();
      expect(url).to.include('login');
    });
});

after(async function() {
  await driver.quit();
});
});