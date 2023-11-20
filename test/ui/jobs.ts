import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import { expect } from 'chai';
import chrome from 'selenium-webdriver/chrome';

interface CustomWebDriver extends WebDriver {
  setTimeouts(timeouts: { implicit: number }): Promise<void>;
}

function extendWebDriver(driver: WebDriver): CustomWebDriver {
  const customDriver = driver as CustomWebDriver;

  customDriver.setTimeouts = async function (timeouts: { implicit: number }): Promise<void> {
    await driver.manage().setTimeouts(timeouts);
  };

  return customDriver;
}

let driver: CustomWebDriver;

before(async function (this: Mocha.Context) {
  this.timeout(30000);

  try {
    console.log('Starting WebDriver setup...');
    const options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--start-maximized');
    driver = extendWebDriver(await new Builder().forBrowser('chrome').setChromeOptions(options).build());

    console.log('WebDriver setup completed. Setting timeouts...');
    await driver.setTimeouts({ implicit: 10000 });

    console.log('Navigating to the application...');
    await driver.get('http://localhost:3000');

    console.log('Application navigation completed.');
  } catch (error) {
    console.error('Error during WebDriver setup or navigation:', error);
    throw error;
  }
});

describe('"View Job Roles" button', function () {
  it('should load job list when clicked', async function () {
    this.timeout(15000); 

    const button = await driver.wait(until.elementLocated(By.id('viewJobRolesButton')), 60000);
    await button.click();


    const jobTable = await driver.findElement(By.id('jobs'));
    expect(await jobTable.isDisplayed()).to.be.true;
  });
});

describe('"First View in Sharepoint" button', function () {
  it('should redirect to the appropriate page when clicked', async function () {
    this.timeout(20000);

    const jobId = 1;
    const button = await driver.wait(until.elementLocated(By.id(`viewSharePointButton_${jobId}`)), 60000);
    await button.click();

    await driver.wait(until.urlContains('sharepoint'));

    const url = await driver.getCurrentUrl();
    expect(url).to.include('sharepoint');
  });
});

after(async function (this: Mocha.Context) {
  this.timeout(10000);

  if (driver) {
    try {
      console.log('Quitting WebDriver...');
      await driver.quit();
      console.log('WebDriver quit successfully.');
    } catch (error) {
      console.error('Error during WebDriver quit:', error);
    }
  } else {
    console.warn('WebDriver is undefined. Quit skipped.');
  }
});

