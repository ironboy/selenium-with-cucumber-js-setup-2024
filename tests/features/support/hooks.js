import { Before, After, AfterStep } from '@cucumber/cucumber';
import { sleepBetweenSteps } from '../../config.js';

const sleep = ms => new Promise(res => setTimeout(res, ms));

Before(function () {
  return this.driver.manage().window().maximize();
});

After(function () {
  return this.driver.quit();
});

AfterStep(async function () {
  await sleep(sleepBetweenSteps);
});