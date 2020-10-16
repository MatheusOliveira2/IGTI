import express from 'express';
import { promises as fs } from 'fs';

const router = express.Router();
const { readFile, writeFile } = fs;

router.post('/', async (req, res) => {
  try {
    let account = req.body;
    const data = JSON.parse(await readFile('accounts.json'));
    account.id = data.nextId;
    data.nextId++;
    data.accounts.push(account);
    try {
      writeFile('accounts.json', JSON.stringify(data));
      res.send(account);
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/', async (_req, res) => {
  try {
    const data = JSON.parse(await readFile('accounts.json'));
    delete data.nextId;
    res.send(data);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile('accounts.json'));
    const user = data.accounts.find(
      (account) => account.id === parseInt(req.params.id)
    );
    res.send(user);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile('accounts.json'));
    const users = data.accounts.filter(
      (account) => account.id !== parseInt(req.params.id)
    );
    data.accounts = users;
    writeFile('accounts.json', JSON.stringify(data));
    res.send(data);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile('accounts.json'));
    data.accounts.forEach((account) => {
      if (account.id === parseInt(req.params.id)) {
        account.balance = req.body.balance;
      }
    });
    writeFile('accounts.json', JSON.stringify(data));
    res.send(data);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
