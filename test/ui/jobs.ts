import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import { expect } from 'chai';
import chrome from 'selenium-webdriver/chrome';

describe('Landing Page', function() {
  this.timeout(100000);

  let driver: WebDriver;

  before(async function() {
    const options = new chrome.Options();
    options.addArguments('--headless'); 
    options.addArguments('--window-size=1920,1080');
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    await driver.get('http://localhost:3000');
  });

  describe('"View Job Roles" button', function() {
    it('should load job list when clicked', async function() {
      const button = await driver.findElement(By.id('viewJobRolesButton'));
      await new Promise(resolve => setTimeout(resolve, 10000));
      await button.click();
      
      const jobTable = await driver.wait(until.elementLocated(By.id('jobs')), 30000);
      expect(await jobTable.isDisplayed()).to.be.true;
    });
  });

  describe('"First View in Sharepoint" button', function() {
    it('should redirect to the appropriate page when clicked', async function() {
      const jobId = 1;
      const button = await driver.findElement(By.id(`viewSharePointButton_${jobId}`));
      await button.click();

      await driver.wait(until.urlContains('sharepoint'), 20000);

      const url = await driver.getCurrentUrl();
      expect(url).to.include('sharepoint');
    });
  });

  //from DM-hope this works!
  describe('"First view in addJob" button', function(){
    it('should redirect to the add-job form page when clicked', async function() {
      const addButton = await driver.findElement(By.id('addJobButton'));
      await addButton.click();
      await driver.wait(until.urlContains('add-job'), 20000);

      const url = await driver.getCurrentUrl();
      expect(url).to.include('add-job');

    });

    after(async function() {
      await driver.quit();
    });
  });
});
