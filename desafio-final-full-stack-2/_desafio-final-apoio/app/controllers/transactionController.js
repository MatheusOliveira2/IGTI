const transactionService = require('../services/transactionService');

const get = async (req, res) => {
  try {
    const result = await transactionService.get(req.query);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getById = async (req, res) => {
  try {
    const result = await transactionService.getById(req.params.id);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const add = async (req, res) => {
  try {
    const result = await transactionService.add(req.body);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const result = await transactionService.update(req.params.id, req.body);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

const remove = async (req, res) => {
  try {
    const result = await transactionService.remove(req.params.id);

    res.status(200).end();
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { get, getById, add, update, remove };
