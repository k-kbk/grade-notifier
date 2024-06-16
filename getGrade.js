import fs from 'fs';
import sendEmail from './sendEmail.js';

export default async function getGrade(page) {
  const filePath = './grade.json';

  console.log('********** 수강성적조회 **********');
  console.log();

  await page.waitForSelector('.btn-gnb-menu-open', { timeout: 20000 });
  await page.click('.btn-gnb-menu-open');
  await page.waitForTimeout(1500);
  await page.click(
    '#sideform > div.left-menu-inner > ul.left-menu-list > li:nth-child(4) > div.snb-wrap >  ul > li:nth-child(2)'
  );
  await page.waitForTimeout(1500);
  const rows = await page.$$eval(
    '#container > section > div:nth-child(2) > div > div > div > div > table > tbody',
    (items) => {
      return items.map((tbody) => tbody.innerText);
    }
  );

  if (!fs.existsSync(filePath)) {
    const newData = {};
    rows.forEach((item) => {
      const line = item.trim().split('\t');
      const [lectureNumber, lectureName, , grade, isPublic] = line;
      newData[lectureNumber] = isPublic === '공개';
    });

    const json = JSON.stringify(newData, null, 2);
    fs.writeFileSync(filePath, json, 'utf-8');
  } else {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const exData = JSON.parse(jsonData);

    rows.forEach((item) => {
      const line = item.trim().split('\t');
      const [lectureNumber, lectureName, , grade, isPublic] = line;

      console.log(`${lectureName}: ${grade}`);

      if (!exData[lectureNumber] && isPublic === '공개') {
        sendEmail(`${lectureName} 성적 공개`, grade);
        exData[lectureNumber] = true;

        const json = JSON.stringify(exData, null, 2);
        fs.writeFileSync(filePath, json, 'utf-8');
      }
    });
  }
}
