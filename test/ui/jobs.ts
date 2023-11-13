import { Builder, Capabilities, By, until, WebDriver } from 'selenium-webdriver';
import { expect } from 'chai';

describe('Job List Page', function() {
  this.timeout(5000);

  let driver: WebDriver;

  before(async function() {
    driver = await new Builder().withCapabilities(Capabilities.chrome()).build();
    await driver.get('https://jfq3guymm9.eu-west-1.awsapprunner.com/');
  });

  describe('"View Job Roles" button', function() {
    it('should load job list when clicked', async function() {
      const button = await driver.findElement(By.className('btn-primary'));
      await button.click();

      const jobTable = await driver.wait(until.elementLocated(By.className('table')), 5000);
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
