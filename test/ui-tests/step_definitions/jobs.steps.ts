import { Given, When, Then } from '@cucumber/cucumber';
import { Builder, Capabilities, By, WebDriver} from 'selenium-webdriver';
import { expect } from 'chai';

let driver: WebDriver;

Given('I am on the home page', async function () {
  driver = await new Builder().withCapabilities(Capabilities.chrome()).build();
  await driver.get('http://localhost:3000/');
});

When('I click the "View All Jobs" button', async function () {
  const button = await driver.findElement(By.className('btn-primary'));
  await button.click();
});

Then('the list of jobs should load', async function () {
  const jobTable = await driver.findElement(By.className('table'));
  expect(await jobTable.isDisplayed()).to.be.true;
});
