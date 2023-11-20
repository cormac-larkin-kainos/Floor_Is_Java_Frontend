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

before(async function () {
  this.timeout(10000); 

  try {
    const options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--start-maximized');
    driver = extendWebDriver(await new Builder().forBrowser('chrome').setChromeOptions(options).build());

    await driver.setTimeouts({ implicit: 10000 });

    await driver.get('http://localhost:3000');
  } catch (error) {
    console.error('Error during WebDriver setup or navigation:', error);
    throw error;
  }
});

describe('"View Job Roles" button', function () {
  it('should load job list when clicked', async function () {
    this.timeout(15000); 

    const button = await driver.findElement(By.id('viewJobRolesButton'));
    await button.click();

    const jobTable = await driver.findElement(By.id('jobs'));
    expect(await jobTable.isDisplayed()).to.be.true;
  });
});

describe('"First View in Sharepoint" button', function () {
  it('should redirect to the appropriate page when clicked', async function () {
    this.timeout(20000);

    const jobId = 1;
    const button = await driver.findElement(By.id(`viewSharePointButton_${jobId}`));
    await button.click();

    await driver.wait(until.urlContains('sharepoint'));

    const url = await driver.getCurrentUrl();
    expect(url).to.include('sharepoint');
  });
});

after(async function () {
  this.timeout(10000); 
  await driver.quit();
});
