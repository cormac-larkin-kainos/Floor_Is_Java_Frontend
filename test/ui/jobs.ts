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
      const button = await driver.findElement(By.className('btn-primary'));
      await new Promise(resolve => setTimeout(resolve, 5000));
      await button.click();

      const jobTable = await driver.wait(until.elementLocated(By.className('table')), 10000);
      expect(await jobTable.isDisplayed()).to.be.true;
    });
  });

  describe('"First View in Sharepoint" button', function() {
    it('should redirect to the appropriate page when clicked', async function() {
      const buttons = await driver.findElements(By.className('btn-primary'));
      const sharepointButton = buttons[0]; 
      await sharepointButton.click();

      await driver.wait(until.urlContains('sharepoint'), 5000);

      const url = await driver.getCurrentUrl();
      expect(url).to.include('sharepoint');
    });
  });

  after(async function() {
    await driver.quit();
  });
});
