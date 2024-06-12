import express from 'express';
import schedule from 'node-schedule';
import * as dotenv from 'dotenv';
import run from './run.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8888;

schedule.scheduleJob('*/5 * * * *', run);

app.listen(PORT);

run();
