import { Builder, By, Capabilities, until, WebDriver } from 'selenium-webdriver';
import { expect } from 'chai';
import { Options } from 'selenium-webdriver/chrome';
import { writeFile } from 'node:fs/promises'

describe('Landing Page', function() {
  this.timeout(100000);

  let driver: WebDriver;

  before(async function() {
    const options = new Options();
    options.headless().windowSize({
      height: 1080,
      width: 1920,
    });

    driver = await new Builder().withCapabilities(Capabilities.chrome()).setChromeOptions(options).build();
  });

  async function takeScreenshot(driver:WebDriver, file:string){
    let image = await driver.takeScreenshot()
    await writeFile(file, image, 'base64')
  }

  afterEach(async function() {
    takeScreenshot(driver,"./screenshots/" + this.currentTest.title + ".png")
  })


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