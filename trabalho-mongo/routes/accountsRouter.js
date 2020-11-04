import express from 'express';
import { accountsModel } from '../models/accountsModel.js';

const app = express();

app.post('/accounts', async (req, res) => {
  try {
    const account = new accountsModel(req.body);

    await account.save();
    res.send(account);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/accounts/deposito/:agencia/:conta', async (req, res) => {
  try {
    const account = await accountsModel.findOneAndUpdate(
      { agencia: req.params.agencia, conta: req.params.conta },
      { $inc: { balance: req.body.balance } },
      { new: true }
    );
    if (!account) {
      res.status(404).send('Conta não encontrada');
    }
    res.send(account);
  } catch (error) {
    console.log(error);
  }
});

app.put('/accounts/saque/:agencia/:conta', async (req, res) => {
  try {
    let account = await accountsModel.find({
      agencia: req.params.agencia,
      conta: req.params.conta,
    });

    if (account.length < 0) {
      res.status(404).send('Conta não encontrada');
      return;
    }

    if (account[0].balance < req.body.balance + 1) {
      res.status(500).send('Saldo indisponível');
      return;
    }
    account = await accountsModel.findOneAndUpdate(
      { agencia: req.params.agencia, conta: req.params.conta },
      { $inc: { balance: -req.body.balance - 1 } },
      { new: true }
    );
    res.send(account);
  } catch (error) {
    console.log(error);
  }
});

app.get('/accounts/saldo/:agencia/:conta', async (req, res) => {
  try {
    let account = await accountsModel.find({
      agencia: req.params.agencia,
      conta: req.params.conta,
    });

    if (account.length < 0) {
      res.status(404).send('Conta não encontrada');
      return;
    }
    res.send({ balance: account[0].balance });
  } catch (error) {
    console.log(error);
  }
});

app.delete('/accounts/:agencia/:conta', async (req, res) => {
  try {
    const account = await accountsModel.findOneAndDelete({
      agencia: req.params.agencia,
      conta: req.params.conta,
    });
    if (!account) {
      res.status(404).send('Conta não encontrada');
      return;
    }

    const value = await accountsModel.countDocuments({
      agencia: req.params.agencia,
    });
    res.send({ value });
  } catch (error) {
    console.log(error);
  }
});

app.put('/accounts/trans/:origem/:destino', async (req, res) => {
  try {
    const accountOrigem = await accountsModel.find({
      conta: req.params.origem,
    });

    if (accountOrigem.length < 0) {
      res.status(404).send('Conta Origem não encontrada');
      return;
    }
    const accountDestino = await accountsModel.find({
      conta: req.params.destino,
    });

    if (accountDestino.length < 0) {
      res.status(404).send('Conta Destino não encontrada');
      return;
    }

    let valor = req.body.valor;
    const contas = [];
    if (accountOrigem[0].agencia !== accountDestino[0].agencia) {
      contas[0] = await accountsModel.findOneAndUpdate(
        { conta: req.params.origem },
        { $inc: { balance: -valor - 8 } },
        { new: true }
      );
    } else {
      contas[0] = await accountsModel.findOneAndUpdate(
        { conta: req.params.origem },
        { $inc: { balance: -valor } },
        { new: true }
      );
    }

    contas[1] = await accountsModel.findOneAndUpdate(
      { conta: req.params.destino },
      { $inc: { balance: valor } },
      { new: true }
    );

    res.send({ contas: [contas] });
  } catch (error) {
    console.log(error);
  }
});

app.get('/accounts', async (req, res) => {
  try {
    const accountOrigem = await accountsModel.find({});
    res.send(accountOrigem);
  } catch (error) {
    console.log(error);
  }
});

app.get('/accounts/media/:agencia', async (req, res) => {
  try {
    const accounts = await accountsModel.aggregate([
      { $match: { agencia: parseInt(req.params.agencia) } },
      { $group: { _id: 'null', media: { $avg: '$balance' } } },
    ]);

    res.send({ media: accounts[0].media });
  } catch (error) {
    console.log(error);
  }
});

app.get('/accounts/menores/:qtd', async (req, res) => {
  try {
    const accounts = await accountsModel.aggregate([
      { $sort: { balance: 1 } },
      { $limit: parseInt(req.params.qtd) },
    ]);

    res.send(accounts);
  } catch (error) {
    console.log(error);
  }
});

app.get('/accounts/maiores/:qtd', async (req, res) => {
  try {
    const accounts = await accountsModel.aggregate([
      { $sort: { balance: -1, name: 1 } },
      { $limit: parseInt(req.params.qtd) },
    ]);

    res.send(accounts);
  } catch (error) {
    console.log(error);
  }
});

app.post('/accounts/private', async (req, res) => {
  try {
    const agencias = await accountsModel.distinct('agencia');

    const maiores = agencias.map(async (agencia) => {
      let maior = await accountsModel.aggregate([
        { $match: { agencia: parseInt(agencia) } },
        { $sort: { balance: -1 } },
        { $limit: 1 },
      ]);
      return maior[0];
    });
    const resultado = await Promise.all(maiores);

    resultado.forEach(async (user) => {
      await accountsModel.findOneAndUpdate(
        { conta: user.conta },
        { agencia: 99 }
      );
    });

    const privateUsers = await accountsModel.find({
      agencia: 99,
    });
    res.send(privateUsers);
  } catch (error) {
    console.log(error);
  }
});
export { app as accountsRouter };
