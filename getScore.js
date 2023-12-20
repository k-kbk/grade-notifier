import fs from 'fs';
import path from 'path';
import sendEmail from './sendEmail.js';

export default async function getScore(page) {
  const TEXT_PATH = process.env.TEXT_PATH;
  const filePath = path.join(path.resolve(), TEXT_PATH);

  console.log('***** 수강점수조회');

  await page.waitForSelector('.btn-gnb-menu-open', { timeout: 20000 });
  await page.click('.btn-gnb-menu-open');
  await page.waitForTimeout(1500);
  await page.click('#sideform > div.left-menu-inner > ul > li:nth-child(4)');
  await page.waitForTimeout(1500);
  await page.click(
    '#sideform > div.left-menu-inner > ul > li:nth-child(4) > div.snb-wrap > ul > li:nth-child(1)'
  );
  await page.waitForTimeout(1500);
  const items = await page.$$eval('#container > section > div.basic-group', (items) => {
    return items.map((tbody) => tbody.innerText).slice(3);
  });

  const itemsText = items.toString();

  const textData = fs.readFileSync(filePath, 'utf-8');
  if (textData !== itemsText) {
    sendEmail('점수 공개', itemsText);
    fs.writeFileSync(filePath, itemsText, 'utf-8');
  }

  items.forEach((item) => {
    console.log(item);
    console.log(
      '----------------------------------------------------------------------------------------------------'
    );
    console.log('\n');
  });
}
