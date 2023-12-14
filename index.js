import express from 'express';
import schedule from 'node-schedule';
import * as dotenv from 'dotenv';
import getGrade from './getGrade.js';

dotenv.config();

const app = express();

const port = process.env.PORT;

const job = schedule.scheduleJob('*/1 * * * *', getGrade);

app.listen(port, () => {
  console.log(`running on ${port}`);
});
