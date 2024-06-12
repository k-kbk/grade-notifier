import puppeteer from 'puppeteer';
import { tryLogin } from './login.js';
import getScore from './getScore.js';
import getGrade from './getGrade.js';

export default async function run() {
  console.log('============================================================');
  console.log(new Date().toLocaleTimeString('ko-KR', { timeZone: 'Asia/Seoul' }));

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });
  const page = await browser.newPage();

  try {
    await tryLogin(page);
    await getScore(page);
    await getGrade(page);
  } catch (error) {
    console.log(error);
    await browser.close();
  }
}
