import puppeteer from 'puppeteer';
import login from './login.js';
import getScore from './getScore.js';
import getGrade from './getGrade.js';

export default async function run() {
  console.log('============================================================');
  console.log(new Date().toLocaleTimeString('ko-KR', { timeZone: 'Asia/Seoul' }));
  console.log('\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });
  const page = await browser.newPage();

  try {
    await login(page);
    await getScore(page);
    await getGrade(page);
  } catch (error) {
    console.log(error);
    await browser.close();
  }
}
