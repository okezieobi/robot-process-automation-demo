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

  await page.goto('https://frontier.jobs/jobs/190562');

  const [applyBtnLink] = await page.$x('//anchor[contains(., "Apply Now")]');
  if (applyBtnLink) {
    await applyBtnLink.click();
    await page.waitForNavigation();

    await page.$eval('imput[name=firstname]', (el) => {
      Object.defineProperty(el, 'value', {
        writable: true,
        value: candidate.firstname,
      });
    });

    await page.$eval('imput[name=lastname]', (el) => {
      Object.defineProperty(el, 'value', {
        writable: true,
        value: candidate.lastname,
      });
    });

    await page.$eval('imput[name=email]', (el) => {
      Object.defineProperty(el, 'value', {
        writable: true,
        value: candidate.email,
      });
    });

    await page.$eval('imput[name=phoneno]', (el) => {
      Object.defineProperty(el, 'value', {
        writable: true,
        value: candidate.phone,
      });
    });

    await page.$eval('imput[name=location]', (el) => {
      Object.defineProperty(el, 'value', {
        writable: true,
        value: candidate.location,
      });
    });
    await page.$eval('imput[name=linkedin]', (el) => {
      Object.defineProperty(el, 'value', {
        writable: true,
        value: candidate.linkedIn,
      });
    });

    const [nextBtnLink] = await page.$x('//anchor[contains(., "Next")]');
    if (nextBtnLink) {
      await nextBtnLink.click();
      await page.waitForNavigation();
      const fileInput = await page.$('input[type=file]');
      await fileInput?.uploadFile(candidate.resume);
      const [submitBtnLink] = await page.$x('//anchor[contains(., "Submit and Review")]');
      if (submitBtnLink) {
        await submitBtnLink.click();
        await page.waitForNavigation();
        const [sendBtnLink] = await page.$x('//anchor[contains(., "Send")]');
        if (sendBtnLink) {
          await sendBtnLink.click();
          await page.waitForNavigation();
        }
      }
    }
  }

  console.log('Form completed');
  await browser.close();
}
