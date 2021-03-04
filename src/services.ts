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
  const browser = await puppeteer.launch({ defaultViewport: { width: 1368, height: 768 } });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36');
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
  });
  page.setDefaultNavigationTimeout(0);
  page.on('response', (request) => { console.log(`Request at ${request.url()}`); });
  // page.once('error', (error) => { console.error(error); });

  await page.goto('https://frontier.jobs/jobs/190562', { waitUntil: 'networkidle0' });

  const applyBtnLink = await page.waitForXPath('//a[contains(., "Apply Now")]');
  await applyBtnLink?.click();

  await page.type('input[name=fullname]', candidate.firstname);
  await page.type('input[name=lastname]', candidate.lastname);
  await page.type('input[name=email]', candidate.email);
  await page.type('input[name=phoneno]', candidate.phone);
  await page.type('input[name=location]', candidate.location);
  await page.waitForTimeout(1000);
  await (await page.$('input[name=location]'))?.press('ArrowDown');
  await (await page.$('input[name=location]'))?.press('Enter');
  await page.type('input[name=linkedin]', candidate.linkedIn);

  const nextBtnLink = await page.waitForXPath('//a[contains(., "Next")]');
  await nextBtnLink?.click();
  // const deferResume = await page
  // .waitForXPath('//span[contains(., "I\'ll email my resume/CV to you later")]');
  // await deferResume?.click({ button: 'middle', clickCount: 4 });
  const fileInput = await page.waitForSelector('input[type=file]');
  await fileInput?.uploadFile('./screenshot/test.png');
  const submitBtnLink = await page.waitForXPath('//a[contains(., "Review & send")]');
  await page.screenshot({ path: './screenshot/test.png' });
  await Promise.all([
    page.waitForTimeout(12000),
    submitBtnLink?.click(),
  ]);
  const sendBtnLink = await page.waitForXPath('//a[contains(., "Send")]');
  await sendBtnLink?.click();
  // await page.waitForTimeout(1200);
  await page.waitForSelector('h1');
  const success = await page.evaluate(() => document.querySelector('h1')?.innerText);
  await browser.close();
  return { success };
}
