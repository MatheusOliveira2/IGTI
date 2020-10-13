import express from 'express';
import carrosRouter from './carrosRouter.js';
import winston from 'winston';

const app = express();
app.use(express.json());

const { combine, printf, label, timestamp } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'my-log.log' }),
  ],
  format: combine(label({ label: 'my-app' }), timestamp(), myFormat),
});

logger.error('Error-log');
logger.warn('warn-log');
app.use('/carros', carrosRouter);

app.use('/images', express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/user', (req, res) => {
  res.send(req.body);
});

app.post('/user/:id', (req, res) => {
  res.send(req.params.id);
});

app.post('/userQ', (req, res) => {
  res.send(req.query);
});

app.route('/route').get((req, res) => {
  res.send(req.params.id);
});
app.listen(3000, () => {
  console.log('Start');
});
