import puppeteer from 'puppeteer';
import fs from 'fs';
import sendEmail from './sendEmail.js';

export default async function getGrade() {
  console.log(new Date().toLocaleTimeString('ko-KR', { timeZone: 'Asia/Seoul' }));

  const LOGIN_PAGE = process.env.LOGIN_PAGE;
  const USER_ID = process.env.USER_ID;
  const USER_PW = process.env.USER_PW;
  const JSON_PATH = process.env.JSON_PATH;

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  try {
    const page = await browser.newPage();
    await page.goto(LOGIN_PAGE);
    await page.waitForSelector('#id');
    await page.evaluate(
      (id, pw) => {
        document.querySelector('#id').value = id;
        document.querySelector('#passwrd').value = pw;
      },
      USER_ID,
      USER_PW
    );
    await page.click('#loginButton');
    await page.waitForSelector('.btn-gnb-menu-open', { timeout: 15000 });
    await page.click('.btn-gnb-menu-open');
    await page.waitForTimeout(15000);
    await page.click('#sideform > div.left-menu-inner > ul > li:nth-child(4)');
    await page.waitForTimeout(15000);
    await page.click(
      '#sideform > div.left-menu-inner > ul > li:nth-child(4) > div.snb-wrap > ul > li:nth-child(2)'
    );
    await page.waitForTimeout(15000);
    const rows = await page.$$eval(
      '#container > section > div:nth-child(2) > div > div > div > div > table > tbody',
      (items) => {
        return items.map((tbody) => tbody.innerText);
      }
    );

    if (!fs.existsSync(JSON_PATH)) {
      const newData = {};

      rows.forEach((item) => {
        const line = item.trim().split('\t');
        const [lectureNumber, lectureName, , grade, isPublic] = line;
        newData[lectureNumber] = isPublic === '공개';
      });

      const json = JSON.stringify(newData, null, 2);
      fs.writeFileSync(JSON_PATH, json, 'utf-8');
    } else {
      const jsonData = fs.readFileSync(JSON_PATH, 'utf-8');
      const exData = JSON.parse(jsonData);

      rows.forEach((item) => {
        const line = item.trim().split('\t');
        const [lectureNumber, lectureName, , grade, isPublic] = line;

        if (exData[lectureNumber] && isPublic === '공개') {
          sendEmail(lectureName, grade);
          exData[lectureNumber] = true;
        }
      });

      const json = JSON.stringify(exData, null, 2);
      fs.writeFileSync(JSON_PATH, json, 'utf-8');
    }
  } catch (error) {
    console.log(error);
  } finally {
    await browser.close();
  }
}
