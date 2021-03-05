/* eslint-disable no-undef */
/* eslint-disable no-console */
import puppeteer from 'puppeteer';
import fs from 'fs';
import https from 'https';
import path from 'path';

interface Candidate {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    location: string;
    linkedIn: string;
    resume: string;
}

function downloadFile(url: string, folder: string) {
  return new Promise((resolve, reject) => {
    fs.mkdir(folder, { recursive: true }, (error) => {
      if (error) reject(Error(`${error.name}: ${error.message}`));
      else {
        const fileName = path.basename(new URL(url).pathname);
        const dest = `${folder}/${fileName}`;
        const file = fs.createWriteStream(dest, { flags: 'w+' });
        const request = https.get(url, (response) => {
          response.pipe(file);
        });

        request.on('error', (err) => {
          reject(Error(`${err.name}: ${err.message}`));
          file.close();
          fs.unlink(dest, () => { });
        }).setTimeout(30000, () => {
          request.destroy();
        });

        file.on('finish', (result: any) => {
          resolve(result);
        }).on('error', (err) => {
          reject(Error(`${err.name}: ${err.message}`));
          file.close();
          fs.unlink(dest, () => { });
        });
      }
    });
  });
}

async function submitForm(candidate: Candidate) {
  await downloadFile(candidate.resume, './downloads');

  const fileName = path.basename(new URL(candidate.resume).pathname);

  const browser = await puppeteer.launch({ defaultViewport: { width: 1368, height: 768 } });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36');
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
  });
  page.setDefaultNavigationTimeout(0);
  // page.on('response', (response) => { console.log(`Response from ${response.url()}`); });

  await page.goto('https://frontier.jobs/jobs/190562', { waitUntil: 'networkidle0' });

  const applyBtnLink = await page.waitForXPath('//a[contains(., "Apply Now")]');
  await applyBtnLink?.click();

  await page.type('input[name=fullname]', candidate.firstname);
  await page.type('input[name=lastname]', candidate.lastname);
  await page.type('input[name=email]', candidate.email);
  await page.type('input[name=phoneno]', candidate.phone);
  await page.type('input[name=location]', candidate.location);
  await page.waitForTimeout(2000);
  await (await page.$('input[name=location]'))?.press('ArrowDown');
  await (await page.$('input[name=location]'))?.press('Enter');
  await page.type('input[name=linkedin]', candidate.linkedIn);

  const nextBtnLink = await page.waitForXPath('//a[contains(., "Next")]');
  await nextBtnLink?.click();
  const fileInput = await page.waitForSelector('input[type=file]');
  await fileInput?.uploadFile(`./downloads/${fileName}`);
  const submitBtnLink = await page.waitForXPath('//a[contains(., "Review & send")]');

  await submitBtnLink?.click({ delay: 20000 });
  const sendBtnLink = await page.waitForXPath('//a[contains(., "Send")]');
  await sendBtnLink?.click();
  await page.waitForSelector('h1');
  const success = await page.evaluate(() => document.querySelector('h1')?.innerText);
  await browser.close();
  return { success };
}

export default { submitForm };
