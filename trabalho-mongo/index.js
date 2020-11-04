import express from 'express';
import mongoose from 'mongoose';
import { accountsRouter } from './routes/accountsRouter.js';

(async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://matheus:db123456@bootcamp.8o9uh.mongodb.net/trabalho_pratico?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  } catch (error) {
    console.log('Erro ao conectar ao MongoDB ' + error);
  }
})();

const app = express();

app.use(express.json());
app.use(accountsRouter);

app.listen(3000, () => console.log('Started'));
