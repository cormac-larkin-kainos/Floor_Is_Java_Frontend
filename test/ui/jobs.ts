import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import { expect } from 'chai';
import chrome from 'selenium-webdriver/chrome';

describe('Job Roles Tests', function() {
  this.timeout(100000);

  let driver: WebDriver;

  before(async function() {
    const options = new chrome.Options();
    options.addArguments('--headless'); 
    options.addArguments('--window-size=1920,1080');
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    await driver.get('http://localhost:3000');
  });

  it('should load job list and redirect to Sharepoint page when clicked', async function () {
    const viewJobRolesButton = await driver.findElement(By.id('viewJobRolesButton'));
    await driver.wait(until.elementIsEnabled(viewJobRolesButton), 10000);
    await viewJobRolesButton.click();

    const jobTable = await driver.wait(until.elementLocated(By.id('jobs')), 30000);
    await driver.wait(until.elementIsVisible(jobTable), 10000);

    expect(await jobTable.isDisplayed()).to.be.true;

    const jobId = 1;
    const viewSharePointButton = await driver.findElement(By.id(`viewSharePointButton_${jobId}`));
    await driver.wait(until.elementIsEnabled(viewSharePointButton), 10000);
    await viewSharePointButton.click();

    await driver.wait(until.urlContains('sharepoint'), 20000);

    const url = await driver.getCurrentUrl();
    expect(url).to.include('sharepoint');
  });

  after(async function () {
    await driver.quit();
  });
});
