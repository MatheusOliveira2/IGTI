import express from 'express';
import { promises as fs } from 'fs';
import cors from 'cors';
import accountsRouter from './routes/accounts.js';

const { readFile, writeFile } = fs;

const app = express();
app.use(express.json());
app.use(cors());
app.use('/account', accountsRouter);

app.listen(3000, async () => {
  const initialJson = {
    nextId: 1,
    accounts: [],
  };
  try {
    await readFile('accounts.json');
  } catch {
    try {
      await writeFile('accounts.json', JSON.stringify(initialJson));
    } catch (err) {
      console.log(err);
    }
  }
  console.log('Started');
});
