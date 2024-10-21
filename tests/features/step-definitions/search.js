import { Given, When, Then } from '@cucumber/cucumber';
import { By, until, Key } from 'selenium-webdriver';
import { expect } from 'chai';

/* 
  Note these tests only works with the Swedish version of Google 
  because of search for "Godkänn" and "Verktyg" 
*/

Given('that I am at {string}', async function (url) {
  await this.driver.get(url);
});

Given('I have approved of cookies', async function () {
  // find elements with the text 'Godkänn' in them
  let elementsWithApproveText = await this.driver.findElements(
    By.xpath("//*[contains(text(),'Godkänn')]")
  );
  // the approve button is the second element with 'Godkänn' in it
  let approveBtn = elementsWithApproveText[1];
  // click the approve button
  await approveBtn.click();
});

When('I search for {string}', async function (searchString) {
  let searchField = await this.driver.findElement(
    By.css('[name="q"]')
  );
  // send keys / searchString to the searchField
  await this.driver.actions()
    .sendKeys(searchField, searchString + Key.ENTER)
    .perform();
});

/*Then('I should get at least {int} hits', async function (minNumberOfHits) {
  // wait for up to 5 secs for the search to complete
  // and then get the result-stats element that includes number of hits
  let resultStatsEl = await this.driver.wait(until.elementLocated(
    By.css('#result-stats')),
    5000
  );
  // get the text of the result-stats element
  let statText = await resultStatsEl.getText();
  // extract number of hits from the text
  let numberOfHits = +statText.split('(')[0].replace(/\D/g, '');
  // check that the number of hits are at least the minumum expected
  expect(numberOfHits).to.be.at.least(minNumberOfHits);
  // If you want to wait/sleep (avoid if possible, use until instead!)
  // await this.driver.sleep(3000);
});*/

// #hdtb-tls
Then('I should get at least {int} hits', async function (minNumberOfHits) {
  // wait for up to 5 secs for the search to complete
  // (there are no h3 headings before we have a search result)
  await this.driver.wait(until.elementLocated(By.css('h3')), 5000);
  // find and click the "Verktyg" button
  let toolButton = await this.driver.findElement(
    By.xpath("//div[contains(text(),'Verktyg')]")
  );
  await toolButton.click();
  // find the result stats (one of the few elements with a human readable class or id)
  let resultStatsEl = await this.driver.findElement(
    By.css('#result-stats')
  );
  // get the text of the result-stats element
  let statText = await resultStatsEl.getText();
  // extract number of hits from the text (\D in the reg ex means "non-digit")
  let numberOfHits = +statText.split('(')[0].replace(/\D/g, '');
  // if you want to console.log during development of tests you can
  console.log("numberOfHits", numberOfHits);
  // check that the number of hits are at least the minumum expected
  expect(numberOfHits).to.be.at.least(minNumberOfHits);
});