const transactions = require('express').Router();

const transControll = require('../controllers/transactions');

transactions.get('/', transControll.getAllTransactions);
transactions.delete('/:id', transControll.deleteTransactions);

module.exports = transactions;