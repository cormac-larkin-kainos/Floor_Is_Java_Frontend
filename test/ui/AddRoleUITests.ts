import { Builder, By, Capabilities, Key, until, WebDriver } from 'selenium-webdriver';
import { expect } from 'chai';
import { Options } from 'selenium-webdriver/chrome';

describe('Add Role', function() {
  this.timeout(100000);

  let driver: WebDriver;

  before(async function() {
    const options = new Options();
    options.headless().windowSize({
      height: 1080,
      width: 1920,
    });
    driver = await new Builder().withCapabilities(Capabilities.chrome()).setChromeOptions(options).build();
    await driver.get('http://localhost:3000');
  });

  describe('Login with valid credentials', function () {
    it('should redirect to the correct page', async function () {
      const usernameInput = await driver.findElement(By.id('username'));
      await usernameInput.sendKeys(process.env.TEST_VALID_ADMIN_USERNAME);
      const passwordInput = await driver.findElement(By.id('password'));
      await passwordInput.sendKeys(process.env.TEST_VALID_ADMIN_PASSWORD);
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

  describe('Click Create New Role button', function () {
    it('should redirect to Add Jobs page', async function () {
      await driver.get('http://localhost:3000/jobs');
      const logoutButton = await driver.findElement(By.id('addJobButton'));
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await logoutButton.click();

      const url = await driver.getCurrentUrl();
      expect(url).to.include('add-job');
    });
  });

  describe('Add a New Role', function () {
    it('should redirect to the Add Job form', async function () {
      await driver.get('http://localhost:3000/add-job');
      
      const jobTitleInput = await driver.findElement(By.id('title'));
      await jobTitleInput.sendKeys('test title');

      const jobSpecInput = await driver.findElement(By.id('jobSpec'));
      await jobSpecInput.sendKeys('testJobSpec');

      const jobCapabilityInput = await driver.findElement(By.id('capability'));
      await jobCapabilityInput.click();
      await jobCapabilityInput.sendKeys('Quality Assurance');
      await jobCapabilityInput.sendKeys(Key.ENTER);
    
      const jobURL = await driver.findElement(By.id('jobURL'));
      await jobSpecInput.sendKeys('testURL');

      const jobBandInput = await driver.findElement(By.id('capability'));
      await jobBandInput.click();
      await jobBandInput.sendKeys('Associate');
      await jobBandInput.sendKeys(Key.ENTER);

      const addJobSubmit = await driver.findElement(By.id('addJobSubmit'));
      await addJobSubmit.click();

      const url = await driver.getCurrentUrl();
      expect(url).to.include('add-job');
    });
  });

after(async function() {
  await driver.quit();
});
});