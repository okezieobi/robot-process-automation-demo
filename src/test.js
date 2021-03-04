// Script Name: {Untitled Test Case}

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let element;

  page.setDefaultNavigationTimeout(0);
  page.on('request', (request) => { console.log(`Request at ${request.url()}`); });

  await page.goto('https://frontier.jobs/jobs/190562', { waitUntil: 'networkidle0' });
  element = await page.$x('//a[contains(text(),\'Apply Now\')]');
  await element[0].click();
  await page.waitForNavigation();
  element = await page.$x('//*[@name="fullname"]');
  await element[0].click();
  element = await page.$x('//*[@name="fullname"]');
  await element[0].type('fff');
  element = await page.$x('//*[@name="lastname"]');
  await element[0].click();
  element = await page.$x('//*[@name="lastname"]');
  await element[0].type('fff');
  element = await page.$x('//*[@name="email"]');
  await element[0].click();
  element = await page.$x('//*[@name="email"]');
  await element[0].type('fff@mail.com');
  element = await page.$x('//*[@name="location"]');
  await element[0].click();
  element = await page.$x('//*[@id="PlacesAutocomplete__suggestion-ChIJwYCC5iqLOxARy9nDZ6OHntw"]');
  await element[0].click();
  element = await page.$x('//*[@name="location"]');
  await element[0].type('Lagos, Nigeria');
  element = await page.$x('//a[contains(text(),\'Next\')]');
  await element[0].click();
  await page.waitForNavigation();
  element = await page.$x('//div[@id=\'root\']/main/div/div/section/label/section/div/label/span');
  await element[0].click();
  element = await page.$x('//a[contains(text(),\'Review & send\')]');
  await element[0].click();
  await page.waitForNavigation();
  element = await page.$x('//a[contains(text(),\'Send\')]');
  await element[0].click();
  await page.waitForNavigation();
  await browser.close();
})();
