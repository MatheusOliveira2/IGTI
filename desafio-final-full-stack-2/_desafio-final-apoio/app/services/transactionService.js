const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const transactionModel = require('../models/TransactionModel');

const get = async (periodToGet) => {
  try {
    const { period } = periodToGet;

    const transactionDB = await transactionModel.find({
      yearMonth: period,
    });

    return transactionDB;
  } catch (error) {
    return error;
  }
};

const getById = async (id) => {
  try {
    if (!id) {
      return 'Id obrigatório ';
    }

    const transactionDB = await transactionModel.findOne({
      _id: id,
    });
    console.log(transactionDB);
    if (!transactionDB) {
      return 'Não encontrado';
    }

    return transactionDB;
  } catch (error) {
    return error;
  }
};

const add = async (transactionToAdd) => {
  try {
    const transactionDB = new transactionModel(transactionToAdd);
    await transactionDB.save();

    return transactionDB;
  } catch (error) {
    return error;
  }
};

const update = async (id, transactionToUpdate) => {
  try {
    const transactionToValidateDB = await transactionModel.findOne({ _id: id });

    const transactionToUpdateDB = await transactionModel.updateOne(
      { _id: id },
      transactionToUpdate
    );

    return transactionToUpdate;
  } catch (error) {
    return error;
  }
};

const remove = async (id) => {
  try {
    const transactionDB = await transactionModel.deleteOne({ _id: id });

    return transactionDB;
  } catch (error) {
    return error;
  }
};

module.exports = { get, getById, add, update, remove };
