import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import { expect } from 'chai';
import chrome from 'selenium-webdriver/chrome';

describe('Landing Page', function() {
  this.timeout(100000);

  let driver: WebDriver;

  before(async function() {
    const options = new chrome.Options();
    options.headless().windowSize({
      width: 1920,
      height: 1080,
    });

    //options.addArguments("disable-dev-shm-usage")
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    driver.manage().setTimeouts({
      implicit: 20000,
      pageLoad: 10000
    })
    //await driver.get('http://localhost:3000');
  });

  describe('"View Job Roles" button', function() {
    it('should load job list when clicked', async function() {
      await driver.get('http://localhost:3000');
      const button = await driver.findElement(By.id('viewJobRolesButton'));
      await new Promise(resolve => setTimeout(resolve, 10000));
      await button.click();
      
      const jobTable = await driver.wait(until.elementLocated(By.id('jobs')), 30000);
      expect(await jobTable.isDisplayed()).to.be.true;
    });
  });

  describe('"First View in Sharepoint" button', function() {
    it('should redirect to the appropriate page when clicked', async function() {
      await driver.get('http://localhost:3000');
      const jobId = 1;
      const button = await driver.findElement(By.id(`viewSharePointButton_${jobId}`));
      await button.click();

      await driver.wait(until.urlContains('sharepoint'), 20000);

      const url = await driver.getCurrentUrl();
      expect(url).to.include('sharepoint');
    });
  });

  after(async function() {
    await driver.quit();
  });
});