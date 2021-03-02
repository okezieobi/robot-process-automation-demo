/* eslint-disable no-undef */
/* eslint-disable no-console */
import puppeteer from 'puppeteer';

interface Candidate {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    location: string;
    linkedIn: string;
    resume: string;
}

export default async function handleRequest(candidate: Candidate) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.setDefaultNavigationTimeout(0);
  page.on('response', (request) => { console.log(`Request at ${request.url()}`); });
  // page.once('error', (error) => { console.error(error); });

  await page.goto('https://frontier.jobs/jobs/190562');

  const [applyBtnLink] = await page.$x('//a[contains(., "Apply Now")]');
  await applyBtnLink.click();
  await page.waitForNavigation();

  await page.type('input[name=fullname]', candidate.firstname);
  await page.type('input[name=lastname]', candidate.lastname);
  await page.type('input[name=email]', candidate.email);
  await page.type('input[name=phoneno]', candidate.phone);
  await page.type('input[name=location]', candidate.location);
  await page.waitForTimeout(1000);
  await (await page.$('input[name=location]'))?.press('ArrowDown');
  await (await page.$('input[name=location]'))?.press('Enter');
  await page.type('input[name=linkedin]', candidate.linkedIn);

  const [nextBtnLink] = await page.$x('//a[contains(., "Next")]');
  await nextBtnLink.click();
  await page.waitForNavigation();
  const [deferResume] = await page.$x('//span[contains(., "slut")]');
  await deferResume.click();
  const [submitBtnLink] = await page.$x('//a[contains(., "Review & send")]');
  await submitBtnLink.click();
  await page.waitForNavigation();
  const [sendBtnLink] = await page.$x('//a[contains(., "Send")]');
  await sendBtnLink.click();
  // await page.waitForNavigation();
  // await page.waitForTimeout(1200);
  await page.waitForSelector('h1');
  const success = await page.evaluate(() => document.querySelector('h1')?.innerText);
  await browser.close();
  return { success };
}
