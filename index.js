import express from 'express';
import schedule from 'node-schedule';
import * as dotenv from 'dotenv';
import getGrade from './getGrade.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT;

const job = schedule.scheduleJob('*/5 * * * *', getGrade);

app.listen(PORT, () => {
  console.log(`${PORT}: 서버 실행`);
});
